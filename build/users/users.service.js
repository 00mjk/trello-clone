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
const get_profile_dto_1 = require("./dto/get-profile.dto");
const users_entity_1 = require("./entity/users.entity");
const card_entity_1 = require("../card/entity/card.entity");
const comment_entity_1 = require("../comment/entity/comment.entity");
let UsersService = class UsersService {
    constructor(usersRepository, cardRepository, commentRepository) {
        this.usersRepository = usersRepository;
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
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_entity_1.User)),
    __param(1, typeorm_1.InjectRepository(card_entity_1.CardTrello)),
    __param(2, typeorm_1.InjectRepository(comment_entity_1.CommentTrello)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map