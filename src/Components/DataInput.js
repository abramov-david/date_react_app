import React, { useState, useEffect, useRef } from "react";
import styles from "./DataInput.module.css";
import Header from "./Header";

const dayNames = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const monthNames = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
const cur_date = new Date();
const arrDate = cur_date.toLocaleString().split(".");
arrDate[1] = monthNames[+arrDate[1]];

const DataInput = () => {
  const inputEl = useRef();
  const [selection, setSelection] = useState();
  const [value, setValue] = useState(arrDate.join("/").replace(",", ""));

  useEffect(() => {
    if (!selection) return; // prevent running on start
    const { start, end } = selection;
    inputEl.current.focus();
    inputEl.current.setSelectionRange(start, end);
  }, [selection]);

  const keyHandler = (e) => {
    //ARROW UP
    if (!e.getModifierState("Control")) {
      if (e.key == "ArrowUp") {
        e.preventDefault();
        if (
          //ADD Day
          inputEl.current.selectionStart >= 0 &&
          inputEl.current.selectionStart <= 1
        ) {
          setSelection({ start: 0, end: 2 });
          let curMonth = cur_date.getMonth();
          let curYear = cur_date.getFullYear();
          cur_date.setDate(cur_date.getDate() + 1);

          if (cur_date.getMonth() !== curMonth) {
            cur_date.setMonth(curMonth);
            cur_date.setFullYear(curYear);
          }
          const arrDate = cur_date.toLocaleString().split(".");
          arrDate[1] = monthNames[+arrDate[1]];
          setValue(arrDate.join("/").replace(",", ""));
        }

        if (
          //ADD Month
          inputEl.current.selectionStart >= 3 &&
          inputEl.current.selectionStart <= arrDate[1].length + 3
        ) {
          let curYear = cur_date.getFullYear();
          cur_date.setMonth(cur_date.getMonth() + 1);
          if (cur_date.getFullYear() !== curYear) {
            cur_date.setFullYear(curYear);
          }
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({ start: 3, end: newArrDate[1].length + 3 });
        }
        if (
          //ADD Year
          inputEl.current.selectionStart >= arrDate[1].length + 4 &&
          inputEl.current.selectionStart <= arrDate[1].length + 8
        ) {
          cur_date.setFullYear(cur_date.getFullYear() + 1);
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({
            start: newArrDate[1].length + 4,
            end: newArrDate[1].length + 8,
          });
        }
        if (
          //ADD Hour
          inputEl.current.selectionStart >= arrDate[1].length + 9 &&
          inputEl.current.selectionStart <= arrDate[1].length + 11
        ) {
          let curDay = cur_date.getDate();
          cur_date.setHours(cur_date.getHours() + 1);
          if (cur_date.getDate() !== curDay) {
            cur_date.setDate(curDay);
          }
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({
            start: newArrDate[1].length + 9,
            end: newArrDate[1].length + 11,
          });
        }
        if (
          //ADD Minutes
          inputEl.current.selectionStart >= arrDate[1].length + 12 &&
          inputEl.current.selectionStart <= arrDate[1].length + 14
        ) {
          let curHour = cur_date.getHours();
          cur_date.setMinutes(cur_date.getMinutes() + 1);
          if (cur_date.getHours() !== curHour) {
            cur_date.setHours(curHour);
          }
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({
            start: newArrDate[1].length + 12,
            end: newArrDate[1].length + 14,
          });
        }
        if (
          //ADD Seconds
          inputEl.current.selectionStart >= arrDate[1].length + 15 &&
          inputEl.current.selectionStart <= arrDate[1].length + 17
        ) {
          let curMinutes = cur_date.getMinutes();
          cur_date.setSeconds(cur_date.getSeconds() + 1);
          if (cur_date.getMinutes() !== curMinutes) {
            cur_date.setMinutes(curMinutes);
          }
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({
            start: newArrDate[1].length + 15,
            end: newArrDate[1].length + 17,
          });
        }
      }

      if (e.key == "ArrowDown") {
        e.preventDefault();
        //SUBSTRACT Day
        if (
          inputEl.current.selectionStart >= 0 &&
          inputEl.current.selectionStart <= 1
        ) {
          setSelection({ start: 0, end: 2 });
          let curMonth = cur_date.getMonth();
          let curYear = cur_date.getFullYear();
          if (cur_date.getDate() === 1) {
            cur_date.setMonth(cur_date.getMonth() + 1);
          }
          cur_date.setDate(cur_date.getDate() - 1);

          if (cur_date.getMonth() !== curMonth) {
            cur_date.setMonth(curMonth);
            cur_date.setFullYear(curYear);
          }
          const arrDate = cur_date.toLocaleString().split(".");
          arrDate[1] = monthNames[+arrDate[1]];
          setValue(arrDate.join("/").replace(",", ""));
        }
        //SUBSTRACT Month
        if (
          inputEl.current.selectionStart >= 3 &&
          inputEl.current.selectionStart <= arrDate[1].length + 3
        ) {
          let curYear = cur_date.getFullYear();
          cur_date.setMonth(cur_date.getMonth() - 1);
          if (cur_date.getFullYear() !== curYear) {
            cur_date.setFullYear(curYear);
          }
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({ start: 3, end: newArrDate[1].length + 3 });
        }
        //SUBSTRACT Year
        if (
          inputEl.current.selectionStart >= arrDate[1].length + 4 &&
          inputEl.current.selectionStart <= arrDate[1].length + 8
        ) {
          cur_date.setFullYear(cur_date.getFullYear() - 1);
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({
            start: newArrDate[1].length + 4,
            end: newArrDate[1].length + 8,
          });
        }
        if (
          //SUBSTRACT Hour
          inputEl.current.selectionStart >= arrDate[1].length + 9 &&
          inputEl.current.selectionStart <= arrDate[1].length + 11
        ) {
          let curDay = cur_date.getDate();
          cur_date.setHours(cur_date.getHours() - 1);
          if (cur_date.getDate() !== curDay) {
            cur_date.setDate(curDay);
          }
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({
            start: newArrDate[1].length + 9,
            end: newArrDate[1].length + 11,
          });
        }
        if (
          //SUBSTRACT Minutes
          inputEl.current.selectionStart >= arrDate[1].length + 12 &&
          inputEl.current.selectionStart <= arrDate[1].length + 14
        ) {
          let curHour = cur_date.getHours();
          cur_date.setMinutes(cur_date.getMinutes() - 1);
          if (cur_date.getHours() !== curHour) {
            cur_date.setHours(curHour);
          }
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({
            start: newArrDate[1].length + 12,
            end: newArrDate[1].length + 14,
          });
        }
        if (
          //SUBSTRACT Seconds
          inputEl.current.selectionStart >= arrDate[1].length + 15 &&
          inputEl.current.selectionStart <= arrDate[1].length + 17
        ) {
          let curMinutes = cur_date.getMinutes();
          cur_date.setSeconds(cur_date.getSeconds() - 1);
          if (cur_date.getMinutes() !== curMinutes) {
            cur_date.setMinutes(curMinutes);
          }
          const newArrDate = cur_date.toLocaleString().split(".");
          newArrDate[1] = monthNames[+newArrDate[1]];
          setValue(newArrDate.join("/").replace(",", ""));
          setSelection({
            start: newArrDate[1].length + 15,
            end: newArrDate[1].length + 17,
          });
        }
      }
    }

    ////////////////////////////////////////////////////////////////

    ///ARROW UP + CTRL

    if (e.key == "ArrowUp" && e.getModifierState("Control")) {
      //ADD Day
      if (
        inputEl.current.selectionStart >= 0 &&
        inputEl.current.selectionStart <= 2
      ) {
        setSelection({ start: 0, end: 2 });
        cur_date.setDate(cur_date.getDate() + 1);
        const newDate = cur_date.toLocaleString().split(".");
        newDate[1] = monthNames[+newDate[1]];
        setValue(newDate.join("/").replace(",", ""));
      }
      //ADD Month
      if (
        inputEl.current.selectionStart >= 3 &&
        inputEl.current.selectionStart <= arrDate[1].length + 3
      ) {
        cur_date.setMonth(cur_date.getMonth() + 1);
        const newMonth = cur_date.toLocaleString().split(".");
        newMonth[1] = monthNames[+newMonth[1]];
        setSelection({ start: 3, end: newMonth[1].length + 3 });
        setValue(newMonth.join("/").replace(",", ""));
      }

      //ADD Year
      if (
        inputEl.current.selectionStart >= arrDate[1].length + 4 &&
        inputEl.current.selectionStart <= arrDate[1].length + 8
      ) {
        cur_date.setFullYear(cur_date.getFullYear() + 1);
        const newYear = cur_date.toLocaleString().split(".");
        newYear[1] = monthNames[+newYear[1]];
        setSelection({
          start: newYear[1].length + 4,
          end: newYear[1].length + 8,
        });
        setValue(newYear.join("/").replace(",", ""));
      }

      //ADD Hours
      if (
        inputEl.current.selectionStart >= arrDate[1].length + 9 &&
        inputEl.current.selectionStart <= arrDate[1].length + 11
      ) {
        cur_date.setHours(cur_date.getHours() + 1);
        const newHour = cur_date.toLocaleString().split(".");
        newHour[1] = monthNames[+newHour[1]];
        setSelection({
          start: newHour[1].length + 9,
          end: newHour[1].length + 11,
        });
        setValue(newHour.join("/").replace(",", ""));
      }
      //ADD Minutes
      if (
        inputEl.current.selectionStart >= arrDate[1].length + 12 &&
        inputEl.current.selectionStart <= arrDate[1].length + 14
      ) {
        cur_date.setMinutes(cur_date.getMinutes() + 1);
        const newMinute = cur_date.toLocaleString().split(".");
        newMinute[1] = monthNames[+newMinute[1]];
        setSelection({
          start: newMinute[1].length + 12,
          end: newMinute[1].length + 14,
        });
        setValue(newMinute.join("/").replace(",", ""));
      }
      //ADD Seconds
      if (
        inputEl.current.selectionStart >= arrDate[1].length + 15 &&
        inputEl.current.selectionStart <= arrDate[1].length + 17
      ) {
        cur_date.setSeconds(cur_date.getSeconds() + 1);
        const newSecond = cur_date.toLocaleString().split(".");
        newSecond[1] = monthNames[+newSecond[1]];
        setSelection({
          start: newSecond[1].length + 15,
          end: newSecond[1].length + 17,
        });
        setValue(newSecond.join("/").replace(",", ""));
      }
    }

    // ARROW DOWN + CTRL

    if (e.key == "ArrowDown" && e.getModifierState("Control")) {
      e.preventDefault();
      if (
        inputEl.current.selectionStart >= 0 &&
        inputEl.current.selectionStart <= 2
      ) {
        setSelection({ start: 0, end: 2 });
        cur_date.setDate(cur_date.getDate() - 1);
        const newDate = cur_date.toLocaleString().split(".");
        newDate[1] = monthNames[+newDate[1]];
        setValue(newDate.join("/").replace(",", ""));
      }

      if (
        inputEl.current.selectionStart >= 3 &&
        inputEl.current.selectionStart <= arrDate[1].length + 3
      ) {
        cur_date.setMonth(cur_date.getMonth() - 1);
        const newMonth = cur_date.toLocaleString().split(".");
        newMonth[1] = monthNames[+newMonth[1]];
        setSelection({ start: 3, end: newMonth[1].length + 3 });
        setValue(newMonth.join("/").replace(",", ""));
      }

      if (
        inputEl.current.selectionStart >= arrDate[1].length + 4 &&
        inputEl.current.selectionStart <= arrDate[1].length + 8
      ) {
        cur_date.setFullYear(cur_date.getFullYear() - 1);
        const newYear = cur_date.toLocaleString().split(".");
        newYear[1] = monthNames[+newYear[1]];
        setSelection({
          start: newYear[1].length + 4,
          end: newYear[1].length + 8,
        });
        setValue(newYear.join("/").replace(",", ""));
      }

      if (
        inputEl.current.selectionStart >= arrDate[1].length + 9 &&
        inputEl.current.selectionStart <= arrDate[1].length + 11
      ) {
        cur_date.setHours(cur_date.getHours() - 1);
        const newHour = cur_date.toLocaleString().split(".");
        newHour[1] = monthNames[+newHour[1]];
        setSelection({
          start: newHour[1].length + 9,
          end: newHour[1].length + 11,
        });
        setValue(newHour.join("/").replace(",", ""));
      }

      if (
        inputEl.current.selectionStart >= arrDate[1].length + 12 &&
        inputEl.current.selectionStart <= arrDate[1].length + 14
      ) {
        cur_date.setMinutes(cur_date.getMinutes() - 1);
        const newMinute = cur_date.toLocaleString().split(".");
        newMinute[1] = monthNames[+newMinute[1]];
        setSelection({
          start: newMinute[1].length + 12,
          end: newMinute[1].length + 14,
        });
        setValue(newMinute.join("/").replace(",", ""));
      }

      if (
        inputEl.current.selectionStart >= arrDate[1].length + 15 &&
        inputEl.current.selectionStart <= arrDate[1].length + 17
      ) {
        cur_date.setSeconds(cur_date.getSeconds() - 1);
        const newSecond = cur_date.toLocaleString().split(".");
        newSecond[1] = monthNames[+newSecond[1]];
        setSelection({
          start: newSecond[1].length + 15,
          end: newSecond[1].length + 17,
        });
        setValue(newSecond.join("/").replace(",", ""));
      }
    }
  };

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.content}>
      <Header date={cur_date} months={monthNames} days={dayNames} />
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}> Frontend Task</h1>
          <input
            ref={inputEl}
            value={value}
            onChange={changeHandler}
            onKeyDown={keyHandler}
          />

          <div className={styles.textBlock}>
            <div className={styles.instruction}>
              <p>
                You can change input parts of date
                (day,month,year,hour,minutes,seconds) by pressing buttons or
                combination. The cursor must be on the focus in the input field.
              </p>
            </div>
            <div>
              <h3>Buttons </h3>
              <p>&uarr; - unmutable date</p>
              <p>&darr; - unmutable date</p>
            </div>
            <div>
              <h3>Combinations</h3>
              <p>"CTRL" + &uarr; - mutable date</p>
              <p>"CTRL" + &darr; - unmutable date</p>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p className={styles.name}>DAVID ABRAMOV</p>
        <hr width="1200px" className={styles.line} />
      </footer>
    </div>
  );
};

export default DataInput;
