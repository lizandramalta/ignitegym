import { ActivityIndicator, Pressable, Text, View } from 'react-native'

import { createButton } from '@gluestack-ui/button'
import { AsForwarder, styled } from '@gluestack-style/react'

const StyledRoot = styled(
  Pressable,
  {
    borderRadius: '$md',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    px: '$6',
    py: '$4',
    w: '$full',

    variants: {
      variant: {
        link: {
          px: '$0',
          py: '$0',
          w: 'auto',
          _text: {
            color: '$green700'
          },
          ':active': {
            _text: {
              textDecorationLine: 'underline'
            }
          }
        },
        outline: {
          bg: 'transparent',
          borderWidth: '$1',
          borderColor: '$green700',

          _text: {
            color: '$green700'
          },

          _spinner: {
            props: { color: '$green700' }
          },

          ':active': {
            bg: '$green700',
            _text: {
              color: '$white'
            }
          }
        },
        solid: {
          bg: '$green700',

          _text: {
            color: '$white'
          },

          _spinner: {
            props: { color: '$white' }
          },

          ':active': {
            bg: '$green500',
            _text: {
              color: '$white'
            }
          }
        }
      }
    },

    props: {
      variant: 'solid'
    },

    ':disabled': {
      opacity: 0.4
    }
  },
  {
    descendantStyle: ['_text', '_spinner', '_icon'],
    ancestorStyle: ['_button']
  }
)

const StyledText = styled(
  Text,
  {
    fontFamily: '$heading',
    fontSize: '$md'
  },
  {
    ancestorStyle: ['_text']
  }
)

const StyledButtonText = styled(
  StyledText,
  {},
  {
    ancestorStyle: ['_text']
  }
)
const StyledGroup = styled(
  View,
  {
    variants: {
      size: {
        xs: {
          _button: {
            props: {
              size: 'xs'
            }
          }
        },
        sm: {
          _button: {
            props: {
              size: 'sm'
            }
          }
        },
        md: {
          _button: {
            props: {
              size: 'md'
            }
          }
        },
        lg: {
          _button: {
            props: {
              size: 'lg'
            }
          }
        },
        xl: {
          _button: {
            _button: {
              props: {
                size: 'xl'
              }
            }
          }
        }
      },
      space: {
        xs: {
          gap: '$1'
        },
        sm: {
          gap: '$2'
        },
        md: {
          gap: '$3'
        },
        lg: {
          gap: '$4'
        },
        xl: {
          gap: '$5'
        },
        '2xl': {
          gap: '$6'
        },
        '3xl': {
          gap: '$7'
        },
        '4xl': {
          gap: '$8'
        }
      },
      isAttached: {
        true: {
          gap: 0
        }
      }
    },
    defaultProps: {
      size: 'md',
      space: 'sm'
    }
  },
  {
    descendantStyle: ['_button']
  }
)

const StyledSpinner = styled(
  ActivityIndicator,
  {},
  {
    ancestorStyle: ['_spinner'],
    resolveProps: ['color']
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
        },
        '2xl': {
          h: '$7',
          w: '$7',
          props: {
            //@ts-ignore
            size: 28
          }
        }
      }
    },
    props: {
      size: 'md'
    }
  },
  {
    resolveProps: ['stroke', 'fill']
  },
  {
    propertyTokenMap: {
      stroke: 'colors',
      fill: 'colors'
    }
  }
)
const UIButton = createButton({
  Root: StyledRoot,
  Text: StyledButtonText,
  Group: StyledGroup,
  Spinner: StyledSpinner,
  Icon: StyledIcon
})

export const Button = UIButton
export const ButtonText = UIButton.Text
export const ButtonGroup = UIButton.Group
export const ButtonSpinner = UIButton.Spinner
export const ButtonIcon = UIButton.Icon
