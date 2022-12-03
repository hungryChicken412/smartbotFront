// src/context/state.js
import { createContext, useContext } from 'react';
import { customHelpers } from 'helpers/custom-helpers';
import { userService } from 'services/user.service';

type userDataContext = {
  username: string;
  email: string;
  avatar: string;

  cookie: string;
  isAuth: boolean;
};
const AppContext = createContext({} as userDataContext);

export function AppDashboardWrapper({ children }) {
  const [isAuth, cookie] = customHelpers.checkAuth();
  let sharedState = {
    username: 'anonymous',
    email: ' user@email.com',
    avatar: '/static/images/avatars/1.jpg',
    cookie: '',
    isAuth: false
  };

  if (isAuth) {
    var data = userService.getDashboardData(cookie);

    if (data != null) {
      sharedState.username = data.username;
      sharedState.email = data.email;
      sharedState.avatar = data.avatar;
      sharedState.cookie = cookie as string;
      sharedState.isAuth = true;
    }
  }

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
