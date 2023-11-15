/*
{
    "denominacion": "Pizza",
    "descripcion": "Pizza simple con muzzarella",
    "tiempoEstimadoCocina": 25,
    "precioVenta": 14500,
    "costo": 4000,
    "urlImagen": "http//pizzas.com",
    "fechaAlta": "2023-09-13T03:00:00.000+00:00",
    "fechaModificacion": "2023-03-21T03:00:00.000+00:00",
    "fechaBaja": "2023-05-19T03:00:00.000+00:00",
    "detalleArticulosManufacturados": [
        {
            "cantidad": 2
        },
        {
            "cantidad": 7
        }
    ]
}*/

export interface ArticuloManufacturado{
    denominacion: string;
    descripcion:string;
    tiempoEstimadoCocina: number;
    precioVenta: number;
    urlImagen:string;
    id:number;
}