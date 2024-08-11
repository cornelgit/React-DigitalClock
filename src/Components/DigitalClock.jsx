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

    return (
        <div className="clock-container">
            <div className="clock">
                <div className="time-block">
                    <span>{`${formatDateTime().hours}:`}</span>
                </div>
                <div className="time-block">
                    <span>{`${formatDateTime().minutes}:`}</span>
                </div>
                <div className="time-block">
                    <span>{`${formatDateTime().seconds}`}</span>
                </div>
                <div className="meridiem-block">
                    <span className="meridiem">
                        {formatDateTime().meridiem}
                    </span>
                </div>
            </div>
            <div className="date-container">
                <div className="date">
                    <span>{`${formatDateTime().month}/`}</span>
                    <span>{`${formatDateTime().day}/`}</span>
                    <span>{`${formatDateTime().year}`}</span>
                </div>
                <div className="dayString">
                    <span>{`${formatDateTime().dayOfWeek}`}</span>
                </div>
            </div>
        </div>
    );
}

export default DigitalClock;
