import Head from 'next/head';
import {
  Button,
  styled,
  Box,
  Card,
  CardMedia,
  CardHeader,
  CardContent
} from '@mui/material';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

import styles from './blogs.module.css';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Logo from '@/components/LogoSign';
import Footer from '@/components/Footer';

import { baseUrl } from 'services/user.service';
import HomeIcon from '@mui/icons-material/Home';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.warning.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
    
`
);
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.grey[100];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.info.light,
      cursor: 'pointer'
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.info.light
    }
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function Blog({ blogs }) {
  var list = blogs;

  return (
    <>
      <Head>
        <title>Orange Waves Authentication</title>
        {/* SEO */}
        <meta name="description" content="OrangeWavesAI Blog / Documentation" />
        <meta name="keywords" content="OrangeWavesAI, Blog, Documentation" />
        <meta name="author" content="OrangeWavesAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <ParallaxProvider>
        <Parallax
          speed={0}
          style={{
            textAlign: 'center',
            backgroundImage: 'url(/1876.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',

            backgroundRepeat: 'no-repeat'
          }}
        >
          <div style={{ backdropFilter: 'blur(80px)' }}>
            <div className="landingpage-navbar">
              <div className="landingpage-navbar-logo">
                <Logo />
              </div>
              <div className="landingpage-navbar-links">
                <Link href="/auth/register">
                  <Button
                    color="warning"
                    variant="outlined"
                    style={{ margin: 20 }}
                  >
                    {' '}
                    Log in
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    color="warning"
                    variant="contained"
                    style={{ margin: 20 }}
                  >
                    {' '}
                    Register
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hero">
              <div
                className="hero-col border-img"
                style={{ textAlign: 'left' }}
              >
                <LabelWrapper> Blog</LabelWrapper>
                <div className="hero-title"> Blogs</div>
                <div className="hero-subtitle">
                  Stay up to date on all the news and information!
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </ParallaxProvider>

      <div className={styles.blog_container} style={{ border: 0 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="/"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb component="a" href="/blogs" label="Blogs" />
        </Breadcrumbs>
      </div>
      <div className={styles.blog_container}>
        <div
          className={styles.blog_header}
          style={{ fontSize: 40, fontWeight: 'bold' }}
        >
          Latest Articles
        </div>
        <p style={{ fontSize: 20 }}>
          As technology continues to evolve, it is essential for users to have
          access to resources that help them understand and navigate new tools
          and platforms. Whether you are using a cutting-edge device or a
          tried-and-true piece of software, having guidance and insights can
          make a big difference in your experience.
          <br />
          <br />
          One of the most effective ways to get this kind of information is
          through blogs. Blogs provide a platform for experts and enthusiasts to
          share their knowledge and experiences with a wider audience. They can
          cover a wide range of topics, from technical tutorials and product
          reviews to tips and tricks for getting the most out of your tools.
          <br />
          <br />
          Which is why we have created this blog section for you to read and
          learn more about the latest news and information about Orange Waves!
        </p>

        <div className={styles.list_blog}>
          {list.map((item) => (
            <Card
              sx={{ maxWidth: 345 }}
              key={item['id']}
              className={styles.card_list_item}
            >
              <CardMedia
                sx={{
                  height: 0,
                  paddingTop: '56.25%' // 16:9
                }}
                image={item['background']}
              />
              <Link href={'/blogs/' + item['id']}>
                <CardHeader
                  title={item['title']}
                  subheader={item['published']}
                />
              </Link>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <div
                    dangerouslySetInnerHTML={{ __html: item['brief'] }}
                  ></div>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(baseUrl + '/blogs/');
  const json = await res.json();

  return { props: { blogs: json } };
}

export default Blog;
