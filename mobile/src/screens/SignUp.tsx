import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
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
import { UserService } from '@services/userService'
import { AppError } from '@utils/AppError'
import { useToast } from '@hooks/useToast'
import { useAuth } from '@hooks/useAuth'
import { useState } from 'react'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o email.').email('E-mail inválido.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .required('Informe a senha.'),
  password_confirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password'), ''], 'As senhas não conferem.')
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) })
  const toast = useToast()
  const { signIn } = useAuth()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp(data: FormDataProps) {
    try {
      setIsLoading(true)
      await UserService.createUser(data)
      signIn(data.email, data.password)
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'create-user-toast',
          title: error.message,
          action: 'error'
        })
      }
    }
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
        <VStack px="$10" flex={1}>
          <Center flex={1} gap="$4">
            <Heading
              fontFamily="$heading"
              color="$gray100"
              fontSize="$xl"
              lineHeight="$xl"
              mb={4}
            >
              Crie sua conta
            </Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  isInvalid={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                />
              )}
            />
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
            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme sua senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  isInvalid={!!errors.password_confirm?.message}
                  errorMessage={errors.password_confirm?.message}
                ></Input>
              )}
            />

            <Button
              mt="$4"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
            >
              <ButtonText>Criar e acessar</ButtonText>
            </Button>
          </Center>
          <Center gap="$3" pb={66} mt="$4">
            <Button variant="outline" onPress={handleGoBack}>
              <ButtonText>Voltar para o login</ButtonText>
            </Button>
          </Center>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  )
}
