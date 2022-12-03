import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Button, Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
import WatchList from '@/content/Dashboards/Crypto/WatchList';

import { Typography } from '@mui/material';
import { Card, CardContent, Divider } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import nextCookie from 'next-cookies';

import { baseUrl } from 'services/user.service';

function DashboardCrypto({ blogs, bots }) {
  console.log(bots);

  return (
    <>
      <Head>
        <title>Orange Waves Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          {/*           <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                pb: 3
              }}
            ></Box>

            <Card>
              <Typography variant="h3" style={{ padding: 12 }}>
                {' '}
                GeoMap
              </Typography>

              <Divider />
              <Chart
                chartType="GeoChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
              />
            </Card>
          </Grid> */}

          <Grid item xs={12}>
            <Card>
              <Typography variant="h3" style={{ padding: 12 }}>
                {' '}
                Your Bot Interactions
              </Typography>
              <Divider />
              <WatchList bots={bots} />
            </Card>
          </Grid>
        </Grid>
        <Grid sx={{ mt: 4 }} item xs={12}>
          <Card>
            <Typography variant="h3" style={{ padding: 12 }}>
              Blog
            </Typography>

            <Divider />
            <CardContent
              style={{ display: 'flex', flexWrap: 'wrap', margin: 2 }}
            >
              {blogs.map((item) => (
                <Card key={item['id']} sx={{ maxWidth: 345, margin: 2 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={item.background}
                    title={item['title']}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item['title']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <div
                        dangerouslySetInnerHTML={{ __html: item['brief'] }}
                      ></div>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      target="_blank"
                      rel="norelopener"
                      href={'/blogs/' + item['id']}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </CardContent>
          </Card>
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

  const res = await fetch(baseUrl + '/blogs/');
  const json = await res.json();

  const res2 = await fetch(baseUrl + '/chatbotsDashboard', requestOptions);
  const json2 = await res2.json();

  return { props: { blogs: json, bots: json2 } };
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
