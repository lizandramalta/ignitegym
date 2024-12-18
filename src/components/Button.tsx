import { ComponentProps } from 'react'
import {
  ButtonSpinner,
  Button as GluestackButton
} from '../../gluestack-components'

type Props = ComponentProps<typeof GluestackButton> & {
  isLoading?: boolean
}

export function Button({ isLoading, children, ...rest }: Props) {
  return (
    <GluestackButton {...rest}>
      {isLoading ? <ButtonSpinner /> : children}
    </GluestackButton>
  )
}
