import './App.css';
import Layout from './components/Layout';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Notes from './pages/Notes'
import Note from './pages/Note'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={'/'} element={<Notes/>} exact />
          <Route path={'/notes/:id'} element={<Note/>} exact />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
