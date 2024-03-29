import { Box, styled } from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import Head from 'next/head';

import LandingPage from '@/content/Overview/LandingPage';

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Head>
        <title>OrangeWavesAI | Customer Service Chatbots Made Easier!</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          crossOrigin="anonymous"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        />
        <link rel="stylesheet" href="/static/chatbot_cdn/chatbot.css" />
        {/* SEO */}

        <meta name="description" content="OrangeWavesAI" />
        <meta
          name="keywords"
          content="OrangeWavesAI, Customer service chatbot, Chatbot development, AI chatbot, Chatbot solutions, Automated customer service, Customer service automation, Chatbot for customer support, Customer service chatbot software, Chatbot platform for customer service , Chatbot technology for customer service, multi-channel support, personalized interactions, real-time responses ,  Chatbot platform for customer service,Chatbot technology for customer service, Artificial intelligence chatbot, Chatbot for business,
          Chatbot for customer service"
        />
        <meta name="author" content="OrangeWavesAI" />
      </Head>
      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-R3Y4577WJK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-R3Y4577WJK');
</script>`
        }}
      ></div>
      <LandingPage />

      <div
        dangerouslySetInnerHTML={{
          __html: `<section class="smartbot-section" name="smartbot-section" id="a4d2b29c-28ea-478f-8ec1-cab50625b85d">
    <script src="/static/chatbot_cdn/chatbot.js"></script>
  </section>

  
  `
        }}
      />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
