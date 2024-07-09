import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "@app/article/dto/createArticle.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleEntity } from "@app/article/article.entity";
import { Repository } from "typeorm";
import { UserEntity } from "@app/user/user.entity";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>
    ) {}
    
    async createArticle(
        currentUser: UserEntity,
        createArticleDto: CreateArticleDto
    ): Promise<ArticleEntity>{
        const article = new ArticleEntity();
        Object.assign(article, createArticleDto);

        if (!article.tagList) {
            article.tagList = [];
        }

        article.slug = 'fooo';

        article.author = currentUser;

        return await this.articleRepository.save(article);
    }
}