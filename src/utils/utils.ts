function parseElapsedTime(seconds: number) {
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} days ago`;
}

export function getElapsedTime(date: string): string {
  const currentDate = new Date();
  const dateToCompare = new Date(date);

  const difference = currentDate.getTime() - dateToCompare.getTime();
  const seconds = Math.floor(difference / 1000);

  return parseElapsedTime(seconds);
}
