import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NEST API')
    .setDescription('API documentation for the NEST application')
    .setVersion('1.0')
    .addTag('users')
    .addTag('profile')
    .addCookieAuth('access_token')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, documentFactory());
}
