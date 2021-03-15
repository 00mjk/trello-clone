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
const config_1 = require("../config/config");
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
        const isValidate = await this.validateUser(signInDto.email, signInDto.password);
        const payload = { username: isValidate.username, sub: isValidate.id };
        const token = this.jwtService.sign(payload);
        return { isValidate, access_token: token };
    }
    async signUp(signUpDto) {
        const isValidate = await this.validateUser(signUpDto.email, signUpDto.password);
        if (isValidate === null && signUpDto.password === signUpDto.passwordConfirmation) {
            const hashPass = await bcrypt.hash(signUpDto.password, config_1.encryptOptions.soil);
            console.log(hashPass);
            const payload = { username: signUpDto.username, sub: signUpDto.email };
            await this.usersService.save(signUpDto.email, hashPass, signUpDto.username);
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map