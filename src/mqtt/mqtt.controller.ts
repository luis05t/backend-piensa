import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';

export interface Max30102Data {
  SpO2: string;
  BPM: string;
}

@Controller('mqtt')
export class MqttController {
  private readonly logger = new Logger(MqttController.name);

  @MessagePattern('esp32LuisTinoco/#')
  handleMessage(@Ctx() context: MqttContext, @Payload() data: Max30102Data) {
    this.logger.log(
      `📥 Mensaje recibido en: ${JSON.stringify(data)}, contexto del topico ${context.getTopic()}`,
    );
  }
}
