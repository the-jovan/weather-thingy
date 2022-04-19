import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./layout/Header/Header";

import Home from "../pages/Home/Home";
import City from "../pages/City/City";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<City />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
