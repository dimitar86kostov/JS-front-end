function manageChemicals(input) {
  let chemicals = [];
  const n = Number(input.shift());

  for (let i = 0; i < n; i++) {
    const [name, quantity] = input.shift().split(' # ');
    chemicals.push({ name, quantity: Number(quantity), formula: null });
  }

  function findChemicalByName(name) {
    return chemicals.find(chemical => chemical.name === name);
  }

  function findChemicalIndexByName(name) {
    return chemicals.findIndex(chemical => chemical.name === name);
  }

  while (input.length > 0) {
    const command = input.shift();
    
    if (command === 'End') {
      break;
    }
    
    const parts = command.split(' # ');
    const action = parts[0];

    if (action === 'Mix') {
      const [chem1, chem2, amount] = [parts[1], parts[2], Number(parts[3])];
      const chemical1 = findChemicalByName(chem1);
      const chemical2 = findChemicalByName(chem2);
      
      if (chemical1 && chemical2 && chemical1.quantity >= amount && chemical2.quantity >= amount) {
        chemical1.quantity -= amount;
        chemical2.quantity -= amount;
        console.log(`${chem1} and ${chem2} have been mixed. ${amount} units of each were used.`);
      } else {
        console.log(`Insufficient quantity of ${chem1}/${chem2} to mix.`);
      }
    } else if (action === 'Replenish') {
      const [chem, amount] = [parts[1], Number(parts[2])];
      const chemical = findChemicalByName(chem);
      
      if (chemical) {
        const newQuantity = Math.min(chemical.quantity + amount, 500);
        const diff = newQuantity - chemical.quantity;
        chemical.quantity = newQuantity;
        if (newQuantity === 500) {
          console.log(`${chem} quantity increased by ${diff} units, reaching maximum capacity of 500 units!`);
        } else {
          console.log(`${chem} quantity increased by ${diff} units!`);
        }
      } else {
        console.log(`The Chemical ${chem} is not available in the lab.`);
      }
    } else if (action === 'Add Formula') {
      const [chem, formula] = [parts[1], parts[2]];
      const chemicalIndex = findChemicalIndexByName(chem);
      
      if (chemicalIndex !== -1) {
        chemicals[chemicalIndex].formula = formula;
        console.log(`${chem} has been assigned the formula ${formula}.`);
      } else {
        console.log(`The Chemical ${chem} is not available in the lab.`);
      }
    }
  }

  chemicals.forEach(chemical => {
    let output = `Chemical: ${chemical.name}, Quantity: ${chemical.quantity}`;
    if (chemical.formula) {
      output += `, Formula: ${chemical.formula}`;
    }
    console.log(output);
  });
}

const inputArray = [
  '3',
  'Sodium # 300',
  'Chlorine # 100',
  'Hydrogen # 200',
  'Mix # Sodium # Chlorine # 200',
  'Replenish # Sodium # 250',
  'Add Formula # Sulfuric Acid # H2SO4',
  'Add Formula # Sodium # Na',
  'Mix # Hydrogen # Chlorine # 50',
  'End'
];

manageChemicals(inputArray);


