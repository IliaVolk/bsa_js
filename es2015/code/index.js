/**
 * Created by user on 13.07.2016.
 */
"use strict";

class Fighter {
    /**
     * @param {string} name
     * @param {number} power
     * @param {number} health
     */
    constructor(name="Fighter", power=1, health=100) {
        this.name = name;
        this.power = power;
        this.health = health;
        this.maxHealth = health;
    }

    /**
     * @param {number} damage
     * @return {Fighter} this
     */
    setDamage(damage) {
        this.health -= damage;
        return this;
    }

    /**
     * @param {number} point
     * @param {Fighter} enemy
     * @return {Fighter} this
     */
    hit(enemy, point) {
        let damage = point * this.power;
        enemy.setDamage(damage);
        return this;
    }

    healthDesc() {
        return `${this.health}/${this.maxHealth}`;
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
        super.hit(enemy, point * 2);
        return this;
    }
}
class GotWinnerException /*extends Error*/ {
    /**
     *
     * @param {Fighter} winner
     * @param {Fighter} looser
     */
    constructor(winner, looser) {
        //super();
        this.winner = winner;
        this.looser = looser;
    }

    printResult() {
        console.log(
            `Fight results:\n` +
            `   Winner is ${this.winner.name} (${this.winner.healthDesc()})\n` +
            `   Looser is ${this.looser.name} (${this.looser.healthDesc()})`);
    }
}
/**
 * @param {Fighter} source
 * @param {Fighter} target
 * @param {number} point
 */
const doHit = (source, target, point) => {
    console.log(`${source.name} (${source.healthDesc()}) ` +
        `hits ${target.name} (${target.healthDesc()}) ` +
        `on point ${point}`);
    source.hit(target, point);
    console.log(`${target.name}'s health is now ${target.healthDesc()}`);
    if (target.health <= 0) {
        throw new GotWinnerException(source, target);
    }
};
/**
 * @param {Fighter} fighter
 * @param {ImprovedFighter|Fighter} improvedFighter
 * @param {Array<number>} points
 */
let fight = (fighter, improvedFighter, ...points) => {
    console.log(`Begins battle between ${fighter.name} and ${improvedFighter.name}`);
    let doBattle = () => {
        for (let i = 0; i < points.length; i += 2) {
            doHit(fighter, improvedFighter, points[i]);
            if (i + 1 < points.length)
                doHit(improvedFighter, fighter, points[i + 1]);
        }
    };
    try {
        doBattle();
        console.log("No winner!")
    } catch (e) {
        if (e instanceof GotWinnerException)
            e.printResult();
        else throw e;
    } finally {
        console.log("Fight ends")
    }
};

let fighter = new Fighter("fighter", 2, 100);

let improvedFighter = new ImprovedFighter("improvedFighter", 3, 100);
fight(fighter, improvedFighter, 25, 13, 45, 20, 10, 25);

let fighter2 = new Fighter("fighter2", 3, 200);
let fighter3 = new Fighter("fighter3", 4, 300);
fight(fighter2, fighter3, 25, 31, 1);
