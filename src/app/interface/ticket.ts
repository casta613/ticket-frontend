export interface Ticket{
    ID:number,
    IDEncargado:number,
    IDCreador:number,
    IDPlantilla:number,
    Descripcion:string,
    Encargado?:string,
    Creador?:string,
    Titulo?:string,
    IDPrioridad:number,
    IDEstado:number
    Prioridad?:number,
    Estado?:string

}