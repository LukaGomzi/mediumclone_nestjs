import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileType } from "@app/profile/types/profile.type";
import { ProfileResponseInterface } from "@app/profile/types/profileResponse.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";
import { Repository } from "typeorm";
import { FollowEntity } from "@app/profile/follow.entity";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(FollowEntity)
        private readonly followRepository: Repository<FollowEntity>
    ) {}

    async getProfile(userId: number, profileUsername: string): Promise<ProfileType> {
        const user = await this.userRepository.findOne({
            where: {
                username: profileUsername
            }
        });

        if (!user) {
            throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
        }

        return { ...user, following: false };
    }

    async followProfile(userId: number, profileUsername: string): Promise<ProfileType> {
        const user = await this.userRepository.findOne({
            where: {
                username: profileUsername
            }
        });

        if (!user) {
            throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
        }

        if (userId === user.id) {
            throw new HttpException('Follower and Following cant be equal', HttpStatus.BAD_REQUEST);
        }

        const follow = this.followRepository.findOne({
            where: {
                follower: userId,
                followingId: user.id
            }
        });

        if (!follow) {
            const followToCreate = new FollowEntity();
            followToCreate.follower = userId;
            followToCreate.followingId = user.id;
            await this.followRepository.save(followToCreate);
        }

        return { ...user, following: true };
    }

    buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
        delete profile.email;
        return { profile };
    }
}