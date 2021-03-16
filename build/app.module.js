"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const users_entity_1 = require("./users/users.entity");
const column_entity_1 = require("./entity/column.entity");
const comment_entity_1 = require("./entity/comment.entity");
const card_entity_1 = require("./entity/card.entity");
const config_1 = require("./config/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                ...config_1.connectionOptions, autoLoadEntities: true,
                entities: [
                    users_entity_1.User,
                    column_entity_1.ColumnTrello,
                    comment_entity_1.CommentTrello,
                    card_entity_1.CardTrello
                ]
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map