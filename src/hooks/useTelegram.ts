const tg = window.Telegram.WebApp

export const useTelegram = () => {
  const onClose = () => {
    // eslint-disable-next-line no-debugger
    debugger
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
