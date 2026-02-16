import { useState, useEffect, useCallback } from 'react';

export function useFreshness(timestamp: Date | null) {
  const [label, setLabel] = useState('');
  const [isStale, setIsStale] = useState(false);

  const computeAge = useCallback(() => {
    if (!timestamp) {
      setLabel('No data');
      setIsStale(true);
      return;
    }
    const diffMs = Date.now() - timestamp.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);

    if (diffSec < 5) {
      setLabel('Just now');
      setIsStale(false);
    } else if (diffSec < 60) {
      setLabel(`${diffSec}s ago`);
      setIsStale(false);
    } else if (diffMin < 60) {
      setLabel(`${diffMin}m ago`);
      setIsStale(diffMin > 5);
    } else {
      setLabel(`${diffHour}h ago`);
      setIsStale(true);
    }
  }, [timestamp]);

  useEffect(() => {
    computeAge();
    const interval = setInterval(computeAge, 1000);
    return () => clearInterval(interval);
  }, [computeAge]);

  return { label, isStale };
}
