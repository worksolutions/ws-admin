import { ServeStaticModule } from '@nestjs/serve-static';

import { Module } from '@nestjs/common';

import { join } from 'path';

import { CoreModule } from 'modules/core.module';

import { AdminModule } from 'modules/admin/admin.module';

import { UsersModule } from 'modules/users/users.module';

import { ArticlesModule } from 'modules/articles/articles.module';

import { CategoriesModule } from 'modules/categories/categories.module';

import { FileStorageModule } from 'modules/fileStorage/fileStorage.module';

import { DefaultModule } from 'modules/default/default.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AdminModule,
    ArticlesModule,
    CategoriesModule,
    FileStorageModule,
    DefaultModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'build'),
    }),
  ],
})
export class AppModule {}
