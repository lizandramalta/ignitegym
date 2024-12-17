import { StatusBar, Text, View } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from './gluestack-components'
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })
  if (!fontsLoaded) {
    return <View />
  }
  return (
    <GluestackUIProvider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Text>Home</Text>
      </View>
    </GluestackUIProvider>
  )
}
