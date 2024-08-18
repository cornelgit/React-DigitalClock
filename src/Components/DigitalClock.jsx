import { useState, useEffect } from "react";
import "./digitalclock.css";

function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    function formatDateTime() {
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const year = time.getFullYear();
        let dayOfWeek = time.toLocaleString("en-us", { weekday: "long" });

        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return {
            month: month,
            day: day,
            year: year,
            dayOfWeek: dayOfWeek,
            hours: hours,
            minutes: padZero(minutes),
            seconds: padZero(seconds),
            meridiem: meridiem,
        };
    }

    function padZero(number) {
        return (number < 10 ? "0" : "") + number;
    }

    const formattedTime = formatDateTime();

    return (
        <div className="clock-container" role="timer" aria-live="polite">
            <div className="clock" aria-label="Current time">
                <div className="time-block" aria-label="Hours">
                    <span>{`${formattedTime.hours}:`}</span>
                </div>
                <div className="time-block" aria-label="Minutes">
                    <span>{`${formattedTime.minutes}:`}</span>
                </div>
                <div className="time-block" aria-label="Seconds">
                    <span>{`${formattedTime.seconds}`}</span>
                </div>
                <div className="meridiem-block" aria-label="Meridiem">
                    <span className="meridiem">{formattedTime.meridiem}</span>
                </div>
            </div>
            <div className="date-container" aria-label="Current date">
                <div className="date">
                    <span>{`${formattedTime.month}/`}</span>
                    <span>{`${formattedTime.day}/`}</span>
                    <span>{`${formattedTime.year}`}</span>
                </div>
                <div className="dayString">
                    <span>{`${formattedTime.dayOfWeek}`}</span>
                </div>
            </div>
        </div>
    );
}

export default DigitalClock;
