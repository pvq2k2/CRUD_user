import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout";
import CreateUser from "./pages/CreateUser";
import DetailUser from "./pages/DetailUser";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="create" element={<CreateUser />} />
        <Route path=":id" element={<DetailUser />} />
      </Route>
    </Routes>
  );
}

export default App;
