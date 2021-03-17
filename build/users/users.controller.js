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
const auth_guard_1 = require("../auth/auth.guard");
const create_column_dto_1 = require("../column/dto/create-column.dto");
const update_column_dto_1 = require("../column/dto/update-column.dto");
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
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Post(":id/column"),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_column_dto_1.CreateColumnDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createColumn", null);
__decorate([
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    common_1.Put(":id/column/:column_id/edit"),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
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
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map