import React, {useContext, useEffect, useState} from 'react';
import GameProvider, {GameContext} from "./GameProvider";
import Board from "../../components/Board";
import History from "../../components/History";
import {useParams} from "react-router";
import {createGameSocket} from "../../services/socket";
import {Socket} from "socket.io-client";
import {joinGame} from "../../services/api/game";
import useGameSession from "./getGameSocket";
import getGameSocket from "./getGameSocket";


const Game = () => {
    return (
        <GameProvider>
            <GameContent/>
        </GameProvider>
    );
};

const GameContent = () => {
    const {currentSideMove, isCheck, isMate, playerSide} = useContext(GameContext);


    return <div style={{display: 'flex', gridGap: 10}}>
        <Board/>
        Your side: {playerSide.toString()} <br/>
        Current turn: {currentSideMove} <br/>
        {isMate ? 'Mate!' : isCheck ? 'Check!' : ''} <br/>
        {isMate ? playerSide === currentSideMove ? 'You lost' : 'You win' : ''}
        <History/>
    </div>
}

export default Game;