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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (user && this.validatePassword(pass, user.pass)) {
            return user;
        }
        return null;
    }
    validatePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
    async signIn(signInDto) {
        const user = await this.validateUser(signInDto.email, signInDto.password);
        if (!user) {
            throw new common_1.BadRequestException('passwords do not match');
        }
        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload);
        return { user_info: { ...user }, access_token: token };
    }
    async signUp(signUpDto) {
        const user = await this.usersService.findOne(signUpDto.email);
        if (!user) {
            if (signUpDto.password === signUpDto.passwordConfirmation) {
                const hashPass = await bcrypt.hash(signUpDto.password, constants_1.CRYPTO_SOIL);
                console.log(hashPass);
                const payload = { username: signUpDto.username, sub: signUpDto.email };
                await this.usersService.save(signUpDto.email, hashPass, signUpDto.username);
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
            throw new common_1.BadRequestException('passwords do not match');
        }
        throw new common_1.BadRequestException('User with email already exsist');
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map