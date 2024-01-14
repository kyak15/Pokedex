import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import Layout from './components/Layout';


export default function App(){
  return(
      <BrowserRouter>

{/**Purpose of the Routing Here
 * Layout route allows me to share the same header and footer of the site no matter what route path im on
 * /pokemon/name is not nested route bc there is no UI to share between the 2 pages ,
 */}

        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/pokemon/:name' element={<PokemonDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}