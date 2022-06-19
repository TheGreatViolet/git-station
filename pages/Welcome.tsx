import { Button, Container, Heading, NativeBaseProvider, Row, Stack, Text } from "native-base";
import Icon from 'react-native-vector-icons/Octicons';

const Welcome = () => {
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

          <Button mt='2'>
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