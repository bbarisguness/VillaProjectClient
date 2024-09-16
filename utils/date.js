//2024-05-13 to 13.05.2024
export function dateToDotFormat(dateString) {
    const arr = dateString.split('-')
    return `${arr[arr.length - 1]}.${arr[1]}.${arr[0]}`
}