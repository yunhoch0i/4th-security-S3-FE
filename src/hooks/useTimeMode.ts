import { useState, useEffect } from 'react';

const useTimeMode = () => {
    const [timeMode, setTimeMode] = useState('normal'); // 기본 시간 모드 설정

    const toggleTimeMode = () => {
        setTimeMode((prevMode) => (prevMode === 'normal' ? 'timeTravel' : 'normal'));
    };

    useEffect(() => {
        // 시간 모드에 따른 추가 로직을 여기에 작성
        if (timeMode === 'timeTravel') {
            // 시간 여행 모드 활성화 시 처리할 내용
        } else {
            // 일반 모드 활성화 시 처리할 내용
        }
    }, [timeMode]);

    return { timeMode, toggleTimeMode };
};

export default useTimeMode;