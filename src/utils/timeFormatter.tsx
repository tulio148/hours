export const timeFormatter = (t: number) => {
    let hours = Math.floor(t / 3600).toString()
    let minutes = Math.floor((t % 3600) / 60).toString().padStart(2,'0')
    let seconds = Math.floor(t % 60).toString().padStart(2,'0') 
    return `${hours}:${minutes}:${seconds}`
}