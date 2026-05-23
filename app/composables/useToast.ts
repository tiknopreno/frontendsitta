export const useToast = () => {
  const isVisible = useState('toast_visible', () => false)
  const message = useState('toast_message', () => '')
  const type = useState<'success' | 'error'>('toast_type', () => 'success')

  const showToast = (msg: string, toastType: 'success' | 'error' = 'success') => {
    message.value = msg
    type.value = toastType
    isVisible.value = true

    setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }

  return {
    isVisible,
    message,
    type,
    showToast
  }
}