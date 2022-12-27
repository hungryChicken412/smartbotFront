import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
  ListItemAvatar,
  ListItemText,
  ListItemButton
} from '@mui/material';

import Link from 'src/components/Link';

import 'animate.css';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import BugReportIcon from '@mui/icons-material/BugReport';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HelpIcon from '@mui/icons-material/Help';
import QuizIcon from '@mui/icons-material/Quiz';
import ArchitectureIcon from '@mui/icons-material/Architecture';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);
const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

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

import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import Wave from 'react-wavify';
import Logo from '@/components/LogoSign';

import Footer from '@/components/Footer';

function LandingPage() {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <>
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
                <Link href="/auth/login">
                  <Button color="warning" variant="outlined">
                    {' '}
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button color="warning" variant="contained">
                    {' '}
                    Register
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hero">
              <div className="hero-col border-imgg">
                <div className="hero-title"> Your one stop solution</div>
                <div className="hero-subtitle">
                  Build the most sophisticated and user friendly chatbot systems
                  for your website without any coding!
                </div>
                <div className="hero-buttons">
                  <Link href="#learnmore">
                    <Button color="warning" variant="outlined">
                      Get Started For Free
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hero-col hero-img-col">
                <div className="hero-img">
                  <img
                    alt="Hero-Image"
                    width={450}
                    loading="lazy"
                    height={550}
                    src="/img2.webp"
                  />
                </div>
              </div>
            </div>
            <Wave
              fill="white"
              style={{ transform: 'translateY(20px)' }}
              options={{ points: 3, speed: 0.2, amplitude: 20 }}
            >
              {' '}
            </Wave>
          </div>
        </Parallax>

        <Container
          maxWidth="lg"
          style={{ zIndex: 2, paddingBottom: 120 }}
          id="learnmore"
          sx={{ textAlign: 'center', paddingTop: 2 }}
        >
          <Grid
            spacing={{ xs: 6, md: 2 }}
            justifyContent="center"
            alignItems="center"
            container
          >
            <Grid item md={10} lg={8} mx="auto">
              <LabelWrapper>Presenting</LabelWrapper>
              <TypographyH1 sx={{ mb: 2 }} variant="h1">
                Your one stop solution for customer satisfaction
              </TypographyH1>

              <TypographyH2
                sx={{ lineHeight: 1.5, pb: 4 }}
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
              >
                <div className="text-about-column-image">
                  <img
                    src="/3d-casual-life-searching-for-idea.webp"
                    data-aos="fade-right"
                    width="300"
                    alt="idea"
                  />
                  <div data-aos="fade-right">
                    Make your business stand out from the crowd and provide the
                    best and seamless customer service experience to your
                    customers. Build the most sophisticated and user friendly
                    chatbot systems for your website without any coding!
                    <br />
                    <br />
                    OrangewavesAI is powered by a state of the art AI engine and
                    is the most efficient and cost effective solution for your
                    business.
                  </div>
                </div>
              </TypographyH2>
            </Grid>
          </Grid>
        </Container>
      </ParallaxProvider>
      <div
        className=" landingpage-custom-bg "
        style={{
          backgroundImage: 'url(/1876.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',

          backgroundRepeat: 'no-repeat'
        }}
      >
        <Slider {...settings} style={{ backdropFilter: 'blur(80px)' }}>
          <div>
            <div className="landingpage-section-1" style={{ paddingBottom: 0 }}>
              <div className="landingpage-section-1-content">
                <Typography sx={{ mb: 2 }} variant="h4">
                  UNLOCK YOUR TRUE POTENTIAL
                </Typography>
                <div className="landing-page-custom-head">
                  Accept helpdesk issues
                </div>
                <div className="landing-page-custom-text" data-aos="flip-right">
                  Create help desk tickets in a whim with a powerful in-built
                  ticketting system and solve your customers' queries on the go!
                </div>
              </div>
              <img
                alt="Demo of our service Image-1"
                className="landingpage-section-1-image"
                src="/img2.webp"
                data-aos="flip-right"
              />
            </div>
          </div>
          <div>
            <div className="landingpage-section-1" style={{ paddingBottom: 0 }}>
              <div className="landingpage-section-1-content">
                <Typography sx={{ mb: 2 }} variant="h4">
                  GATHER FEEDBACK
                </Typography>
                <div className="landing-page-custom-head">Conduct surveys</div>
                <div className="landing-page-custom-text" data-aos="flip-left">
                  Create short and sweet surveys from the in built templates or
                  create one from scratch! and get important suggestions and
                  information from the users.
                </div>
              </div>
              <img
                alt="demo of our service "
                className="landingpage-section-1-image"
                data-aos="flip-right"
                src="/img3.webp"
              />
            </div>
          </div>
        </Slider>
      </div>
      <div className="landingpage-section-1">
        <img
          alt="demo"
          className="landingpage-section-1-image"
          src="/illustration_1.webp"
          data-aos="fade-right"
        />
        <div className="landingpage-section-1-content" data-aos="flip-left">
          <Typography sx={{ mb: 2 }} variant="h2">
            What does it offer?
          </Typography>
          <ListItemWrapper>
            <ListItemAvatar style={{ color: 'blue' }}>
              <SettingsTwoToneIcon />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1
              }}
              primaryTypographyProps={{
                color: 'Black',
                variant: 'h4',
                noWrap: true
              }}
              secondaryTypographyProps={{
                color: 'textSecondary',
                noWrap: true
              }}
              primary=" Smart and easy to set up!"
              secondary=" Set up everything in a few clicks!"
            />
          </ListItemWrapper>
          <ListItemWrapper>
            <ListItemAvatar style={{ color: 'blue' }}>
              <BugReportIcon />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1
              }}
              primaryTypographyProps={{
                color: 'Black',
                variant: 'h4',
                noWrap: true
              }}
              secondaryTypographyProps={{
                color: 'textSecondary',
                noWrap: true
              }}
              primary=" Create Tickets"
              secondary=" Accept bug reports / support tickets "
            />
          </ListItemWrapper>
          <ListItemWrapper>
            <ListItemAvatar style={{ color: 'blue' }}>
              <CurrencyExchangeIcon />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1
              }}
              primaryTypographyProps={{
                color: 'Black',
                variant: 'h4',
                noWrap: true
              }}
              secondaryTypographyProps={{
                color: 'textSecondary',
                noWrap: true
              }}
              primary=" Increase Sales"
              secondary="   Suggest users your best products! "
            />
          </ListItemWrapper>
          <ListItemWrapper>
            <ListItemAvatar style={{ color: 'blue' }}>
              <HelpIcon />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1
              }}
              primaryTypographyProps={{
                color: 'Black',
                variant: 'h4',
                noWrap: true
              }}
              secondaryTypographyProps={{
                color: 'textSecondary',
                noWrap: true
              }}
              primary="  Answer FAQs"
              secondary="    Help your users understand your product! "
            />
          </ListItemWrapper>
          <ListItemWrapper>
            <ListItemAvatar style={{ color: 'blue' }}>
              <QuizIcon />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1
              }}
              primaryTypographyProps={{
                color: 'Black',
                variant: 'h4',
                noWrap: true
              }}
              secondaryTypographyProps={{
                color: 'textSecondary',
                noWrap: true
              }}
              primary="  Collect informaiton "
              secondary="     Gather important user information in form of surveys! "
            />
          </ListItemWrapper>
          <ListItemWrapper>
            <ListItemAvatar style={{ color: 'blue' }}>
              <ArchitectureIcon />
            </ListItemAvatar>
            <ListItemText
              sx={{
                mr: 1
              }}
              primaryTypographyProps={{
                color: 'Black',
                variant: 'h4',
                noWrap: true
              }}
              secondaryTypographyProps={{
                color: 'textSecondary',
                noWrap: true
              }}
              primary="   Completely  Customizable "
              secondary="      Change everything to your liking! "
            />
          </ListItemWrapper>
        </div>
      </div>
      <div
        className=" landingpage-custom-bg"
        style={{
          backgroundImage: 'url(/1876.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',

          backgroundRepeat: 'no-repeat'
        }}
      >
        <Slider {...settings} style={{ backdropFilter: 'blur(80px)' }}>
          <div>
            <div
              className="landingpage-section-1"
              style={{ paddingBottom: 0 }}
              data-aos="flip-right"
            >
              <div className="landingpage-section-1-content">
                <Typography sx={{ mb: 2 }} variant="h4">
                  VIRTUAL ASSISTANT
                </Typography>
                <div className="landing-page-custom-head">
                  Help your users get what they are looking for!
                </div>
                <div className="landing-page-custom-text">
                  With the most sophisticated chatbot design system, build
                  powerful AI chatbots to help your users and solve their
                  issues!
                </div>
              </div>
              <img className="landingpage-section-1-image" src="/im4.webp" />
            </div>
          </div>
          <div>
            <div className="landingpage-section-1" style={{ paddingBottom: 0 }}>
              <div
                className="landingpage-section-1-content"
                data-aos="flip-right"
              >
                <Typography sx={{ mb: 2 }} variant="h4">
                  INCREASE SALES
                </Typography>
                <div className="landing-page-custom-head">
                  Easily recommend your users new products / deals
                </div>
                <div className="landing-page-custom-text">
                  Easiliy let your users know what the new deals and offers are!
                  what are your new products? what should they be looking at?
                </div>
              </div>
              <img className="landingpage-section-1-image" src="/imgg5.webp" />
            </div>
          </div>
        </Slider>
      </div>

      <Container
        maxWidth="lg"
        style={{ zIndex: 2, paddingBottom: 120 }}
        id="learnmore"
        sx={{ textAlign: 'center', paddingTop: 2 }}
      >
        <Grid
          spacing={{ xs: 6, md: 2 }}
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid item md={10} lg={9} mx="auto">
            <LabelWrapper>Power of AI</LabelWrapper>
            <TypographyH1 sx={{ mb: 2 }} variant="h1">
              AI powered customer service
            </TypographyH1>

            <TypographyH2
              sx={{ lineHeight: 1.5, pb: 4 }}
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
            >
              <div className="text-about-column-image">
                <img
                  src="/illustration_2.webp"
                  data-aos="fade-left"
                  width="300"
                  alt="idea"
                />
                <div style={{ fontSize: '30px' }}>
                  Make your business stand out from the crowd build seamless
                  user engagement and customer service experience, automate your
                  business processes and generate leads
                  <br />
                </div>
              </div>
              <div className="text-about-column-image">
                <div style={{ fontSize: '30px' }}>
                  Orangewaves helps you upscale your business / website, easily
                  build node based chatbots in a matter of minutes without any
                  coding!
                </div>
                <img
                  src="/illustration_3.webp"
                  data-aos="fade-right"
                  width="300"
                  alt="idea"
                />
              </div>
              <LabelWrapper>Power of AI</LabelWrapper>
              <TypographyH1 sx={{ mb: 2 }} variant="h1">
                Is Orangewaves right for you?
              </TypographyH1>
              <div className="text-about-column-image">
                <div style={{ fontSize: '30px' }}>
                  Orangewaves is aimed at businesses and individuals who want to
                  upscale and provide the best possible customer service but
                  aren't sure how to go about it.
                  <br />
                  We provide a simple workflow, complete setup tutorial and all
                  hands support, guiding you through the process.
                  <br />
                </div>
              </div>
            </TypographyH2>
          </Grid>
        </Grid>
        <div className=" landingpage-custom-bg" data-aos="fade-right">
          <div className="landingpage-call">
            <div className="landingpage-call-text">
              Let's start your journey!
            </div>

            <Link href="/auth/login">
              <Button
                variant="contained"
                color="warning"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                {' '}
                Let's Go
              </Button>
            </Link>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default LandingPage;
