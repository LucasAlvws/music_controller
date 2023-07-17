import React,{Component} from "react";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom" 
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

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
            </Routes>
        </Router>
      );
    }
  }