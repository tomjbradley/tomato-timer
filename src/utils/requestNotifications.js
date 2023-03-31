export default function requestNotifications() {
  if (!("Notification" in window))
    return alert("This browser does not support desktop notification");

  if (Notification.permission !== "denied")
    return Notification.requestPermission();
}
