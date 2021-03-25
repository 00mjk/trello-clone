import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { CardTrello } from '../../card/entity/card.entity';
import { User } from '../../users/entity/users.entity';


@Entity({name:"column"})
export class ColumnTrello {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    // REVU: Еще добавь мануальную колонку userId.
    // Не понадобится каждый раз доставать реляции для всяких проверок
    // Добавляй ко всем реляциям Много-к-Одному, колонку содержащую id владельца
    @ManyToOne(() => User, user => user.columns)
    user: User;

    @OneToMany(()=> CardTrello, card => card.column, {
        cascade: true,
    })
    cards: CardTrello[]
}