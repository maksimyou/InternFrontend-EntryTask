import { encoded, translations } from './data.js'

console.log("Let's rock")
console.log(encoded, translations)
let decoded = Object.assign(encoded)
let uniqueId = [];

const decodeddFunc = () => {

    for (let i = 0; i < decoded.length; i++) {
        for (let name in decoded[i]) {
            if (translations[decoded[i][name]] === undefined || translations[decoded[i][name]] === null) {
                if (translations[decoded[i][name]] === undefined) {
                    uniqueId.push(decoded[i][name])
                }
            } else {
                decoded[i][name] = translations[decoded[i][name]]
            }
        }
    }
    uniqueId = uniqueId.filter(e => {
        return e !== null && +e > 0
    })
}


decodeddFunc()



console.log(decoded, uniqueId)
