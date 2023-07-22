import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default class CreateRoomPage extends Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
      errorMsg: "",
      successMsg: "",
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleUpdateRoomButtonPressed =
      this.handleUpdateRoomButtonPressed.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push("/room/" + data.code));
  }

  handleUpdateRoomButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        this.setState({
          successMsg: "Room updated",
        });
      } else {
        this.setState({
          errorMsg: "Error updating...",
        });
      }
      this.props.updateCallback();
    });
  }

  renderCreateButton() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
          >
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

  renderUpdateButton() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleUpdateRoomButtonPressed}
          >
            Update Room
          </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    const title = this.props.update ? "Update Room" : "Create a Room";

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse
            in={this.state.errorMsg != "" || this.state.successMsg != ""}
          >
            {this.state.successMsg != "" ? (
              <Alert
                severity="success"
                onClose={() => {
                  this.setState({ successMsg: "" });
                }}
              >
                {this.state.successMsg}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  this.setState({ errorMsg: "" });
                }}
              >
                {this.state.errorMsg}
              </Alert>
            )}
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={this.state.guestCanPause.toString()}
              onChange={this.handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={this.handleVotesChange}
              defaultValue={this.state.votesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {this.props.update
          ? this.renderUpdateButton()
          : this.renderCreateButton()}
      </Grid>
    );
  }
}

/*import React, { useState } from "react";
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

  const CreateRoomPage = () => {
  const navigate = useNavigate();
  const defaultVotes = 2;

  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

  const mudarVotos = (e) => {
    setVotesToSkip(e.target.value);
  };

  const mudarGuestCanPause = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const pressCreateRoom = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: guestCanPause,
        votes_to_skip: votesToSkip,
      }),
    };
    fetch("api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
  };
  
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
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue="true" onChange={mudarGuestCanPause}>
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={defaultVotes}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
            onChange={mudarVotos}
          />
          <FormHelperText>
            <div align="center">Votes Required to Skip</div>
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={pressCreateRoom}>
          Create A Room
        </Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" component={Link} to="/">
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;*/
