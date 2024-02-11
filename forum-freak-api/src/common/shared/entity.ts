import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntityGlobal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    name: 'date_created',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_created: Date;

  @Column({
    type: 'timestamp',
    name: 'date_modified',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_modified: Date;
}
