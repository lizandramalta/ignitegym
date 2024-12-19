import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AppRoutes } from '@routes/app.routes'
import { ArrowLeft } from 'lucide-react-native'
import {
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Heading,
  Image,
  Text,
  VStack
} from '../../gluestack-components'

import BodySvg from '@assets/body.svg'
import Repetition from '@assets/repetitions.svg'
import Series from '@assets/series.svg'

type ExerciseRouteProps = RouteProp<AppRoutes, 'exercise'>

export function Exercise() {
  const { params } = useRoute<ExerciseRouteProps>()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack>
      <VStack bgColor="$gray600" pt="$12" pb="$8" px="$8" gap="$3">
        <Button variant="link" w="$6" onPress={handleGoBack}>
          <ButtonIcon as={ArrowLeft} size="2xl" color="$green500" />
        </Button>
        <HStack gap="$2" alignItems="center">
          <Heading
            numberOfLines={1}
            flex={1}
            color="$gray100"
            fontSize="$xl"
            lineHeight="$xl"
          >
            {params.exercise.name}
          </Heading>
          <HStack alignItems="center" gap="$0.5">
            <BodySvg />
            <Text color="$gray200" fontSize="$md" lineHeight="$md">
              {params.exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <VStack mt="$8" gap="$3" px="$8">
        <Image
          source={{ uri: params.exercise.demo }}
          defaultSource={{ uri: params.exercise.demo }}
          w={364}
          h={364}
          rounded="$lg"
          alt="Exercício"
          resizeMode="cover"
        />
        <VStack
          gap="$6"
          px="$4"
          pt="$5"
          pb="$4"
          rounded="$lg"
          bgColor="$gray600"
        >
          <HStack justifyContent="space-around" alignItems="center">
            <HStack alignItems="center" gap="$2">
              <Series />
              <Text color="$gray200" fontSize="$lg" lineHeight="$lg">
                {params.exercise.series}{' '}
                {params.exercise.series === 1 ? 'série' : 'séries'}
              </Text>
            </HStack>
            <HStack alignItems="center" gap="$2">
              <Repetition />
              <Text color="$gray200" fontSize="$lg" lineHeight="$lg">
                {params.exercise.repetitions}{' '}
                {params.exercise.repetitions === 1 ? 'repetição' : 'repetições'}
              </Text>
            </HStack>
          </HStack>
          <Button>
            <ButtonText>Marcar como realizado</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}
