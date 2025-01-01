import { Button } from '@components/Button'
import { useToast } from '@hooks/useToast'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps, AppRoutes } from '@routes/app.routes'
import { api } from '@services/api'
import { HistoryService } from '@services/historyService'
import { AppError } from '@utils/AppError'
import { ArrowLeft } from 'lucide-react-native'
import { useState } from 'react'
import {
  ButtonIcon,
  ButtonText,
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack
} from '../../gluestack-components'

import BodySvg from '@assets/body.svg'
import Repetition from '@assets/repetitions.svg'
import Series from '@assets/series.svg'

type ExerciseRouteProps = RouteProp<AppRoutes, 'exercise'>

export function Exercise() {
  const { params } = useRoute<ExerciseRouteProps>()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleRegisterExerciseHistory() {
    try {
      setIsLoading(true)
      await HistoryService.registerExerciseHistory(params.exercise.id)
      navigation.navigate('history')
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'register-exercise-toast',
          title: error.message,
          action: 'error'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack>
      <VStack bgColor="$gray600" pt="$12" pb="$8" px="$8" gap="$3">
        <Button variant="link" w="$6" onPress={handleGoBack}>
          <ButtonIcon as={ArrowLeft} size="2xl" color="$green500" />
        </Button>
        <HStack alignItems="center" justifyContent="space-between">
          <Heading
            numberOfLines={1}
            color="$gray100"
            fontSize="$xl"
            lineHeight="$xl"
          >
            {params.exercise.name}
          </Heading>
          <HStack alignItems="center" gap="$0.5">
            <BodySvg />
            <Text
              color="$gray200"
              fontSize="$md"
              lineHeight="$md"
              textTransform="capitalize"
            >
              {params.exercise.group.toLocaleUpperCase()}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack mt="$8" gap="$3" px="$8">
          {!!params.exercise.demo && (
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${params.exercise.demo}`
              }}
              defaultSource={{
                uri: `${api.defaults.baseURL}/exercise/demo/${params.exercise.demo}`
              }}
              w={364}
              h={364}
              rounded="$lg"
              alt="Exercício"
              resizeMode="cover"
            />
          )}
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
                  {params.exercise.repetitions === 1
                    ? 'repetição'
                    : 'repetições'}
                </Text>
              </HStack>
            </HStack>
            <Button
              isLoading={isLoading}
              onPress={handleRegisterExerciseHistory}
            >
              <ButtonText>Marcar como realizado</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
