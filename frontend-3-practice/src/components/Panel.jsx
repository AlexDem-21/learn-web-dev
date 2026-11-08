import { MONTHS_GENITIVE, isDateSelectable, isHoliday } from "../utils";

function Panel({ booking }) {
    const { selectedDay, currentMonth, currentYear, selectedTime } = booking;
    const isDayAvailable = (selectedDay !== null && isDateSelectable(selectedDay, currentMonth, currentYear) && !isHoliday(selectedDay, currentMonth));
    
    return (
        <div className="date-time">
            <p>
                <span className="header-date-time">Дата: </span>
                {isDayAvailable ? `${selectedDay}` : '--'}
                {` ${MONTHS_GENITIVE[currentMonth]} ${currentYear}`}
            </p>
            <p>
                <span className="header-date-time">Время: </span>
                {isDayAvailable && selectedTime ? selectedTime : '--:--'}
            </p>
        </div>
    );
}

export default Panel;