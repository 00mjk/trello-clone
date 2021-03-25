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
exports.CardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const column_decorator_1 = require("../shared/decorators/column.decorator");
const user_decorator_1 = require("../shared/decorators/user.decorator");
const auth_guard_1 = require("../shared/guards/auth.guard");
const card_owner_guard_1 = require("../shared/guards/card-owner.guard");
const card_service_1 = require("./card.service");
const create_card_dto_1 = require("./dto/create-card.dto");
let CardController = class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    getCards(user, column) {
        return this.cardService.findAll(column.id);
    }
    createCard(column, body) {
        this.cardService.save(column.id, body);
    }
    updateCard(column, id, body) {
        this.cardService.update(column.id, id, body);
    }
    removeCard(column, id) {
        this.cardService.remove(column.id, id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, user_decorator_1.User()), __param(1, column_decorator_1.Column()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "getCards", null);
__decorate([
    common_1.Post(),
    __param(0, column_decorator_1.Column()), __param(1, common_1.Body(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_card_dto_1.CreateCardDto]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "createCard", null);
__decorate([
    common_1.Put(':id'),
    __param(0, column_decorator_1.Column()), __param(1, common_1.Param('id')), __param(2, common_1.Body(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_card_dto_1.CreateCardDto]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "updateCard", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, column_decorator_1.Column()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "removeCard", null);
CardController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('card'),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard, card_owner_guard_1.CardOwnerGuard),
    common_1.Controller('card'),
    __metadata("design:paramtypes", [card_service_1.CardService])
], CardController);
exports.CardController = CardController;
//# sourceMappingURL=card.controller.js.map