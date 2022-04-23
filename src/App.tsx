import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import Home from "./pages/Home/Home";
const City = lazy(() => import("./pages/City/City"));

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<span>Loading...</span>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:name" element={<City />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  );
};

export default App;
