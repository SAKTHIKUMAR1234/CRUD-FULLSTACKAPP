import Home from "./pages/Home";
import Add from './pages/Add'
import Edit from "./pages/Edit";
import Signup from './pages/Signup';
import Login from './pages/Login'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom" 
function App() {

 
  return (
    <Router>
      <Routes>
        <Route path = "/home" element={<Home/>}/>
        <Route path = "/add" element={<Add/>}/>
        <Route path='/edit' element={<Edit/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Login />}> </Route>
        <Route path="/login" element={<Login />}> </Route>
      </Routes>
    </Router>
  );

}

export default App
