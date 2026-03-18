import { useEffect, useState } from 'react';

const getMatches = query => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
};

const useMediaQuery = query => {
  const [matches, setMatches] = useState(() => getMatches(query));

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener();

    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }

    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
