import { useEffect, useCallback } from "react";

export default function useKeyPress() {
  const handleKeyPress = useCallback((event) => {
    console.log(event);
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
}
