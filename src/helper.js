export function chechheading(str) {
    return /^(\*)(\*)(.*)\*$/.test(str);
} 

export function replaceheadingStars(str) {
    return str.replace(/^(\*)(\*)|(\*)$/g,'')
} 