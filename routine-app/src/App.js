import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import CreateTable from './pages/CreateTable/CreateTable';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import EditTable from './pages/EditTable/EditTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/createTable" element={<CreateTable />} />
        <Route path="/edit" element={<EditTable />} />
      </Routes>
    </Router>
  );
}

export default App;
