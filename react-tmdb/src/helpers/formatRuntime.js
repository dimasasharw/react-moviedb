export default function formatRuntime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return (`${hours}h ${minutes}m`);
}