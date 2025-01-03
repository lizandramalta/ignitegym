import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@hooks/useAuth'
import { useToast } from '@hooks/useToast'
import { UserService } from '@services/userService'
import { AppError } from '@utils/AppError'
import { ImageUtils } from '@utils/imageUtils'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'
import { ButtonText, Center, Heading, VStack } from '../../gluestack-components'

type FormDataProps = {
  name: string
  email?: string
  old_password?: string
  password?: string | null
  confirm_password?: string | null
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string(),
  old_password: yup.string(),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .transform((value) => (!!value ? value : null))
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required('Informe a confirmação da senha.')
          .transform((value) => (!!value ? value : null))
    })
})

export function Profile() {
  const { user, updateUserPhoto, updateUserName } = useAuth()
  const toast = useToast()
  const [isUpdating, setIsUpdating] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user?.name,
      email: user?.email
    },
    resolver: yupResolver(profileSchema)
  })

  async function handleUpdateUserPhoto() {
    try {
      const photoUri = await ImageUtils.pickImage()
      if (!photoUri) {
        return
      }
      if (user) {
        const { avatar } = await UserService.updateUserPhoto(
          ImageUtils.getImageFileInfo(user, photoUri)
        )
        updateUserPhoto(avatar)
      }
      toast.show({
        id: 'user-photo-success-toast',
        title: 'Foto atualizada.'
      })
    } catch (error) {
      if (error instanceof AppError) {
        return toast.show({
          id: 'user-photo-error-toast-1',
          title: error.message,
          action: 'error'
        })
      }
      toast.show({
        id: 'user-photo-error-toast-2',
        title: 'Erro ao atualizar a foto. Tente novamente mais tarde',
        action: 'error'
      })
      console.log(error)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    Keyboard.dismiss()
    try {
      setIsUpdating(true)
      await UserService.updateUser(data)
      updateUserName(data.name)
      toast.show({
        id: 'user-update-success-toast',
        title: 'Perfil atualizado com sucesso.'
      })
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'user-update-error-toast',
          title: error.message,
          action: 'error'
        })
      }
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <KeyboardAwareScrollView>
        <VStack px="$10">
          <Center mt="$6" mb="$8" gap="$2">
            <UserPhoto h={149} w={149} />
            <Button variant="link" onPress={handleUpdateUserPhoto}>
              <ButtonText>Alterar foto</ButtonText>
            </Button>
          </Center>
          <VStack gap="$4" mb="$12">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  containerBgColor="$gray600"
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
                  isDisabled
                  containerBgColor="$gray600"
                />
              )}
            />
          </VStack>
          <Heading color="$gray200" fontSize="$md" lineHeight="$md" mb="$2">
            Alterar senha
          </Heading>
          <VStack gap="$4" mb="$8">
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha antiga"
                  onChangeText={onChange}
                  value={value}
                  containerBgColor="$gray600"
                  secureTextEntry
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  onChangeText={onChange}
                  containerBgColor="$gray600"
                  isInvalid={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                  secureTextEntry
                />
              )}
            />
            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  onChangeText={onChange}
                  containerBgColor="$gray600"
                  isInvalid={!!errors.confirm_password?.message}
                  errorMessage={errors.confirm_password?.message}
                  secureTextEntry
                />
              )}
            />
          </VStack>
          <Button
            mb="$4"
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          >
            <ButtonText>Atualizar</ButtonText>
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  )
}
