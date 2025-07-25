const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const secound = duration % 60;

  if (hours > 0) {
    return `${hours}:${LEADING_ZERO_FORMATTER.format(
      minutes
    )} :${LEADING_ZERO_FORMATTER.format(secound)}`;
  }
  return `${minutes}:${LEADING_ZERO_FORMATTER.format(secound)}`;
}
