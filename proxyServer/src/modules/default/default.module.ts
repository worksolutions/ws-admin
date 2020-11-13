import { Module } from '@nestjs/common';

import { DefaultController } from 'modules/default/default.controller';

@Module({
  controllers: [DefaultController],
})
export class DefaultModule {}
