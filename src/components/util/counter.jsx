import React, { useState, useEffect } from "react";

const CountUp = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime;
    let requestId;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.floor(((end - start) * progress) / duration);
      const nextCount = Math.min(start + increment, end);

      setCount(nextCount);

      if (progress < duration) {
        requestId = requestAnimationFrame(updateCount);
      }
    };

    requestId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(requestId);
  }, [start, end, duration]);

    return <> { count }</>;
};

export default CountUp;
