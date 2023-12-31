import {Route, Routes} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Administracion from '../pages/Administracion';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/HomePage" element={<HomePage/>}/>
        {/*<Route path="/componentes" element={<Componentes/>}/>*/}
        {<Route path="/administracion" element={<Administracion/>}/>}
    </Routes>
  )
}

export default AppRoutes