import { Diarista } from './diarista';
import { ICliente } from './cliente';
export interface Login {
  username: string,
  password: string,
  isDiarista: boolean,
  cliente?: ICliente,
  diarista?: Diarista,
  id?: number
}
