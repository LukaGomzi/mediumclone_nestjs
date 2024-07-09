import { Module } from "@nestjs/common";
import { ArticleController } from "@app/article/article.controller";
import { ArticleService } from "@app/article/article.service";

@Module({
    imports: [],
    controllers: [ArticleController],
    providers: [ArticleService]
})
export class ArticleModule {}