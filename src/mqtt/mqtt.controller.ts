import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { VitalSignsService } from '../vital-signs/vital-signs.service'; // Importa el servicio
import { CreateVitalSignDto } from '../vital-signs/dto/create-vital-signs.dto'; // Importa el DTO

export interface Max30102Data {
  SpO2: string;
  BPM: string;
  temp: string;
}

@Controller('mqtt')
export class MqttController {
  private readonly logger = new Logger(MqttController.name);

  constructor(private readonly vitalSignsService: VitalSignsService) {} // Inyecta el servicio

  @MessagePattern('esp32LuisTinoco/#')
  async handleMessage(@Ctx() context: MqttContext, @Payload() data: Max30102Data) {
    this.logger.log(
      `📥 Mensaje recibido en: ${JSON.stringify(data)}, contexto del topico ${context.getTopic()}`,
    );

    // Aquí podrías obtener el patientId desde el tópico, el contexto, o el payload si lo tienes.
    // Supongamos que tu payload incluye patientId, si no, ajusta según tu lógica.
    const createVitalSignDto: CreateVitalSignDto = {
      patientId: 'ID_DEL_USUARIO_O_PACIENTE', // Debes obtenerlo desde el contexto, tópico, o datos recibidos
      timestamp: new Date().toISOString(),
      vitalSigns: {
        BPM: Number(data.BPM),
        temp: Number(data.temp),
        SpO2: Number(data.SpO2),
      },
    };

    await this.vitalSignsService.create(createVitalSignDto);
  }
}