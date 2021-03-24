"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const common_1 = require("@nestjs/common");
exports.Column = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.column);
    return request.column;
});
//# sourceMappingURL=column.decorator.js.map