import AddMovie from "./Component/AddMovie";
import Card from "./Component/Card";
import Header from "./Component/Header";
import { Routes, Route } from "react-router-dom";
import Detail from "./Component/Detail";
import React, { createContext, useState } from "react";
import Login from "./Component/Login";
import Signup from "./Component/Signup";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName,setUserName] = useState("")

  return (
    <Appstate.Provider value={{ login, userName, setLogin, setUserName }}>
      <div className="App relative">
        <Header />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
