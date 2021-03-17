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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const create_card_dto_1 = require("../card/dto/create-card.dto");
const update_card_dto_1 = require("../card/dto/update-card.dto");
const create_column_dto_1 = require("../column/dto/create-column.dto");
const update_column_dto_1 = require("../column/dto/update-column.dto");
const create_comment_dto_1 = require("../comment/dto/create-comment.dto");
const update_comment_dto_1 = require("../comment/dto/update-comment.dto");
const validation_pipe_1 = require("../shared/pipes/validation.pipe");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    getUser(req) {
        return this.userService.getUserInfo(req.user.userId, req.params.id);
    }
    getUserAllColumns(req) {
        return this.userService.getColumns(req.user.userId, req.params.id);
    }
    getUserColumn(req) {
        return this.userService.getOneColumn(req.user.userId, req.params.id, req.params.column_id);
    }
    createColumn(req, body) {
        return this.userService.createColumn(req.user.userId, req.params.id, body);
    }
    updateColumn(req, body) {
        return this.userService.updateColumn(req.user.userId, req.params.id, body);
    }
    removeColumn(req) {
        return this.userService.removeColumn(req.user.userId, req.params.id, req.params.column_id);
    }
    getAllCards(req) {
        return this.userService.getCards(req.user.userId, req.params.id, req.params.column_id);
    }
    getCard(req) {
        return this.userService.getOneCard(req.user.userId, req.params.id, req.params.column_id, req.params.card_id);
    }
    createCard(req, body) {
        return this.userService.createCards(req.user.userId, req.params.id, req.params.column_id, body);
    }
    updateCard(req, body) {
        return this.userService.updateCards(req.user.userId, req.params.id, req.params.column_id, body);
    }
    deleteCard(req) {
        return this.userService.deleteCard(req.user.userId, req.params.id, req.params.column_id, req.params.card_id);
    }
    //Comments
    getComments(req) {
        return this.userService.getAllComments(req.user.userId, req.params.id, req.params.column_id, req.params.card_id);
    }
    getComment(req) {
        return this.userService.getComment(req.user.userId, req.params.id, req.params.column_id, req.params.card_id, req.params.comment_id);
    }
    createComment(req, body) {
        return this.userService.createComment(req.user.userId, req.params.id, req.params.column_id, req.params.card_id, body);
    }
    updateComment(req, body) {
        return this.userService.updateComment(req.user.userId, req.params.id, req.params.column_id, req.params.card_id, body);
    }
    removeComment(req) {
        return this.userService.deleteComment(req.user.userId, req.params.id, req.params.column_id, req.params.card_id, req.params.comment_id);
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get(":id"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get(":id/column"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserAllColumns", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get(":id/column/:column_id"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserColumn", null);
__decorate([
    swagger_1.ApiBody({ type: [create_column_dto_1.CreateColumnDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Post(":id/column"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_column_dto_1.CreateColumnDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createColumn", null);
__decorate([
    swagger_1.ApiBody({ type: [update_column_dto_1.UpdateColumnDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Put(":id/column/:column_id/edit"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_column_dto_1.UpdateColumnDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateColumn", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Delete(":id/column/:column_id/remove"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeColumn", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get(":id/column/:column_id/cards"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllCards", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get(":id/column/:column_id/cards/:card_id"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCard", null);
__decorate([
    swagger_1.ApiBody({ type: [create_card_dto_1.CreateCardDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Post(":id/column/:column_id/cards"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_card_dto_1.CreateCardDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createCard", null);
__decorate([
    swagger_1.ApiBody({ type: [update_card_dto_1.UpdateCardDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Put(":id/column/:column_id/cards/:card_id/edit"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_card_dto_1.UpdateCardDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateCard", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Delete(":id/column/:column_id/cards/:card_id/remove"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteCard", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get(":id/column/:column_id/cards/:card_id/comments"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getComments", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get(":id/column/:column_id/cards/:card_id/comments/:comment_id"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getComment", null);
__decorate([
    swagger_1.ApiBody({ type: [create_comment_dto_1.CreateCommentDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Post(":id/column/:column_id/cards/:card_id/comments"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createComment", null);
__decorate([
    swagger_1.ApiBody({ type: [update_comment_dto_1.UpdateCommentDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Put(":id/column/:column_id/cards/:card_id/comments/:comment_id/edit"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateComment", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Delete(":id/column/:column_id/cards/:card_id/comments/:comment_id/remove"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeComment", null);
UsersController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('user'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map