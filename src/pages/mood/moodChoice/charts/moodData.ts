export const moodData = () => ({
  basic_emotions: [
    {
      name: 'Joy',
      intensity: ['Serenity', 'Joy', 'Ecstasy'],
      complex_emotions: ['Love (Joy + Trust)'],
      color: '#e7e722',
    },
    {
      name: 'Trust',
      intensity: ['Acceptance', 'Trust', 'Admiration'],
      complex_emotions: ['Love (Joy + Trust)', 'Submission (Trust + Fear)'],
      color: '#5ce65c',
    },
    {
      name: 'Fear',
      intensity: ['Apprehension', 'Fear', 'Terror'],
      complex_emotions: ['Submission (Trust + Fear)', 'Awe (Fear + Surprise)'],
      color: '#0c910c',
    },
    {
      name: 'Surprise',
      intensity: ['Distraction', 'Surprise', 'Amazement'],
      complex_emotions: ['Awe (Fear + Surprise)', 'Disapproval (Surprise + Sadness)'],
      color: '#42aaff',
    },
    {
      name: 'Sadness',
      intensity: ['Pensiveness', 'Sadness', 'Grief'],
      complex_emotions: ['Remorse (Sadness + Disgust)', 'Disapproval (Surprise + Sadness)'],
      color: '#1a1af7',
    },
    {
      name: 'Disgust',
      intensity: ['Boredom', 'Disgust', 'Loathing'],
      complex_emotions: ['Remorse (Sadness + Disgust)', 'Contempt (Disgust + Anger)'],
      color: '#f829f8',
    },
    {
      name: 'Anger',
      intensity: ['Annoyance', 'Anger', 'Rage'],
      complex_emotions: ['Aggressiveness (Anger + Anticipation)', 'Contempt (Disgust + Anger)'],
      color: '#ff2c2c',
    },
    {
      name: 'Anticipation',
      intensity: ['Interest', 'Anticipation', 'Vigilance'],
      complex_emotions: ['Aggressiveness (Anger + Anticipation)', 'Optimism (Anticipation + Joy)'],
      color: '#db6300',
    },
  ],
  complex_emotions: [
    {
      name: 'Love',
      combination: ['Joy', 'Trust'],
    },
    {
      name: 'Aggressiveness',
      combination: ['Anger', 'Anticipation'],
    },
    {
      name: 'Submission',
      combination: ['Trust', 'Fear'],
    },
    {
      name: 'Awe',
      combination: ['Fear', 'Surprise'],
    },
    {
      name: 'Disapproval',
      combination: ['Surprise', 'Sadness'],
    },
    {
      name: 'Remorse',
      combination: ['Sadness', 'Disgust'],
    },
    {
      name: 'Contempt',
      combination: ['Disgust', 'Anger'],
    },
    {
      name: 'Optimism',
      combination: ['Anticipation', 'Joy'],
    },
  ],
})
