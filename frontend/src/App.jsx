import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RepairRequestList from './Components/RepairRequestList';
import RepairRequestForm from './Components/RepairRequestFrom';
// import RepairRequestFromUpdate from './Components/RepairRequestFromUpdate';
// import RepairTable from './Components/Repair/RepairTable';
// import JobCardCreate from './Components/Repair/JobCardCreate';
// import JobCardList from './Components/Repair/JobCardList';
import RepaiTTTTTT from './Components/Repair/RepaiTTTTTT';
import RepairDashBoard from './Pages/RepairDashBoard';
// import JobCardALL from './Components/JobCardALL';
// import JobCardCreateForm from './Components/JobCardCreateForm'; 
// import JobCardUpdateMechanic from './Components/JobCardUpdateMechanic';


function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<RepairRequestForm />} />
        <Route path="/success" element={<h1>Form Submitted Successfully</h1>} />
        <Route path='/repairRequest/:id' element={<RepairRequestFromUpdate/>} />
        <Route path="/jobcard-create/:repairId" element={<JobCardCreate/>} />
      </Routes> */}
      {/* <RepairRequestList/> */}
      <RepairRequestForm />
      {/* <JobCardALL/> */}
      {/* <JobCardCreateForm/> */}
      {/* <JobCardUpdateMechanic/> */}
      {/* <RepairRequestFromUpdate/> */}
      {/* <JobCardCreate/> */}
      <RepaiTTTTTT/>
      <RepairDashBoard/>
    
    </BrowserRouter>
    
      
    
  )
}

export default App;
