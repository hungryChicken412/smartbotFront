import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Users/settings/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import EditProfileTab from '@/content/Management/Users/settings/EditProfileTab';

import { baseUrl } from 'services/user.service';
import nextCookie from 'next-cookies';

function ManagementUserSettings({ accountInformation }) {
  return (
    <>
      <Head>
        <title>User Settings - OrangeWavesAI</title>
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
          spacing={3}
        >
          {/*  <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>   */}
          <Grid item xs={12}>
            <EditProfileTab info={accountInformation} />
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

  const res = await fetch(baseUrl + '/accountSummary', requestOptions);
  const json = await res.json();
  console.log(json);

  return { props: { accountInformation: json[0] } };
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;
