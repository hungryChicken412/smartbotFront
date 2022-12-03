import {
  Box,
  Card,
  Typography,
  Container,
  Button,
  styled
} from '@mui/material';
import Head from 'next/head';

import nextCookie from 'next-cookies';

import type { ReactElement } from 'react';
import { baseUrl } from 'services/user.service';
import BaseLayout from 'src/layouts/BaseLayout';

const MainContent = styled(Box)(
  () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(6)};
  `
);

function Status404() {
  return (
    <>
      <Head>
        <title>Status - 404</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center">
              <Typography variant="h2" sx={{ my: 2 }}>
                Bot Deleted!
              </Typography>
            </Box>
            <Container maxWidth="sm">
              <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                <Button href="/dashboards" variant="outlined">
                  Go back
                </Button>
              </Card>
            </Container>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export async function getServerSideProps(ctx) {
  var query = ctx.query;

  if (!query['id']) {
    return { props: { chatbotInformation: {} } };
  }

  const requestOptions = {
    method: 'GET',
    headers: { Authorization: `Token ${nextCookie(ctx)['token']}` }
  };

  const res = await fetch(
    baseUrl + '/chatbotsDelete/' + query['id'],
    requestOptions
  );
  const json = await res.json();
  console.log('here');
  console.log(json);
  return { props: { _: {} } };
}
export default Status404;

Status404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
