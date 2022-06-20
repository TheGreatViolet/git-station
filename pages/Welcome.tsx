import { DiscoveryDocument, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, Container, Heading, NativeBaseProvider, Row, Stack, Text } from "native-base";
import { useEffect } from "react";
import Icon from 'react-native-vector-icons/Octicons';
import * as SecureStore from 'expo-secure-store';

const Welcome: React.FC = () => {
  const discoveryDev: DiscoveryDocument = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/d9c046eee0179d3eb3bb'
  };

  const discoveryProd: DiscoveryDocument = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/deac60d4cbe65ec0106e'
  }

  const [req, res, propmtAsync] = useAuthRequest({
    clientId: __DEV__ ? 'd9c046eee0179d3eb3bb' : 'deac60d4cbe65ec0106e',
    scopes: ['identity', 'repo', 'read:org', 'gist', 'notifications', 'user'],
    redirectUri: makeRedirectUri({})
  }, __DEV__ ? discoveryDev : discoveryProd);

  const authGithub = async () => {
    propmtAsync();
  }

  useEffect(() => {
    if (res?.type === 'success') {
      SecureStore.setItemAsync('token', res.params.code).catch(console.error);
    }
  }, [res]);

  return (
    <NativeBaseProvider>
      <Container style={{
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
      }}>
        <Stack>
          <Heading>Welcome to GitStation</Heading>
          <Text alignSelf='center'>A better GitHub client for mobile</Text>

          <Button mt='2' onTouchEnd={authGithub} disabled={!req}>
            <Row>
              <Icon name="mark-github" size={20} />
              <Text ml={2}>Sign in with GitHub</Text>
            </Row>
          </Button>
        </Stack>
      </Container>
    </NativeBaseProvider>
  )
}

export default Welcome;