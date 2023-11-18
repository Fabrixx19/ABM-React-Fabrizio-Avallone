import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import * as Yup from 'yup';
import {useFormik} from "formik";
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";
import { toast } from "react-toastify";

type ArticuloManufacturadoModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    articuloM: ArticuloManufacturado;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticuloManufacturadoModal = ({show,onHide,title,modalType,articuloM,refreshData}: ArticuloManufacturadoModalProps) =>{
    
    //CREATE - UPDATE
    const handleSaveUpdate = async (articuloM: ArticuloManufacturado) =>{
        try {
            const isNew =articuloM.id ===0;
            if(isNew){
                await ArticuloManufacturadoService.creaateArticuloManufacturado(articuloM);
            } else {
                await ArticuloManufacturadoService.updateArticuloManufacturado(articuloM.id,articuloM);
            }
            toast.success(isNew ? "Articulo creado" : "Articulo actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState=> !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ocurrio un error");
        }
    };

    //DELETE
    const handleDelete = async () => {
        try {
            await ArticuloManufacturadoService.deleteArticuloManufacturado(articuloM.id);
            toast.success("Se elimino con exito",{
                position : "top-center",
            });
            
            onHide();
            refreshData(prevState=> !prevState);

        } catch (error) {
            console.error(error);
            toast.error("Ocurrio un error");
        };
    }

    //YUP ESQUEMA VALIDACION
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            denominacion: Yup.string().required('La denominacion de requerida'),
            precioVenta: Yup.number().min(0).required('El precio es requerido'),
            descripcion: Yup.string().min(0).required('Requiere descipcion'),
            tiempoEstimadoCocina:Yup.number().min(0).required('El tiempo en cocina es requerido'),
            urlImagen: Yup.string().required('Url requerida Imagen'),
        });
    };

    //FORMIK UTILIZA ESTO PARA CREAR UN FORMULARIO DINAMICO Y QUE LO BLOQUEE EN CASO DE HABER ERRORES
    const formik = useFormik({
        initialValues: articuloM,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: ArticuloManufacturado) => handleSaveUpdate(obj), 
    });

    return (
        <>
 {modalType === ModalType.DELETE ?(
        <>
        <Modal show = {show} onHide={onHide} centered backdrop ="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>

                <Modal.Body>
                    <p>
                        ¿Estas seguro que deseas eliminar el Articulo <br /> <strong>{articuloM.denominacion}</strong>?

                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                </Modal.Footer>

            </Modal.Header>

        </Modal>
        </>
    ) :(
        <>
        <Modal show={show} onHide={onHide} centered backdrop = "static" className= "modal-xl">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Form onSubmit = {formik.handleSubmit}>

                <Form.Group controlId="formDenominacion">
                        <FormLabel>Denominacion</FormLabel>
                        <Form.Control
                        name="denominacion"
                        type="text"
                        value={formik.values.denominacion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid ={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.denominacion}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group controlId="formDescripcion">
                        <FormLabel>Descripcion</FormLabel>
                        <Form.Control
                        name="descripcion"
                        type="text"
                        value={formik.values.descripcion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid ={Boolean(formik.errors.descripcion && formik.touched.descripcion)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.descripcion}
                        </Form.Control.Feedback>

                    </Form.Group>
                    
                    <Form.Group controlId="formTiempoEstimadoCocina">
                        <FormLabel>TiempoEstimadoCocina</FormLabel>
                        <Form.Control
                        name="tiempoEstimadoCocina"
                        type="number"
                        value={formik.values.tiempoEstimadoCocina}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid ={Boolean(formik.errors.tiempoEstimadoCocina && formik.touched.tiempoEstimadoCocina)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.tiempoEstimadoCocina}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPrecioVenta">
                        <FormLabel>PrecioVenta</FormLabel>
                        <Form.Control
                        name="precioVenta"
                        type="number"
                        value={formik.values.precioVenta}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid ={Boolean(formik.errors.precioVenta && formik.touched.precioVenta)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.precioVenta}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group controlId="formUrlImagen">
                        <FormLabel>Imagen</FormLabel>
                        <Form.Control
                        name="urlImagen"
                        type="text"
                        value={formik.values.urlImagen}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid ={Boolean(formik.errors.urlImagen && formik.touched.urlImagen)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.urlImagen}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Modal.Footer className="mt-4">
                        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                        <Button variant="primary" type="submit" disabled={!formik.isValid}>Guardar</Button>
                    </Modal.Footer>
                </Form>

            </Modal.Body>

        </Modal>
        </>
    )}
        </>
    )
}

export default ArticuloManufacturadoModal