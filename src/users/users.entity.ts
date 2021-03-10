import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { ColumnTrello } from '../column/column.entity';


@Entity()
export class User {

  @PrimaryColumn()
  email: string;

  @Column()
  pass: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => ColumnTrello, ColumnTrello => ColumnTrello.user)
    columns: ColumnTrello[];

}