
(function(){
    var Animal = function(name, sound, age, region){
        this.name = name;
        this.sound = sound;
        this.age = age;
        this.region = region;
    };
    Animal.prototype.say = function(){
        console.log(this.name + " says " + this.sound);
    };

    var Cat = function(name, age, region){
        Animal.call(this, name, "meuw", age, region);
    };

    //without using Object.create functions-constructors Cat, Dog and Woodpecker will have same prototype,
    //so Dog.prototype.goAway = function(){..} will override Cat.prototype.goAway and
    //all new Cat(..) objects will use dog's goAway
    Cat.prototype = Object.create(Animal.prototype);
    Cat.prototype.goAway = function(place){
        console.log("cat " + this.name + " quietly goes to " + (place || this.region));
    };

    var Dog = function(name, age, region){
        Animal.call(this, name, "back", age, region);
    };
    Dog.prototype = Object.create(Animal.prototype);
    Dog.prototype.goAway = function(place){
        console.log("dog " + this.name + " runs to " + (place || this.region));
    };



    var Woodpecker = function(name, age, region){
        Animal.call(this, name, "tock-tock", age, region);
    };
    Woodpecker.prototype = Object.create(Animal.prototype);
    Woodpecker.prototype.goAway = function(place){
        console.log("woodpecker " + this.name + " flies to " + (place || this.region));
    };



    var dog = new Dog("Charly", 1, "Europa");
    var cat = new Cat("Pussy", 2, "America");
    var woodpecker = new Woodpecker("John", 3, "Australia");

    dog.say();
    cat.say();
    woodpecker.say();




    var getType = function(object){
        if (object.hasOwnProperty("sound")){
            switch (object.sound){
                case "meuw": return "Cat";
                case "back": return "Dog";
                case "tock-tock": return "Woodpecker";
            }
        }
        return "unknown";
    };

    console.log(getType(cat));
    console.log(getType(dog));
    console.log(getType(woodpecker));

    //modified getType
    getType = function(){
        if (this.hasOwnProperty("sound")){
            switch (this.sound){
                case "meuw": return "Cat";
                case "back": return "Dog";
                case "tock-tock": return "Woodpecker";
            }
        }
        return "unknown";
    };

    console.log(getType.call(cat));
    console.log(getType.call(dog));
    console.log(getType.call(woodpecker));

})();





