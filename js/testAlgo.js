var colors = ['red','white','blue','green','yellow','orange','rainbow'];
var categories = ['hardware','drink','robot','clothing'];
var foxes = ['fox1','fox2'];
var numShakes;
var name;

function main() {
    console.log(new Derivation(createCode(1,1,1,false)))
    // var hash = createCode(0,1,1,false);
    // var der = new Der
    // var hashhh = secretSauce('red','white','blue',10,'Jonathanaaaa');
    // var conc = new Concoction(hashhh);
    // console.log(conc.name);
    // console.log(drinksShown(['00100']));
    // console.log(drinksShown(['01000']));
}

main();

function Derivation(hash) {
    this.id = hash;
    this.name;
    if (hash[2] == '0') {
        this.name = 'Normal ';
    }
    else if (hash[2] == '1') {
        this.name = 'Rotten ';
    }
    else if (hash[2] == '2') {
        this.name = 'RARE ';
    }


    if (hash[0] == '0') {
        this.name+= 'Red ';
    }
    else if (hash[0] == '1') {
        this.name+= 'Green ';
    }
    else if (hash[0] == '2') {
        this.name+= 'Rainbow ';
    }

    if (hash[1] == '0') {
        this.name+= 'Clothes'
    }
    else if (hash[1] == '1') {
        this.name+= 'Drink'
    }
    else if (hash[1] == '2') {
        this.name+= 'Hardware'
    }
    else if (hash[1] == '3') {
        this.name+= 'Special Item!'
    }
}

//Note: if no drinks then drinkVar = 0
function createCode(drinkVar, numCracks, numSmoke, isSpecial) {
    var hashCode = '';
    
    hashCode += drinkVar;

    if (numCracks == 0) {
        hashCode += 1;
    } 
    else if (numCracks == 1) {
        if (isSpecial) {
            hashCode += 3;
        } else hashCode += 0;
    }
    else {
        hashCode += 2;
    }

    if (numSmoke <= 5) {
        hashCode += 2;
    } else if (numSmoke <= 10) {
        hashCode += 0;
    } else hashCode += 1;

    return hashCode;
}


function Concoction(hash) {
    this.id = hash;
    this.name;
    if (hash[0] == '0') {
        this.name = 'Red ';
    }
    else if (hash[0] == '1') {
        this.name = 'Green ';
    }
    else if (hash[0] == '5') {
        this.name = 'Rainbow '
    }
    if (hash[1] == '0') {
        this.name += 'FRESH '
    }
    else if (hash[1] == '1') {
        this.name += 'ROTTEN ';
    }
    else if (hash[1] == '5') {
        this.name += 'FIRE '
    }
    if (hash[2] == '0') {
        this.name += 'Awesome '
    }
    else if (hash[2] == '1') {
        this.name += 'Boring ';
    }
    else if (hash[2] == '5') {
        this.name += 'FIRE '
    }
    if (hash[4] == '0') {
        if (hash[3] == '0') {
            this.name += 'Hammer';
        }
        else if (hash[3] == '1') {
            this.name += 'Cocktail';
        }
        else if (hash[3] == '5') {
            this.name += 'Contract';
        }
    }
    else {
        this.name += 'Robot';
    }
}

function drinksShown(drinks) { // fix
    var str;
    var fox;
    for (let i=0; i<drinks.length; i++) {
        if (code[3] == '1') {
            if (code[0]=='0') {
                fox = 1;
                console.log("COLOR")
            }
            else if (code[0] == '1') {
                fox = 5;
                console.log("RAINBOW")
            }
            else if (code[0] == '5'){
                fox=0;
                console.log("NORMAL")
            }
        }
    }
    return fox;
}

function secretSauce(powder, oil, metal, shakes, title) {
    var first,second,third,fourth,fifth;
    if (powder == 'red') {
        first = 0;
    }
    else if (powder == 'green') {
        first = 1;
    }
    else if (powder == 'rainbow') {
        first = 5;
    }
    if (oil == 'white') {
        second = 0;
    }
    else if (oil == 'yellow') {
        second = 1;
    }
    else if (oil == 'rainbow') {
        second = 5;
    }
    if (metal == 'blue') {
        third = 0;
    }
    else if (metal == 'orange') {
        third = 1;
    }
    else if (metal == 'rainbow') {
        third = 5;
    }
    if (shakes % 2 == 0) {
        fourth = 0;
    }
    else {
        fourth = 1;
    }
    if (shakes == 10) {
        fourth = 5;
    }
    if (countVowels(title) >=5) {
        var prob = Math.random();
        if (prob >= .7) {
            fifth = 0;
        }
        else {
            fifth = 1;
        }
    }
    else {fifth = 0};
    return first.toString() + second.toString() + third.toString() + fourth.toString() + fifth.toString();
}

function isVowel(ch) {
    ch = ch.toUpperCase();
    return (ch=='A' || ch=='E' || ch=='I' || 
                           ch=='O' || ch=='U'); 
}

function countVowels(str) {
    var count = 0; 
    for (let i = 0; i < str.length; i++) 
        if (isVowel(str.charAt(i))) // Check for vowel 
            ++count; 
    return count;  
}

// main();