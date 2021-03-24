"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const comment_controller_1 = require("./comment.controller");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("./entity/comment.entity");
const card_module_1 = require("../card/card.module");
const column_module_1 = require("../column/column.module");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    common_1.Module({
        providers: [comment_service_1.CommentService],
        controllers: [comment_controller_1.CommentController],
        imports: [typeorm_1.TypeOrmModule.forFeature([comment_entity_1.CommentTrello]), card_module_1.CardModule, column_module_1.ColumnModule],
        exports: [comment_service_1.CommentService]
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map