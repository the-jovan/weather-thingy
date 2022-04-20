import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import Home from "./pages/Home/Home";
import City from "./pages/City/City";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<City />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
