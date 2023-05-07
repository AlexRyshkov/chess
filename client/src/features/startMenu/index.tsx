import { useNavigate } from 'react-router';
import { createNewGame } from '../../services/api/game';

const StartMenu = () => {
  const navigate = useNavigate();

  const startGame = async () => {
    const { data } = await createNewGame();
    navigate(`/game/${data.id}`);
  };

  return <button onClick={startGame}>Start game</button>;
};

export default StartMenu;
