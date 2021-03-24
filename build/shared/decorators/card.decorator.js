"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const common_1 = require("@nestjs/common");
exports.Card = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.card;
});
//# sourceMappingURL=card.decorator.js.map