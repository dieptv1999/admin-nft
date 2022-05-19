import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Page from '../components/Page';
import Logo from '../components/Logo';
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';
import useConnect from "../hooks/useConnect";
import {useEffect, useState} from "react";
// import utils from "../utils";
import {ConnectorNames} from "../web3/connectors";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  // const {t} = useTranslation('common')
  const {connectWallet, connectSuccess, deactivate} = useConnect();
  const [wallet, setWallet] = useState(0);

  // useEffect(() => {
  //   if (utils.getToken() || connectSuccess) router.push(qs.parse(router.query).referrer || '/')
  // }, [router.query, connectSuccess])

  // useEffect(() => deactivate(), [])

  const listWallet = [
    {
      id: 1,
      img: '/images/metamask.png',
      name: ConnectorNames.Metamask,
      desc: 'A browser extension with great flexibility. The web\'s most popular wallet'
    },
    {
      id: 2,
      img: '/images/wallet-connect.png',
      name: ConnectorNames.WalletConnect,
      desc: 'Pair with Trust, Argent, MetaMask  & more. Works from any browser, without an extension'
    },
    {
      id: 3,
      img: '/images/binance.png',
      name: ConnectorNames.Binance,
      desc: ''
    },
  ]

  async function connect({name}) {
    await connectWallet(name)
  }

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />

          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to Admin
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>

            <AuthSocial />

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
