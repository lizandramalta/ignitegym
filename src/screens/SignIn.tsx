import {
  ButtonText,
  Center,
  Heading,
  Image,
  Input,
  InputField,
  Text,
  VStack
} from '../../gluestack-components'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Button } from '@components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function SignIn() {
  return (
    <VStack flex={1} bgColor="$gray700">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
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
        <VStack px="$10" flex={1}>
          <Center flex={1} gap="$4">
            <Heading
              fontFamily="$heading"
              color="$gray100"
              fontSize="$xl"
              lineHeight="$xl"
              mb={4}
            >
              Acesse sua conta
            </Heading>
            <Input>
              <InputField
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Input>
            <Input>
              <InputField placeholder="Senha" secureTextEntry />
            </Input>
            <Button mt="$4">
              <ButtonText>Acessar</ButtonText>
            </Button>
          </Center>
          <Center gap="$3" pb={66}>
            <Text color="$gray100" fontSize="$md" lineHeight="$md">
              Ainda não tem acesso?
            </Text>
            <Button variant="outline">
              <ButtonText>Criar conta</ButtonText>
            </Button>
          </Center>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  )
}
