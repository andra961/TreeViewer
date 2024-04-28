export const debounce = (cb: () => void, ms = 100) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(cb, ms);
  };
};
