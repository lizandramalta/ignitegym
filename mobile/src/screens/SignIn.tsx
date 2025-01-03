import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'
import {
  ButtonText,
  Center,
  Heading,
  Image,
  Text,
  VStack
} from '../../gluestack-components'

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { useState } from 'react'

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o email.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.')
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) })

  function handleSignIn({ email, password }: FormDataProps) {
    setIsLoading(true)
    signIn(email, password)
    setIsLoading(false)
  }

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

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
        <VStack px="$10" flex={1} mt="$4">
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

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  isInvalid={!!errors.email?.message}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  isInvalid={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              mt="$4"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            >
              <ButtonText>Acessar</ButtonText>
            </Button>
          </Center>
          <Center gap="$3" pb={66} mt="$4">
            <Text color="$gray100" fontSize="$md" lineHeight="$md">
              Ainda não tem acesso?
            </Text>
            <Button variant="outline" onPress={handleNewAccount}>
              <ButtonText>Criar conta</ButtonText>
            </Button>
          </Center>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  )
}
