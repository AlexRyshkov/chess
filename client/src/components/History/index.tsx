import { Box, Card, Typography, useTheme } from '@mui/material';
import Piece from '../Piece';
import { RefObject, useEffect, useMemo, useRef } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import HistoryType from 'types/History';
import convertToChessCoords from 'utils/convertToChessCoords';

interface Props {
  history: HistoryType;
}

const History = ({ history }: Props) => {
  const theme = useTheme();
  const scrollbarRef = useRef<any>(null);

  const convertedHistory = useMemo(
    () =>
      history?.map(({ piece, from, to }) => ({
        piece: piece,
        from: convertToChessCoords(from),
        to: convertToChessCoords(to),
      })),
    [history],
  );

  useEffect(() => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollToBottom();
    }
  }, [convertedHistory]);

  const moves = [];
  for (let i = 0; i < convertedHistory.length; i += 2) {
    const whiteMove = convertedHistory[i];
    const blackMove = convertedHistory[i + 1];

    moves.push(
      <Box display='flex' alignItems='center' columnGap={1}>
        <Typography
          sx={{ background: theme.palette.grey[100] }}
          textAlign='center'
          variant='body1'
          width={60}
        >
          {i / 2 + 1}
        </Typography>
        <Piece piece={whiteMove.piece} width={20} height={20} />
        <Typography
          flex={1}
          width={60}
          variant='body1'
        >{`${whiteMove.from}:${whiteMove.to}`}</Typography>
        {blackMove && (
          <>
            <Piece piece={blackMove.piece} width={20} height={20} />
            <Typography
              width={60}
              flex={1}
              variant='body1'
            >{`${whiteMove.from}:${whiteMove.to}`}</Typography>
          </>
        )}
      </Box>,
    );
  }

  return (
    <Card variant='outlined' sx={{ height: '100%' }}>
      <Scrollbar ref={scrollbarRef}>
        <div>{moves}</div>
      </Scrollbar>
    </Card>
  );
};

export default History;
