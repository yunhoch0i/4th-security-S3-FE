import { useState } from 'react';

export const useTimeMode = () => {
    const [timeMode, setTimeMode] = useState('normal'); // 기본 시간 모드 설정

    const toggleTimeMode = () => {
        setTimeMode((prevMode) => (prevMode === 'normal' ? 'timeTravel' : 'normal'));
    };

    return {
        timeMode,
        toggleTimeMode,
    };
};