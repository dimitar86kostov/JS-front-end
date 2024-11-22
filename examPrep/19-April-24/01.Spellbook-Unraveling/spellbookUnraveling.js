function spellbookUnraveling(params) {

    let spell = params.shift();

    for (const command of params) {
        if (command == "End") {
            break;
        }
        const [comm, ...rest] = command.split('!');

        if (comm == "RemoveEven") {
            let result = '';
            for (let i = 0; i < spell.length; i++) {
                if (i % 2 == 0) {
                    result += spell[i]
                }
            }
            spell = result;
            console.log(spell);
        }

        if (comm == "TakePart") {
            let fromIndex = Number(rest[0])
            let toIndex = Number(rest[1])

            
            spell = spell.substring(fromIndex, toIndex);
            console.log(spell);
        }

        if (comm == "Reverse") {
            let word = rest[0];

            if (spell.includes(word)) {
                let reversedWord = word.split('').reverse().join('');

                let result = spell.replace(word, '');
                spell = result+reversedWord;
                console.log(spell);

            } else {

                console.log('Error');
            }
        }
    }
    console.log(`The concealed spell is: ${spell}`);

}

spellbookUnraveling((["asAsl2adkda2mdaczsasAsl2adkda2mdaczsa",

    "RemoveEven", // aAlakamaza 

    "TakePart!1!16", // Alakamaz 

    "Reverse!Alak", // Alakazam 

    "End"]));

// The concealed spell is: Alakazam
