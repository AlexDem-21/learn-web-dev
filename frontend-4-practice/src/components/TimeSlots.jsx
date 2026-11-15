import { useEffect, useState } from 'react'; 
import { fetchSlots } from '../api';

function TimeSlots({ booking, setBooking }) {
    const {currentMonth, currentYear, selectedDay, selectedTime} = booking;
    
    const [slots, setSlots] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function loadSlots() {
            try {
                setLoading(true);
                setError(null);
                
                //для прошлых месяцев день равен null, поэтому по умолчанию берётся 1-е число данного месяца
                const dayToFetch = selectedDay !== null ? selectedDay : 1;

                const data = await fetchSlots({
                    day: dayToFetch,
                    month: currentMonth,
                    year: currentYear
                });

                if (data.date.day === dayToFetch && data.date.month === currentMonth)
                    setSlots(data.slots);
            } catch (err) {
                setError("Не удалось загрузить слоты\nПопробуйте зайти позже");
            } finally {
                setLoading(false);
            }
        }

        loadSlots();
    }, [selectedDay, currentMonth, currentYear]);
    
    const handleTimeClick = (time) => {
        setBooking({ ...booking, selectedTime: time });
    }
    
    return (
        <div className="time">
            <h2 className="header-time">Доступное время</h2>
            {isLoading && <div style={{ padding: '20px', fontSize: '18px'}}>Загрузка слотов...</div>}
            {error && <div style={{ padding: '20px', color: 'red', fontSize: '18px', whiteSpace: 'pre-line' }}>{error}</div>}
            {!isLoading && !error && (
                <div className="lines-time">
                    {slots.map((slot, index) => {
                        let buttonClass = "button-time ";
                        if (!slot.available) {
                            buttonClass += "inactive-time";
                        } else if (slot.time === selectedTime) {
                            buttonClass += "selected-time";
                        } else {
                            buttonClass += "active-time";
                        }

                        return (
                            <button
                                key={index}
                                className={buttonClass}
                                disabled={!slot.available}
                                onClick={() => handleTimeClick(slot.time)}
                            >
                                {slot.time}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default TimeSlots;