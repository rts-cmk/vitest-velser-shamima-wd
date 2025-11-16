import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { processValues, structureTest, asyncFunction, devideErr, apiMock } from "./functions"

describe("processValues function", () => {
  it("skal doble tal", () => {
    expect(processValues([1, 2])).toEqual([2, 4])
  })

  it("skal gøre strenge uppercase", () => {
    expect(processValues(["a", "b"])).toEqual(["A", "B"])
  })

  it("skal returnere N/A for null og undefined", () => {
    expect(processValues([null, undefined])).toEqual(["N/A", "N/A"])
  })

  it("skal returnere værdien for andre typer", () => {
    const obj = { x: 1 }
    const arr = [true, obj, [1,2]]
    expect(processValues(arr)).toEqual([true, obj, [1,2]])
  })
})

describe("structureTest function", () => {
    let numbers

    beforeEach(() => {
        numbers = { a: 2, b: 4 }
    })

    afterEach(() => {
        numbers = null
    })

    it("skal opsummere to tal", () => {
        expect(structureTest(numbers.a, numbers.b)).toBe(6)
    })

    it("skal minusere tal", () => {
        expect(structureTest(-1, numbers.b)).toBe(3)
    })
})

describe("asyncFunction function", () => {
    it("test af asynkrone funktioner når success er true", async () => {
        const result = await asyncFunction(true)
        expect(result).toBe("success")
    })
    it("test af asynkrone funktioner når success er false", async () => {
        try {
            await asyncFunction(false)
            throw new Error("det er skåret noget galt")
        } catch (error) {
            expect(error).toBe("resjected")
        }
    })
})


describe("devideErr function", () => {
    it("skal retutrere korrekt resultat", () => {
        expect(devideErr(10, 2)).toBe(5)
    })
    it("skal returnere error med typeof", () => {
        expect(() => { devideErr("10", 2) }).toThrow("skal vere tal på værdier")
    })
    it("skal returnere error med ikke dividere med 0", () => {
        expect(() => { devideErr(10, 0) }).toThrow("kan ikke dividere med 0")
    })
})

describe("apiMock function", () => {

    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn())
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it("skal returnere brugernavnet fra API", async () => {
        fetch.mockResolvedValue({
            json: vi.fn().mockResolvedValue({ name: "Bob" }),
        })

        const result = await apiMock(1)
        expect(result).toBe("Bob")
    })

    it("skal kaste fejl hvis fetch fejler", async () => {
        fetch.mockRejectedValue(new Error("Network error"))

        await expect(apiMock(1)).rejects.toThrow("Network error")
    })

    it("skal kaste fejl hvis name mangler", async () => {
        fetch.mockResolvedValue({
            json: vi.fn().mockResolvedValue({}),
        })

        await expect(apiMock(1)).rejects.toThrow("No name found")
    })
})
