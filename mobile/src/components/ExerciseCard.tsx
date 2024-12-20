import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Heading, HStack, Icon, Image, Text } from '../../gluestack-components'
import { VStack } from '@gluestack-ui/themed'
import { ChevronRight } from 'lucide-react-native'
import { ExerciseImageDefault } from './ExerciseImageDefault'

type Props = {
  data: Exercise
} & TouchableOpacityProps

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$gray500"
        rounded="$lg"
        py="$2"
        pl="$2"
        pr="$4"
        gap="$4"
        alignItems="center"
      >
        {!!data.thumb ? (
          <Image
            source={{ uri: data.thumb }}
            defaultSource={{ uri: data.thumb }}
            resizeMode="cover"
            rounded="$md"
            h={67}
            w={67}
            alt={`Imagem do execício ${data.name}`}
          />
        ) : (
          <ExerciseImageDefault />
        )}

        <VStack gap="$0.5" flex={1}>
          <Heading
            numberOfLines={1}
            color="$white"
            fontSize="$lg"
            lineHeight="$lg"
          >
            {data.name}
          </Heading>
          <Text
            numberOfLines={2}
            color="$gray200"
            fontSize="$sm"
            lineHeight="$sm"
          >
            {data.series} {data.series === 1 ? 'série' : 'séries'} x{' '}
            {data.repetitions}{' '}
            {data.repetitions === 1 ? 'repetição' : 'repetições'}
          </Text>
        </VStack>
        <Icon as={ChevronRight} size="xl" color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}
