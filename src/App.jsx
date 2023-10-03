import { Provider } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import Posts from "./components/Posts";
import About from "./components/About";
import User from "./components/User";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:userId" element={<User />} />
      </Routes>
    </Provider>
  );
}

export default App;
