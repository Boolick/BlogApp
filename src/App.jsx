import { Provider } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Posts from "./components/Posts";
import About from "./components/About";
import User from "./components/User";
import store from "./store/store";
import Layout from "./components/Layout";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route
          path="/posts"
          element={
            <Layout>
              <Posts />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/user"
          element={
            <Layout>
              <User />
            </Layout>
          }
        />
      </Routes>
    </Provider>
  );
}

export default App;
