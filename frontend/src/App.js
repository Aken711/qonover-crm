import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import About from "./pages/General_About"
import Home from "./pages/General_Home"
import Cgu from "./pages/General_Cgu"
import Features from "./pages/General_Features"
import Log from "./pages/General_Log"
import Pricing from "./pages/General_Pricing"
import Termofservice from "./pages/General_Termofservice"
import Crm from "./pages/UserApp_Crm"
import CrmContact from "./pages/UserApp_Crm_Contact"
import Dashboard from "./pages/UserApp_Dashboard"
import Invoices from "./pages/UserApp_Invoices"
import Profile from "./pages/UserApp_Profile"
import Projects from "./pages/UserApp_Projects"
import Quotation from "./pages/UserApp_Quotation"
import Tasks from "./pages/UserApp_Tasks"

import "./styles/index.css"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<Home />} />
      <Route path='/' element={<Home />} />
      <Route path='/features' element={<Features />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/login' element={<Log />} />

      <Route path='/about' element={<About />} />
      <Route path='/gcu' element={<Cgu />} />
      <Route path='/termofservice' element={<Termofservice />} />
      
      <Route path='/app/crm/:id' element={<Crm />} />
      <Route path='/app/crm/contact' element={<CrmContact />} />
      <Route path='/app/dashboard/:id' element={<Dashboard />} />
      <Route path='/app/invoices/:id' element={<Invoices />} />
      <Route path='/app/profile/:id' element={<Profile />} />
      <Route path='/app/projects/:id' element={<Projects />} />
      <Route path='/app/quotations/:id' element={<Quotation />} />
      <Route path='/app/tasks/:id' element={<Tasks />} />
      

    </Routes>
    </BrowserRouter>
  );
};

export default App;