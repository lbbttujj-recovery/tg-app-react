import React, {useEffect, useRef} from 'react'
const MOOD = {
    "basic_emotions": [
        {
            "name": "Joy",
            "intensity": ["Serenity", "Joy", "Ecstasy"],
            "complex_emotions": ["Love (Joy + Trust)"],
            'color': 'yellow',
        },
        {
            "name": "Trust",
            "intensity": ["Acceptance", "Trust", "Admiration"],
            "complex_emotions": ["Love (Joy + Trust)", "Submission (Trust + Fear)"],
            'color': 'light green',
        },
        {
            "name": "Fear",
            "intensity": ["Apprehension", "Fear", "Terror"],
            "complex_emotions": ["Submission (Trust + Fear)", "Awe (Fear + Surprise)"],
            'color': 'green',
        },
        {
            "name": "Surprise",
            "intensity": ["Distraction", "Surprise", "Amazement"],
            "complex_emotions": ["Awe (Fear + Surprise)", "Disapproval (Surprise + Sadness)"],
            'color': 'light blue',
        },
        {
            "name": "Sadness",
            "intensity": ["Pensiveness", "Sadness", "Grief"],
            "complex_emotions": ["Remorse (Sadness + Disgust)", "Disapproval (Surprise + Sadness)"],
            'color': 'blue',
        },
        {
            "name": "Disgust",
            "intensity": ["Boredom", "Disgust", "Loathing"],
            "complex_emotions": ["Remorse (Sadness + Disgust)", "Contempt (Disgust + Anger)"],
            'color': 'purple',
        },
        {
            "name": "Anger",
            "intensity": ["Annoyance", "Anger", "Rage"],
            "complex_emotions": ["Aggressiveness (Anger + Anticipation)", "Contempt (Disgust + Anger)"],
            'color': 'red',
        },
        {
            "name": "Anticipation",
            "intensity": ["Interest", "Anticipation", "Vigilance"],
            "complex_emotions": ["Aggressiveness (Anger + Anticipation)", "Optimism (Anticipation + Joy)"],
            'color': 'orange',

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

export const  Pie = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {basic_emotions} = MOOD

    useEffect(() => {
        const canvas = canvasRef.current;
        if(canvas) {
            const ctx = canvas.getContext('2d');
            if(ctx) {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = 150; // Радиус круга
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
                }
            }
        }
    }, []);

    return <canvas ref={canvasRef} width="400" height="400"></canvas>;
};
