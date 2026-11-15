import Panel from "./Panel";

function ThirdWA({ booking }) {
    const handleNextClick = () => {
        if (!booking.selectedTime){
            alert("Пожалуйста, выберите время");
            return;
        }
        alert("Здесь будет заполнение контактных данных, но пока этого нет");
    };

    return (
        <div className="third-wa">
            <Panel
                booking = {booking}
            />
            <button className="system-button continue-button" onClick={handleNextClick}>Продолжить</button>
        </div>
    );
}

export default ThirdWA;