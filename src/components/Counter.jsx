import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => setCount(c => c + 1)}
      style={{
        fontSize: "1.2rem",
        padding: "0.6rem 1rem",
        borderRadius: "8px",
        background: "#ffb400",
        color: "#111",
        border: "none",
        cursor: "pointer"
      }}
    >
      Count: {count}
    </button>
  );
}
