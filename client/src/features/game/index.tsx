import React, {useContext} from 'react';
import {GameContext} from "./GameProvider";
import Board from "../../components/Board";
import History from "../../components/History";

const Game = () => {
    const { currentSideMove, isCheck, isMate } = useContext(GameContext);

    return (
        <div style={{ display: 'flex', gridGap: 10 }}>
            <Board />
            Current turn: {currentSideMove} <br />
            {isMate ? 'Mate!' : isCheck ? 'Check!' : ''} <br />
            <History />
        </div>
    );
};

export default Game;