import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { useAuth } from '@hooks/useAuth'
import { ImageUtils } from '@utils/imageUtils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Button,
  ButtonText,
  Center,
  Heading,
  Input,
  InputField,
  VStack
} from '../../gluestack-components'
import { AppError } from '@utils/AppError'
import { useToast } from '@hooks/useToast'

export function Profile() {
  const { user, updateUserPhoto } = useAuth()
  const toast = useToast()

  async function handleUpdateUserPhoto() {
    try {
      const photoUri = await ImageUtils.pickImage()
      if (photoUri) updateUserPhoto(photoUri)
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
            <Input bgColor="$gray600">
              <InputField value={user?.name} placeholder="Nome" />
            </Input>
            <Input bgColor="$gray600" isDisabled>
              <InputField value={user?.email} />
            </Input>
          </VStack>
          <Heading color="$gray200" fontSize="$md" lineHeight="$md" mb="$2">
            Alterar senha
          </Heading>
          <VStack gap="$4" mb="$8">
            <Input bgColor="$gray600">
              <InputField placeholder="Senha antiga" secureTextEntry />
            </Input>
            <Input bgColor="$gray600">
              <InputField placeholder="Nova senha" secureTextEntry />
            </Input>
          </VStack>
          <Button mb="$4">
            <ButtonText>Atualizar</ButtonText>
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </VStack>
  )
}
