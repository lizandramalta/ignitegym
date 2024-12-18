import { GroupFilter } from '@components/GroupFilter'
import { HomeHeader } from '@components/HomeHeader'
import { useEffect, useState } from 'react'
import { Heading, HStack, Text, VStack } from '../../gluestack-components'
import { FlatList } from 'react-native'
import { ExerciseCard } from '@components/ExerciseCard'

const exercisesMock: Exercise[] = [
  {
    id: '1',
    name: 'Puxada frontal',
    series: 3,
    repetitions: 12,
    group: 'Costas',
    demo: '',
    thumb: ''
  },
  {
    id: '2',
    name: 'Remada curvada',
    series: 3,
    repetitions: 12,
    group: 'Costas',
    demo: '',
    thumb: ''
  },
  {
    id: '3',
    name: 'Remada unilateral',
    series: 3,
    repetitions: 12,
    group: 'Costas',
    demo: '',
    thumb: ''
  },
  {
    id: '4',
    name: 'Levantamento terra',
    series: 3,
    repetitions: 12,
    group: 'Costas',
    demo: '',
    thumb: ''
  },
  {
    id: '5',
    name: 'Remada unilateral',
    series: 3,
    repetitions: 12,
    group: 'Costas',
    demo: '',
    thumb: ''
  },
  {
    id: '6',
    name: 'Levantamento terra',
    series: 3,
    repetitions: 12,
    group: 'Costas',
    demo: '',
    thumb: ''
  }
]

export function Home() {
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro'])
  const [selectedGroup, setSelectedGroup] = useState(groups[0])
  const [exercises, setExercises] = useState<Exercise[]>([])

  function handleSelectGroup(group: string) {
    setSelectedGroup(group)
  }

  useEffect(() => {
    const exercises = exercisesMock.filter(
      (item) => item.group === selectedGroup
    )
    setExercises(exercises)
  }, [selectedGroup])

  return (
    <VStack flex={1}>
      <HomeHeader />
      <VStack py="$10">
        <GroupFilter data={groups} onSelect={handleSelectGroup} />
      </VStack>
      <VStack px="$8" gap="$3" flex={1}>
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
          renderItem={({ item }) => <ExerciseCard data={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            paddingBottom: 12
          }}
        />
      </VStack>
    </VStack>
  )
}
