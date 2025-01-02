import { ComponentProps, useEffect, useState } from 'react'
import {
  InputField,
  Input as GluestackInput,
  FormControl,
  FormControlError,
  FormControlErrorText
} from '../../gluestack-components'

type Props = {
  containerBgColor?: string
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
} & ComponentProps<typeof InputField>

export function Input({
  containerBgColor,
  errorMessage,
  isInvalid,
  isDisabled,
  ...rest
}: Props) {
  const [invalid, setInvalid] = useState<boolean>()
  const [error, setError] = useState<string>()

  function handleFocus() {
    setInvalid(false)
    setError('')
  }

  function handleBlur() {
    if (errorMessage) {
      setInvalid(true)
      setError(errorMessage)
    }
  }

  useEffect(() => {
    setInvalid(isInvalid)
    setError(errorMessage)
  }, [isInvalid, errorMessage])

  return (
    <FormControl isInvalid={invalid}>
      <GluestackInput
        bgColor={containerBgColor ? containerBgColor : '$gray700'}
        isInvalid={invalid}
        isDisabled={isDisabled}
      >
        <InputField {...rest} onFocus={handleFocus} onBlur={handleBlur} />
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color="$red500">{error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}
