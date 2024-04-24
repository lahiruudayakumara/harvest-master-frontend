import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const DateCalendarValueX = function DateCalendarValue() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <DemoItem>
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
            style={{
              width: "90%",
              padding: "5%",
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateCalendarValueX;
