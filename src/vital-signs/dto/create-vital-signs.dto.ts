export class CreateVitalSignDto {
  patientId: string;
  patientName?: string;
  timestamp: string;
  vitalSigns: {
    BPM?: number;
    temp?: number;
    SpO2?: number;
  };
}
