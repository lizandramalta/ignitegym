import { useAuth } from '@hooks/useAuth'
import {
  Heading,
  HStack,
  Text,
  Icon,
  ButtonIcon
} from '../../gluestack-components'
import { VStack } from '@gluestack-ui/themed'
import { UserPhoto } from './UserPhoto'
import { LogOut } from 'lucide-react-native'
import { Button } from './Button'

export function HomeHeader() {
  const { user, signOut } = useAuth()

  function handleSignOut() {
    signOut()
  }

  return (
    <HStack
      h={148}
      bgColor="$gray600"
      pt="$16"
      pb="$5"
      px="$8"
      justifyContent="space-between"
      alignItems="center"
    >
      <HStack alignItems="center" gap="$4">
        <UserPhoto w="$16" h="$16" />
        <VStack>
          <Text color="$white" fontSize="$md" lineHeight="$md">
            Olá,
          </Text>
          <Heading color="$white" fontSize="$md" lineHeight="$md">
            {user?.name}
          </Heading>
        </VStack>
      </HStack>
      <Button variant="link" onPress={handleSignOut}>
        <ButtonIcon as={LogOut} color="$gray200" size="2xl" />
      </Button>
    </HStack>
  )
}
