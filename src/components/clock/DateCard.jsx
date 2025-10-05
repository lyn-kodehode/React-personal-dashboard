import styles from "../../styles/DateCard.module.css";
import { useState, useEffect } from "react";

export default function DateCard({ className }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return (
    <div className={`${styles.dateContainer} ${className}`}>
      <div className={styles.day}>{day}</div>
      <div className={styles.date}>
        <span className={styles.dayNumber}>{dayNumber}</span>
        <span className={styles.month}>{month}</span>
        <span className={styles.year}>{year}</span>
      </div>
    </div>
  );
}
