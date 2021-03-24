import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Column = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      console.log(request.column)
      return request.column;
    },
  );