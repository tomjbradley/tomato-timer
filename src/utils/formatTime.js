export default function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })}`;
}
