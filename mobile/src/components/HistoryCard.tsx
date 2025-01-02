import { Heading, HStack, Text, VStack } from '../../gluestack-components'

type Props = {
  group: string
  name: string
  hour: string
}

export function HistoryCard({ group, name, hour }: Props) {
  return (
    <HStack
      w="$full"
      px="$5"
      py="$4"
      alignItems="center"
      gap="$0.5"
      bgColor="$gray600"
    >
      <VStack flex={1}>
        <Heading
          fontSize="$md"
          lineHeight="$md"
          color="$white"
          numberOfLines={1}
          textTransform="capitalize"
        >
          {group}
        </Heading>
        <Text
          fontSize="$lg"
          lineHeight="$lg"
          color="$gray100"
          numberOfLines={2}
          textTransform="capitalize"
        >
          {name}
        </Text>
      </VStack>
      <Text fontSize="$lg" lineHeight="$lg" color="$gray300">
        {hour}
      </Text>
    </HStack>
  )
}
