import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { history, HistoryRouter } from "@/utils/history";
import AuthRoute from "@/components/AuthRoute";
import { Spin } from "antd";

const Login = lazy(() => import("@/pages/Login"));
const Layout = lazy(() => import("@/pages/Layout"));
const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));

function App() {
  return (
    <div className="App">
      <HistoryRouter history={ history }>
        <Suspense
          fallback={ (
            <div style={ { textAlign: "center", marginTop: 400 } }>
              <Spin size="large"/>
            </div>) }
        >
          <Routes>
            <Route path="/" element={ <AuthRoute><Layout/></AuthRoute> }>
              <Route index element={ <Home/> }/>
              <Route path="article" element={ <Article/> }/>
              <Route path="publish" element={ <Publish/> }/>
            </Route>
            <Route path="/login" element={ <Login/> }/>
          </Routes>
        </Suspense>
      </HistoryRouter>
    </div>
  );
}

export default App;
