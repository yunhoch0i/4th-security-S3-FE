import React from 'react';

interface TutorialStepCardProps {
    title: string;
    description: string;
    stepNumber: number;
    onClick: () => void;
}

const TutorialStepCard: React.FC<TutorialStepCardProps> = ({ title, description, stepNumber, onClick }) => {
    return (
        <div className="tutorial-step-card" onClick={onClick}>
            <h3>{`Step ${stepNumber}: ${title}`}</h3>
            <p>{description}</p>
        </div>
    );
};

export default TutorialStepCard;