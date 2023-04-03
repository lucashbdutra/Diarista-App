import { Diarista } from './diarista';
import { ICliente } from './cliente';
export interface Login {
  username: string,
  password: string,
  isDiarista: boolean,
  isCliente?: string,
  cliente?: ICliente,
  diarista?: Diarista,
  id?: number,
  token?: string;
}
