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
exports.ColumnTrello = void 0;
const typeorm_1 = require("typeorm");
const card_entity_1 = require("../../card/entity/card.entity");
const users_entity_1 = require("../../users/entity/users.entity");
let ColumnTrello = class ColumnTrello {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ColumnTrello.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ColumnTrello.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(() => users_entity_1.User, user => user.columns),
    __metadata("design:type", users_entity_1.User)
], ColumnTrello.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => card_entity_1.CardTrello, card => card.column),
    __metadata("design:type", Array)
], ColumnTrello.prototype, "cards", void 0);
ColumnTrello = __decorate([
    typeorm_1.Entity({ name: "column" })
], ColumnTrello);
exports.ColumnTrello = ColumnTrello;
//# sourceMappingURL=column.entity.js.map