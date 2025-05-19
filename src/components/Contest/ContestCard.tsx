import React from 'react';

interface ContestCardProps {
    title: string;
    description: string;
    participants: number;
    onJoin: () => void;
}

const ContestCard: React.FC<ContestCardProps> = ({ title, description, participants, onJoin }) => {
    return (
        <div className="contest-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Participants: {participants}</p>
            <button onClick={onJoin}>Join Contest</button>
        </div>
    );
};

export default ContestCard;