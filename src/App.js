import { Route, Routes } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import { history, HistoryRouter } from "@/utils/history";

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={ <AuthRoute><Layout/></AuthRoute> }>
            <Route index element={ <Home/> }/>
            <Route path="article" element={ <Article/> }/>
            <Route path="publish" element={ <Publish/> }/>
          </Route>
          <Route path="/login" element={ <Login/> }/>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
