import "./App.css";
import Form from "./components/Form.jsx";
import NoPage from "./components/NoPage.jsx";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NoPage />} />
        <Route path="/" element={<Form />} />
        <Route path="/home" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
