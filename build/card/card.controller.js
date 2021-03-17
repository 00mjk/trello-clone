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
const auth_guard_1 = require("../auth/auth.guard");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const card_entity_1 = require("./entity/card.entity");
const update_card_dto_1 = require("./dto/update-card.dto");
const create_card_dto_1 = require("./dto/create-card.dto");
const validation_pipe_1 = require("@nestjs/common/pipes/validation.pipe");
let CardController = class CardController {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    getAllCards(req) {
        return this.cardRepository.getCards(req.user.userId, req.params.id, req.params.column_id);
    }
    getCard(req) {
        return this.cardRepository.getOneCard(req.user.userId, req.params.id, req.params.column_id, req.params.card_id);
    }
    createCard(req, body) {
        return this.cardRepository.createCards(req.user.userId, req.params.id, req.params.column_id, body);
    }
    updateCard(req, body) {
        return this.cardRepository.updateCards(req.user.userId, req.params.id, req.params.column_id, body);
    }
    deleteCard(req) {
        return this.cardRepository.deleteCard(req.user.userId, req.params.id, req.params.column_id, req.params.card_id);
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get("/"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "getAllCards", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get("/:card_id"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "getCard", null);
__decorate([
    swagger_1.ApiBody({ type: [create_card_dto_1.CreateCardDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Post("/"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_card_dto_1.CreateCardDto]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "createCard", null);
__decorate([
    swagger_1.ApiBody({ type: [update_card_dto_1.UpdateCardDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Put("/:card_id/edit"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_card_dto_1.UpdateCardDto]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "updateCard", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Delete(":id/column/:column_id/cards/:card_id/remove"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CardController.prototype, "deleteCard", null);
CardController = __decorate([
    common_1.Controller('/'),
    __param(0, typeorm_1.InjectRepository(card_entity_1.CardTrello)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CardController);
exports.CardController = CardController;
//# sourceMappingURL=card.controller.js.map