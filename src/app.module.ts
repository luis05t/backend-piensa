import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { DevicesModule } from './devices/devices.module';
import { SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { MqttModule } from './mqtt/mqtt.module';
import { VitalSignsModule } from './vital-signs/vital-signs.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    DevicesModule,
    SwaggerModule,
    AuthModule,
    MqttModule,
    VitalSignsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
