import React from "react";

import formatTime from "../utils/formatTime";

export default function Timer() {
  return (
    <span className="d-block display-1 fw-bold text-center mt-4 mb-5">
      {formatTime(70)}
    </span>
  );
}
