let socket;
const roomInput = document.getElementById("room");

function startSocket() {
  const roomName = roomInput.getAttribute("value");
  socket = new WebSocket(
    `wss:sound-room-server-production.up.railway.app/${roomName}`
  );

  socket.addEventListener("open", () => {
    document.getElementById("status").innerText = `connected ${roomName}`;
  });

  socket.addEventListener("close", () => {
    document.getElementById("status").innerText = "disconnected";
    setTimeout(() => startSocket(), 1000);
  });

  socket.addEventListener("message", (event) => {
    const msg = event.data;
    const audioSource = new Audio(`${msg}.wav`);
    audioSource.play();
  });

  socket.addEventListener("error", () => {
    document.getElementById("status").innerText = "error";
  });
}

const context = new AudioContext();
const eventTypes = [
  "astonished",
  "cheer",
  "clap",
  "cry",
  "laugh",
  "woof",
  "quack",
  "boo",
  "wolf",
  "drum",
  "lame",
];

eventTypes.forEach((type) => {
  document.getElementById(type).addEventListener("click", () => {
    socket.send(type);
  });
});

document.getElementById("generate").addEventListener("click", () => {
  id = crypto.randomUUID();
  roomInput.setAttribute("value", id);
});

document.getElementById("connect").addEventListener("click", startSocket);
