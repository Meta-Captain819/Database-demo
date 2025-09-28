"use client";

import { useEffect, useMemo, useState } from "react";
import { calculatePreciseAge } from "@/lib/age";

export function AgeTicker({ birthDate, initialAge }) {
  const birth = useMemo(() => (birthDate ? new Date(birthDate) : null), [birthDate]);
  const [age, setAge] = useState(initialAge ?? null);

  useEffect(() => {
    if (!birth) return undefined;

    const update = () => {
      const next = calculatePreciseAge(birth);
      if (next) {
        setAge(next);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [birth]);

  if (!birth || !age) return <span>—</span>;

  return (
    <span>
      {`${age.years} years, ${age.months} months, ${age.days} days, ${age.hours} hours, ${age.minutes} minutes, ${age.seconds} seconds`}
    </span>
  );
}
