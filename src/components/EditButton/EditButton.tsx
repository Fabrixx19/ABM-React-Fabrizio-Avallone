import { PencilFill } from "react-bootstrap-icons";


interface EditButtonProps{
    onClick: () => void;
}
export const EditButton = ({onClick}:EditButtonProps) => {
    return(
        <PencilFill
            color = "#c1121f"
            size = {24}
            onClick={onClick}
            onMouseEnter = {() => {document.body.style.cursor = 'pointer'}}
            onMouseLeave = {() => {document.body.style.cursor = 'default'}}
        />
    )
}

export default EditButton