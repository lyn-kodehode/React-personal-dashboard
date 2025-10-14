import styles from "../../styles/Clock.module.css";
import { useState, useEffect } from "react";
import DateCard from "./DateCard.jsx";

export default function Clock() {
  // initial time state (gets current time)
  const [time, setTime] = useState(new Date());
  const hourRotation = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const minuteRotation = time.getMinutes() * 6;
  const secondRotation = time.getSeconds() * 6;

  //   360º / 12 hrs = 30º
  //   console.log(time.getHours() * 30);

  const numbers = [
    "twelve",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      // updates current time per interval
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.clockWrapper}>
      {/* clock component */}
      <div className={styles.clockContainer}>
        <div className={styles.clockDotContainer}>
          <div className={styles.clockDot}></div>
        </div>

        {numbers.map((num, index) => {
          return (
            <div key={index} className={`${styles.clockHour} ${styles[num]}`}>
              {index === 0 ? 12 : index}
            </div>
          );
        })}

        <div
          className={styles.clockHourHand}
          style={{
            transform: `rotateZ(${hourRotation}deg)`,
          }}
        ></div>
        <div
          className={styles.clockMinuteHand}
          style={{ transform: `rotateZ(${minuteRotation}deg)` }}
        ></div>
        <div
          className={styles.clockSecondHand}
          style={{ transform: `rotateZ(${secondRotation}deg)` }}
        ></div>
      </div>

      {/* datecard component */}
      <DateCard className={styles.dateCardBelow} />
    </div>
  );
}
