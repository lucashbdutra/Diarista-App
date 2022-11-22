import { ICliente } from "./cliente";
import { Diarista } from "./diarista";

export interface Agendamento {
  id: number,
  criacao: string,
  dataRealizada: string,
  dataAgendada: string,
  dataAgendadaStr: string,
  cliente: ICliente,
  diarista: Diarista,
  estrelas: number,
  comentario: string,
}
