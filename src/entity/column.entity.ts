import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { CardTrello } from './card.entity';
import { User } from '../users/users.entity';

@Entity({name:"column"})
export class ColumnTrello {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.columns)
    user: User;

    @OneToMany(()=> CardTrello, card => card.column)
    cards: CardTrello[]
}