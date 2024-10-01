import React, { useEffect, useRef } from 'react'
import { moodData } from './moodData'

type PieProps = {
  setSelectedSlice: (i: number) => void
}

export const Pie: React.FC<PieProps> = ({ setSelectedSlice }) => {
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
    ctx.clearRect(0, 0, 400, 400)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 150 // Радиус круга
    const slices = 8 // Количество частей
    const sliceAngle = (2 * Math.PI) / slices // Угол каждой части

    for (let i = 0; i < slices; i++) {
      const startAngle = i * sliceAngle
      const endAngle = startAngle + sliceAngle

      ctx.fillStyle = basic_emotions[i].color
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()

      const textAngle = startAngle + sliceAngle / 2 // Центр сектора
      const textX = centerX + (radius / 1.5) * Math.cos(textAngle) // Позиция текста по X
      const textY = centerY + (radius / 1.5) * Math.sin(textAngle) // Позиция текста по Y

      ctx.fillStyle = '#000' // Цвет текста
      ctx.font = '16px Arial' // Шрифт и размер текста

      ctx.textAlign = 'center' // Текст выровнен по центру
      ctx.textBaseline = 'middle' // Текст в вертикальной середине
      ctx.fillText(basic_emotions[i].name, textX, textY) // Рисуем текст в середине сектора
    }
  }, [basic_emotions])

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left // Корректируем координаты
    const mouseY = event.clientY - rect.top

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 150 // Радиус круга
    const slices = 8 // Количество частей
    const sliceAngle = (2 * Math.PI) / slices // Угол каждой части

    for (let i = 0; i < slices; i++) {
      const startAngle = i * sliceAngle
      const endAngle = startAngle + sliceAngle

      // Проверка, попадает ли клик в сектор
      const angle = Math.atan2(mouseY - centerY, mouseX - centerX)
      const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle
      if (
        normalizedAngle >= startAngle &&
        normalizedAngle <= endAngle &&
        Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2) <= radius
      ) {
        setSelectedSlice(i)
        break
      }
    }
  }
  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400" onClick={handleClick}></canvas>
    </div>
  )
}
