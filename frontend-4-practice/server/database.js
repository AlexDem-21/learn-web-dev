export function isActiveSlotToday(time){
  const now = new Date();
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

export const database = {
    today: (() => {
      const now = new Date();
      return { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };
    })(),
    
    slotsEvenDay: [
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
    ],

    slotsOddDay: [
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
    ],

    slotsOnHolidays: [
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
    ],

    holidays: [
      {d: 1, m: 1}, {d: 2, m: 1}, {d: 3, m: 1}, {d: 4, m: 1}, {d: 5, m: 1}, {d: 6, m: 1}, {d: 7, m: 1}, {d: 8, m: 1},
      {d: 23, m: 2}, {d: 8, m: 3}, {d: 1, m: 5}, {d: 9, m: 5}, {d: 12, m: 6}, {d: 4, m: 11}, {d: 31, m: 12}
    ],
  };