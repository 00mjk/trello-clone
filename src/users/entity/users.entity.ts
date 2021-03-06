import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { ColumnTrello } from '../../column/entity/column.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => ColumnTrello, (ColumnTrello) => ColumnTrello.user, {
    cascade: true,
  })
  columns: ColumnTrello[];
}
