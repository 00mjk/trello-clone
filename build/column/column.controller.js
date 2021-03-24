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
const auth_guard_1 = require("../auth/auth.guard");
const user_decorator_1 = require("../shared/decorators/user.decorator");
const validation_pipe_1 = require("../shared/pipes/validation.pipe");
const column_service_1 = require("./column.service");
const create_column_dto_1 = require("./dto/create-column.dto");
let ColumnController = class ColumnController {
    constructor(columnService) {
        this.columnService = columnService;
    }
    getColumn(id, user) {
        return this.columnService.findOne(user.userId, id);
    }
    getColumns(user) {
        return this.columnService.findAll(user.userId);
    }
    createColumn(user, body) {
        return this.columnService.save(user.userId, body);
    }
    removeColumn(user, id) {
        return this.columnService.remove(user.userId, id);
    }
    updateColumn(user, id, body) {
        return this.columnService.update(user.userId, id, body);
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "getColumn", null);
__decorate([
    common_1.Get(),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "getColumns", null);
__decorate([
    common_1.Post(),
    __param(0, user_decorator_1.User()), __param(1, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_column_dto_1.CreateColumnDto]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "createColumn", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, user_decorator_1.User()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "removeColumn", null);
__decorate([
    common_1.Put(':id'),
    __param(0, user_decorator_1.User()), __param(1, common_1.Param('id')), __param(2, common_1.Body(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_column_dto_1.CreateColumnDto]),
    __metadata("design:returntype", void 0)
], ColumnController.prototype, "updateColumn", null);
ColumnController = __decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Controller('column'),
    __metadata("design:paramtypes", [column_service_1.ColumnService])
], ColumnController);
exports.ColumnController = ColumnController;
//# sourceMappingURL=column.controller.js.map