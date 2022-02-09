import { Module } from "@nestjs/common";

import { TypesController } from "./types.controller";

@Module({
  controllers: [TypesController],
})
export class TypesModule {}
