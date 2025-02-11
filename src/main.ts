import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJS MQTT Backend')
    .setDescription('API de NestJS con MQTT y Swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const mqttMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.MQTT,
      options: {
        url: 'ws://test.mosquitto.org:8080',
        reconnectPeriod: 1000,
      },
    });

  await app.listen(process.env.PORT ?? 3000);
  await mqttMicroservice.listen();
  console.log(`HTTP API corriendo en el puerto ${process.env.PORT ?? 3000}`);
  console.log('Microservicio MQTT iniciado correctamente');
}

bootstrap();
