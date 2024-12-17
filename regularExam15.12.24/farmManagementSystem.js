function farmManagementSystem(params) {

    let n = params.shift();
    n = Number(n);

    const farmers = {};

    for (let i = 0; i < n; i++) {
        let line = params[i];
        let [name, area, tasks] = line.split(' ');
        let [task1, task2] = tasks.split(',');

        farmers[name] = [area, task1, task2];

        // farmers[name] = { workArea: area, task1: task1, task2: task2 };

    }

    params = params.slice(n);

    let line = params.shift();

    while (line !== 'End') {

        let [comm, name, ...rest] = line.split(' / ');

        if (comm == 'Execute') {

            let [workArea, task] = rest;

            if (farmers[name].includes(workArea) && farmers[name].includes(task)) {

                console.log(`${name} has executed the task: ${task}!`);

            } else {
                console.log(`${name} cannot execute the task: ${task}.`);

            }

        } else if (comm == 'Change Area') {

            let newArea = rest[0];

            farmers[name].splice(0, 1, newArea);

            console.log(`${name} has changed their work area to: ${newArea}`);

        } else if (comm == 'Learn Task') {

            if (farmers[name].includes(rest[0])) {

                console.log(`${name} already knows how to perform ${rest[0]}.`);

            } else {

                farmers[name].splice(1, 0, rest[0]);

                console.log(`${name} has learned a new task: ${rest[0]}.`);
            }

        }
        line = params.shift();
    }

    let entries = Object.entries(farmers);

    for (const [name, arr] of entries) {

        let area = arr.shift();
        let tasks = [];

        arr.forEach(task => {
            tasks.push(task);
        });

        tasks = tasks.sort();

        console.log(`Farmer: ${name}, Area: ${area}, Tasks: ${tasks.join(', ')}`);

    }

}

// farmManagementSystem([
//     "2",
//     "John garden watering,weeding",
//     "Mary barn feeding,cleaning",
//     "Execute / John / garden / watering",
//     "Execute / Mary / garden / feeding",
//     "Learn Task / John / planting",
//     "Execute / John / garden / planting",
//     "Change Area / Mary / garden",
//     "Execute / Mary / garden / cleaning",
//     "End"
// ])

farmManagementSystem([
    "3",
    "Alex apiary harvesting,honeycomb",
    "Emma barn milking,cleaning",
    "Chris garden planting,weeding",
    "Execute / Alex / apiary / harvesting",
    "Learn Task / Alex / beeswax",
    "Execute / Alex / apiary / beeswax",
    "Change Area / Emma / apiary",
    "Execute / Emma / apiary / milking",
    "Execute / Chris / garden / watering",
    "Learn Task / Chris / pruning",
    "Execute / Chris / garden / pruning",
    "End"
])
