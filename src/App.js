import TODOList from "./TODOList";
import { Route, Routes } from "react-router-dom";
import { Routes } from "react-router-dom";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<TODOList />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App;


