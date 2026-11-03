//   1. Данные (слоты, «сегодня»).
//текущий день
const now = new Date();

//заполнение доступности слотов на текущий день относительно текущего времени
function isActiveSlotToday(time){
  const bookHour = parseInt(time.substring(0, 2));
  const bookMinute = parseInt(time.substring(3, 5));
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();
  if (bookHour < nowHour)
    return false;
  else {
    if (bookHour > nowHour)
      return true;
    else {
      if (bookMinute <= nowMinute)
        return false;
      else
        return true;
    }
  }
}

//слоты на текущий день
const SERVER_DATA = {
  today: { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() },
  slots: [
    { time: "10:00", available: isActiveSlotToday("10:00") },
    { time: "11:00", available: isActiveSlotToday("11:00") },
    { time: "12:00", available: isActiveSlotToday("12:00") },
    { time: "13:00", available: isActiveSlotToday("13:00") },
    { time: "14:00", available: isActiveSlotToday("14:00") },
    { time: "15:00", available: isActiveSlotToday("15:00") },
    { time: "16:00", available: isActiveSlotToday("16:00") },
    { time: "17:00", available: isActiveSlotToday("17:00") },
    { time: "18:00", available: isActiveSlotToday("18:00") },
    { time: "19:00", available: isActiveSlotToday("19:00") },
  ],
};

//слоты чётных дней
const SLOTS_EVEN_DAY = [
    { time: "10:00", available: true },
    { time: "11:00", available: false },
    { time: "12:00", available: false },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: false },
    { time: "17:00", available: true },
    { time: "18:00", available: false },
    { time: "19:00", available: true },
];

//слоты нечётных дней
const SLOTS_ODD_DAY = [
    { time: "10:00", available: true },
    { time: "11:00", available: false },
    { time: "12:00", available: false },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: false },
    { time: "16:00", available: true },
    { time: "17:00", available: false },
    { time: "18:00", available: true },
    { time: "19:00", available: true },
];

//слоты на праздники
const SLOTS_ON_HOLIDAYS = [
  { time: "10:00", available: false },
  { time: "11:00", available: false },
  { time: "12:00", available: false },
  { time: "13:00", available: false },
  { time: "14:00", available: false },
  { time: "15:00", available: false },
  { time: "16:00", available: false },
  { time: "17:00", available: false },
  { time: "18:00", available: false },
  { time: "19:00", available: false },
]



//   2. Состояние (месяц, день, время, слоты).
//бронь
const BOOKING_STATE = {
  currentMonth: null,
  currentYear: null,
  selectedDay: null,
  selectedTime: null,
};



//   3. Чистые функции (для работы с датами).
const MONTHS_NOMINATIVE = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

//праздничные дни
const HOLIDAYS = [
  {d: 1, m: 1}, {d: 2, m: 1}, {d: 3, m: 1}, {d: 4, m: 1}, {d: 5, m: 1}, {d: 6, m: 1}, {d: 7, m: 1}, {d: 8, m: 1},
  {d: 23, m: 2}, {d: 8, m: 3}, {d: 1, m: 5}, {d: 9, m: 5}, {d: 12, m: 6}, {d: 4, m: 11}, {d: 31, m: 12}
]

//сравнение двух дат
function compareDates(date1, date2) {
  const d1 = new Date(date1.year, date1.month, date1.day);
  const d2 = new Date(date2.year, date2.month, date2.day);
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

//можно ли выбрать день (проверка на выбор дня, раньше текущего)
function isDateSelectable(day, month, year) {
  const today = SERVER_DATA.today;
  return compareDates({ day: day, month: month, year: year }, today) >= 0;
}

//является ли день праздничным
function isHoliday(day, month){
    return HOLIDAYS.some(function(h) {
      return h.d === day && h.m === month+1;
    })
}

//построение сетки календаря
function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay, otherMonth: true });
    nextDay++;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

