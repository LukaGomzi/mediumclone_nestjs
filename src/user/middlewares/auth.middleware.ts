import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { ExpressRequest } from "@app/types/expressRequest.interface";
import { JwtPayload, verify } from 'jsonwebtoken';
import { JWT_SECRET } from "@app/config";
import { UserService } from "@app/user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }

    async use(req: ExpressRequest, _: Response, next: NextFunction): Promise<any> {
        if (!req.headers.authorization) {
            req.user = null;
            next()
            return;
        }

        const token = req.headers.authorization.split(' ')[1];

        try {
            const decode = verify(token, JWT_SECRET) as JwtPayload;
            req.user = await this.userService.findById(decode.id);
            next();
        } catch (err) {
            req.user = null;
            next();
        }
    }
}