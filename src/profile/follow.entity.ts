import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'follows' })
export class FollowEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    follower: number;

    @Column()
    followingId: number;
}