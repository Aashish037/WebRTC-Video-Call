import React, {useCallback, useState, useEffect} from 'react';
import { useSocket } from '../context/SocketProvider';
import {useNavigate} from 'react-router-dom'


const Lobby = () => {

    const [email, setEmail] = useState('');
    const [space, setSpace] = useState('');

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            socket.emit('join:space', {email, space});
        },[email, space, socket]);

    const handleSpaceJoin = useCallback((data)=>{
        const {email, space} = data;
        navigate(`/space/${space}`)
    }, [navigate])

    
    useEffect(() => {
        socket.on("join:space", handleSpaceJoin);
        return () => {
            socket.off("join:space", handleSpaceJoin);
        };
    }, [socket, handleSpaceJoin]);


    return (
        <div>
            <h1>Lobby</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor='email' > Email</label>
                <input
                    type="email"
                    id='email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value) }/>
                <br/>
                <label htmlFor='space' > Space</label>
                <input
                    type="text"
                    id='space'
                    value={space}
                    onChange={(e)=> setSpace(e.target.value) }/>
                <br/>
                <button type="submit">Join</button>
            </form>
        </div>
    )
}

export default Lobby
