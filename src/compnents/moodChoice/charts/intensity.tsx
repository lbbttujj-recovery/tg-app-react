import React, { useEffect, useRef } from 'react'
import { moodData } from './moodData'

type IntensityProps = {
  selectedSlice: number | null
  onPartClick: (part: string) => void
}

const getLightAndDarkColors = (hex: string) => {
  // Преобразуем HEX цвет в RGB
  const rgb = parseInt(hex.slice(1), 16) // Убираем '#'
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff

  // Получаем более светлый и более темный оттенки
  const lighten = (factor: number) => {
    return `rgb(${Math.min(255, r + factor)}, ${Math.min(255, g + factor)}, ${Math.min(255, b + factor)})`
  }
  const darken = (factor: number) => {
    return `rgb(${Math.max(0, r - factor)}, ${Math.max(0, g - factor)}, ${Math.max(0, b - factor)})`
  }

  return [lighten(100), darken(100)] // Возвращаем светлый и темный оттенки
}

export const Intensity: React.FC<IntensityProps> = ({ selectedSlice, onPartClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { basic_emotions } = moodData()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }
    if (!selectedSlice) {
      return
    }
    const intensity = basic_emotions[selectedSlice].intensity
    const width = 400
    const height = 400
    const partWidth = width / 3 // Ширина каждой части

    const [lightColor, darkColor] = getLightAndDarkColors(basic_emotions[selectedSlice].color)
    // Создаем линейный градиент для всей области
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, lightColor) // Светлый оттенок
    gradient.addColorStop(1, darkColor) // Темный оттенок

    // Рисуем прямоугольник с градиентом
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height) // Рисуем полный прямоугольник

    // Добавляем текст в каждую часть
    ctx.fillStyle = '#000' // Цвет текста
    ctx.font = '20px Arial' // Шрифт и размер текста
    ctx.textAlign = 'center' // Выравнивание текста по центру
    ctx.textBaseline = 'middle' // Выравнивание текста по середине

    // Текст для первой части
    ctx.fillText(intensity[0], partWidth / 2, height / 4)
    // Текст для второй части
    ctx.fillText(intensity[1], partWidth + partWidth / 2, height / 4)
    // Текст для третьей части
    ctx.fillText(intensity[2], partWidth * 2 + partWidth / 2, height / 4)

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left // Положение клика по оси X
      const part = Math.floor(x / partWidth) // Определяем, в какую часть кликнули

      // Вызываем callback с номером части
      onPartClick(intensity[part]) // 1 — первая часть, 2 — вторая и т.д.
    }

    // Добавляем событие клика
    // @ts-ignore
    canvas.addEventListener('click', handleClick)

    // Удаляем обработчик кликов при размонтировании компонента
    return () => {
      // @ts-ignore
      canvas.removeEventListener('click', handleClick)
    }
  }, [onPartClick, basic_emotions, selectedSlice])

  return (
    <div>
      <canvas ref={canvasRef} width="400" height={200}></canvas>
    </div>
  )
}
