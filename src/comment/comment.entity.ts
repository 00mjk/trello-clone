import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CardTrello } from "../card/card.entity";

@Entity()
export class CommentTrello {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    description: string
    
    @Column()
    name: string;

    @ManyToOne(() => CardTrello, cardTrello => cardTrello.comments)
    card: CardTrello;
}