//запрос слотов на конкретный день
function getSlotsForDay(day, month, year) {
  if (!isDateSelectable(day, month, year) || isHoliday(day, month))
    return SLOTS_ON_HOLIDAYS;
  const today = SERVER_DATA.today;
  if (day === today.day && month === today.month && year === today.year){
    return SLOTS_EVEN_DAY.map(function(slot) {
      return { time: slot.time, available: isActiveSlotToday(slot.time) };
    });
  }
  return day % 2 === 0 ? SLOTS_EVEN_DAY : SLOTS_ODD_DAY;
}



//   4. Отрисовка и обработчики.
//отрисовка календаря
function renderCalendar(){
  const monthYear = document.querySelector(".name-month");
  const calendarGrid = document.querySelector(".weeks");

  const month = BOOKING_STATE.currentMonth;
  const year = BOOKING_STATE.currentYear;

  monthYear.textContent = MONTHS_NOMINATIVE[month] + " " + year;

  const weeks = buildCalendarGrid(year, month);

  //отрисовка календаря
  let html = '';
  weeks.forEach(function(week){
    html += '<div class="week">'
    week.forEach(function(cell){
      html += '<button class="button-day ';
      if (cell.otherMonth || !isDateSelectable(cell.day, month, year) || isHoliday(cell.day, month))
        html += 'inactive-day" disabled ';
      else{
        if (!cell.otherMonth && cell.day == BOOKING_STATE.selectedDay)
          html += 'selected-day" ';
        else
            html += 'active-day" ';
     }
      html += `data-day="${cell.day}" data-other="${cell.otherMonth}">` + cell.day + '</button>';
    })
    html += '</div>';
  })

  calendarGrid.innerHTML = html;

  //навешиваем обработчик
  const activeDays = calendarGrid.querySelectorAll('.active-day');
  activeDays.forEach(function (activeDay) {
    activeDay.addEventListener('click', onDayClick);
  });
}

//обработчик клика по дню
function onDayClick(event){
  const cell = event.currentTarget;
  const day = parseInt(cell.dataset.day);

  //обновление данных
  BOOKING_STATE.selectedDay = day;
  BOOKING_STATE.selectedTime = null;

  //запрос слотов
  SERVER_DATA.slots = getSlotsForDay(day, BOOKING_STATE.currentMonth, BOOKING_STATE.currentYear);

  //перерисовываем всё, что зависит от выбора
  renderCalendar();
  renderTimeSlots();
  updatePanel();
}

//отрисовка слотов
function renderTimeSlots(){
  const linesTime = document.querySelector(".lines-time");
  const slots = SERVER_DATA.slots;
  let html = "";
  
  //собираем все кнопки
  let buttons = [];
  slots.forEach(function(slot){
    let htmlButton = '<button class="button-time ';
    if (!slot.available)
      htmlButton += 'inactive-time" disabled>';
    else {
      if (slot.time !== BOOKING_STATE.selectedTime)
        htmlButton += `active-time" data-time="${slot.time}">`;
      else 
        htmlButton += `selected-time" data-time="${slot.time}">`;
    }
    
    htmlButton += slot.time + '</button>';
    buttons.push(htmlButton);
  })

  //распределяем кнопки по строкам
  if (buttons.length % 2 !== 0)
    buttons.push('<button class="empty-time" disabled></button>')
  for (let i = 0; i < buttons.length; i += 2){
    html += '<div class="line-time">' + buttons[i] + buttons[i+1] + '</div>';
  }
  linesTime.innerHTML = html;

  //навешиваем обработчик
  const activeButtons = linesTime.querySelectorAll('.active-time');
  activeButtons.forEach(function (btn) {
    btn.addEventListener('click', onTimeSlotClick);
  });
}

//обработчик клика по слоту
function onTimeSlotClick(event){
  const slot = event.currentTarget;
  BOOKING_STATE.selectedTime = slot.dataset.time;
  renderTimeSlots();
  updatePanel();
}

