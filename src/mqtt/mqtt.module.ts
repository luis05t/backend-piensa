import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VitalSignsModule } from '../vital-signs/vital-signs.module'; // Importa el módulo de signos vitales

@Module({
  imports: [
    VitalSignsModule, // Importa el módulo de signos vitales
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'ws://test.mosquitto.org:8080',
          reconnectPeriod: 1000,
        },
      },
    ]),
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}
