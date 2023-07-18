import React,{Component} from "react";
import {BrowserRouter as Router, Routes, Route, Link, Redirect, Switch} from "react-router-dom" 
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

export default class Homepage extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <Router>
            <Routes>
                <Route exact path="/" element={<p>This Is the Homepage</p>} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </Router>
      );
    }
    
  }