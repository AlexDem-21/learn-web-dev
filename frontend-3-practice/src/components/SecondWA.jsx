import Calendar from "./Calendar";
import TimeSlots from "./TimeSlots";

function SecondWA({ booking, setBooking }) {
    return (
        <div className="second-wa">
            <Calendar
                booking = {booking}
                setBooking = {setBooking}
            />
            <TimeSlots
                booking = {booking}
                setBooking = {setBooking}
            />
        </div>
    );
}

export default SecondWA;