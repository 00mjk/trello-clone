import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColumnTrello } from "../column/column.entity";
import { CommentTrello } from "../comment/comment.entity";

@Entity()
export class CardTrello {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => ColumnTrello, columnTrello => columnTrello.cards)
    column: ColumnTrello;

    @OneToMany(()=> CommentTrello,comment => comment.card)
    comments: CommentTrello[]
}