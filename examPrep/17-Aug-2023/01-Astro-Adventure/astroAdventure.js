
function astro(params) {

    const n = params.shift();
    const arr = params.slice(0, n);
    const team = {};
    arr.forEach(element => {
        let curr = element.split(' ');

        team[curr[0]] = { oxygen: Number(curr[1]), energy: Number(curr[2]) }
    });
    const maxEnergy = 200;
    const maxOxy = 100;

    const commands = params.slice(n);

    for (const comm of commands) {

        if (comm.startsWith('Explore')) {
            let [, name, energy] = comm.split(' - ');
            energy = Number(energy)
            if (team.hasOwnProperty(name)) {

                if (team[name].energy >= energy) {
                    team[name].energy -= energy
                    console.log(`${name} has successfully explored a new area and now has ${team[name].energy} energy!`);
                } else {
                    console.log(`${name} does not have enough energy to explore!`);
                }
            }
        } else if (comm.startsWith('Refuel')) {
            let [, name, amount] = comm.split(' - ');
            amount = Number(amount);

            if (team[name].energy + amount > maxEnergy) {
                let diff = maxEnergy - team[name].energy;
                team[name].energy = maxEnergy;
                console.log(`${name} refueled their energy by ${diff}!`);

            } else {
                team[name].energy += amount;
                console.log(`${name} refueled their energy by ${amount}!`);

            }



        } else if (comm.startsWith('Breathe')) {
            let [, name, amount] = comm.split(' - ');
            amount = Number(amount);

            if (team[name].oxygen + amount > maxOxy) {
                let diff = maxOxy - team[name].oxygen;

                team[name].oxygen = maxOxy;
                console.log(`${name} took a breath and recovered ${diff} oxygen!`)
            } else {
                team[name].oxygen += amount;
                console.log(`${name} took a breath and recovered ${amount} oxygen!`)

            }
        } else
            break;
    }
    let entries = Object.entries(team);

    for (const man of entries) {
        
        console.log(`Astronaut: ${man[0]}, Oxygen: ${man[1].oxygen}, Energy: ${man[1].energy}`);
    }

}

astro([    '4',
    'Alice 60 100',
    'Bob 40 80',
    'Charlie 70 150',
    'Dave 80 180',
    'Explore - Bob - 60',
    'Refuel - Alice - 30',
    'Breathe - Charlie - 50',
    'Refuel - Dave - 40',
    'Explore - Bob - 40',
    'Breathe - Charlie - 30',
    'Explore - Alice - 40',
    'End']
)
