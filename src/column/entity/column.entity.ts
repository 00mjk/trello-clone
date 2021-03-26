import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CardTrello } from '../../card/entity/card.entity';
import { User } from '../../users/entity/users.entity';

@Entity({ name: 'column' })
export class ColumnTrello {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.columns)
  user: User;

  @OneToMany(() => CardTrello, (card) => card.column, {
    cascade: true,
  })
  cards: CardTrello[];
}
