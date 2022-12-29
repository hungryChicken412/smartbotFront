import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Transactions/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import RecentOrders from '@/content/Management/Transactions/RecentOrders';
import { baseUrl } from 'services/user.service';
import nextCookie from 'next-cookies';

function MyChatbots({ bots }) {
  return (
    <>
      <Head>
        <title> Helpdesk-Tickets</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader
          props={{
            title: ' Helpdesk Tickets',
            detail: 'These are all your helpdesk tickets'
          }}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders bots={bots} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export async function getServerSideProps(ctx) {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: `Token ${nextCookie(ctx)['token']}` }
  };

  const res = await fetch(baseUrl + '/chatlogs', requestOptions);
  console.log(res);
  const json = await res.json();

  return { props: { bots: json } };
}
MyChatbots.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default MyChatbots;
