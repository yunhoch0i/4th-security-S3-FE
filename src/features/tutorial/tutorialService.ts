import { Tutorial } from '../../types/tutorialTypes';

const tutorials: Tutorial[] = [
    {
        id: 1,
        title: 'Getting Started with the App',
        description: 'Learn how to navigate and use the app effectively.',
        steps: [
            'Step 1: Create an account',
            'Step 2: Explore the stock market',
            'Step 3: Participate in contests',
        ],
    },
    {
        id: 2,
        title: 'Advanced Trading Techniques',
        description: 'Master the art of trading with advanced strategies.',
        steps: [
            'Step 1: Understand market trends',
            'Step 2: Analyze stock performance',
            'Step 3: Execute trades strategically',
        ],
    },
];

export const getTutorials = () => {
    return tutorials;
};

export const getTutorialById = (id: number) => {
    return tutorials.find(tutorial => tutorial.id === id);
};