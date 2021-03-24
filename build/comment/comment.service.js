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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entity/comment.entity");
let CommentService = class CommentService {
    constructor(comentRepository) {
        this.comentRepository = comentRepository;
    }
    async save(cardId, createCommentDto) {
        await this.comentRepository.save({
            card: { id: cardId },
            name: createCommentDto.name,
            description: createCommentDto.description
        });
    }
    async findAll(cardId) {
        return await this.comentRepository.find({
            where: {
                card: {
                    id: cardId
                }
            }
        });
    }
    async findOne(cardId, commentId) {
        return await this.comentRepository.findOne({
            where: {
                card: { id: cardId },
                id: commentId
            }
        });
    }
    async update(cardId, commentId, createCommentDto) {
        let comment = await this.findOne(cardId, commentId);
        comment.name = createCommentDto.name;
        comment.description = createCommentDto.description;
        await this.comentRepository.save(comment);
    }
    async remove(cardId, commentId) {
        await this.comentRepository.delete({
            card: { id: cardId },
            id: commentId
        });
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(comment_entity_1.CommentTrello)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map