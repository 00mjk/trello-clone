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
exports.CardOwnerGuard = void 0;
const common_1 = require("@nestjs/common");
let CardOwnerGuard = class CardOwnerGuard {
    constructor(columnService) {
        this.columnService = columnService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const column = await this.columnService.findOne(request.user.userId, request.body.columnId);
        console.log(column);
        if (column) {
            request.column = column;
            return true;
        }
        return false;
    }
};
CardOwnerGuard = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ColumnService')),
    __metadata("design:paramtypes", [Object])
], CardOwnerGuard);
exports.CardOwnerGuard = CardOwnerGuard;
//# sourceMappingURL=card-owner.guard.js.map