import { ArticuloManufacturado } from "../types/ArticuloManufacturado";

const BASE_URL = 'http://localhost:8080';

export const ArticuloManufacturadoService = {

    getArticuloManufacturados: async () : Promise <ArticuloManufacturado[]>=> {
    
    const response = await fetch(`${BASE_URL}/api/v1/ArticuloManufacturado`);
    const data = await response.json();
    return data;
    
    },

    getArticuloManufacturado: async (id: number): Promise<ArticuloManufacturado> => {

        const response = await fetch(`${BASE_URL}/api/v1/ArticuloManufacturado/${id}`);
        const data = await response.json();
        return data;
    },

    creaateArticuloManufacturado: async (articuloManufacturado: ArticuloManufacturado): Promise<ArticuloManufacturado>=> {
        const response = await fetch( `${BASE_URL}/api/v1/ArticuloManufacturado`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articuloManufacturado)
        });

        const data = await response.json();
        return data;

    },

    updateArticuloManufacturado: async (id:number,articuloManufacturado:ArticuloManufacturado):Promise<ArticuloManufacturado>=>{
        const response = await fetch( `${BASE_URL}/api/v1/ArticuloManufacturado/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articuloManufacturado)
        });

        const data = await response.json();
        return data;

    },

    deleteArticuloManufacturado: async (id:number):Promise<void>=>{
        await fetch( `${BASE_URL}/api/v1/ArticuloManufacturado/${id}`,{
            method: "DELETE",
      
    });
    }    

}