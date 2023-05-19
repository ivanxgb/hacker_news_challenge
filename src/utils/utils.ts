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

// getElapsedTime receives a date string and returns the elapsed time since that date
export function getElapsedTime(date: string): string {
  const currentDate = new Date();
  const dateToCompare = new Date(date);

  const difference = currentDate.getTime() - dateToCompare.getTime();
  const seconds = Math.floor(difference / 1000);

  return parseElapsedTime(seconds);
}

// debounce receives a function and a delay and returns a debounced function (delayed execution)
export const debounce = (func: Function, delay: number = 1000) => {
  let timeout: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
