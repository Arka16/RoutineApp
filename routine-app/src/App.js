import './App.css';
import CreateTable from './pages/CreateTable/CreateTable';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import EditTable
 from './pages/EditTable/EditTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/" element={<CreateTable />} />
        <Route path="/edit" element={<EditTable />} />
      </Routes>
    </Router>
  );
}

export default App;
