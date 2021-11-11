import React from "react";
import styles from "./Header.module.css";

const Header = (props) => {
  const { date, months, days } = props;
  const fullDateScreen = date.toLocaleString().split(" ");
  const dateScreen = fullDateScreen[0].replaceAll(".", " ");
  const dayScreen = days[date.getDay()];
  const monthScreen = months[date.getMonth() + 1];

  const smallDateFormat =
    dayScreen + "," + " " + dateScreen.slice(1, -8) + " " + monthScreen;
  const bigDateFormat =
    dayScreen + "," + " " + dateScreen.slice(0, -8) + " " + monthScreen;

  return (
    <header className={styles.inputDublicat}>
      <h1>{fullDateScreen[1].slice(0, 5)}</h1>
      <p>{dateScreen[0] == 0 ? smallDateFormat : bigDateFormat}</p>
    </header>
  );
};

export default Header;
