export const generateClassName = () => {
    const size = [ "small", "medium", "big" ]
    const color = [ "teal", "ruby", "slate", "ivory" ]

    const objectSize = `size-${ size[ ~~ ( Math.random() * 3 ) ] }`
    const fontSize = `font-${ size[ ~~ ( Math.random() * 3 ) ] }`
    const objectColor = `${ color[ ~~ ( Math.random() * 4 ) ] }`

    // So I just set randomly generated classes and all else is handled in CSS.
    return `letter ${ objectSize } ${ fontSize } ${ objectColor }` }