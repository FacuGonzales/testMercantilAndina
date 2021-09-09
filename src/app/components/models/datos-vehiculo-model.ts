import { IMarcaModel } from "./marca-model";

export interface IDatosVehiculoModel {
    marca: IMarcaModel,
    anio: number,
    modelo: string,
    version: IMarcaModel,
}