//обновление панели снизу
function updatePanel(){
  const dateTime = document.querySelector(".date-time");
  let html = '';

  const month = BOOKING_STATE.currentMonth;
  const year = BOOKING_STATE.currentYear;
  const day = BOOKING_STATE.selectedDay;

  //печать даты
  html += '<p><span class="header-date-time">Дата: </span>';
  if (day === null || !isDateSelectable(day, month, year) || isHoliday(day, month))
    html += '--';
  else
    html += BOOKING_STATE.selectedDay;
  html += ' ' + MONTHS_GENITIVE[BOOKING_STATE.currentMonth] + ' ' + BOOKING_STATE.currentYear + '</p>';

  //печать времени
  html += '<p><span class="header-date-time">Время: </span>';
  if (!BOOKING_STATE.selectedTime)
    html += '--:--';
  else
    html += BOOKING_STATE.selectedTime;
  html += '</p>';

  dateTime.innerHTML = html;
}

//выбор дня по умолчанию: тек.месяц - тек.день, остальные месяцы - 17-е число
function selectDefaultDay(){
  const month = BOOKING_STATE.currentMonth;
  const year = BOOKING_STATE.currentYear;
  const today = SERVER_DATA.today;
  
  if (month === today.month && year === today.year){
    BOOKING_STATE.selectedDay = today.day;
    BOOKING_STATE.selectedTime = null;
    SERVER_DATA.slots = getSlotsForDay(today.day, month, year);
    return;
  }
  
  const day = 17; //по умолчанию
  if (isDateSelectable(day, month, year) && !isHoliday(day, month)){
    BOOKING_STATE.selectedDay = day;
    BOOKING_STATE.selectedTime = null;
    SERVER_DATA.slots = getSlotsForDay(day, month, year);
    return;
  } else {
    BOOKING_STATE.selectedDay = null;
    BOOKING_STATE.selectedTime = null;
    SERVER_DATA.slots = SLOTS_ON_HOLIDAYS;
    return;
  }
}

//обработчик клика на кнопки стрелок в календаре
function setupMonthNavigation() {
  const prevBtn = document.querySelector(".button-arrow.last-month");
  const nextBtn = document.querySelector(".button-arrow.next-month");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      BOOKING_STATE.currentMonth -= 1;
      if (BOOKING_STATE.currentMonth < 0) {
        BOOKING_STATE.currentMonth = 11;
        BOOKING_STATE.currentYear -= 1;
      }
      selectDefaultDay();
      renderCalendar();
      renderTimeSlots();
      updatePanel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      BOOKING_STATE.currentMonth += 1;
      if (BOOKING_STATE.currentMonth > 11) {
        BOOKING_STATE.currentMonth = 0;
        BOOKING_STATE.currentYear += 1;
      }
      selectDefaultDay();
      renderCalendar();
      renderTimeSlots();
      updatePanel();
    });
  }
}

//обработчик нажатия на кнопку выбор услуги
function setupBackButton() {
  const backButton = document.querySelector(".system-button.back-button");
  if (backButton) {
    backButton.addEventListener("click", function () {
      alert("Здесь должен быть переход на страницу выбора услуг. Пока его нет.");
    });
  }
}

//обработчик клика на кнопку продолжить
function setupNextButton() {
  const continueBtn = document.querySelector(".system-button.continue-button");
  if (continueBtn){
    continueBtn.addEventListener("click", function () {
      if (!BOOKING_STATE.selectedTime)
        alert("Пожалуйста, выберите время");
      else
        alert("Здесь будет заполнение контактных данных, но пока этого нет."); 
      return;
    });
  }
}

//обработчик клика на логотип
function setupLogoClick() {
  const logo = document.querySelector(".logo-header");
  if (logo) {
    logo.addEventListener("click", function () {
      alert("Здесь должен быть переход на главную страницу. Пока его нет.");
      return;
    });
  }
}



//   5. Инициализация.
function init(){
  BOOKING_STATE.currentMonth = SERVER_DATA.today.month;
  BOOKING_STATE.currentYear = SERVER_DATA.today.year;
  selectDefaultDay();

  //отрисовка
  renderCalendar();
  renderTimeSlots();
  updatePanel();

  //вешаем обработчики на кнопки
  setupMonthNavigation();
  setupBackButton();
  setupNextButton();
  setupLogoClick();
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});