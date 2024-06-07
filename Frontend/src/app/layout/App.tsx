import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/pages/HomePage";
import AppLayout from "./AppLayout";
import UpdateLogPage from "../../features/pages/UpdateLogPage";
import Navbar from "./Navbar";
import Login from "../../features/pages/Login";
import Registration from "../../features/pages/Registration";
import CreateLogPage from "../../features/pages/CreateLogPage";
import LogPage from "../../features/pages/LogPage";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/log/create" element={<CreateLogPage />} />
          <Route path="/log/:id" element={<LogPage />} />
          <Route path="/log/:id/edit" element={<UpdateLogPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
