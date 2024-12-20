import { useState } from 'react'
import { Group } from './Group'
import { FlatList } from 'react-native'
import { gluestackUIConfig } from '../../gluestack-components/gluestack-ui.config'

type Props = {
  data: string[]
  onSelect: (item: string) => void
}

export function GroupFilter({ data, onSelect }: Props) {
  const [groupSelected, setGroupSelected] = useState(data[0])
  const { tokens } = gluestackUIConfig

  function handleSelectGroup(group: string) {
    setGroupSelected(group)
    onSelect(group)
  }

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => (
        <Group
          label={item}
          isActive={item.toLowerCase() === groupSelected.toLowerCase()}
          onPress={() => handleSelectGroup(item)}
        />
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: tokens.space['3'],
        paddingHorizontal: tokens.space['8']
      }}
    />
  )
}
