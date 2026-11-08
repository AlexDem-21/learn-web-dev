function Header() {
  const handleLogoClick = () => {
    alert("Здесь должен быть переход на главную страницу. Пока этого нет");
  }  
  
  return (
    <header className="header">
        <div className="logo">
          <button className="logo-header" onClick={handleLogoClick}>✄ ШАРМ ✄</button>
        </div>
        <nav className="links">
          <div className="nav-item">
            <a href="#">Услуги</a>
          </div>
          <div className="nav-item">
            <a href="#">Галерея</a>
          </div>
          <div className="nav-item">
            <a href="#">Команда</a>
          </div>
          <div className="nav-item">
            <a href="#">Отзывы</a>
          </div>
          <div className="nav-item">
            <a href="#">Контакты</a>
          </div>
        </nav>
    </header>
  );
}

export default Header;