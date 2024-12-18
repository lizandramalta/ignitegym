import { StatusBar, Text, View } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from './gluestack-components'

import { Loading } from '@components/Loading'
import { Routes } from '@routes/index'

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
      {!fontsLoaded ? <Loading /> : <Routes />}
    </GluestackUIProvider>
  )
}
