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
var typeorm_1 = require("typeorm");
var Card_1 = require("./Card");
var User_1 = require("./User");
var ColumnTrello = /** @class */ (function () {
    function ColumnTrello() {
    }
    var _a;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ColumnTrello.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], ColumnTrello.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.columns; }),
        __metadata("design:type", typeof (_a = typeof User_1.User !== "undefined" && User_1.User) === "function" ? _a : Object)
    ], ColumnTrello.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Card_1.CardTrello; }, function (card) { return card.column; }),
        __metadata("design:type", Array)
    ], ColumnTrello.prototype, "cards", void 0);
    ColumnTrello = __decorate([
        typeorm_1.Entity()
    ], ColumnTrello);
    return ColumnTrello;
}());
exports.ColumnTrello = ColumnTrello;
//# sourceMappingURL=ColumnTrello.js.map