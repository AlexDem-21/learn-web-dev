function Footer() {
    return (
      <footer className="footer">
          <div className="footer-top">
            <div className="footer-top-left">
              <span className="logo-footer">✄ ШАРМ ✄</span>
              <p className="text-description">Команда мастеров парикмахерской "Шарм" более 10 лет создаёт стрижки, которые хочется носить.</p>
            </div>
            <div className="footer-top-middle">
              <p className="header-footer-coloumn">Контакты</p>
              <div className="contacts">
                <a href="#" className="address">⚲ ул. Садовая, 15, Москва</a>
                <a href="#" className="phone">✆ +7 (495) 123-45-67</a>
              </div>
            </div>
            <div className="footer-top-right">
              <p className="header-footer-coloumn">Режим работы</p>
              <div className="operating-hours">
                <p>Пн–Пт: 9:00–21:00</p>
                <p>Сб–Вс: 9:30–20:00</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-bottom-left">© 2026. Все права защищены.</p>
            <a href="#" className="footer-bottom-right">Политика конфиденциальности</a>
          </div>
      </footer>
    );
}

export default Footer;