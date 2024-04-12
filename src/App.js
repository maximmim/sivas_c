import Home from './screans/home';
import  {Fulltext}  from './screans/fulltext';
import Settings from './screans/settings';
import Scrol from './screans/Scrol';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

global.url = process.env.NODE_ENV !== 'production' ? 'https://sivas-s.onrender.com' : 'http://192.168.1.112:8000';


function App() {
const url = 'https://sivas-s.onrender.com/get_data';
global.datg = '';
useEffect(()=>{
async function fetchHTML(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка HTTP: ' + response.status);
    }
    return await response.text();
  } catch (error) {
    console.error('Ошибка при получении HTML:', error);
    return null;
  }
}
async function parseHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const titles = Array.from(doc.querySelectorAll('body')).map(element => element.textContent.trim());
  return titles;
}
async function main() {
  const html = await fetchHTML(url);
  if (html) {
  await parseHTML(html);
  }
}

main()
},[])

  return (
    <BrowserRouter>
      <div className='contaniner'>
        <Routes> 
          <Route path='/' element={<Home />} /> 
          <Route path='/full' element={<Fulltext />} /> 
          <Route path="/scrol" element={<Scrol />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
