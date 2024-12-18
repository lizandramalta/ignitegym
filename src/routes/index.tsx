import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { useToken } from '@gluestack-style/react'
import { Box } from '../../gluestack-components'
import { AppRoutes } from './app.routes'
import { useAuth } from '@hooks/useAuth'

export function Routes() {
  const { user } = useAuth()
  const backgroundColor = useToken('colors', 'gray700')

  const theme = DefaultTheme
  theme.colors.background = backgroundColor

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        {!!user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
