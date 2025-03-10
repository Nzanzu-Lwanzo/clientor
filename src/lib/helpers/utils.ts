export const debouncer = (fn: (args: any) => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(args);
    }, delay * 1000);
  };
};

export const throttler = (fn: (args: any) => void, delay: number) => {
  let timer: null | NodeJS.Timeout = null;

  return (...args: any) => {
    if (timer === null) {
      fn(args);
      timer = setTimeout(() => {
        timer = null;
      }, delay * 1000);
    }
  };
};

