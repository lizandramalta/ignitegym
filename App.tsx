import { StatusBar, Text, View } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from './gluestack-components'
import { Loading } from '@components/Loading'
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <GluestackUIProvider>
      {!fontsLoaded ? (
        <Loading />
      ) : (
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
      )}
    </GluestackUIProvider>
  )
}
