import { StatusBar, Text, View } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from './gluestack-components'
import { Loading } from '@components/Loading'
import { SignIn } from '@screens/SignIn'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <GluestackUIProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded ? <Loading /> : <SignIn />}
    </GluestackUIProvider>
  )
}
