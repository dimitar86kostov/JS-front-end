function wildWest(input) {

    const num = Number(input.shift());

    const players = {};

    const capacityHP = 100;
    const capacityBullets = 6;

    let line = input[0];
    let counter = 1

    while (line !== "Ride Off Into Sunset") {

        if (counter <= num) {
            let [player, HP, bullets] = line.split(' ');
            HP = Number(HP);

            if (capacityHP < HP) {
                HP = capacityHP;
            }

            players[player] = { HP: HP, Bullets: bullets };

            input.shift();
            line = input[0];
            counter++;
            continue
        }

        let [command, ...rest] = line.split(' - ');

        if (command == "FireShot") {

            let name = rest[0];
            let target = rest[1];

            if (players[name].bullets > 0) {
                players[name].bullets--;
                console.log(`${name} has successfully hit ${target} and now has ${players[name].bullets} bullets!`);
            } else {
                console.log(`${name} doesn't have enough bullets to shoot at ${target}!`);
            }
            input.shift();
            if (input.length == 0) {
                brake;
            }
            line = input[0];
        }

        if (command == "TakeHit") {
            let name = rest[0];
            let damage = rest[1];
            let attacker = rest[2]

            players[name].HP -= Number(damage);

            if (players[name].HP > 0) {

                console.log(`${name} took a hit for ${damage} HP from ${attacker} and now has ${players[name].HP} HP!`);

            } else {
                console.log(`${name} was gunned down by ${attacker}!`);
                delete players[name];
            }
            input.shift();
            if (input.length == 0) {
                brake
            }
            line = input[0];
        }

        if (command == "Reload") {
            let name = rest[0];

            if (players[name].bullets < capacityBullets) {

                let different = capacityBullets - players[name].bullets;

                players[name].bullets = capacityBullets;


                console.log(`${name} reloaded ${different} bullets!`);

            } else {
                console.log(`${name}'s pistol is fully loaded!`);

            }
            input.shift();
            if (input.length == 0) {
                brake
            }
            line = input[0];
        }

        if (command == "PatchUp") {
            let name = rest[0];
            let amount = rest[1];

            
            if (players[name].HP + Number(amount) < capacityHP) {
                
                
                players[name].HP += Number(amount);
                
                console.log(`${name} patched up and recovered ${amount} HP!`);
                
            } else{
                
                // let recovered = capacityHP - players[name].HP;
                players[name].HP = capacityHP;
                console.log(`${name} is in full health!`);
            }
            input.shift();
            if (input.length == 0) {
                brake
            }
            line = input[0];
        }
    }

    if (Object.keys(players).length) {

        let entries = Object.entries(players);

        for (const [name, obj] of entries) {

            console.log(`${name}`)

            let properties = Object.entries(obj)


            for (const el of properties) {

                console.log(` ${el[0]}: ${el[1]}`);

            }
        }
    }
}

// wildWest(["2",

//     "Gus 100 0",

//     "Walt 100 6",

//     "FireShot - Gus - Bandit",

//     "TakeHit - Gus - 100 - Bandit",

//     "Reload - Walt",

//     "Ride Off Into Sunset"])

wildWest(["2",

    "Jesse 100 4",

    "Walt 100 5",

    "FireShot - Jesse - Bandit",

    "TakeHit - Walt - 30 - Bandit",

    "PatchUp - Walt - 29",

    "Reload - Jesse"])

// wildWest(["2",

//     "Gus 100 4",

//     "Walt 100 5",

//     "FireShot - Gus - Bandit",

//     "TakeHit - Walt - 100 - Bandit",

//     "Reload - Gus",

//     "Ride Off Into Sunset"])