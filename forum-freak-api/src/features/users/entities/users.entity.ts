import Role from 'src/common/config/role.enum';
import { EntityGlobal } from 'src/common/shared/entity';
import { Comments } from 'src/features/comments/entities/comments.entity';
import { Topics } from 'src/features/topics/entities/topics.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Users extends EntityGlobal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  pseudo: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  activated: boolean;

  @Column({ nullable: true })
  deleted: boolean;

  @Column({ nullable: true })
  banner: string;

  @Column({ nullable: true })
  birthDate: string;

  @Column({ nullable: false, unique: true })
  code: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.user,
    nullable: false,
  })
  role: Role;

  @OneToMany(() => Topics, (topic) => topic.users, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  topic: Topics[];

  @ManyToMany(() => Comments, (comment) => comment.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId' })
  comment: Comments;
}
