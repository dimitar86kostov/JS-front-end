function scienceExperimentation(params) {

    const num = Number(params.shift());
    const lab = {};
    const maxQuant = 500;

    for (let i = 0; i < num; i++) {

        let [chem, quant] = params[i].split(" # ");

        lab[chem] = { Quantity: Number(quant) };
    }

    params = params.slice(num);
    let line = params[0];


    while (line !== "End") {

        let [comm, ...rest] = params[0].split(" # ");

        if (comm == "Mix") {
            let chem1 = rest[0];
            let chem2 = rest[1];
            let amount = Number(rest[2]);

            if (lab[chem1].Quantity >= amount && lab[chem2].Quantity >= amount) {

                lab[chem1].Quantity -= amount;
                lab[chem2].Quantity -= amount;

                console.log(`${chem1} and ${chem2} have been mixed. ${amount} units of each were used.`);

            } else {
                console.log(`Insufficient quantity of ${chem1}/${chem2} to mix.`);
            }

            params.shift();
            line = params[0]
            continue;
        }

        if (comm == "Replenish") {

            let chem = rest[0];
            let amount = Number(rest[1]);

            if (lab.hasOwnProperty(chem)) {

                if (lab[chem].Quantity + amount > maxQuant) {

                    let increasedAmount = maxQuant - lab[chem].Quantity

                    lab[chem].Quantity = maxQuant;

                    console.log(`${chem} quantity increased by ${increasedAmount} units, reaching maximum capacity of 500 units!`);
                } else {

                    lab[chem].Quantity += amount;

                    console.log(`${chem} quantity increased by ${amount} units!`);
                }

            } else {
                console.log(`The Chemical ${chem} is not available in the lab.`);

            }
            params.shift();
            line = params[0]
            continue;
        }

        if (comm == "Add Formula") {
            let chem = rest[0];
            let formula = rest[1];

            if (lab.hasOwnProperty(chem)) {
                lab[chem].formula = formula;
                console.log(`${chem} has been assigned the formula ${formula}.`);

            } else {
                console.log(`The Chemical ${chem} is not available in the lab.`);

            }
            params.shift();
            line = params[0]
            continue;
        }
    }

    let entries = Object.entries(lab);

    for (const [chem, element] of entries) {

        if (element.hasOwnProperty('formula')) {

            console.log(`Chemical: ${chem}, Quantity: ${element.Quantity}, Formula: ${element.formula}`);

        }else{
            console.log(`Chemical: ${chem}, Quantity: ${Object.values(element)}`);
            
        }
    }
}
// scienceExperimentation(['4',
//     'Water # 200',
//     'Salt # 100',
//     'Acid # 50',
//     'Base # 80',
//     'Mix # Water # Salt # 50',
//     'Replenish # Salt # 150',
//     'Add Formula # Acid # H2SO4',
//     'End'])

    scienceExperimentation([ '3',
        'Sodium # 300',
        'Chlorine # 100',
        'Hydrogen # 200',
        'Mix # Sodium # Chlorine # 200',
        'Replenish # Sodium # 250',
        'Add Formula # Sulfuric Acid # H2SO4',
        'Add Formula # Sodium # Na',
        'Mix # Hydrogen # Chlorine # 50',
        'End']
      )