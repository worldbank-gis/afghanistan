import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavbarMain from './components/NavbarMain'
import Footer from './components/Footer'

import ScrollToTop from './components/ScrollToTop'
import Preloader from './components/Preloader'
import DroughtConditions from './pages/DroughtConditions'
import WaterProductivity from './pages/WaterProductivity'


const EvapotranspirationPage = lazy(() => import('./pages/EvapotranspirationPage'));
const PrecipitationPage = lazy(() => import('./pages/PrecipitationPage'));
const BiomassPage = lazy(() => import('./pages/BiomassPage'));
const LandClassificationPage = lazy(() => import('./pages/LandClassificationPage'));
const WaterFootprintPage = lazy(() => import('./pages/WaterFootprintPage'));





const App = () => {
  return (
    <>
      <Router>
        <NavbarMain/>
        <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/evapotranspiration' element={<EvapotranspirationPage/>} />
          <Route path='/precipitation' element={<PrecipitationPage/>} />
          <Route path='/biomass' element={<BiomassPage/>} />
          <Route path='/land-classification' element={<LandClassificationPage/>} />
          <Route path='/water-footprint' element={<WaterFootprintPage/>} />
          <Route path='/water-productivity' element={<WaterProductivity/>} />
          <Route path='/drought' element={<DroughtConditions/>} />
        </Routes>
        </Suspense>
        <ScrollToTop/>
        <Footer/>
      </Router>

    </>

  )
}

export default App