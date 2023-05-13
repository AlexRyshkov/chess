import { Box, Card, Typography, useTheme } from '@mui/material';
import Figure from 'components/Figure';
import { useEffect, useMemo, useRef } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import HistoryType from 'types/History';
import convertToChessCoords from 'utils/convertToChessCoords';

interface Props {
  history: HistoryType;
}

const History = ({ history }: Props) => {
  const theme = useTheme();
  const scrollbarRef = useRef(null);

  const convertedHistory = useMemo(
    () =>
      history?.map(({ figure, from, to }) => ({
        figure,
        from: convertToChessCoords(...from),
        to: convertToChessCoords(...to),
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
        <Figure figure={whiteMove.figure} width={20} height={20} />
        <Typography
          flex={1}
          width={60}
          variant='body1'
        >{`${whiteMove.from}:${whiteMove.to}`}</Typography>
        {blackMove && (
          <>
            <Figure figure={blackMove.figure} width={20} height={20} />
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
