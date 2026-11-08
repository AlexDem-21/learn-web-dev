import { useState } from 'react';
import StepIndicator from './StepIndicator';
import WorkingArea from './WorkingArea';

const now = new Date();

function MainArea() {
    const [booking, setBooking] = useState({
        currentMonth: now.getMonth(),
        currentYear: now.getFullYear(),
        selectedDay: now.getDate(),
        selectedTime: null,
    });

    return (
        <main className="main">
            <StepIndicator/>
            <WorkingArea
                booking = {booking}
                setBooking = {setBooking}
            />
        </main>
    );
}

export default MainArea;