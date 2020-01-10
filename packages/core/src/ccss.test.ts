import ccss, { setValueMap } from '@'

setValueMap({
    'border-radius': {
        global: 6
    }
})

describe('ccss tests', () => {
    describe('Evaluations', () => {
        it('normal', () => {
            expect(ccss({ a: 'example 5s linear 2s infinite alternate' })).toBe(
                'animation: example 5s linear 2s infinite alternate;'
            )
        })
        it('mapValue', () => {
            expect(ccss({ fd: 'c' })).toBe('flex-direction: column;')
        })
        it('parseSingle', () => {
            expect(ccss({ ti: 2 })).toBe('text-indent: calc(2 * rem);')
        })
        it('parseMultipart', () => {
            expect(ccss({ m: [1, 2, 3, 4] })).toBe('margin: calc(1 * rem) calc(2 * rem) calc(3 * rem) calc(4 * rem) ;')
            expect(ccss({ m: [1, '1:3'] })).toBe('margin: calc(1 * rem) 1:3 ;')
            expect(ccss({ m: 10 })).toBe('margin: calc(10 * rem);')
            expect(ccss({ m: '1:2' })).toBe('margin: 1:2;')
            expect(ccss({ m: ['1:2'] })).toBe('margin: 1:2 ;')
            expect(ccss({ mt: '1:2' })).toBe('margin-top: 1:2;')
        })
        it('pipe', () => {
            expect(ccss({ r: 'global' })).toBe('border-radius: calc(6 * rem);')
        })
        it('undefined', () => {
            expect(ccss({ a: undefined })).toBe('')
        })
    })
})
