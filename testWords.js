var common = require("./src/common.json")

async function getData(target) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${target}`)
    const data = await response.json()
    const definition = data[0].meanings[0].definitions[0].definition
    const example = data[0].meanings[0].definitions[0].example
    return [definition, example]
  }

// for each word in common check weather it is in the dictionary

function checkWords() {
    for (let i = 0; i < common.length; i++) {
        getData(common[i]).then(([definition, example]) => {
            console.log(`${common[i]}: ${definition}`)
            console.log(`${common[i]}: ${example}`)
        })
    }
}

checkWords()