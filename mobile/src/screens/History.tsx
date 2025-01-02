import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { useToast } from '@hooks/useToast'
import { useFocusEffect } from '@react-navigation/native'
import { HistoryResponseDTO, HistoryService } from '@services/historyService'
import { AppError } from '@utils/AppError'
import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'
import { Box, Heading, Text, VStack } from '../../gluestack-components'
import { Loading } from '@components/Loading'

export function History() {
  const [history, setHistory] = useState<HistoryResponseDTO>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)
      const data = await HistoryService.getHistory()
      setHistory(data)
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          id: 'history-toast',
          title: error.message,
          action: 'error'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [])
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoryCard group={item.group} name={item.name} hour={item.hour} />
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
      )}
    </VStack>
  )
}
