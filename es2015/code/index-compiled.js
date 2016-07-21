/**
 * Created by user on 13.07.2016.
 */
"use strict";

console.log = function (s) {
    document.write(s + "<br/>");
};
class Fighter {
    /**
     * @param {string} name
     * @param {number} power
     * @param {number} health
     */
    constructor(name = "Fighter", power = 1, health = 100) {
        this.name = name;
        this.power = power;
        this.health = health;
        this.maxHealth = health;
    }

    isDead() {
        return this.health <= 0;
    }
    /**
     * @param {number} damage
     * @return {Fighter} this
     */
    setDamage(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        }
        console.log(`${ this.name }'s health is ${ this.healthDesc() } now`);
        return this;
    }

    /**
     * @param {number} point
     * @param {Fighter} enemy
     * @return {Fighter} this
     */
    hit(enemy, point) {
        let damage = this.getDamage(point);
        console.log(`${ this.fullDesc() } ` + `hits ${ enemy.fullDesc() }` + `for ${ damage } damage`);
        enemy.setDamage(damage);
        if (enemy.isDead()) {
            if (enemy.onDead) enemy.onDead(this);
        }
        return this;
    }

    healthDesc() {
        return `${ this.health }/${ this.maxHealth }`;
    }

    fullDesc() {
        return ` ${ this.name } (${ this.healthDesc() }) `;
    }

    /**
     *
     * @param {number}point
     * @returns {number}damage
     */
    getDamage(point) {
        return point * this.power;
    }

}

class ImprovedFighter extends Fighter {
    /**
     * @param {string} name
     * @param {number} power
     * @param {number} health
     */
    constructor(name = "Improved Fighter", power = 2, health = 150) {
        super(name, power, health);
    }

    /**
     * @param {Fighter} enemy
     * @param {number} point
     * @return {ImprovedFighter} this
     */
    doubleHit(enemy, point) {
        console.log("Double hit!");
        super.hit(enemy, point * 2);
        return this;
    }

    /**
     * @param {number} point
     * @param {Fighter} enemy
     * @return {Fighter} this
     */
    hit(enemy, point) {
        return Math.random() > 0.3 ? super.hit(enemy, point) : this.doubleHit(enemy, point);
    }
}
class WeakFighter extends Fighter {
    /**
     * @param {string} name
     * @param {number} power
     * @param {number} health
     */
    constructor(name = "Weak Fighter", power = 1, health = 80) {
        super(name, power, health);
    }

    /**
     *
     * @override
     * @param {number}point
     */
    getDamage(point) {
        return super.getDamage(point) / 2;
    }

}
class GotWinnerException /*extends Error*/ {
    /**
     *
     * @param {Fighter} winner
     * @param {Fighter}  looser
     */
    constructor(winner, looser = undefined) {
        //super();
        this.winner = winner;
        this.looser = looser;
    }

    printResult() {
        console.log(`Fight results:\n` + `   Winner is ${ this.winner.name } (${ this.winner.healthDesc() })\n`);
        if (this.looser) {
            console.log(`   Looser is ${ this.looser.name } (${ this.looser.healthDesc() })`);
        }
    }
}

/**
 *
 * @param {Fighter} fighter
 * @param {Fighter|ImprovedFighter}improvedFighter
 * @param {Fighter|WeakFighter}weakFighter
 * @param {Array<number>}points
 */
let fight = (fighter, improvedFighter, weakFighter, ...points) => {
    console.log(`Begins fight between ${ fighter.fullDesc() }, ${ improvedFighter.fullDesc() } and ${ weakFighter.fullDesc() }`);
    /**@type {Array<Fighter>}*/
    let fighters = [fighter, improvedFighter, weakFighter];
    fighters.forEach(item => {
        item.onDead = function (killer) {
            console.log(`${ this.fullDesc() } dies`);
            let indexInArray = fighters.indexOf(this);
            fighters.splice(indexInArray, 1);
            if (fighters.length === 1) {
                throw new GotWinnerException(killer);
            }
        };
    });
    let getTarget = () => {
        let nextIndex = Math.floor(1 + Math.random() * (fighters.length - 1));
        //console.log(`Next index of ${fighters} is ${nextIndex}`);
        return fighters[nextIndex];
    };
    let doBattle = () => {
        let pointIndex = 0;
        while (true) {
            fighters[0].hit(getTarget(), points[pointIndex++] || 1);
            fighters.push(fighters.shift());
        }
    };
    try {
        doBattle();
        console.log("No winner!");
    } catch (e) {
        if (e instanceof GotWinnerException) e.printResult();else throw e;
    } finally {
        console.log("Fight ends");
    }
};

let fighter2 = new Fighter("fighter", 3, 200);
let fighter3 = new ImprovedFighter("improved", 4, 300);
let fighter4 = new WeakFighter("week", 3, 250);
fight(fighter2, fighter3, fighter4, 25, 21, 21, 12, 13, 12, 15, 17, 20);

//# sourceMappingURL=index-compiled.js.map