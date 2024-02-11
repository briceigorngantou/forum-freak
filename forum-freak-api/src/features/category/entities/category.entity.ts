import { EntityGlobal } from 'src/common/shared/entity';
import { Topics } from 'src/features/topics/entities/topics.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category extends EntityGlobal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  deleted: boolean;

  @OneToMany(() => Topics, (topic) => topic.category, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  topic: Topics[];
}
