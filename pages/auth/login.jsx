import Head from 'next/head';
import { Button, Divider } from '@mui/material';
import toast from 'src/components/Toast';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import styles from './auth.module.css';
import { AccountCircle } from '@mui/icons-material/';
import { userService } from '../../services/user.service.js';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from 'src/contexts/global_context';

function Login() {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const username = useRef();
  const password = useRef();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const appContext = useAppContext();

  if (appContext.isAuth) {
    router.push('/dashboards');
  }

  const loginUser = (e) => {
    e.preventDefault();

    setSubmitting(true);
    return userService
      .login(username.current.value, password.current.value)
      .then(() => {
        notify('success', 'Logged in!');
        router.push('/dashboards');
      })
      .catch((error) => {
        notify('error', ' Wrong Email / Password!');
        setSubmitting(false);
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>Orange Waves Authentication</title>
      </Head>
      <div className={styles.auth_container}>
        <div className={styles.auth_box}>
          <Link href="/">
            <img
              src="http://orangewaves.tech/dist/images/orange.png"
              width={100}
            />
          </Link>
          <p></p>

          <div className={styles.auth_main_box}>
            <div className={styles.auth_icon}>
              {' '}
              <AccountCircle />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button
                color="warning"
                className={styles.auth_google_sign}
                variant="outlined"
              >
                <img
                  alt="..."
                  className="w-5 mr-1"
                  src="/google.svg"
                  height={20}
                  width={20}
                />
                <p>Google</p>
              </Button>
            </div>

            <form className="auth-form" onSubmit={loginUser}>
              <div>
                <input
                  type="text"
                  id="username"
                  className="auth-form-input"
                  required
                  placeholder="Username"
                  ref={username}
                  disabled={submitting}
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  className="auth-form-input"
                  required
                  placeholder="Password"
                  ref={password}
                  disabled={submitting}
                />
              </div>
              <div>
                <p className={styles.forgotP}> Forgot Password?</p>
              </div>

              <div className={styles.auth_form_step}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                  color="warning"
                >
                  Login
                </Button>
                <Link href="/auth/register">
                  <Button
                    variant="outlined"
                    disabled={submitting}
                    color="warning"
                  >
                    Or Register
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
