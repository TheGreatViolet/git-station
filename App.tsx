import { Divider, Heading, NativeBaseProvider, Stack, Text } from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider isSSR>
      <Stack safeArea pl='2'>
        <Heading fontSize='3xl' mb='2'>Welcome back {'{user}'}</Heading>

        <Divider />

        <Text>More content here</Text>
      </Stack>
    </NativeBaseProvider>
  );
}

export default App;