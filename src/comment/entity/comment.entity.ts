import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CardTrello } from "../../card/entity/card.entity";


@Entity()
export class CommentTrello {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string
    
    @Column()
    name: string;

    @ManyToOne(() => CardTrello, cardTrello => cardTrello.comments)
    card: CardTrello;
}