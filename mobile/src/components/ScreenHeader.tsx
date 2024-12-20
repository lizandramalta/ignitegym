import { Center, Heading } from '../../gluestack-components'

type Props = {
  title: string
}

export function ScreenHeader({ title }: Props) {
  return (
    <Center bgColor="$gray600" pb="$6" pt={68}>
      <Heading fontSize="$lg" lineHeight="$lg" color="$gray100">
        {title}
      </Heading>
    </Center>
  )
}
