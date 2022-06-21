import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { Octokit } from '@octokit/rest';

export async function getApiToken() {
  const token = await SecureStore.getItemAsync('token');

  // TODO: find a way to store the secret in a secure way, no secrets in code
  // ! Does not work for now
  const clientSecret = __DEV__ ? process.env.CLIENT_SECRET_DEV : process.env.CLIENT_SECRET_PROD;

  if (token) {
    const res = await axios.post(`https://github.com/login/oauth/access_token`, {
      client_id: __DEV__ ? 'd9c046eee0179d3eb3bb' : 'deac60d4cbe65ec0106e',
      client_secret: clientSecret,
      code: token,
    });

    const accessToken = res.data.access_token;
    console.log(clientSecret);

    return accessToken;
  } else {
    throw new Error('No token found');
  }
}

export async function getUserInfo() {
  const token = await getApiToken();
  const octokit = new Octokit({
    auth: `${token}`,
  });

  const res = await octokit.request(`GET /user`, {});

  return res;
}