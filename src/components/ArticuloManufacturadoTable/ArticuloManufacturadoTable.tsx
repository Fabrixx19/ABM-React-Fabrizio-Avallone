import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
import ArticuloManufacturadoModal from "../ArticuloManufacturadoModal/ArticuloManufacturadoModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton.tsx/DeleteButton";

const ArticuloManufacturadoTable =()=>{

    //VARIABLE QUE CONTIENE DATOS RECIBIDOS POR LA API
    const[articulosManufacturados, setArticulosManufacturados] =useState<ArticuloManufacturado[]>([]);

    //VARIABLE QUE MUESTRA EL LOADER HASTA QUE SE RECIBAN DATOS DE LA API
    const [isLoading, setIsLoading] = useState(true);

    //ACTUALIZA LA TABLA DESPUES DE CADA OPERACION EXITOSA
    const [refreshData, setRefreshData] = useState(false);

    //HOOK QUE SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE O REFRESH DATA CAMBIE DE ESTADO
    useEffect(()=>{
        //LLAMAMOS A LA FUNCION PARA OBTENER LOS PRODUCTOS DECLARADOS POR EL PRODUCT SERVICE
        const fetchArticulosManufacturados = async()=>{
            const articulosManufacturados = await ArticuloManufacturadoService.getArticuloManufacturados(); 
            setArticulosManufacturados(articulosManufacturados);
            setIsLoading(false);
        };

        fetchArticulosManufacturados(); 
    },[refreshData]);

    //TEST, LOG MODIFICADO PARA QUE MUESTRE LOS DATOS MAS LEGIBLE
    console.log(JSON.stringify(articulosManufacturados,null,2));
    //STRINGIFY ES CONVERTIR OBJETO JAVASCRIPT EN CADENA JSON

    //CONST PARA INICIALIZAR UN PRODUCTO POR DEFECTO Y EVITAR EL "undefined"

        const initializableNewArticulosManufacturado = (): ArticuloManufacturado=>{
            return {
                id:0,
                denominacion:"",
                descripcion: "",
                tiempoEstimadoCocina: 0,
                precioVenta: 0,
                urlImagen: "",
                
            };
        };


        //PRODUCTO SELECCIONADO QUE SE VA A PASAR COMO PROP AL MODAL
        const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>(initializableNewArticulosManufacturado);

        //CONST PAR MANEJAR ESTADO DEL MODAL
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title,setTitle]=useState("");

        //LOGICA DEL MODAL
        const handleClick = (newTitle:string, articuloM:ArticuloManufacturado,modal: ModalType)=>{
            setTitle(newTitle);
            setModalType(modal);
            setArticuloManufacturado(articuloM);
            setShowModal(true);
        };

    return (
        <>
        <Button onClick={()=> handleClick("Nuevo Articulo Manufacturado", initializableNewArticulosManufacturado(),
        ModalType.CREATE)}> Nuevo Articulo Manufacturado </Button>
            {isLoading ? <Loader/> :(
                <Table hover>
                    <thead>
                        <tr>
                        <th>Denominacion</th>
                        <th>Descripcion</th>
                        <th>TiempoEstimadoCocina</th>
                        <th>PrecioVenta</th>
                        <th>Imagen</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articulosManufacturados.map( articuloManufacturado => (
                             <tr key={articuloManufacturado.id}>
                                <td>{articuloManufacturado.denominacion}</td>
                                <td>{articuloManufacturado.descripcion}</td>
                                <td>{articuloManufacturado.tiempoEstimadoCocina}</td>
                                  <td>{articuloManufacturado.precioVenta}</td>
                                <td><img src={articuloManufacturado.urlImagen} alt="articulosManufacturados.denominacion" style={{width:'50px'}}/></td>
                                <td><EditButton onClick={()=> handleClick("Editar Articulo", articuloManufacturado, ModalType.UPDATE)}/></td>
                                <td><DeleteButton onClick={()=> handleClick("Borrar Articulo", articuloManufacturado, ModalType.DELETE)}/></td>
                            </tr>
                        )

                        )

                        }
                    </tbody>
                </Table>
            )}

            {showModal && (
                <ArticuloManufacturadoModal
                show={showModal}
                onHide={()=>setShowModal(false)}
                title={title}
                modalType={modalType}
                articuloM={articuloManufacturado}
                refreshData={setRefreshData}
                />
            )

            }
        </>
    )
}


export default ArticuloManufacturadoTable