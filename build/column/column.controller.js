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
exports.ColumnController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const validation_pipe_1 = require("../shared/pipes/validation.pipe");
const column_service_1 = require("./column.service");
const create_column_dto_1 = require("./dto/create-column.dto");
const update_column_dto_1 = require("./dto/update-column.dto");
let ColumnController = class ColumnController {
    constructor(columnService) {
        this.columnService = columnService;
    }
    getUserAllColumns(req) {
        return this.columnService.getColumns(req.user.userId, req.params.id);
    }
    getUserColumn(req) {
        return this.columnService.getOneColumn(req.user.userId, req.params.id, req.params.column_id);
    }
    createColumn(req, body) {
        return this.columnService.createColumn(req.user.userId, req.params.id);
    }
    updateColumn(req, body) {
        return this.columnService.updateColumn(req.user.userId, req.params.id, body);
    }
    removeColumn(req) {
        return this.columnService.removeColumn(req.user.userId, req.params.id, req.params.column_id);
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get(":id/column"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "getUserAllColumns", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Get(":id/column/:column_id"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "getUserColumn", null);
__decorate([
    swagger_1.ApiBody({ type: [create_column_dto_1.CreateColumnDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Post(":id/column"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_column_dto_1.CreateColumnDto]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "createColumn", null);
__decorate([
    swagger_1.ApiBody({ type: [update_column_dto_1.UpdateColumnDto] }),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Put(":id/column/:column_id/edit"),
    __param(0, common_1.Request()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_column_dto_1.UpdateColumnDto]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "updateColumn", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Delete(":id/column/:column_id/remove"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "removeColumn", null);
ColumnController = __decorate([
    common_1.Controller('column'),
    __metadata("design:paramtypes", [column_service_1.ColumnService])
], ColumnController);
exports.ColumnController = ColumnController;
//# sourceMappingURL=column.controller.js.map