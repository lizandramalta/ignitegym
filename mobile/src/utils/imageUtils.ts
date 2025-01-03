import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { AppError } from './AppError'

type PhotoInfo = {
  size: number
}

function getImageFileInfo(user: User, uri: string) {
  const fileExtension = uri.split('.').pop()

  return {
    name: `${user.name.trim()}.${fileExtension}`.toLowerCase(),
    uri,
    type: `image/${fileExtension}`
  }
}

async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    quality: 1,
    aspect: [4, 4],
    allowsEditing: true
  })

  if (result.canceled) {
    return ''
  }

  const photoUri = result.assets[0].uri

  if (photoUri) {
    const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as PhotoInfo

    if (photoInfo.size / 1024 / 1024 > 5) {
      throw new AppError(
        'Essa imagem é muito grande. Escolha uma imagem de até 5MB'
      )
    }
  }

  return photoUri
}

export const ImageUtils = Object.freeze({
  pickImage,
  getImageFileInfo
})
