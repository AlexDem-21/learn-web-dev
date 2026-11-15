function StepIndicator() {
  return (
      <div className="stages">
        <div className="stage">
          <span className="number-stage">1</span>
          <span>Мастер</span>
        </div>
        <p>|</p>
        <div className="stage">
          <span className="number-stage">2</span>
          <span>Услуга</span>
        </div>
        <p>|</p>
        <div className="stage">
          <span className="number-active-stage">3</span>
          <span className="name-active-stage">Дата и время</span>
        </div>
        <p>|</p>
        <div className="stage">
          <span className="number-stage">4</span>
          <span>Контакты</span>
        </div>
        <p>|</p>
        <div className="stage">
          <span className="number-stage">5</span>
          <span>Подтверждение</span>
        </div>
      </div>
  );
}

export default StepIndicator;