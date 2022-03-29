console.log("Service Worker Loaded...");

this.self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  this.self.registration.showNotification(data.title, {
    body: "Notified by Swipe Up",
    icon: "https://i.ibb.co/gyMPmQy/SWIPE-UP-Logo.png"
  });
});