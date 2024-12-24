import { ExerciseCard } from '@components/ExerciseCard'
import { GroupFilter } from '@components/GroupFilter'
import { HomeHeader } from '@components/HomeHeader'
import { Loading } from '@components/Loading'
import { useToast } from '@hooks/useToast'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ExerciseService } from '@services/exerciseService'
import { GroupsService } from '@services/groupsService'
import { AppError } from '@utils/AppError'
import { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Heading, HStack, Text, VStack } from '../../gluestack-components'

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [isLoadingGroups, setIsLoadingGroups] = useState(false)
  const [isLoadingExercises, setIsLoadingExercises] = useState(false)
  const [groups, setGroups] = useState<string[]>([])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const toast = useToast()

  function handleSelectGroup(group: string) {
    setSelectedGroup(group)
  }

  function handleExerciseDetails(exercise: Exercise) {
    navigation.navigate('exercise', { exercise })
  }

  async function fetchGroups() {
    try {
      setIsLoadingGroups(true)
      const groups = await GroupsService.getGroups()
      setGroups(groups)
      setSelectedGroup(groups[0])
      setIsLoadingGroups(false)
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'create-user-toast',
          title: error.message,
          action: 'error'
        })
      }
    }
  }

  async function fetchExerciseByGroup() {
    try {
      setIsLoadingExercises(true)
      const exercices = await ExerciseService.getExerciseByGroup(selectedGroup)
      setExercises(exercices)
      setIsLoadingExercises(false)
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'create-user-toast',
          title: error.message,
          action: 'error'
        })
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchExerciseByGroup()
    }, [selectedGroup])
  )

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <VStack flex={1}>
      <HomeHeader />
      <VStack py="$10">
        {isLoadingGroups ? (
          <Loading />
        ) : (
          <GroupFilter data={groups} onSelect={handleSelectGroup} />
        )}
      </VStack>
      <VStack px="$8" gap="$3" flex={1}>
        {isLoadingExercises ? (
          <Loading />
        ) : (
          <>
            <HStack justifyContent="space-between" alignItems="center">
              <Heading color="$gray200" fontSize="$md" lineHeight="$md">
                Exercícios
              </Heading>
              <Text color="$gray200" fontSize="$md" lineHeight="$md">
                {exercises.length}
              </Text>
            </HStack>
            <FlatList
              data={exercises}
              renderItem={({ item }) => (
                <ExerciseCard
                  data={item}
                  onPress={() => handleExerciseDetails(item)}
                />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: 12,
                paddingBottom: 12
              }}
            />
          </>
        )}
      </VStack>
    </VStack>
  )
}
