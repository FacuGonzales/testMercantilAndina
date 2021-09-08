import { ICentroideModel } from "./centroide-model";
import { IEntidadModel } from "./entidad-model";

export interface IProvinciasModel extends IEntidadModel{
    centroide: ICentroideModel,
}