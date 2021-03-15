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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const users_service_1 = require("../../users/users.service");
const auth_service_1 = require("../auth.service");
const sign_in_dto_1 = require("../dto/sign-in.dto");
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(userService, authService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
        this.userService = userService;
        this.authService = authService;
    }
    async validate(email, password) {
        try {
            const signInDto = new sign_in_dto_1.SignInDto();
            signInDto.email = email;
            signInDto.password = password;
            const user = await this.userService.findOne(email);
            if (user && !this.authService.validatePassword(signInDto.password, user.pass)) {
                throw new Error('Invalid password');
            }
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map