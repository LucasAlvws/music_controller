
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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
          navigate("/room/" + roomCode)
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