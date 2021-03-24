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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentOwnerGuard = void 0;
const common_1 = require("@nestjs/common");
const card_service_1 = require("../../card/card.service");
const column_service_1 = require("../../column/column.service");
let CommentOwnerGuard = class CommentOwnerGuard {
    constructor(columnService, cardService) {
        this.columnService = columnService;
        this.cardService = cardService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { columnId, cardId } = request.body;
        const { userId } = request.user;
        const column = await this.columnService.findOne(userId, columnId);
        if (!column) {
            return false;
        }
        const card = await this.cardService.findOne(columnId, cardId);
        if (!card) {
            return false;
        }
        request.column = column;
        request.card = card;
        return true;
    }
};
CommentOwnerGuard = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ColumnService')),
    __param(1, common_1.Inject('CardService')),
    __metadata("design:paramtypes", [column_service_1.ColumnService,
        card_service_1.CardService])
], CommentOwnerGuard);
exports.CommentOwnerGuard = CommentOwnerGuard;
//# sourceMappingURL=comment-owner.guard.js.map