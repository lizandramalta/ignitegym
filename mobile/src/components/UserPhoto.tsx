import { useAuth } from '@hooks/useAuth'
import { Image } from '../../gluestack-components'

import UserPhotoDefault from '@assets/userPhotoDefault.png'
import { ComponentProps } from 'react'
import { api } from '@services/api'

type Props = ComponentProps<typeof Image>

export function UserPhoto({ ...rest }: Props) {
  const { user } = useAuth()

  return (
    <Image
      source={
        !!user?.avatar
          ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
          : UserPhotoDefault
      }
      defaultSource={
        !!user?.avatar
          ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
          : UserPhotoDefault
      }
      alt="Foto do usuário"
      rounded="$full"
      borderWidth="$2"
      borderColor="$gray400"
      backgroundColor="$gray500"
      {...rest}
    />
  )
}
