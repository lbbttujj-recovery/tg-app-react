const tg = window.Telegram.WebApp

export const useTelegram = () => {
  const onClose = () => {
    tg.close()
  }

  const onToggleMainButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }

  const ready = () => {
    tg.ready()
  }
  return {
    onClose,
    ready,
    onToggleMainButton,
    tg,
    user: tg.initDataUnsafe?.user?.username,
  }
}
