import { useContext } from 'react';
import { GameContext } from '../../features/game/GameProvider';

const History = () => {
  const { history } = useContext(GameContext);
  return (
    <div>
      {history?.map(({ from: [fromX, fromY], to: [toX, toY], figure }, i) => (
        <div key={i}>{`[${fromX}, ${fromY}] -> [${toX}, ${toY}]`}</div>
      ))}
    </div>
  );
};

export default History;
