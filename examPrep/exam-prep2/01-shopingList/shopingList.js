function shopingList(arr) {

    const list = arr.shift().split('!');

    let line = arr.shift();

    while (line !== 'Go Shopping!') {

        const [comm, ...rest] = line.split(' ');

        if (comm == 'Urgent') {

            if (!list.includes(rest[0])) {

                list.unshift(rest[0]);
            }


        } else if (comm == 'Unnecessary') {

            if (list.includes(rest[0])) {
                const index = list.indexOf(rest[0]);

                list.splice(index, 1);
            }

        } else if (comm == 'Correct') {

            let [oldItem, newItem] = rest;

            if (list.includes(oldItem)) {

                list.splice(list.indexOf(oldItem), 1, newItem);
            }

        } else if (comm == 'Rearrange') {
            
            if (list.includes(rest[0])) {

                list.splice(list.indexOf(rest[0]), 1);
                
                list.push(rest[0]);
            }
        }

        line = arr.shift();

    }

    console.log(list.join(', '));
    
}

// shopingList(["Tomatoes!Potatoes!Bread",
//     "Unnecessary Milk",
//     "Urgent Tomatoes",
//     "Go Shopping!"])

shopingList(["Milk!Pepper!Salt!Water!Banana",
    "Urgent Salt",
    "Unnecessary Grapes",
    "Correct Pepper Onion",
    "Rearrange Water",
    "Correct Tomatoes Potatoes",
    "Go Shopping!"])

