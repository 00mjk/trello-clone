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
exports.CommentTrello = void 0;
const typeorm_1 = require("typeorm");
const card_entity_1 = require("../../card/entity/card.entity");
let CommentTrello = class CommentTrello {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], CommentTrello.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommentTrello.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommentTrello.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(() => card_entity_1.CardTrello, cardTrello => cardTrello.comments),
    __metadata("design:type", card_entity_1.CardTrello)
], CommentTrello.prototype, "card", void 0);
CommentTrello = __decorate([
    typeorm_1.Entity()
], CommentTrello);
exports.CommentTrello = CommentTrello;
//# sourceMappingURL=comment.entity.js.map