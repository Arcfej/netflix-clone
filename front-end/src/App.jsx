import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyFlix from "./pages/MyFlix";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import UserLikes from "./pages/UserLikes";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/signup" element={<Signup/>}></Route>
                <Route exact path="/player" element={<Player/>}></Route>
                <Route exact path="/movies" element={<Movies/>}></Route>
                <Route exact path="/tv" element={<TvShows/>}></Route>
                <Route exact path="/mylist" element={<UserLikes/>}></Route>
                <Route exact path="/" element={<MyFlix/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;