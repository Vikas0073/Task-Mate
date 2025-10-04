
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
