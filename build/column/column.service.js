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
exports.ColumnService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const column_entity_1 = require("./entity/column.entity");
let ColumnService = class ColumnService {
    constructor(columnRepository) {
        this.columnRepository = columnRepository;
    }
    async findOne(userId, columnId) {
        return await this.columnRepository.findOne({
            relations: ['user'],
            where: { user: { id: userId }, id: columnId }
        });
    }
    async findAll(userId) {
        return await this.columnRepository.find({
            relations: ['user'],
            where: { user: { id: userId } }
        });
    }
    async save(userId, createColumnDto) {
        await this.columnRepository.save({
            user: { id: userId },
            name: createColumnDto.name
        });
    }
    async remove(userId, columnId) {
        await this.columnRepository.delete({
            user: { id: userId },
            id: columnId
        });
    }
    async update(userId, columnId, updateColumnDto) {
        let column = await this.findOne(userId, columnId);
        column.name = updateColumnDto.name;
        await this.columnRepository.save({
            user: { id: userId },
            name: updateColumnDto.name
        });
    }
};
ColumnService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(column_entity_1.ColumnTrello)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ColumnService);
exports.ColumnService = ColumnService;
//# sourceMappingURL=column.service.js.map