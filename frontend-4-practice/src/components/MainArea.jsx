import { useEffect, useState } from 'react';
import { fetchToday } from '../api'
import StepIndicator from './StepIndicator';
import WorkingArea from './WorkingArea';

const now = new Date();

function MainArea() {
    const [booking, setBooking] = useState(null);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadInitialData() {
            try {
                setIsLoading(true);
                setError(null);

                const now = await fetchToday();

                setBooking({
                    currentMonth: now.month,
                    currentYear: now.year,
                    selectedDay: now.day,
                    selectedTime: null,
                    today: now
                })
            } catch (err) {
                setError("Не удалось загрузить данные\nПопробуйте зайти позже");
            } finally {
                setIsLoading(false);
            }
        }

        loadInitialData();
    }, []);

    return (
        <main className="main">
            <StepIndicator/>
            <div className="working-area">
                {isLoading && (<div style={{ textAlign: 'center', padding: '250px 20px', fontSize: '24px' }}>Загрузка...</div>)}
                {error && (<div style={{ textAlign: 'center', padding: '250px 20px', color: 'red', fontSize: '24px', whiteSpace: 'pre-line' }}>{error}</div>)}
                {!isLoading && !error && booking && (
                    <WorkingArea
                        booking={booking}
                        setBooking={setBooking}
                    />
                )}
            </div>
        </main>
    );
}

export default MainArea;