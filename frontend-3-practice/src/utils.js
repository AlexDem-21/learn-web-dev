export const now = new Date();

export function isActiveSlotToday(time){
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

export const SERVER_DATA = {
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

export const SLOTS_EVEN_DAY = [
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

export const SLOTS_ODD_DAY = [
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

export const SLOTS_ON_HOLIDAYS = [
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

export const MONTHS_NOMINATIVE = [
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

export const MONTHS_GENITIVE = [
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

export const HOLIDAYS = [
  {d: 1, m: 1}, {d: 2, m: 1}, {d: 3, m: 1}, {d: 4, m: 1}, {d: 5, m: 1}, {d: 6, m: 1}, {d: 7, m: 1}, {d: 8, m: 1},
  {d: 23, m: 2}, {d: 8, m: 3}, {d: 1, m: 5}, {d: 9, m: 5}, {d: 12, m: 6}, {d: 4, m: 11}, {d: 31, m: 12}
]

export function compareDates(date1, date2) {
  const d1 = new Date(date1.year, date1.month, date1.day);
  const d2 = new Date(date2.year, date2.month, date2.day);
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

export function isDateSelectable(day, month, year) {
  const today = SERVER_DATA.today;
  return compareDates({ day: day, month: month, year: year }, today) >= 0;
}

export function isHoliday(day, month){
    return HOLIDAYS.some(function(h) {
      return h.d === day && h.m === month+1;
    })
}

export function buildCalendarGrid(year, month) {
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

export function getSlotsForDay(day, month, year) {
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