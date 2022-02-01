import { join } from "path";

import { NestFactory } from "@nestjs/core";

import { config } from "dotenv";
import { json, urlencoded } from "express";

declare const module: any;

config({ path: join(process.cwd(), "../", ".env") });

if (!process.env.NODE_PROXY_PORT) {
  throw new Error("Переменная окружения NODE_PROXY_PORT не установлена");
}

async function bootstrap() {
  const { AppModule } = await import("./app.module");
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(process.env.NODE_PROXY_PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
