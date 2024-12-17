import { createInput } from '@gluestack-ui/input'
import { styled, AsForwarder } from '@gluestack-style/react'
import { View, Pressable, TextInput } from 'react-native'

const StyledRoot = styled(
  View,
  {
    borderWidth: 0,
    flexDirection: 'row',
    overflow: 'hidden',
    alignContent: 'center',
    width: '$full',
    bgColor: '$gray700',
    gap: '$2',
    p: '$4',
    borderRadius: '$md',

    ':focus': {
      borderWidth: 1,
      borderColor: '$green500'
    },

    ':invalid': {
      borderWidth: 1,
      borderColor: '$red500'
    },

    ':disabled': {
      opacity: 0.4,
      ':hover': {
        borderColor: '$gray700'
      }
    }
  },
  {
    descendantStyle: ['_input', '_icon']
  }
)

const StyledIcon = styled(
  AsForwarder,
  {
    color: '$background800',
    variants: {
      size: {
        '2xs': {
          h: '$3',
          w: '$3',
          props: {
            // @ts-ignore
            size: 12
          }
        },
        xs: {
          h: '$3.5',
          w: '$3.5',
          props: {
            //@ts-ignore
            size: 14
          }
        },
        sm: {
          h: '$4',
          w: '$4',
          props: {
            //@ts-ignore
            size: 16
          }
        },
        md: {
          h: '$4.5',
          w: '$4.5',
          props: {
            //@ts-ignore
            size: 18
          }
        },
        lg: {
          h: '$5',
          w: '$5',
          props: {
            //@ts-ignore
            size: 20
          }
        },
        xl: {
          h: '$6',
          w: '$6',
          props: {
            //@ts-ignore
            size: 24
          }
        }
      }
    },
    props: {
      size: 'md',
      // @ts-ignore
      fill: 'none'
    }
  },
  {
    resolveProps: ['stroke', 'fill'],
    ancestorStyle: ['_icon']
  },
  {
    propertyTokenMap: {
      stroke: 'colors',
      fill: 'colors'
    }
  }
)

const StyledSlot = styled(
  Pressable,
  {
    justifyContent: 'center',
    alignItems: 'center'
  },
  {
    descendantStyle: ['_icon']
  }
)

const StyledInputField = styled(
  TextInput,
  {
    flex: 1,
    color: '$gray100',
    fontSize: '$md',

    props: {
      placeholderTextColor: '$gray300'
    }
  },
  {
    ancestorStyle: ['_input'],
    resolveProps: ['placeholderTextColor']
  },
  {
    propertyTokenMap: {
      placeholderTextColor: 'colors'
    }
  }
)
const UIInput = createInput({
  Root: StyledRoot,
  Icon: StyledIcon,
  Slot: StyledSlot,
  Input: StyledInputField
})

export const Input = UIInput
export const InputIcon = UIInput.Icon
export const InputSlot = UIInput.Slot
export const InputField = UIInput.Input

/**
 * @deprecated Use InputField instead.
 */
export const InputInput = UIInput.Input
