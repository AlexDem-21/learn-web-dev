import { getSlotsForDay } from '../utils'; 

function TimeSlots({ booking, setBooking }) {
    const {currentMonth, currentYear, selectedDay, selectedTime} = booking;
    const slots = getSlotsForDay(selectedDay, currentMonth, currentYear);

    const handleTimeClick = (time) => {
        setBooking({ ...booking, selectedTime: time });
    }
    
    return (
        <div className="time">
            <h2 className="header-time">Доступное время</h2>
            <div className="lines-time">
                {slots.map((slot, index) => {
                    let buttonClass = "button-time ";
                    if (!slot.available)
                        buttonClass += "inactive-time";
                    else {
                        if (slot.time === selectedTime)
                            buttonClass += "selected-time";
                        else
                            buttonClass += "active-time";
                    }
                    return (
                        <button
                            key={index}
                            className={buttonClass}
                            disabled={!slot.available}
                            onClick={() => handleTimeClick(slot.time)}
                        >{slot.time}</button>
                    );
                })}
            </div>
        </div>
    );
}

export default TimeSlots;