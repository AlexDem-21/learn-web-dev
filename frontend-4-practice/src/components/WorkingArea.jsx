import FirstWA from "./FirstWA";
import SecondWA from "./SecondWA";
import ThirdWA from "./ThirdWA";

function WorkingArea({ booking, setBooking }) {
    return (
        <div className="working-area">
            <div className="info">
                <FirstWA/>
                <SecondWA
                    booking = {booking}
                    setBooking = {setBooking}
                />
                <ThirdWA
                    booking = {booking}
                />
            </div>
        </div>
    );
}

export default WorkingArea;