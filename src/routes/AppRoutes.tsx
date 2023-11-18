import {Route, Routes} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AdministracionProductos from '../pages/AdministracionProductos';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/HomePage" element={<HomePage/>}/>
        {/*<Route path="/componentes" element={<Componentes/>}/>*/}
        {/*<Route path="/administracion" element={<Administracion/>}/>*/}
        <Route path="/administracionProductos" element={<AdministracionProductos/>}/>
    </Routes>
  )
}

export default AppRoutes