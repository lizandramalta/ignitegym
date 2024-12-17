import { Center, Image, Text, VStack } from '../../gluestack-components'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

export function SignIn() {
  return (
    <VStack flex={1} bgColor="$gray700">
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        position="absolute"
        alt="Pessoas malhando"
        w="$full"
        h={624}
      />
      <Center mt="$32">
        <Logo />
        <Text fontSize="$sm" color="$gray100">
          Treine sua mente e o seu corpo
        </Text>
      </Center>
    </VStack>
  )
}
