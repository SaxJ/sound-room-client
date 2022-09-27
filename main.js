let socket;
function startSocket() {
    socket = new WebSocket("wss://sound-room-server-production.up.railway.app");

    socket.addEventListener("open", () => {
        document.getElementById("status").innerText = "connected";
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
startSocket();

const context = new AudioContext();
const eventTypes = [
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
