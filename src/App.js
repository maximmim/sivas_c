import Home from './screans/home';
import Admin from './screans/adminscrean';
import  {Fulltext}  from './screans/fulltext';
import Settings from './screans/settings';
import Scrol from './screans/Scrol';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

global.url = process.env.NODE_ENV === 'production' ? 'https://sivas-s.onrender.com' : 'http://192.168.1.113:8000';


function App() {


  return (
    <BrowserRouter>
      <div className='contaniner'>
        <Routes> 
          <Route path='/' element={<Home />} /> 
          <Route path='/full' element={<Fulltext />} /> 
          <Route path="/adm" element={<Admin />} /> 
          <Route path="/scrol" element={<Scrol />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
