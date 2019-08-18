let name = 'cat';
let name1 = 'dog';
let arr = ['cat','cog','cmt','dat','dot'];
let chained = [];

/*
– Input words will be between 3 and 7 letters in length
– Each word pair has two different words of the same length
– The input file can have any number of lines
*/

let splitN = name.split('');
let char = 0;
while (name !== name1) {
    if (splitN[char] !== name1[char]) {
           splitN[char] = name1[char];
           //Check if word after change is in array.
        if (arr.indexOf(splitN.join('')) !== -1) {
            console.log('---- was found ----');
            //If true name will be equal to the joined array and pushed into the chain.
            name = splitN.join('');
            chained.push(name);
            console.log(chained);
            //Move to the next word
            char++;

        } else {
            //Else the word isnt in the array.
            console.log('---- wasnt found ----');
            //Change the word back the the normal word
            splitN[char] = name[char];
            //If the char is the last of the length move to 0 and relay back through the word of arrays
            if(char === splitN.length - 1){
                char = 0;
            } else {
                //Else move on to the next word.
                char++
            }

        }
    }

}




