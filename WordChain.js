const fs = require('fs');

class WordChain{

    constructor(firstWord,secondWord){
        this.firstWord = firstWord;
        this.secondWord = secondWord;
        this.arr = [];
        this.chainedWords = [];
    }

    setFirstWord(firstWord){
        this.firstWord = firstWord
    }

    //Get Data from the text file.
    getData(file) {
        return new Promise((resolve,reject) => {
            fs.readFile(file,'utf-8', (err,data) => {
                if(err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    }

     checkIfWordInList(list, word){
        return list.indexOf(word) !== -1;
    }


    returnChain(firstName, secondName){
        const { chainWords } = this;
        if(firstName === secondName){
            return chainWords
        }
    }


    //Print the result
    print(){
        const { arr, firstName } = this;
            console.log(firstName)
    };


    run() {
        this.getData('./50kwords.txt').then( data => {
            const { firstWord, secondWord, checkIfWordInList, chainedWords } = this;
            let splitN = firstWord.split('');
            console.log(splitN);
            let char = 0;
            while (firstWord !== secondWord) {
                if (splitN[char] !== secondWord[char]) {
                    splitN[char] = secondWord[char];
                    console.log(` HEREEEEEE ${splitN.join('')}`)
                    //Check if word after change is in array.
                    if (checkIfWordInList(data,splitN.join(''))) {
                        console.log('---- was found ----');
                        //If true name will be equal to the joined array and pushed into the chain.
                        console.log(splitN.join(''));
                        this.setFirstWord(splitN.join('').toString());
                        console.log('here');
                        console.log(splitN.join(''));
                        chainedWords.push(splitN.join(''));
                        console.log(chainedWords);
                        //Move to the next word
                        char++;

                    } else {
                        //Else the word isnt in the array.
                        console.log('---- wasnt found ----');
                        //Change the word back the the normal word
                        splitN[char] = secondWord[char];
                        console.log(splitN[char])
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


        });
    }
}

// Run Class
const wordChain = new WordChain('cat','dog');
wordChain.run();
