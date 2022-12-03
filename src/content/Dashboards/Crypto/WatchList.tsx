import { Button, Card, Typography, styled } from '@mui/material';
import WatchListColumn from './WatchListColumn';
import Link from 'next/link';

const EmptyResultsWrapper = styled('img')(
  ({ theme }) => `
      max-width: 100%;
      width: ${theme.spacing(66)};
      height: ${theme.spacing(34)};
`
);

function WatchList({ bots }) {
  var isEmpty = bots.length == 0;

  return (
    <>
      {!isEmpty && <WatchListColumn bots={bots} />}

      {isEmpty && (
        <Card
          sx={{
            textAlign: 'center',
            p: 3
          }}
        >
          <EmptyResultsWrapper src="/static/images/placeholders/illustrations/1.svg" />

          <Typography
            align="center"
            variant="h2"
            fontWeight="normal"
            color="text.secondary"
            sx={{
              mt: 3
            }}
            gutterBottom
          >
            Ooh! there's nothing to show!
          </Typography>

          <Link href="/applications/chatbotDesigner">
            <Button
              variant="contained"
              size="large"
              color="warning"
              sx={{
                mt: 4
              }}
            >
              Create a bot now!
            </Button>
          </Link>
        </Card>
      )}
    </>
  );
}

export default WatchList;
