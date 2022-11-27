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
})

