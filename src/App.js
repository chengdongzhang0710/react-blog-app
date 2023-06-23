import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AuthRoute><Layout/></AuthRoute> }/>
        <Route path="/login" element={ <Login/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
