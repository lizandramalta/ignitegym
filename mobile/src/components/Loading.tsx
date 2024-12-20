import { Center, Spinner } from '../../gluestack-components'

export function Loading() {
  return (
    <Center flex={1} bgColor="$gray700">
      <Spinner />
    </Center>
  )
}
