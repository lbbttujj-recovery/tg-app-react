import React, {useEffect, useRef, useState} from 'react'
const MOOD = {
    "basic_emotions": [
        {
            "name": "Joy",
            "intensity": ["Serenity", "Joy", "Ecstasy"],
            "complex_emotions": ["Love (Joy + Trust)"],
            'color': '#e7e722',
        },
        {
            "name": "Trust",
            "intensity": ["Acceptance", "Trust", "Admiration"],
            "complex_emotions": ["Love (Joy + Trust)", "Submission (Trust + Fear)"],
            'color': '#5ce65c',
        },
        {
            "name": "Fear",
            "intensity": ["Apprehension", "Fear", "Terror"],
            "complex_emotions": ["Submission (Trust + Fear)", "Awe (Fear + Surprise)"],
            'color': '#0c910c',
        },
        {
            "name": "Surprise",
            "intensity": ["Distraction", "Surprise", "Amazement"],
            "complex_emotions": ["Awe (Fear + Surprise)", "Disapproval (Surprise + Sadness)"],
            'color': '#42aaff',
        },
        {
            "name": "Sadness",
            "intensity": ["Pensiveness", "Sadness", "Grief"],
            "complex_emotions": ["Remorse (Sadness + Disgust)", "Disapproval (Surprise + Sadness)"],
            'color': '#1a1af7',
        },
        {
            "name": "Disgust",
            "intensity": ["Boredom", "Disgust", "Loathing"],
            "complex_emotions": ["Remorse (Sadness + Disgust)", "Contempt (Disgust + Anger)"],
            'color': '#f829f8',
        },
        {
            "name": "Anger",
            "intensity": ["Annoyance", "Anger", "Rage"],
            "complex_emotions": ["Aggressiveness (Anger + Anticipation)", "Contempt (Disgust + Anger)"],
            'color': '#ff2c2c',
        },
        {
            "name": "Anticipation",
            "intensity": ["Interest", "Anticipation", "Vigilance"],
            "complex_emotions": ["Aggressiveness (Anger + Anticipation)", "Optimism (Anticipation + Joy)"],
            'color': '#db6300',

        }
    ],
    "complex_emotions": [
        {
            "name": "Love",
            "combination": ["Joy", "Trust"]
        },
        {
            "name": "Aggressiveness",
            "combination": ["Anger", "Anticipation"]
        },
        {
            "name": "Submission",
            "combination": ["Trust", "Fear"]
        },
        {
            "name": "Awe",
            "combination": ["Fear", "Surprise"]
        },
        {
            "name": "Disapproval",
            "combination": ["Surprise", "Sadness"]
        },
        {
            "name": "Remorse",
            "combination": ["Sadness", "Disgust"]
        },
        {
            "name": "Contempt",
            "combination": ["Disgust", "Anger"]
        },
        {
            "name": "Optimism",
            "combination": ["Anticipation", "Joy"]
        }
    ]
}

const getLightAndDarkColors = (hex: string) => {
    // Преобразуем HEX цвет в RGB
    const rgb = parseInt(hex.slice(1), 16); // Убираем '#'
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Получаем более светлый и более темный оттенки
    const lighten = (factor: number) => {
        return `rgb(${Math.min(255, r + factor)}, ${Math.min(255, g + factor)}, ${Math.min(255, b + factor)})`;
    };
    const darken = (factor: number) => {
        return `rgb(${Math.max(0, r - factor)}, ${Math.max(0, g - factor)}, ${Math.max(0, b - factor)})`;
    };

    return [lighten(60), darken(60)]; // Возвращаем светлый и темный оттенки
};



export const  Pie = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedSlice, setSelectedSlice] = useState<number|null>(null)
    const {basic_emotions} = MOOD

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas = canvasRef.current;
        if(!canvas) {
            return
        }
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left; // Корректируем координаты
        const mouseY = event.clientY - rect.top;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 150; // Радиус круга
        const slices = 8; // Количество частей
        const sliceAngle = (2 * Math.PI) / slices; // Угол каждой части

        for (let i = 0; i < slices; i++) {
            const startAngle = i * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            // Проверка, попадает ли клик в сектор
            const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
            const normalizedAngle = (angle < 0 ? angle + 2 * Math.PI : angle);
            if (normalizedAngle >= startAngle && normalizedAngle <= endAngle &&
                Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2) <= radius) {
                setSelectedSlice(i);
                break;
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) {
            return
        }
        const ctx = canvas.getContext('2d');
        if(!ctx) {
            return;
        }
        ctx.clearRect(0,0,400, 400)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 150; // Радиус круга

        if(selectedSlice) {
            const intensity = basic_emotions[selectedSlice].intensity
            const width = 400
            const height = 400
            const partWidth = width / 3; // Ширина каждой части

            const [lightColor, darkColor] = getLightAndDarkColors(basic_emotions[selectedSlice].color);
            // Создаем линейный градиент для всей области
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, lightColor); // Светлый оттенок
            gradient.addColorStop(1, darkColor); // Темный оттенок

            // Рисуем прямоугольник с градиентом
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height); // Рисуем полный прямоугольник

            // Добавляем текст в каждую часть
            ctx.fillStyle = '#000'; // Цвет текста
            ctx.font = '20px Arial'; // Шрифт и размер текста
            ctx.textAlign = 'center'; // Выравнивание текста по центру
            ctx.textBaseline = 'middle'; // Выравнивание текста по середине

            // Текст для первой части
            ctx.fillText(intensity[0], partWidth / 2, height / 4);
            // Текст для второй части
            ctx.fillText(intensity[1], partWidth + partWidth / 2, height / 4);
            // Текст для третьей части
            ctx.fillText(intensity[2], partWidth * 2 + partWidth / 2, height / 4);

        } else {
            const slices = 8; // Количество частей
            const sliceAngle = (2 * Math.PI) / slices; // Угол каждой части

            for (let i = 0; i < slices; i++) {
                const startAngle = i * sliceAngle;
                const endAngle = startAngle + sliceAngle;

                ctx.fillStyle = basic_emotions[i].color;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.closePath();
                ctx.fill();

                const textAngle = startAngle + sliceAngle / 2; // Центр сектора
                const textX = centerX + (radius / 1.5) * Math.cos(textAngle); // Позиция текста по X
                const textY = centerY + (radius / 1.5) * Math.sin(textAngle); // Позиция текста по Y

                ctx.fillStyle = '#000'; // Цвет текста
                ctx.font = '16px Arial'; // Шрифт и размер текста
                ctx.textAlign = 'center'; // Текст выровнен по центру
                ctx.textBaseline = 'middle'; // Текст в вертикальной середине
                ctx.fillText(basic_emotions[i].name, textX, textY); // Рисуем текст в середине сектора
            }
        }
    }, [basic_emotions, selectedSlice]);

    return  (
        <div>
            {selectedSlice && <button onClick={()=> setSelectedSlice(null)}>назад</button>}
            <canvas ref={canvasRef} width="400" height={selectedSlice ? 200 : 400} onClick={handleClick}></canvas>
        </div>
)

};
