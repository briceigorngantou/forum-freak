import { EntityGlobal } from 'src/common/shared/entity';
import { Topics } from 'src/features/topics/entities/topics.entity';
import { Users } from 'src/features/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Comments extends EntityGlobal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  topicId: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: true })
  deleted: boolean;

  @ManyToMany(() => Users, (userId) => userId.comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  users: Users;

  @ManyToMany(() => Topics, (topicId) => topicId.comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topicId' })
  topics: Topics;
}
