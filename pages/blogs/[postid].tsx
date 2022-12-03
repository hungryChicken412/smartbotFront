import Head from 'next/head';
import { Button, styled, Box } from '@mui/material';
import Link from 'next/link';
import styles from './blogs.module.css';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Logo from '@/components/LogoSign';
import Footer from '@/components/Footer';
import HomeIcon from '@mui/icons-material/Home';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { baseUrl } from 'services/user.service';
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

function BlogPost({ blog }) {
  return (
    <>
      <Head>
        <title> {blog['title']} | OrangeWaves Blog </title>
      </Head>
      <ParallaxProvider>
        <Parallax
          speed={0}
          style={{
            textAlign: 'center',
            backgroundImage: `url(${blog.background})`,
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
                <div className="hero-title"> How To Create A New Chatbot?</div>
                <div
                  className="hero-subtitle"
                  dangerouslySetInnerHTML={{ __html: blog['brief'] }}
                ></div>
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
          <StyledBreadcrumb
            label={blog['title']}
            aria-current="page"
            icon={<HomeIcon fontSize="small" />}
          />
        </Breadcrumbs>
      </div>
      <div
        className={styles.blog_container}
        dangerouslySetInnerHTML={{ __html: blog['content'] }}
      ></div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(baseUrl + '/blog/' + ctx.query['postid'] + '/');
  const json = await res.json();

  return { props: { blog: json } };
}

export default BlogPost;
