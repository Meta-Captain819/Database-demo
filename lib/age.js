function addYearsClamped(date, years) {
  const result = new Date(date);
  const month = result.getMonth();
  const day = result.getDate();
  result.setFullYear(result.getFullYear() + years, month, day);
  if (result.getMonth() !== month) {
    result.setDate(0);
  }
  return result;
}

function addMonthsClamped(date, months) {
  const result = new Date(date);
  const day = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const daysInTargetMonth = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, daysInTargetMonth));
  return result;
}

export function calculatePreciseAge(value) {
  if (!value) return null;
  const birth = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (Number.isNaN(birth.getTime())) return null;

  const now = new Date();
  if (now < birth) return null;

  let years = now.getFullYear() - birth.getFullYear();
  let anchor = addYearsClamped(birth, years);

  if (anchor > now) {
    years = Math.max(0, years - 1);
    anchor = addYearsClamped(birth, years);
  }

  let months = 0;
  let cursor = anchor;
  while (true) {
    const next = addMonthsClamped(cursor, 1);
    if (next <= now) {
      cursor = next;
      months += 1;
    } else {
      break;
    }
  }

  const diffMs = now.getTime() - cursor.getTime();
  let remainder = diffMs;
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.floor(remainder / dayMs);
  remainder -= days * dayMs;
  const hours = Math.floor(remainder / (60 * 60 * 1000));
  remainder -= hours * 60 * 60 * 1000;
  const minutes = Math.floor(remainder / (60 * 1000));
  remainder -= minutes * 60 * 1000;
  const seconds = Math.floor(remainder / 1000);

  return { years, months, days, hours, minutes, seconds };
}
