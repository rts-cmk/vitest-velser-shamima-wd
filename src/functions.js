
export function processValues(arr) {
  return arr.map(value => {
    if(typeof value === "number"){
        return value * 2
    } else if (typeof value === "string"){
        return value.toUpperCase()
    } else if (value === null || value === undefined){
        return "N/A"
    } else {
        return value
    }
  })
}

export function structureTest(a, b) {
    return a + b   
}

export function asyncFunction(success = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(success) {
                resolve("success")
            } else{
                reject("resjected")
            }
        }, 500)
    })
}

export function devideErr(a, b) {
    if( typeof a !== "number" || typeof b !== "number") {
        throw new Error("skal vere tal på værdier")
    } else if (b === 0){
        throw new Error("kan ikke dividere med 0")
    }
    return a / b;
}

export async function apiMock(id) {
    const response = await fetch(`api/user/${id}`)
    const user = await response.json()
    if (!user.name) throw new Error("No name found")
    return user.name
}