import { EntityGlobal } from 'src/common/shared/entity';
import { Comments } from 'src/features/comments/entities/comments.entity';
import { Users } from 'src/features/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Topics extends EntityGlobal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  message: string;

  @Column({ nullable: true })
  deleted: boolean;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Users, (userId) => userId.topic, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  users: Users;

  @ManyToOne(() => Category, (categoryId) => categoryId.topic, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToMany(() => Comments, (comment) => comment.topics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId' })
  comment: Comments;
  
}
