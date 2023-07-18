


import React, { useEffect, useState } from "react";
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
    })*/

  return (
    <div>
        <h2>{roomCode}</h2>
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause}</p>
      <p>Is Host: {isHost}</p>
    </div>
  );
};

export default Room;


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