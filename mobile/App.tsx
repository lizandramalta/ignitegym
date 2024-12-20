import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'react-native'
import { GluestackUIProvider } from './gluestack-components'

import { Loading } from '@components/Loading'
import { AuthProvider } from '@contexts/authContext'
import { Routes } from '@routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <GluestackUIProvider>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {!fontsLoaded ? <Loading /> : <Routes />}
      </AuthProvider>
    </GluestackUIProvider>
  )
}
