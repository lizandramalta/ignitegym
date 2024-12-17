import { Image, VStack } from '../../gluestack-components'

import BackgroundImg from '@assets/background.png'

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
    </VStack>
  )
}
