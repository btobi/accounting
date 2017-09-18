export function number(number) {
    if (!number || number === 0)
        return ""
    return round(number, 2).toLocaleString("de-DE", { minimumFractionDigits: 2 })
}

export function round(number, digits) {
    return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
}