import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientMqtt } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class MqttService implements OnModuleInit {
  private readonly logger = new Logger(MqttService.name);

  constructor(
    @Inject('MQTT_SERVICE') private readonly mqttClient: ClientMqtt,
  ) {}

  async onModuleInit() {
    this.logger.log('Iniciando conexión con MQTT...');

    this.mqttClient.connect();

    this.mqttClient.emit('esp32LuisTinoco/max30102', {
      mensaje: 'Conectado al esp32',
    });
  }
}
