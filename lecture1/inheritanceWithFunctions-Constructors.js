
(function(){
    var Animal = function(name, sound, age, region){
        this.name = name;
        this.sound = sound;
        this.age = age;
        this.region = region;
        this.say = function(){
            console.log(this.name + " says " + this.sound);
        }
    };

    var Cat = function(name, age, region){
        Animal.call(this, name, "meuw", age, region);
        this.goAway = function(place){
            console.log(this.name + " quietly goes to " + (place || region));
        }
    };
    Cat.prototype = Animal.prototype;

    var Dog = function(name, age, region){
        Animal.call(this, name, "back", age, region);
        this.goAway = function(place){
            console.log(this.name + " runs to " + (place || region));
        }
    };
    Dog.prototype = Animal.prototype;

    var Woodpecker = function(name, age, region){
        Animal.call(this, name, "tock-tock", age, region);
        this.goAway = function(place){
            console.log(this.name + " flies to " + (place || region));
        }
    };
    Woodpecker.prototype = Animal.prototype;

    var dog = new Dog("Charly", 1, "Europa");
    var cat = new Cat("Pussy", 2, "America");
    var woodpecker = new Woodpecker("Jogn", 3, "Australia");

    dog.say();
    cat.say();
    woodpecker.say();




    var getTypep = function(object){
        if (object.hasOwnProperty("sound")){
            switch (object.sound){
                case "meuw": return "Cat";
                case "back": return "Dog";
                case "tock-tock": return "Woodpecker";
            }
        }
        return "unknown";
    };

    console.log(getTypep(cat));
    console.log(getTypep(dog));
    console.log(getTypep(woodpecker));

    //modified getTypep
    getTypep = function(){
        if (this.hasOwnProperty("sound")){
            switch (this.sound){
                case "meuw": return "Cat";
                case "back": return "Dog";
                case "tock-tock": return "Woodpecker";
            }
        }
        return "unknown";
    };

    console.log(getTypep.call(cat));
    console.log(getTypep.call(dog));
    console.log(getTypep.call(woodpecker));
})();





