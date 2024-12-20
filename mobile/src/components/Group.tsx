import { ComponentProps } from 'react'
import {
  ButtonText,
  Button as GluestackButton
} from '../../gluestack-components'
import { Button } from './Button'

type Props = ComponentProps<typeof GluestackButton> & {
  label: string
  isActive: boolean
}

export function Group({ isActive, label, ...rest }: Props) {
  return (
    <Button
      w="$24"
      p="$3"
      rounded="$sm"
      bg="$gray600"
      borderColor="$green500"
      borderWidth={isActive ? 1 : 0}
      sx={{
        ':active': {
          borderWidth: 1
        }
      }}
      {...rest}
    >
      <ButtonText
        fontSize="$xs"
        lineHeight="$xs"
        fontFamily={isActive ? '$heading' : '$body'}
        color={isActive ? '$green500' : '$gray200'}
        numberOfLines={1}
        textTransform="uppercase"
        sx={{
          ':active': {
            fontFamily: '$heading'
          }
        }}
      >
        {label}
      </ButtonText>
    </Button>
  )
}
