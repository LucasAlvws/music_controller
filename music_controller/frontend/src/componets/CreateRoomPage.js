import React,{Component} from "react";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import  Typography  from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component {
    defaultVotes = 2;
    constructor(props) {
      super(props);
      this.state = {
        guestCanPause: true,
        votesToSkip: this.defaultVotes
      };

      this.pressCreateRoom = this.pressCreateRoom.bind(this);
      this.mudarGuestCanPause = this.mudarGuestCanPause.bind(this);
      this.mudarVotos = this.mudarVotos.bind(this)
    }
    
    mudarVotos(e) {
      this.setState({
        votesToSkip:e.target.value,
      });
    }

    mudarGuestCanPause(e){
      this.setState({
        guestCanPause: e.target.value == "true" ? true : false,
      });
    }

    pressCreateRoom(){
        
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            guest_can_pause : this.state.guestCanPause,
            votes_to_skip : this.state.votesToSkip,
          })
        };
        fetch('api/create-room', requestOptions).then((response)=>response.json()).then((data) => console.log(data));
    }

    render() {
      return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
              Create A Room
            </Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              <FormHelperText>
                <div align="center">
                  Guest Control of Playback State
                </div>
              </FormHelperText>
              <RadioGroup row defaultValue="true" onChange={this.mudarGuestCanPause}>
                <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom" />
                <FormControlLabel value="false" control={<Radio color="secondary"/>} label="No Control" labelPlacement="bottom" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} align="center">
            <FormControl>
              <TextField required={true} type="number" defaultValue={this.defaultVotes} inputProps={{min:1, style: {textAlign:"center"},}} onChange={this.mudarVotos}/>
              <FormHelperText>
                <div align="center">
                  Votes Required to Skip
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} align="center">
            <Button color="primary" variant="contained" onClick={this.pressCreateRoom}>
              Create A Room
            </Button>
          </Grid>

          <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>
              Back
            </Button>
          </Grid>
        </Grid>
      );
    }
  }