import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import User from './User';
import NotesCreationPage from './NotesCreationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/create-note" element={<NotesCreationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
