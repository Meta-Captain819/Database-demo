// Utility to generate a realistic feeling age-based quote.
// The quote is deterministic per user (based on DOB + name hash) for consistency across renders.

function hashString(str) {
  let h = 0, i, chr;
  if (str.length === 0) return h;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    h = (h << 5) - h + chr;
    h |= 0; // Convert to 32bit integer
  }
  return Math.abs(h);
}

export function ageQuote({ age, dob, name = '' }) {
  if (!age || typeof age !== 'number' || age < 0 || age > 120) {
    return 'Time is a canvas—yours is just beginning to take shape.';
  }
  const birthYear = dob ? new Date(dob).getFullYear() : (new Date().getFullYear() - age);
  const decade = Math.floor(age / 10) * 10; // 0,10,20...

  const decadeThemes = {
    0: ['Every sunrise is brand new code for your story.', 'Wonder fuels the first steps—keep exploring.'],
    10: ['Curiosity now becomes early craft—shape it.', 'Your questions today are the tools of tomorrow.'],
    20: ['Momentum beats perfection—ship your growth.', 'The map is foggy, but movement clears it.'],
    30: ['Depth now matters more than speed—invest wisely.', 'You can compound skill like interest—stay consistent.'],
    40: ['Clarity sharpens—trim what drains your focus.', 'Strategy replaces hustle; your leverage is experience.'],
    50: ['Your patterns are frameworks—refactor only what misaligns.', 'Impact scales through what you teach others.'],
    60: ['Your quiet confidence is architecture for others.', 'Legacy starts as small, steady stewardship.'],
    70: ['You mentor through presence more than instruction.', 'Your perspective is a rare optimization—share it.'],
    80: ['You’ve seen cycles—patterns repeat; wisdom adapts.', 'Guard your energy for what still sparks curiosity.'],
    90: ['Your timeline proves resilience—quiet excellence endures.', 'The long arc rewards patience—your story inspires.'],
    100: ['A century of iteration—elegance through endurance.', 'Time honors those who kept refining—like you.']
  };

  const pool = decadeThemes[decade] || decadeThemes[0];
  const seed = hashString(name + '|' + birthYear + '|' + age);
  const quote = pool[seed % pool.length];

  // Personalize lightly with name if available and not already included
  if (name) {
    return quote.replace(/^(You\b|Your\b)/, name.split(' ')[0] + "'") // If starts with You/Your, adapt
      .replace(/^Momentum/, name.split(' ')[0] + "'s momentum") // Example personalization
      .replace(/^Curiosity/, name.split(' ')[0] + "'s curiosity")
      .replace(/^Clarity/, name.split(' ')[0] + "'s clarity")
      .replace(/^Legacy/, name.split(' ')[0] + "'s legacy")
      .replace(/^Impact/, name.split(' ')[0] + "'s impact");
  }
  return quote;
}
