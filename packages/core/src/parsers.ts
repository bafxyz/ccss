export const toCSSRule = cssProp => {
    const objectCSSProp = cssProp.replace(/^-+/, '').replace(/-./g, ([, l]) => l.toUpperCase())
    return (input, prop, options) => {
        return options.outputTransformer.toCSSRule(cssProp, objectCSSProp, input, prop, options)
    }
}

export const parseSingle = (input, prop, options) =>
    typeof input === 'number' ? (input === 0 ? 0 : options.applyUnit(input)) : input

const applyArray = (input, prop, options) => {
    let out = ''
    for (const i of input) {
        out += `${parseSingle(i, prop, options)} `
    }
    return out
}

export const parseArray = (input, prop, options) => {
    switch (true) {
        case Array.isArray(input):
            return applyArray(input, prop, options)
        case input:
            return parseSingle(1, prop, options)
        default:
            return parseSingle(input, prop, options)
    }
}

export const mapValue = (input, prop, options) => {
    return options.valueMap?.[prop]?.[input] || input
}

export const pipe = function(...fs) {
    return (input, prop, options, original) => {
        for (const f of fs) {
            input = f(input, prop, options, original)
        }
        return input
    }
}

export const parsePseudo = (input, prop, options) => {
    return options.outputTransformer.toPseudo(input, prop, options)
}

export const child = (input, prop, options) => {
    return options.__ccss(input)
}
