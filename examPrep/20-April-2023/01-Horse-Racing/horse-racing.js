function horseRacing(arr) {

    const line = arr.shift();
    const horses = line.split('|');

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let [comm, ...rest] = element.split(' ');
        if (comm == 'Finish') {
            break;
        }

        if (comm == 'Retake') {
            let [horse1, horse2] = rest;

            if (horses.indexOf(horse1) < horses.indexOf(horse2)) {
                
                let index1 = horses.indexOf(horse1);
                let index2 = horses.indexOf(horse2);
    
                horses.splice(index2, 1, horse1);
                horses.splice(index1, 1, horse2);

                console.log(`${horse1} retakes ${horse2}.`);
            }
        }

        if (comm == 'Trouble') {
            if (horses.indexOf(rest[0]) !== 0) {
                let currIndex = horses.indexOf(rest[0]);
                let newIndex = currIndex - 1;
                horses.splice(currIndex, 1);

                horses.splice(newIndex, 0, rest[0]);
                console.log(`Trouble for ${rest[0]} - drops one position.`);

            }

        }

        if (comm == 'Rage') {
            if (horses.indexOf(rest[0]) == horses.length - 1) {
                continue;
            } else if (horses.indexOf(rest[0]) + 1 == horses.length - 1) {
                let currIndex = horses.indexOf(rest[0]);
                horses.splice(currIndex, 1);

                horses.splice(currIndex + 1, 1, rest[0]);

            } else {
                let currIndex = horses.indexOf(rest[0]);
                horses.splice(currIndex, 1);

                horses.splice(currIndex + 2, 0, rest[0]);
            }
            console.log(`${rest[0]} rages 2 positions ahead.`);

        }
        if (comm == 'Miracle') {
            let last = horses[0];
            horses.splice(horses.indexOf(last), 1);

            horses.splice(horses.length, 0, last)
            console.log(`What a miracle - ${last} becomes first.`);
        }
    }

    console.log(horses.join('->'));
    console.log(`The winner is: ${horses[horses.length - 1]}`);

}

horseRacing((['Bella|Alexia|Sugar',
    'Retake Sugar Alexia',
    'Rage Sugar',
    'Trouble Bella',
    'Finish'])
);

horseRacing((['Onyx|Domino|Sugar|Fiona|Tim',
    'Trouble Onyx',
    'Retake Onyx Sugar',
    'Rage Domino',
    'Miracle',
    'Finish'])
)
horseRacing((['Fancy|Lilly',
    'Retake Lilly Fancy',
    'Trouble Lilly',
    'Trouble Lilly',
    'Finish',
    'Rage Lilly'])
    )