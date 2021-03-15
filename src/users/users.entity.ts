import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Index } from 'typeorm';
import { ColumnTrello } from '../column/column.entity';


@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({unique: true})
  email: string;

  @Column()
  username: string;

  @Column()
  pass: string;

  @OneToMany(() => ColumnTrello, ColumnTrello => ColumnTrello.user)
    columns: ColumnTrello[];

}