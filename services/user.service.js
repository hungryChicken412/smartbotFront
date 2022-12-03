import Router from 'next/router';

import { fetchWrapper } from '../helpers/fetch-wrapper';

import { useState } from 'react';
import { useEffect } from 'react';
import authheader from '../helpers/fetch-wrapper.js';

export const baseHomeUrl = 'https://smartbot-api.onrender.com'; //'https://orange-waves.herokuapp.com'
export const baseUrl = baseHomeUrl + '/api-info';
import Cookies from 'js-cookie';

export const userService = {
  login,
  logout,
  register,
  getDashboardData,
  getAnalyticsData,
  socialLogin,
  validateToken,
  delete: _delete,
  uploadFiles,
  uploadFile
};

function login(username, password) {
  return fetchWrapper
    .post(baseHomeUrl + `/auth/login/`, { username, password })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      //userSubject.next(user);
      localStorage.setItem('token', user.token);
      Cookies.set('token', user.token);
      return user;
    });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('token');
  Cookies.remove('token');
  Router.push('/');
  //userSubject.next(null);
}

function register(user) {
  return fetchWrapper.post(`${baseUrl}/register/`, user);
}

function uploadFiles(data) {
  return fetchWrapper.post(`${baseUrl}/uploadFiles/`, data);
}

function socialLogin(cookie, router) {
  localStorage.setItem('token', cookie);
  Cookies.set('token', cookie);
  Router.push('/');
}

function validateToken(cookie) {
  var url = `${baseUrl}/validateToken/`;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cookie)
  };

  var [valid, isValid] = useState(false);

  useEffect(() => {
    fetch(baseUrl + '/validateToken/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 'failed') {
          valid = false;
        } else if (data.status == 'success') {
          valid = true;
        }

        setData(data);
        isValid(valid);
      });
  }, []);

  return { data, valid };
}

function getMyProfile(cookie) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const requestOptions = {
    method: 'GET',
    headers: { Authorization: `Token ${cookie}` }
  };

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + '/account/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return data;
}

function updateProfile(data) {
  return fetchWrapper.post(`${baseUrl}/updateProfile/`, data);
}
function getDashboardData(cookie) {
  const [data, setData] = useState(null);

  const requestOptions = {
    method: 'GET',
    headers: { Authorization: `Token ${cookie}` }
  };

  useEffect(() => {
    fetch(baseUrl + '/account/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
      });
  }, []);

  return data;
}
function getAnalyticsData(cookie) {
  const [data, setData] = useState();

  const requestOptions = {
    method: 'GET',
    headers: { Authorization: `Token ${cookie}` }
  };

  useEffect(() => {
    fetch(baseUrl + '/account/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
      });
  }, []);

  return data;
}

function getBillingData(cookie) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const requestOptions = {
    method: 'GET',
    headers: { Authorization: `Token ${cookie}` }
  };

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl + '/billing/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return data;
}

function uploadFile(data) {
  const [dataa, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const requestOptions = {
    method: 'POST',
    headers: { Authorization: `Token ${cookie}` },
    body: data.file
  };

  useEffect(() => {
    fetch(baseUrl + '/api-info/regster/tts/', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return dataa;
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
