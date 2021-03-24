"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardTrello = void 0;
const typeorm_1 = require("typeorm");
const column_entity_1 = require("../../column/entity/column.entity");
const comment_entity_1 = require("../../comment/entity/comment.entity");
let CardTrello = class CardTrello {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], CardTrello.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CardTrello.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(() => column_entity_1.ColumnTrello, columnTrello => columnTrello.cards),
    __metadata("design:type", column_entity_1.ColumnTrello)
], CardTrello.prototype, "column", void 0);
__decorate([
    typeorm_1.OneToMany(() => comment_entity_1.CommentTrello, comment => comment.card, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], CardTrello.prototype, "comments", void 0);
CardTrello = __decorate([
    typeorm_1.Entity()
], CardTrello);
exports.CardTrello = CardTrello;
//# sourceMappingURL=card.entity.js.map