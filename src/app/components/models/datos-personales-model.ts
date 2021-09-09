import { IEntidadModel } from "./entidad-model";
import { IProvinciasModel } from "./pronvincias-model";

export interface IDatosPersonalesModel {
    apellido: string,
    nombre: string,
    dni: number,
    email: string,
    celular: number,
    telefono: number,
    domicilio: string,
    provincia: IProvinciasModel,
    Ciudad: IEntidadModel,
    fechaNacimiento: Date,
    usuario: string
}