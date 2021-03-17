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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const column_entity_1 = require("../column/entity/column.entity");
const get_profile_dto_1 = require("./dto/get-profile.dto");
const users_entity_1 = require("./entity/users.entity");
const card_entity_1 = require("../card/entity/card.entity");
const comment_entity_1 = require("../comment/entity/comment.entity");
let UsersService = class UsersService {
    constructor(usersRepository, columnRepository, cardRepository, commentRepository) {
        this.usersRepository = usersRepository;
        this.columnRepository = columnRepository;
        this.cardRepository = cardRepository;
        this.commentRepository = commentRepository;
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOne(email) {
        return this.usersRepository.findOne({ email });
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async save(email, pass, username) {
        await this.usersRepository.save({ email, pass, username });
    }
    async validateUser(userId, paramId) {
        if (userId !== paramId) {
            throw new common_1.UnauthorizedException("Unathorized");
        }
        const user = await this.usersRepository.findOne({ id: userId });
        return user;
    }
    async getUserInfo(userId, paramId) {
        const user = await this.validateUser(userId, paramId);
        return new get_profile_dto_1.GetProfileDto(user.username, user.email, user.id);
    }
    //columns 
    async createColumn(userId, paramId, createColumnDto) {
        const user = await this.validateUser(userId, paramId);
        await this.columnRepository.save({ user: user, name: createColumnDto.name });
    }
    async getColumns(userId, paramId) {
        const user = await this.validateUser(userId, paramId);
        const columns = await this.columnRepository.find({
            relations: ['user'],
            where: { user: { id: user.id } },
        });
        return columns;
    }
    async getOneColumn(userId, paramId, columnId) {
        const user = await this.validateUser(userId, paramId);
        const column = await this.columnRepository.findOne({
            where: { user: { id: user.id }, id: columnId, }
        });
        return column;
    }
    async updateColumn(userId, paramId, updateColumnDto) {
        const user = await this.validateUser(userId, paramId);
        let column = await this.getOneColumn(userId, paramId, updateColumnDto.id);
        column.name = updateColumnDto.name;
        await this.columnRepository.save(column);
    }
    async removeColumn(userId, paramId, columnId) {
        await this.validateUser(userId, paramId);
        let column = await this.getOneColumn(userId, paramId, columnId);
        await this.columnRepository.delete(column);
    }
    // Cards
    async getCards(userId, paramId, columnId) {
        const column = await this.getOneColumn(userId, paramId, columnId);
        return await this.cardRepository.find({
            relations: ['column'],
            where: { column: { id: column.id } },
        });
    }
    async getOneCard(userId, paramId, columnId, cardId) {
        const column = await this.getOneColumn(userId, paramId, columnId);
        const card = await this.cardRepository.findOne({
            where: { column: { id: column.id }, id: cardId, }
        });
        return card;
    }
    async createCards(userId, paramId, columnId, createCardDto) {
        const column = await this.getOneColumn(userId, paramId, columnId);
        await this.cardRepository.save({ column, name: createCardDto.name });
    }
    async updateCards(userId, paramId, columnId, updateCardDto) {
        const column = await this.getOneColumn(userId, paramId, columnId);
        let card = await this.getOneCard(userId, paramId, column.id, updateCardDto.id);
        card.name = updateCardDto.name;
        await this.cardRepository.save(card);
    }
    async deleteCard(userId, paramId, columnId, cardId) {
        const column = await this.getOneColumn(userId, paramId, columnId);
        let card = await this.getOneCard(userId, paramId, column.id, cardId);
        await this.cardRepository.delete(card);
    }
    // Cards
    async getAllComments(userId, paramId, columnId, cardId) {
        const card = await this.getOneCard(userId, paramId, columnId, cardId);
        const comments = await this.commentRepository.find({
            relations: ['card'],
            where: { card: { id: card.id } },
        });
        return comments;
    }
    async getComment(userId, paramId, columnId, cardId, commentId) {
        const card = await this.getOneCard(userId, paramId, columnId, cardId);
        const comment = await this.commentRepository.findOne({
            where: { card: { id: card.id }, id: commentId, }
        });
        return comment;
    }
    async createComment(userId, paramId, columnId, cardId, createCommentDto) {
        const card = await this.getOneCard(userId, paramId, columnId, cardId);
        await this.commentRepository.save({ card, name: createCommentDto.name, description: createCommentDto.description });
    }
    async updateComment(userId, paramId, columnId, cardId, updateCommentDto) {
        let comment = await this.getComment(userId, paramId, columnId, cardId, updateCommentDto.id);
        comment.description = updateCommentDto.description;
        comment.name = updateCommentDto.name;
        await this.commentRepository.save(comment);
    }
    async deleteComment(userId, paramId, columnId, cardId, commentId) {
        const comment = await this.getComment(userId, paramId, columnId, cardId, commentId);
        await this.cardRepository.delete(comment);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_entity_1.User)),
    __param(1, typeorm_1.InjectRepository(column_entity_1.ColumnTrello)),
    __param(2, typeorm_1.InjectRepository(card_entity_1.CardTrello)),
    __param(3, typeorm_1.InjectRepository(comment_entity_1.CommentTrello)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map