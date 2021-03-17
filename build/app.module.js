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
const users_entity_1 = require("./users/entity/users.entity");
const card_entity_1 = require("./card/entity/card.entity");
const config_1 = require("./config/config");
const column_module_1 = require("./column/column.module");
const card_module_1 = require("./card/card.module");
const comment_module_1 = require("./comment/comment.module");
const column_entity_1 = require("./column/entity/column.entity");
const comment_entity_1 = require("./comment/entity/comment.entity");
const nest_router_1 = require("nest-router");
const routes = [
    {
        path: '/user',
        module: users_module_1.UsersModule,
        children: [
            {
                path: '/column',
                module: column_module_1.ColumnModule,
                children: [{
                        path: '/cards',
                        module: card_module_1.CardModule,
                        children: [
                            {
                                path: "/comments",
                                module: comment_module_1.CommentModule,
                            }
                        ]
                    }
                ]
            }
        ],
    },
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nest_router_1.RouterModule.forRoutes(routes),
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
            column_module_1.ColumnModule,
            card_module_1.CardModule,
            comment_module_1.CommentModule,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map