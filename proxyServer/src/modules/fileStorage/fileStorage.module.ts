import { Module } from "@nestjs/common";

import { FileStorageController } from "./fileStorage.controller";

@Module({
  controllers: [FileStorageController],
})
export class FileStorageModule {}
