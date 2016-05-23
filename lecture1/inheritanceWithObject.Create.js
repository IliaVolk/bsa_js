(function(){



    var Animal = {
        constructor:function(name, sound, age, region){
            this.age = age;
            this.name = name;
            this.sound = sound;
            this.region = region;

            this.say = function(){
                console.log(this.name + " says " + this.sound);
            };
            return this;
        }
    };

    var Cat = Object.create(Animal, {
        constructor: {value: function(name, age, region){
            Animal.constructor.call(this, name, "meuw", age, region);

            this.goAway = function(place){
                console.log(this.name + " quietly goes to " + (place || this.region))
            };
            return this;
        }}
    });

    var Dog = Object.create(Animal, {
        constructor: {value: function(name, age, region){
            Animal.constructor.call(this, name, "back", age, region);

            this.goAway = function(place){
                console.log(this.name + " runs to " + (place || this.region))
            };
            return this;
        }}
    });

    var Woodpecker = Object.create(Animal, {
        constructor: {value: function(name, age, region){
            Animal.constructor.call(this, name, "tock-tock", age, region);

            this.goAway = function(place){
                console.log(this.name + " flies to " + (place || this.region))
            };
            return this;
        }}
    });
    var cat = Object.create(Cat).constructor("Pussy", 1, "Europa");
    var dog = Object.create(Dog).constructor("Charly", 2, "America");
    var woodpecker = Object.create(Woodpecker).constructor("John", 2, "Australia");


    cat.say();
    dog.say();
    woodpecker.say();



    Animal.m = function(){
        console.log(this.name);
    };
    cat.m();
    dog.m();
})();