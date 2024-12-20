import { Toast, ToastDescription, ToastTitle } from '../../gluestack-components'
import { useToast as useGluestackToast } from '../../gluestack-components'

type Props = {
  id: string
  title: string
  description?: string
  action?: 'success' | 'error'
}
export function useToast() {
  const gluestackToast = useGluestackToast()

  function show({ id, title, description, action = 'success' }: Props) {
    gluestackToast.show({
      placement: 'top',
      duration: 3000,
      render: () => (
        <Toast nativeID={id} action={action} mt="$6">
          <ToastTitle>{title}</ToastTitle>
          {description && <ToastDescription>{description}</ToastDescription>}
        </Toast>
      )
    })
  }

  const toast = {
    show
  }

  return toast
}
