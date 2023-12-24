import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const globalValidationPipe = new ValidationPipe({
  exceptionFactory: (errors) => {
    const message = {};
    errors.forEach(({ constraints, property }) => {
      message[property] = Object.keys(constraints).map(
        (key) => constraints[key],
      );
    });
    return new BadRequestException({
      error: 'Bad Request',
      message,
      statusCode: 400,
    });
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(globalValidationPipe);
  await app.listen(5000);
}
bootstrap();
