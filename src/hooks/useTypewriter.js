import { useState, useEffect } from 'react';

const useTypewriter = (textArray, typingSpeed = 80, deletingSpeed = 40, pauseTime = 1500) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

    useEffect(() => {
        let timer;
        const handleType = () => {
            const i = loopNum % textArray.length;
            const fullText = textArray[i];

            setDisplayedText(
                isDeleting
                    ? fullText.substring(0, displayedText.length - 1)
                    : fullText.substring(0, displayedText.length + 1)
            );

            setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

            if (!isDeleting && displayedText === fullText) {
                setTypingSpeedState(pauseTime);
                setIsDeleting(true);
            } else if (isDeleting && displayedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeedState(500);
            }
        };

        timer = setTimeout(handleType, typingSpeedState);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, loopNum, textArray, typingSpeed, deletingSpeed, pauseTime, typingSpeedState]);

    return displayedText;
};

export default useTypewriter;
