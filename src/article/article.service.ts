import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateArticleDto } from "@app/article/dto/createArticle.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleEntity } from "@app/article/article.entity";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { UserEntity } from "@app/user/user.entity";
import { ArticleResponseInterface } from "@app/article/types/articleResponse.interface";
import slugify from "slugify";
import { ArticlesResponseInterface } from "@app/article/types/articlesResponse.interface";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly dataSource: DataSource
    ) {}

    async findAll(currentUserId: number, query: any): Promise<ArticlesResponseInterface> {
        const queryBuilder = this.dataSource.getRepository(ArticleEntity).createQueryBuilder(
            'articles',
        ).leftJoinAndSelect('articles.author', 'author');

        if (query.tag) {
            queryBuilder.andWhere('articles.tagList LIKE :tag', {
                tag: `%${query.tag}%`
            });
        }

        if (query.author) {
            const author = await this.userRepository.findOne({
                where: {
                    username: query.author
                }
            });

            queryBuilder.andWhere('articles.authorId = :id', {
                id: author.id
            });
        }

        queryBuilder.orderBy('articles.createdAt', 'DESC');

        const articlesCount = await queryBuilder.getCount();

        if (query.limit) {
            queryBuilder.limit(query.limit);
        }

        if (query.offset) {
            queryBuilder.offset(query.offset)
        }

        const articles = await queryBuilder.getMany();

        return { articles, articlesCount };
    }
    
    async createArticle(
        currentUser: UserEntity,
        createArticleDto: CreateArticleDto
    ): Promise<ArticleEntity>{
        const article = new ArticleEntity();
        Object.assign(article, createArticleDto);

        if (!article.tagList) {
            article.tagList = [];
        }

        article.slug = this.getSlug(createArticleDto.title);

        article.author = currentUser;

        return await this.articleRepository.save(article);
    }

    async findBySlug(slug: string): Promise<ArticleEntity> {
        const article = await this.articleRepository.findOne({
            where: { slug }
        });

        if (!article) {
            throw new HttpException(`Article with the slug ${slug} does not exist.`, HttpStatus.NOT_FOUND);
        }

        return article;
    }

    async deleteArticle(slug: string, userId: number): Promise<DeleteResult> {
        const article = await this.findBySlug(slug);

        if (!article) {
            throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
        }

        if (article.author.id !== userId) {
            throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
        }

        return await this.articleRepository.delete({ slug });
    }

    async updateArticle(slug: string, updateArticleDto: CreateArticleDto, userId: number): Promise<ArticleEntity> {
        const article = await this.findBySlug(slug);
        if (!article) {
            throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
        }

        if (article.author.id !== userId) {
            throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
        }

        Object.assign(article, updateArticleDto);

        return await this.articleRepository.save(article);
    }

    async addArticleToFavorites(slug: string, userId: number): Promise<ArticleEntity> {
        const article = await this.findBySlug(slug);

        if (!article) {
            throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
        }

        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['favorites']
        });

        const isNotFavorited = user.favorites.findIndex(
            articleInFavorites => articleInFavorites.id === article.id
        ) === -1;

        if (isNotFavorited) {
            user.favorites.push(article);
            article.favoritesCount++;
            await this.userRepository.save(user);
            await this.articleRepository.save(article);
        }

        return article;
    }

    async removeArticleFromFavorites(slug: string, userId: number): Promise<ArticleEntity> {
        const article = await this.findBySlug(slug);

        if (!article) {
            throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
        }

        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['favorites']
        });

        const articleIndex = user.favorites.findIndex(
            articleInFavorites => articleInFavorites.id === article.id
        );

        if (articleIndex >= 0) {
            user.favorites.splice(articleIndex, 1);
            article.favoritesCount--;
            await this.userRepository.save(user);
            await this.articleRepository.save(article);
        }

        return article;
    }

    buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
        return { article }
    }

    private getSlug(title: string): string {
        return slugify(title, {lower: true}) +
            '-' +
            ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    }
}