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
var typeorm_1 = require("typeorm");
var ColumnTrello_1 = require("./ColumnTrello");
var Comment_1 = require("./Comment");
var CardTrello = /** @class */ (function () {
    function CardTrello() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], CardTrello.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CardTrello.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return ColumnTrello_1.ColumnTrello; }, function (columnTrello) { return columnTrello.cards; }),
        __metadata("design:type", ColumnTrello_1.ColumnTrello)
    ], CardTrello.prototype, "column", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Comment_1.CommentTrello; }, function (comment) { return comment.card; }),
        __metadata("design:type", Array)
    ], CardTrello.prototype, "comments", void 0);
    CardTrello = __decorate([
        typeorm_1.Entity()
    ], CardTrello);
    return CardTrello;
}());
exports.CardTrello = CardTrello;
//# sourceMappingURL=Card.js.map