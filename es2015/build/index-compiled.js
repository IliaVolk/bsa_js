/**
 * Created by user on 13.07.2016.
 */
"use strict";

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Fighter = function () {
    /**
     * @param {string} name
     * @param {number} power
     * @param {number} health
     */

    function Fighter() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? "Fighter" : arguments[0];
        var power = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
        var health = arguments.length <= 2 || arguments[2] === undefined ? 100 : arguments[2];

        _classCallCheck(this, Fighter);

        this.name = name;
        this.power = power;
        this.health = health;
        this.maxHealth = health;
    }

    /**
     * @param {number} damage
     * @return {Fighter} this
     */

    _createClass(Fighter, [{
        key: "setDamage",
        value: function setDamage(damage) {
            this.health -= damage;
            return this;
        }

        /**
         * @param {number} point
         * @param {Fighter} enemy
         * @return {Fighter} this
         */

    }, {
        key: "hit",
        value: function hit(enemy, point) {
            var damage = point * this.power;
            enemy.setDamage(damage);
            return this;
        }
    }, {
        key: "healthDesc",
        value: function healthDesc() {
            return this.health + "/" + this.maxHealth;
        }
    }]);

    return Fighter;
}();

var ImprovedFighter = function (_Fighter) {
    _inherits(ImprovedFighter, _Fighter);

    /**
     * @param {string} name
     * @param {number} power
     * @param {number} health
     */

    function ImprovedFighter() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? "Improved Fighter" : arguments[0];
        var power = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
        var health = arguments.length <= 2 || arguments[2] === undefined ? 150 : arguments[2];

        _classCallCheck(this, ImprovedFighter);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ImprovedFighter).call(this, name, power, health));
    }

    /**
     * @param {Fighter} enemy
     * @param {number} point
     * @return {ImprovedFighter} this
     */

    _createClass(ImprovedFighter, [{
        key: "doubleHit",
        value: function doubleHit(enemy, point) {
            _get(Object.getPrototypeOf(ImprovedFighter.prototype), "hit", this).call(this, enemy, point * 2);
            return this;
        }
    }]);

    return ImprovedFighter;
}(Fighter);

var GotWinnerException /*extends Error*/ = function () {
    /**
     *
     * @param {Fighter} winner
     * @param {Fighter} looser
     */

    function GotWinnerException(winner, looser) {
        _classCallCheck(this, GotWinnerException);

        //super();
        this.winner = winner;
        this.looser = looser;
    }

    _createClass(GotWinnerException, [{
        key: "printResult",
        value: function printResult() {
            console.log("Fight results:\n" + ("   Winner is " + this.winner.name + " (" + this.winner.healthDesc() + ")\n") + ("   Looser is " + this.looser.name + " (" + this.looser.healthDesc() + ")"));
        }
    }]);

    return GotWinnerException;
}();
/**
 * @param {Fighter} source
 * @param {Fighter} target
 * @param {number} point
 */

var doHit = function doHit(source, target, point) {
    console.log(source.name + " (" + source.healthDesc() + ") " + ("hits " + target.name + " (" + target.healthDesc() + ") ") + ("on point " + point));
    source.hit(target, point);
    console.log(target.name + "'s health is now " + target.healthDesc());
    if (target.health <= 0) {
        throw new GotWinnerException(source, target);
    }
};
/**
 * @param {Fighter} fighter
 * @param {ImprovedFighter|Fighter} improvedFighter
 * @param {Array<number>} points
 */
var fight = function fight(fighter, improvedFighter) {
    for (var _len = arguments.length, points = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        points[_key - 2] = arguments[_key];
    }

    console.log("Begins battle between " + fighter.name + " and " + improvedFighter.name);
    var doBattle = function doBattle() {
        for (var i = 0; i < points.length; i += 2) {
            doHit(fighter, improvedFighter, points[i]);
            if (i + 1 < points.length) doHit(improvedFighter, fighter, points[i + 1]);
        }
    };
    try {
        doBattle();
        console.log("No winner!");
    } catch (e) {
        if (e instanceof GotWinnerException) e.printResult(); else throw e;
    } finally {
        console.log("Fight ends");
    }
};

var fighter = new Fighter("fighter", 2, 100);

var improvedFighter = new ImprovedFighter("improvedFighter", 3, 100);
fight(fighter, improvedFighter, 25, 13, 45, 20, 10, 25);

var fighter2 = new Fighter("fighter2", 3, 200);
var fighter3 = new Fighter("fighter3", 4, 300);
fight(fighter2, fighter3, 25, 31, 1);

//# sourceMappingURL=index-compiled.js.map