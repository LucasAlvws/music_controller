import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage"

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails();
  }

  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  renderSettings(){
    return(
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage update={true} votesToSkip={this.state.votesToSkip} guestCanPause={this.state.guestCanPause} roomCode={this.state.roomCode} updateCallback={() => {}}/>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={() => this.updateShowSettings(false)}>Close</Button>
      </Grid>
    </Grid>
    )};
  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  render() {
    if (this.state.showSettings){
      return this.renderSettings();
    }else{
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Code: {this.roomCode}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5" component="h5">
              Votes: {this.state.votesToSkip}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5" component="h5">
              Guest Can Pause: {this.state.guestCanPause.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5" component="h5">
              Host: {this.state.isHost.toString()}
            </Typography>
          </Grid>
          {this.state.isHost ? this.renderSettingsButton() : null}
          <Grid item xs={12} align="center">
            <Button
              color="secondary"
              variant="contained"
              onClick={this.leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
  }
}
/*<div>
        <h3>{this.roomCode}</h3>
        <p>Votes: {this.state.votesToSkip}</p>
        <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
        <p>Host: {this.state.isHost.toString()}</p>
      </div>*/

/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Room = () => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const { roomCode } = useParams();

  useEffect(() => {

    const getRoomDetails = async () => {
        try {
          const response = await fetch('/api/get-room' + '?code=' + roomCode);
          const data = await response.json();
          setGuestCanPause(data.guest_can_pause.toString()); // Convertendo para booleano
          setVotesToSkip(data.votes_to_skip);
          setIsHost(data.is_host.toString());
        } catch (error) {
          console.error('Error fetching room details:', error);
        }
      };
      getRoomDetails();

  }, [roomCode]);

  /*getRoomDetails(() => {
    fetch('/api/get-room' + '?code=' + roomCode).then((response) => response.json()).then((data) => {
        setGuestCanPause(data.guest_can_pause);
        setVotesToSkip(data.votes_to_skip);
        setIsHost(data.is_host);})
    })

  return (
    <div>
        <h2>{roomCode}</h2>
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause}</p>
      <p>Is Host: {isHost}</p>
    </div>
  );
};

export default Room;*/

/*import React, {Component} from "react";
import { useParams } from 'react-router-dom';

export default class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
          votesToSkip: 2,
          guestCanPause: false,
          isHost: false,
        };
        const { roomCode } = useParams();
        
    }
    render() {
        return(
            <div>
                    
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guest Can Pause: {this.state.guestCanPause}</p>
                <p>Is Host: {this.state.isHost}</p>
            </div>
        )
    }


}*/
//{id: 2, code: 'OJIFND', host: 'z7fs4hwr7h6flpeyc2b7g3vbxrsvqjkj', guest_can_pause: false, votes_to_skip: 2, …}
