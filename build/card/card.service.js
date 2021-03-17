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
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const card_entity_1 = require("./entity/card.entity");
let CardService = class CardService {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    async getCards(userId, paramId, columnId) {
        return await this.cardRepository.find({
            relations: ['column'],
            where: { column: { id: column.id } },
        });
    }
    async getOneCard(userId, paramId, columnId, cardId) {
        const card = await this.cardRepository.findOne({
            where: { column: { id: column.id }, id: cardId, }
        });
        return card;
    }
    async createCards(userId, paramId, columnId, createCardDto) {
        await this.cardRepository.save({ column, name: createCardDto.name });
    }
    async updateCards(userId, paramId, columnId, updateCardDto) {
        let card = await this.getOneCard(userId, paramId, column.id, updateCardDto.id);
        card.name = updateCardDto.name;
        await this.cardRepository.save(card);
    }
    async deleteCard(userId, paramId, columnId, cardId) {
        let card = await this.getOneCard(userId, paramId, column.id, cardId);
        await this.cardRepository.delete(card);
    }
};
CardService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(card_entity_1.CardTrello)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CardService);
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map