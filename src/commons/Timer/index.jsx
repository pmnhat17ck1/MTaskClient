import React, { memo, useState, useEffect } from 'react';

const Timer = memo(({ seconds, isSend, setIsSend }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    useEffect(() => {
        if (timeLeft === 0) {
            console.log("TIME LEFT IS 0");
            setIsSend(false)
            setTimeLeft(null)
        }
        let intervalId;
        if (isSend) {
            if (!timeLeft) return;
            intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isSend, setIsSend, timeLeft]);

    useEffect(() => {
        if (isSend === true && timeLeft === 0) {
            setTimeLeft(seconds)
        }
    }, [isSend, seconds, timeLeft])

    return (
        <div>
            <h4>{!isSend ? '--' : timeLeft}</h4>
        </div>
    );
});
export default (Timer);
