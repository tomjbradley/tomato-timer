export default function notify() {
  if (Notification.permission === "granted") {
    const notification = new Notification("TomatoTimer", {
      icon: "/logo192.png",
      body: "Your time is up!!",
    });

    setTimeout(() => notification.close(), 5000);
  }
}
