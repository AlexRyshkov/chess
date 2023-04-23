import React, {createContext, ReactElement, useCallback, useEffect, useState} from 'react';
import {Figure, Grid, King, Side} from '../figures/figure';
import {useDragLayer} from 'react-dnd';
import {FigureItem} from '../../components/Figure';
import {calcIsCheck, calcIsMate} from '../figures/calcMoves';
import {createCastlingGrid, createDefaultGrid} from '../grids';

export const GameContext = createContext<{
  grid: Grid;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
  history: History;
  dragAllowedCells: [number, number][];
  makeMove: (from: [number, number], to: [number, number]) => void;
}>({
  grid: createDefaultGrid(),
  currentSideMove: Side.WHITE,
  isCheck: false,
  isMate: false,
  history: [],
  dragAllowedCells: [],
  makeMove: () => {
    return;
  },
});

export type History = { figure: Figure; from: [number, number]; to: [number, number] }[];

export type GameState = {
  grid: Grid;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
  history: History;
};

const newGameState: GameState = {
  grid: createCastlingGrid(),
  currentSideMove: Side.WHITE,
  history: [],
  isCheck: false,
  isMate: false,
};

const GameProvider = ({ children }: { children: ReactElement }) => {
  const [gameState, setGameState] = useState<GameState>(newGameState);
  const [dragAllowedCells, setDragAllowedCells] = useState<[number, number][]>([]);
  const dragInfo = useDragLayer<FigureItem>((monitor) => monitor.getItem());

  const { grid, currentSideMove, history, isCheck, isMate } = gameState;

  useEffect(() => {
    if (dragInfo?.figure) {
      setDragAllowedCells(dragInfo.figure.getAllowedMoves(gameState, dragInfo.x, dragInfo.y));
    } else {
      setDragAllowedCells([]);
    }
  }, [dragInfo]);

  const makeMove = useCallback(
    ([fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
      const figure = grid[fromX][fromY];
      if (figure === null) {
        return;
      }

      const newGrid = grid.map((row) => row.slice());
      const oppositeSide = currentSideMove === Side.WHITE ? Side.BLACK : Side.WHITE;
      newGrid[toX][toY] = figure;
      newGrid[fromX][fromY] = null;

      if (figure instanceof King && Math.abs(toY - fromY) === 2) {
        newGrid[fromX][fromY - 1] = newGrid[0][0];
        newGrid[0][0] = null;
      }

      const isCheck = calcIsCheck({ ...gameState, grid: newGrid }, oppositeSide);
      const isMate = isCheck ? calcIsMate({ ...gameState, grid: newGrid }, oppositeSide) : false;

      setGameState({
        grid: newGrid,
        currentSideMove: oppositeSide,
        isCheck,
        isMate,
        history: [...history, { from: [fromX, fromY], to: [toX, toY], figure: figure }],
      });
    },
    [gameState],
  );

  return (
    <GameContext.Provider
      value={{ grid, dragAllowedCells, makeMove, currentSideMove, history, isCheck, isMate }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
