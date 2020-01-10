let str1 = "3,4"

let res1 = str1.split(",")
console.log(res1)
console.log(typeof res1[0])
let res2 = res1.map(e => { return parseInt(e, 10) })
console.log(res2)

/* let str = "5"
let res = parseInt(str, 10)
console.log(res) */