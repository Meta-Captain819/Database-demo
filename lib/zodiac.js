// Zodiac sign and behavior helper
// Western zodiac based on sun sign ranges (month/day). Returns sign + short behavior summary.

const SIGNS = [
  { sign: 'Capricorn',  from: [12,22], to: [1,19], behavior: 'Disciplined, patient, purpose-driven; builds structure and long-term momentum.' },
  { sign: 'Aquarius',   from: [1,20],  to: [2,18], behavior: 'Analytical, future-focused, independent; values originality and systems improvement.' },
  { sign: 'Pisces',     from: [2,19],  to: [3,20], behavior: 'Imaginative, empathetic, intuitive; absorbs atmosphere and responds creatively.' },
  { sign: 'Aries',      from: [3,21],  to: [4,19], behavior: 'Initiating, bold, energetic; thrives on challenge and rapid iteration.' },
  { sign: 'Taurus',     from: [4,20],  to: [5,20], behavior: 'Steady, sensory-grounded, loyal; prefers durable choices and calm persistence.' },
  { sign: 'Gemini',     from: [5,21],  to: [6,20], behavior: 'Curious, adaptive, communicative; explores ideas in parallel and connects patterns.' },
  { sign: 'Cancer',     from: [6,21],  to: [7,22], behavior: 'Protective, nurturing, memory-rich; builds emotional safety and long-range bonds.' },
  { sign: 'Leo',        from: [7,23],  to: [8,22], behavior: 'Expressive, confident, heart-led; energizes groups through presence and recognition.' },
  { sign: 'Virgo',      from: [8,23],  to: [9,22], behavior: 'Refining, service-oriented, detail-aware; optimizes processes and heals through improvement.' },
  { sign: 'Libra',      from: [9,23],  to: [10,22], behavior: 'Balancing, diplomatic, aesthetic; harmonizes dynamics and seeks relational equilibrium.' },
  { sign: 'Scorpio',    from: [10,23], to: [11,21], behavior: 'Intense, strategic, transformational; reads subtext and commits with depth.' },
  { sign: 'Sagittarius',from: [11,22], to: [12,21], behavior: 'Expansive, philosophical, exploratory; pursues horizon-thinking and lived wisdom.' }
];

function inRange(month, day, from, to) {
  if (from[0] === to[0]) { // Same month window
    return month === from[0] && day >= from[1] && day <= to[1];
  }
  // Range spans year boundary (e.g., Capricorn)
  return (month === from[0] && day >= from[1]) || (month === to[0] && day <= to[1]);
}

export function zodiacForDate(dateLike) {
  if (!dateLike) return null;
  const d = new Date(dateLike);
  if (isNaN(d.getTime())) return null;
  const m = d.getMonth() + 1; // 1-12
  const day = d.getDate();
  for (const entry of SIGNS) {
    if (inRange(m, day, entry.from, entry.to)) return { sign: entry.sign, behavior: entry.behavior };
  }
  return null;
}
