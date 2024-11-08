function superheroAlliance(params) {
    const n = Number(params.shift());
    const maxEnergy = 100;

    const heroes = {};

    for (let i = 0; i < n; i++) {
        const line = params.shift();

        const [name, power, energy] = line.split("-");
        const powers = power.split(',');

        heroes[name] = { superpowers: powers, energy: Number(energy) };
    }

    function findSuperPower(name, supPower) {
        const result = heroes[name].superpowers.find(power => power === supPower);
        return result;
    }

    while (params.length > 0) {
        let line = params.shift();
        if (line == "Evil Defeated!") {
            break;
        }

        const [action, ...rest] = line.split(" * ");

        if (action == "Use Power") {
            const name = rest[0];
            const power = rest[1];
            const energy = Number(rest[2]);

            let superPower = findSuperPower(name, power);

            if (superPower && heroes[name].energy >= energy) {
                let diff = heroes[name].energy - energy;
                heroes[name].energy -= energy;
                console.log(`${name} has used ${power} and now has ${diff} energy!`);

            } else {
                console.log(`${name} is unable to use ${power} or lacks energy!`);

            }

        } else if (action == "Train") {
            const name = rest[0];
            const traininEnergy = Number(rest[1]);

            if (heroes[name].energy + traininEnergy >= maxEnergy) {
                let diff = maxEnergy - heroes[name].energy;
                heroes[name].energy = maxEnergy;

                console.log(`${name} has trained and gained ${diff} energy!`);

            } else if (heroes[name].energy == maxEnergy) {
                console.log(`${name} is already at full energy!`);

            } else {
                heroes[name].energy += traininEnergy;

                console.log(`${name} has trained and gained ${traininEnergy} energy!`);

            }


        } else if (action == "Learn") {
            const name = rest[0];
            const newPower = rest[1];
            const havePower = findSuperPower(name, newPower);

            if (havePower) {
                console.log(`${name} already knows ${newPower}.`);

            } else {

                heroes[name].superpowers.push(newPower);

                console.log(`${name} has learned ${newPower}!`);
            }
        }
    }

    let arr = Object.entries(heroes);

    for (const [name, obj] of arr) {

        console.log(`Superhero: ${name}`);
        console.log(`- Superpowers: ${obj.superpowers.join(', ')}`);
        console.log(`- Energy: ${obj.energy}`);

    }

}

superheroAlliance([
    "3",
    "Iron Man-Repulsor Beams,Flight-80",
    "Thor-Lightning Strike,Hammer Throw-10",
    "Hulk-Super Strength-60",
    "Use Power * Iron Man * Flight * 30",
    "Train * Thor * 20",
    "Train * Hulk * 50",
    "Learn * Hulk * Thunderclap",
    "Use Power * Hulk * Thunderclap * 70",
    "Evil Defeated!"
])
