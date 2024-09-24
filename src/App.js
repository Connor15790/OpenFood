import './App.css';
import Home from "./pages/Home";
import BarcodeProduct from './pages/BarcodeProduct';

import ProductState from './context/products/ProductState';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <div className="App">
      <ProductState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/productbarcode/:barcode" element={<BarcodeProduct />} />
            <Route path="/productpage" element={<ProductPage />} />
          </Routes>
        </Router>
      </ProductState>
    </div>
  );
}

export default App;
