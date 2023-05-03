import { Diarista } from './diarista';
import { ICliente } from './cliente';
export interface Login {
  username: string,
  password: string,
  isDiarista: boolean,
  isCliente?: string,
  cadastrado?:boolean,
  cliente?: ICliente,
  diarista?: Diarista,
  id?: number,
  idUser?: number,
  token?: string;
}
