function FirstWA() {
    const handleBackClick = () => {
        alert("Здесь должен быть переход на страницу выбора услуг. Пока его нет");
    }
    
    return (
        <div className="first-wa">
          <button className="system-button back-button" onClick={handleBackClick}>← Выбор услуги</button>
          <h1 className="header-wa">Выберите дату и время записи</h1>
        </div>
    );
}

export default FirstWA;