export const CreateRoomLink = () => {
    const newRoom = crypto.randomUUID();

    return (
        <>
        <p>
            It looks like you're not in a room.
        </p>
        <p>
            <a href={`/#${newRoom}`} target="_BLANK" rel="noreferrer">
                Create a new room
            </a>{" "}
            then share the page URL for others to join your room.
        </p>
        </>
    );
}
