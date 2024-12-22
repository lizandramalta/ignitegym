import { Loading } from '@components/Loading'
import { useToken } from '@gluestack-style/react'
import { useAuth } from '@hooks/useAuth'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { Box } from '../../gluestack-components'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, isLoadingUserData } = useAuth()
  const backgroundColor = useToken('colors', 'gray700')

  const theme = DefaultTheme
  theme.colors.background = backgroundColor

  if (isLoadingUserData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        {!!user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
