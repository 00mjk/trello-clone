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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const card_decorator_1 = require("../shared/decorators/card.decorator");
const auth_guard_1 = require("../shared/guards/auth.guard");
const comment_owner_guard_1 = require("../shared/guards/comment-owner.guard");
const validation_pipe_1 = require("../shared/pipes/validation.pipe");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    getComments(card) {
        return this.commentService.findAll(card.id);
    }
    createComment(card, body) {
        // console.log(card)
        this.commentService.save(card.id, body);
    }
    updateComment(card, body, id) {
        this.commentService.update(card.id, id, body);
    }
    removeComment(card, id) {
        this.commentService.remove(card.id, id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, card_decorator_1.Card()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getComments", null);
__decorate([
    common_1.Post(),
    __param(0, card_decorator_1.Card()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "createComment", null);
__decorate([
    common_1.Put(':id'),
    __param(0, card_decorator_1.Card()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comment_dto_1.CreateCommentDto, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "updateComment", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, card_decorator_1.Card()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "removeComment", null);
CommentController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('comment'),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard, comment_owner_guard_1.CommentOwnerGuard),
    common_1.Controller('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map