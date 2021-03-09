"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./auth/auth.module");
var users_module_1 = require("./users/users.module");
var column_module_1 = require("./column/column.module");
var card_module_1 = require("./card/card.module");
var comment_module_1 = require("./comment/comment.module");
var connectionOptions = require("./config/config");
var users_entity_1 = require("./users/users.entity");
var column_entity_1 = require("./column/column.entity");
var comment_entity_1 = require("./comment/comment.entity");
var card_entity_1 = require("./card/card.entity");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forRoot(__assign(__assign({}, connectionOptions), { autoLoadEntities: true, entities: [
                        users_entity_1.User,
                        column_entity_1.ColumnTrello,
                        comment_entity_1.CommentTrello,
                        card_entity_1.CardTrello
                    ] })),
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                column_module_1.ColumnModule,
                card_module_1.CardModule,
                comment_module_1.CommentModule
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map