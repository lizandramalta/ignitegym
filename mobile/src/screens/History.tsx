import { ScreenHeader } from '@components/ScreenHeader'
import { Box, Heading, Text, VStack } from '../../gluestack-components'
import { HistoryCard } from '@components/HistoryCard'
import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

type Data = {
  title: string
  data: {
    group: string
    name: string
    time: string
  }[]
}[]

const mockHistory = [
  {
    title: '22.07.24',
    data: [
      {
        group: 'Costas',
        name: 'Puxada frontal',
        time: '08:50'
      },
      {
        group: 'Costas',
        name: 'Remada unilateral',
        time: '08:32'
      }
    ]
  },
  {
    title: '21.07.24',
    data: [
      {
        group: 'Costas',
        name: 'Puxada frontal',
        time: '11:24'
      }
    ]
  }
]

export function History() {
  const [history, setHistory] = useState<Data>([])

  useFocusEffect(
    useCallback(() => {
      setHistory(mockHistory)
    }, [])
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={history}
        keyExtractor={(item) => JSON.stringify(item)}
        renderItem={({ item }) => (
          <HistoryCard group={item.group} name={item.name} time={item.time} />
        )}
        renderSectionHeader={({ section }) => (
          <Heading
            color="$gray200"
            fontSize="$md"
            lineHeight="$md"
            mt="$10"
            mb="$3"
          >
            {section.title}
          </Heading>
        )}
        style={{
          paddingHorizontal: 32
        }}
        contentContainerStyle={[
          history.length === 0 && { flex: 1, justifyContent: 'center' },
          {
            paddingBottom: 12
          }
        ]}
        ItemSeparatorComponent={() => <Box h="$3" />}
        ListEmptyComponent={() => (
          <Text
            color="$gray100"
            textAlign="center"
            fontSize="$md"
            lineHeight="$md"
          >
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        stickyHeaderHiddenOnScroll
        stickySectionHeadersEnabled={false}
      />
    </VStack>
  )
}
