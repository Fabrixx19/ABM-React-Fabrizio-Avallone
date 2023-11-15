import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";
import Loader from "../Loader/Loader";
import { Table } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { string } from "yup";
import {Button} from "react-bootstrap";
import ArticuloManufacturadoModal from "../ArticuloManufacturadoModal/ArticuloManufacturadoModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";




const ArticulosManufacturadosTable = () =>{
    const [articulosManufacturados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va a actualizar los datos de la tabla luego de cada modificacion/nuevo articualo
    const [refreshData, setRefreshData] = useState (false);

    useEffect(() => {
        const fetchArticulosManufacturados = async () => {
            const articulosManufacturados = await ArticuloManufacturadoService.getArticulosManufacturados();
            setArticulosManufacturados(articulosManufacturados);
            setIsLoading(false);
        };
        fetchArticulosManufacturados();
    }, [refreshData]);

    console.log(JSON.stringify(articulosManufacturados, null, 2));

    //const para inicializar un ArticuloManufacturado por defecto y evitar el "undefined"
//vayamos un crear un articulo
const initializableNewArticuloManufacturado = ():ArticuloManufacturado => {
    return{ id:0,
        denominacion: "",
        descripcion:"",
        tiempoEstimadoCocina: 0,
        precioVenta: 0,
        urlImagen:"",
       
    };
};
//Producto seleccionado que se le va a pasar como prop al modal
const[articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>(initializableNewArticuloManufacturado);
//const para manejar el estado del modal
const [sowModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
const[denominacion, setDenominacion] = useState("");

//Logica del modal
const handleClick =(newDenominacion:string, ArticuloM : ArticuloManufacturado, modal:ModalType)=>{
    setDenominacion(newDenominacion);
    setModalType(modal);
    setArticuloManufacturado(ArticuloM);
    setShowModal(true);
};


    return(
        <>
            <Button onClick={()=>handleClick("Nuevo Articulo", initializableNewArticuloManufacturado(),
            ModalType.CREATE)}>Nuevo Articulo</Button>
            {isLoading ? <Loader/> : (
                <div>
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
                        {articulosManufacturados.map(articulosManufacturados => (
                            <tr key={articulosManufacturados.id}>
                            <td>{articulosManufacturados.denominacion}</td>
                            <td>{articulosManufacturados.descripcion}</td>
                            <td>{articulosManufacturados.tiempoEstimadoCocina}</td>
                            <td>{articulosManufacturados.precioVenta}</td>
                            <td><img src={articulosManufacturados.urlImagen} alt="articulosManufacturados.denominacion" style={{width:'50px'}}/></td>
                            <td> <EditButton onClick={() => handleClick("Editar Articulo", articuloManufacturado, ModalType.UPDATE)}/></td>
                            <td><DeleteButton onClick={() => handleClick("Eliminar Articulo", articuloManufacturado, ModalType.DELETE)}/></td>
                            </tr>
                        )
                        )}
                    </tbody>

                </Table>
                </div>
            )}

               {setShowModal && (
                    <ArticuloManufacturadoModal
                    show = {sowModal}
                    onHide = {() => setShowModal(false)}
                    denominacion={denominacion}
                    modalType = {modalType}
                    articuloM = {articuloManufacturado}
                    refreshData = {setRefreshData}
                    />

               )};             

        </>
    )
}
export default ArticulosManufacturadosTable