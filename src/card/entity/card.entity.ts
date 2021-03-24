import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColumnTrello } from "../../column/entity/column.entity";
import { CommentTrello } from "../../comment/entity/comment.entity";


@Entity()
export class CardTrello {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => ColumnTrello, columnTrello => columnTrello.cards)
    column: ColumnTrello;

    @OneToMany(()=> CommentTrello,comment => comment.card, {
        cascade: true,
    })
    comments: CommentTrello[]
}