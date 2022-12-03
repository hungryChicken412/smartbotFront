import Head from 'next/head';
import { Button } from '@mui/material';
import toast from 'src/components/Toast';
import { useCallback } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './auth.module.css';
import { AccountCircle } from '@mui/icons-material/';
import { useRef, useState } from 'react';
import { userService } from 'services/user.service';
import { useAppContext } from 'src/contexts/global_context';

function Register() {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const [submitting, setSubmitting] = useState();
  const router = useRouter();
  const appContext = useAppContext();
  console.log(appContext);

  if (appContext.isAuth) {
    console.log('here');
    router.push('/dashboards');
  }

  const [username, email, password, password2] = [
    useRef(),
    useRef(),
    useRef(),
    useRef()
  ];

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    var data = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
      password2: password2.current.value
    };
    return userService
      .register(data)
      .then(() => {
        notify('success', 'User registered!');
        userService
          .login(data.username, data.password)
          .then(() => {
            router.push('/dashboards');
          })
          .catch((error) => {
            console.log(error);
            setSubmitting(false);
            notify('error', 'Something Went Wrong');
          });
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        notify('error', 'Something Went Wrong');
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

          <div className={styles.auth_main_box} style={{ paddingTop: 0 }}>
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
            <form onSubmit={onSubmit}>
              <div>
                <input
                  type="email"
                  id="email"
                  className="auth-form-input"
                  required
                  placeholder="Email"
                  ref={email}
                  disabled={submitting}
                />
              </div>
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
                  disabled={submitting}
                  required
                  placeholder="Password"
                  minLength={8}
                  ref={password}
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password2"
                  required
                  className="auth-form-input"
                  placeholder="Re-Password"
                  minLength={8}
                  disabled={submitting}
                  ref={password2}
                />
              </div>
              <div>
                <ul className={styles.ps_list}>
                  <li> Password must contain more than 8 letters</li>
                  <li> Must not be a common password</li>
                  <li>Must be alphanumeric password with special characters</li>
                </ul>
              </div>
              <div className={styles.auth_form_step}>
                <Button
                  variant="contained"
                  color="warning"
                  disabled={submitting}
                  type="submit"
                >
                  Register
                </Button>
                <Link href="/auth/login">
                  <Button
                    variant="outlined"
                    disabled={submitting}
                    color="warning"
                  >
                    Or Login
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

export default Register;
