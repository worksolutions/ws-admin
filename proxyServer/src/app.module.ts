import { join } from 'path';

import 'moment/locale/ru';

import { ServeStaticModule } from '@nestjs/serve-static';

import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';

import { CoreModule } from 'modules/core.module';

import { AdminModule } from 'modules/admin/admin.module';

import { UsersModule } from 'modules/users/users.module';

import { ArticlesModule } from 'modules/articles/articles.module';

import { CategoriesModule } from 'modules/categories/categories.module';

import { FileStorageModule } from 'modules/fileStorage/fileStorage.module';

import { DefaultModule } from 'modules/default/default.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: join(process.cwd(), '../', '.env') }),
    CoreModule,
    UsersModule,
    AdminModule,
    ArticlesModule,
    CategoriesModule,
    FileStorageModule,
    DefaultModule,
    process.env.SERVE_STATIC_FILES === '1' &&
      ServeStaticModule.forRoot({
        rootPath: join(process.cwd(), '../', 'build'),
      }),
  ].filter(Boolean),
})
export class AppModule {}
