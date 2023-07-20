
import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: "",
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={this.state.error}
            label="Code"
            placeholder="Enter a Room Code"
            value={this.state.roomCode}
            helperText={this.state.error}
            variant="outlined"
            onChange={this.handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={this.roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  handleTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }

  roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: this.state.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          this.props.history.push(`/room/${this.state.roomCode}`);
        } else {
          this.setState({ error: "Room not found." });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}


/*import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const RoomJoinPage = ()=>{
    //const [guestCanPause, setGuestCanPause] = useState(true);
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');

    const joinIn =(()=>{
      const requestOptions = {
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
          code:roomCode
        })
      };
      fetch('api/join-room', requestOptions).then((response) => {
        if (response.ok){
          this.props.history.push(`/room/${roomCode}`);
        } else{
          setError("Invalid Code")
        }
      } ).catch((error) => {
        console.log(error);
      })
    });

    const mudarTextField = (e) => {
      setRoomCode(e.target.value);
    };

    useEffect(() => {
      
    });

    
    return(
    <div>
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
              Join in the Room
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl>
              <TextField error={error} label="Code" placeholder="Enter a Room Code" required={true} value={roomCode} helperText={error} variant="outlined" onChange={mudarTextField}>

              </TextField>
            </FormControl>
          </Grid>

          
          <Grid item xs={6} align="end">
            <Button variant="contained" color="primary" onClick={joinIn}  align="center">
              Join
            </Button>
          </Grid>
          <Grid item xs={6} align="start">
            <Button variant="contained" color="secondary" to="/" component={Link}  align="center">
              Back
            </Button>
          </Grid>

        </Grid>
    </div>
    ) 
}


export default RoomJoinPage
/*export default class RoomJoinPage extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <h1>this is the RoomJoinPage</h1>
        </div>
      );
    }
  }*/