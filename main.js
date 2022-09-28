const roomName = window.location.hash.substring(1);
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

let socket;
function startSocket() {
    socket = new WebSocket(
        //`ws://localhost:9160/${roomName}`
        `wss://sound-room-server-production.up.railway.app/${roomName}`
    );

    socket.addEventListener("open", () => {
        document.getElementById("status").innerText = `connected ${roomName}`;
    });

    socket.addEventListener("close", () => {
        document.getElementById("status").innerText = "disconnected";
    });

    socket.addEventListener("message", async (event) => {
        const msg = await event.data.text();
        const audioSource = new Audio(`${msg}.wav`);
        audioSource.play();
    });

    socket.addEventListener("error", () => {
        document.getElementById("status").innerText = "error";
    });
}
startSocket();

document.getElementById("generate").addEventListener("click", () => {
    id = crypto.randomUUID();
    window.location.href = `/#${id}`;
    window.location.reload();
});

eventTypes.forEach((type) => {
    document.getElementById(type).addEventListener("click", () => {
        socket.send(type);
    });
});
