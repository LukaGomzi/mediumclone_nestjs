import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "@app/user/dto/createUser.dto";

@Injectable()
export class UserService {
    async createUser(userDto: CreateUserDto): Promise<any> {
        return userDto;
    }
}