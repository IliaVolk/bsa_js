(function () {



    //animal is not a constructor, capital letter should be lowercase
    var animal = {
        constructor: function (name, sound, age, region) {
            this.age = age;
            this.name = name;
            this.sound = sound;
            this.region = region;
            return this;
        },
        say: function () {
            console.log(this.name + " says " + this.sound);
        }
    };

    var cat = Object.create(animal, {
        constructor: {
            value: function (name, age, region) {
                animal.constructor.call(this, name, "meuw", age, region);
                return this;
            }
        },
        goAway: {
            value: function (place) {
                console.log(this.name + " quietly goes to " + (place || this.region))
            }
        }
    });

    var dog = Object.create(animal, {
        constructor: {
            value: function (name, age, region) {
                animal.constructor.call(this, name, "back", age, region);
                return this;
            }
        },
        goAway: {
            value: function (place) {
                console.log(this.name + " runs to " + (place || this.region))
            }
        }
    });

    var woodpecker = Object.create(animal, {
        constructor: {
            value: function (name, age, region) {
                animal.constructor.call(this, name, "tock-tock", age, region);
                return this;
            }
        },
        goAway: {
            value: function (place) {
                console.log(this.name + " flies to " + (place || this.region));
            }
        }
    });

    var pussy = Object.create(cat).constructor("Pussy", 1, "Europa");
    var charley = Object.create(dog).constructor("Charley", 2, "America");
    var john = Object.create(woodpecker).constructor("John", 2, "Australia");


    pussy.say();
    charley.say();
    john.say();

    pussy.goAway();
    charley.goAway();

    console.log(pussy instanceof cat);
})();