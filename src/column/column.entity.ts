import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { CardTrello } from '../card/card.entity';
import { User } from '../users/users.entity';

@Entity()
export class ColumnTrello {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.columns)
    user: User;

    @OneToMany(()=> CardTrello, card => card.column)
    cards: CardTrello[]
}