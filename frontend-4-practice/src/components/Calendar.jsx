import { isDateSelectable, buildCalendarGrid, MONTHS_NOMINATIVE, isHoliday } from '../utils'; 

function Calendar({ booking, setBooking }) {    
    const {currentMonth, currentYear, selectedDay, today} = booking; 
    const weeks = buildCalendarGrid(currentYear, currentMonth);

    const changeMonth = (delta) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;
        let newSelectedDay = null;

        if (newMonth < 0){
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        if (newMonth === today.month && newYear === today.year)
            newSelectedDay = today.day;
        else {
            if (isDateSelectable(17, newMonth, newYear, today) && !isHoliday(17, newMonth))
                newSelectedDay = 17;
            else
                newSelectedDay = null;
        }

        setBooking({ ...booking, currentMonth: newMonth, currentYear: newYear, selectedDay: newSelectedDay, selectedTime: null });
    }

    const handleDayClick = (day) => {
        setBooking({ ...booking, selectedDay: day, selectedTime: null});

    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2 className="name-month">{MONTHS_NOMINATIVE[currentMonth]} {currentYear}</h2>
                <div className="month-buttons">
                    <button className="button-arrow last-month" onClick={() => changeMonth(-1)}>⯇</button>
                    <button className="button-arrow next-month" onClick={() => changeMonth(1)}>⯈</button>
                </div>
            </div>
            <div className="name-days">
                <p className="day">Пн</p>
                <p className="day">Вт</p>
                <p className="day">Ср</p>
                <p className="day">Чт</p>
                <p className="day">Пт</p>
                <p className="day weekend">Сб</p>
                <p className="day weekend">Вс</p>
            </div>
            <div className="weeks">
                {weeks.map((week, weekIndex) => (
                    <div className="week" key={weekIndex}>
                        {week.map((cell, cellIndex) => {
                            let buttonClass = "button-day ";
                            let isDisabled = false;
                             if (cell.otherMonth || !isDateSelectable(cell.day, currentMonth, currentYear, today) || isHoliday(cell.day, currentMonth)) {
                                buttonClass += "inactive-day";
                                isDisabled = true;
                            } else {
                                if (cell.day === selectedDay)
                                    buttonClass += "selected-day";
                                else
                                    buttonClass += "active-day";
                            }

                            return (
                                <button
                                    key={cellIndex}
                                    className={buttonClass}
                                    disabled={isDisabled}
                                    onClick={() => handleDayClick(cell.day)}
                                >{cell.day}</button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calendar;