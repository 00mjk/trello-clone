import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ColumnTrello } from '../column/column.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  pass: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => ColumnTrello, ColumnTrello => ColumnTrello.user)
    columns: ColumnTrello[];

}