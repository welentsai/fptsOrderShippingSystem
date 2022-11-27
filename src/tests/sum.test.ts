import { assert, describe, expect, it } from 'vitest'
import sum from '../index'

describe('skipped', () => {
    it('test', () => {
        // Suite skipped, no error
        assert.equal(Math.sqrt(4), 2)
    })
})

describe('#sum', () => {
    it("return 0 with no numbers", () => {
        expect(sum()).toBe(0)
    })

    it("return same number with one number", () => {
        expect(sum(1)).toBe(1)
    })

    it("return total number with multiple numbers", () => {
        expect(sum(1, 2, 3, 4, 5)).toBe(15)
    })
})

