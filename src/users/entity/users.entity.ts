import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Index } from 'typeorm';
import { ColumnTrello } from '../../column/entity/column.entity';



@Entity({name:"user"})
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({unique: true})
  email: string;

  @Column()
  username: string;

  // REVU: Лучше переименнуй в password
  @Column()
  pass: string;

  @OneToMany(() => ColumnTrello, ColumnTrello => ColumnTrello.user,{
    cascade:true
  })
    columns: ColumnTrello[];

}