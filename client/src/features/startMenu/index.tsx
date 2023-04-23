import React from 'react';
import {createNewGame} from "../../services/api/game";
import {useNavigate} from "react-router";

const StartMenu = () => {
    const navigate = useNavigate();

    const startGame = async () => {
        const {data} = await createNewGame();
        navigate(`/game/${data.id}`)
    }

    return (
        <button onClick={startGame}>
            Start game
        </button>
    );
};

export default StartMenu;