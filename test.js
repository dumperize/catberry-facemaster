'use strict';

class Robot {
    constructor(name, first, second) {
        this.name = name;
        this.firstLetter = first;
        this.secondLetter = second;
    }

    step(number) {
        if (number == null) {
            return new Promise((resolve, reject) => resolve(1));
        }
        return number.then(
                result => this.decide(result),
                error => console.log("Rejected: " + error.message)
        );
    }

    decide(number) {
        var res = number;

        do
            res++;
        while (res % this.firstLetter == 0 || res % this.secondLetter == 0);

        this.blabla(number, res);
        return res;
    }

    blabla(into, myDecide) {
        console.log(`I'm ${this.name}! I give ${into}. My decide: ${myDecide}, because ${myDecide} % ${this.firstLetter} = ${myDecide % this.firstLetter} and ${myDecide} % ${this.secondLetter} = ${myDecide % this.secondLetter} `);
    }
}

class Piggy extends Robot {
    constructor() {
        super("Piggy", 2, 3);
    }
}

class Qiwi extends Robot {
    constructor() {
        super("Qiwi", 5, 7);
    }
}

class Game {
    constructor() {
        this.piggy = new Piggy();
        this.qiwi = new Qiwi();
    }

    gameIteration(resolve) {
        return this.piggy.step(this.qiwi.step(resolve));
    }

    gameRecursive(iteration, res) {
        if (iteration < 1) {
            console.log('HEY');
            return;
        }
        if (iteration > 1) {
            return this.gameRecursive(--iteration, this.gameIteration(res));
        }
        return this.gameIteration(res);
    }
}

var game = new Game();
game.gameRecursive(0, null);