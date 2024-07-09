import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "@app/article/article.service";
import { CreateArticleDto } from "@app/article/dto/createArticle.dto";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { User } from "@app/user/decorators/user.decorator";
import { UserEntity } from "@app/user/user.entity";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @User() currentUser: UserEntity,
        @Body('article') createArticleDto: CreateArticleDto
    ): Promise<any> {
        return this.articleService.createArticle(currentUser, createArticleDto);
    }
}