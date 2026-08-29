const TIME_ZONE = "America/New_York";
const LOOKAHEAD_DAYS = 14;
const MIN_LEAD_BUSINESS_DAYS = 2;
const SLOT_DURATION_MINUTES = 15;
const DAILY_STARTS = Array.from({ length: 16 }, (_, index) => [
  9 + Math.floor(index / 2),
  index % 2 === 0 ? 0 : 30,
]);

const partsFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  month: "2-digit",
  second: "2-digit",
  timeZone: TIME_ZONE,
  year: "numeric",
});

function partsInTimeZone(date) {
  const values = {};
  for (const part of partsFormatter.formatToParts(date)) {
    if (part.type !== "literal") values[part.type] = Number(part.value);
  }
  return values;
}

function offsetMinutes(date) {
  const parts = partsInTimeZone(date);
  const localAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  return Math.round((localAsUtc - date.getTime()) / 60000);
}

function zonedTimeToUtc(year, month, day, hour, minute) {
  const localAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
  const firstPass = new Date(localAsUtc - offsetMinutes(new Date(localAsUtc)) * 60000);
  return new Date(localAsUtc - offsetMinutes(firstPass) * 60000);
}

function easternDateParts(date) {
  const parts = partsInTimeZone(date);
  return { year: parts.year, month: parts.month, day: parts.day };
}

function addCalendarDays(parts, days) {
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days));
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function weekday(parts) {
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day)).getUTCDay();
}

function isBusinessDay(parts) {
  const day = weekday(parts);
  return day >= 1 && day <= 5;
}

function addBusinessDays(parts, businessDays) {
  let cursor = parts;
  let added = 0;
  while (added < businessDays) {
    cursor = addCalendarDays(cursor, 1);
    if (isBusinessDay(cursor)) added += 1;
  }
  return cursor;
}

function dateKey(parts) {
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

function bookedRanges(bookedSlots = []) {
  return bookedSlots
    .map((slot) => ({
      end: new Date(slot.scheduled_end || slot.end || slot.scheduled_start || slot.start).getTime(),
      start: new Date(slot.scheduled_start || slot.start).getTime(),
      status: slot.status || "scheduled",
    }))
    .filter((slot) => Number.isFinite(slot.start) && Number.isFinite(slot.end) && slot.status !== "closed");
}

function isBooked(start, end, ranges) {
  const startMs = start.getTime();
  const endMs = end.getTime();
  return ranges.some((range) => startMs < range.end && endMs > range.start);
}

function dayLabel(start) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: TIME_ZONE,
    weekday: "long",
  }).format(start);
}

function shortDayLabel(start) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: TIME_ZONE,
    weekday: "short",
  }).format(start);
}

function timeLabel(start, end) {
  const startLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
    timeZoneName: "short",
  }).format(start);
  const endLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(end);
  return `${startLabel} - ${endLabel}`;
}

function generateSlots({ now = new Date(), bookedSlots = [] } = {}) {
  const booked = bookedRanges(bookedSlots);
  const today = easternDateParts(now);
  const firstBookableDay = addBusinessDays(today, MIN_LEAD_BUSINESS_DAYS);
  const slots = [];

  for (let offset = 0; offset <= LOOKAHEAD_DAYS; offset += 1) {
    const day = addCalendarDays(firstBookableDay, offset);
    if (!isBusinessDay(day)) continue;

    for (const [hour, minute] of DAILY_STARTS) {
      const start = zonedTimeToUtc(day.year, day.month, day.day, hour, minute);
      const end = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
      if (start <= now || isBooked(start, end, booked)) continue;

      const slotTimeLabel = timeLabel(start, end);
      slots.push({
        day: dayLabel(start),
        end: end.toISOString(),
        label: `${shortDayLabel(start)}, ${slotTimeLabel}`,
        start: start.toISOString(),
        timeLabel: slotTimeLabel,
        timeZone: TIME_ZONE,
      });
    }
  }

  return slots;
}

function findAvailableSlot(requestedStart, bookedSlots = [], now = new Date()) {
  if (!requestedStart) return null;
  const requested = new Date(requestedStart);
  if (Number.isNaN(requested.getTime())) return null;

  return (
    generateSlots({ bookedSlots, now }).find((slot) => slot.start === requested.toISOString()) || null
  );
}

module.exports = {
  LOOKAHEAD_DAYS,
  MIN_LEAD_BUSINESS_DAYS,
  SLOT_DURATION_MINUTES,
  TIME_ZONE,
  findAvailableSlot,
  generateSlots,
};
