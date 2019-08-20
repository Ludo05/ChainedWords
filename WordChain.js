const fs = require("fs");

/*

<!-- LOOK AT THIS --->
IN EACH WORD  THERE IS ONLY ONE CHARACTER CHANGE BETWEEN WORDS, CHECK WHICH CHARACTER CHANGES AND SWAP
cat,cot,cog,dog
lead,load,goad,gold
ruby,rubs,robs,rods,rode,code
<!-- LOOK AT THIS ---!>

Input words will be between 3 and 7 letters in length
Each word pair has two different words of the same length
The input file can have any number of lines

4 cat,cot,cog,dog

4 lead,load,goad,gold {
checks first letter changes to 'g' (rejects 'gead' is in list)
goes back to 'lead'
checks second letter changes to 'o' (accepts 'load' is not in list!')
pushes to 'load' to chain.
checks third letter changes to 'l' (rejects 'lold' is not  in list)
goes back to 'load'
check the fourth letter change to 'd' (accept  'load')
 NEEDS A CHECK IF ALREADY IN CHAIN DOESN'T ADD AND MOVES ON
SET char back to 0!!!!!
checks first letter changes to 'g' (accepts 'goad' is in list)
GOES THROUGH THE REST AND REJECTS AS NOT IN LIST
checks third letter changes to 'l' (accepts 'gold' is in list)
Complete
}


6 ruby,rubs,robs,rods,rode,code
*/

class WordChain {
  constructor(firstWord, secondWord, file) {
    this.firstWord = firstWord;
    this.secondWord = secondWord;
    this.file = file;
    this.chainedWords = [];
  }

  //Used to change the first word if in list.
  setFirstWord(firstWord) {
    this.firstWord = firstWord;
  }

  //Get Data from the text file.
  getData() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // Checks if word is in list which will be an array
  checkIfWordIsInList(list, word) {
    return list.indexOf(word.join("")) !== -1;
  }

  //Print the result
  print() {
    const { chainedWords } = this;
    console.log(chainedWords);
  }

  addsWordToChain(splitWord) {
    const { chainedWords } = this;
    //If true name will be equal to the joined array and pushed into the chain.
    this.setFirstWord(splitWord.join(""));
    chainedWords.push(splitWord.join(""));
  }

  validateInputs(firstWord, secondWord) {
    if (
      firstWord.length < 3 ||
      firstWord.length > 7 ||
      secondWord.length < 3 ||
      secondWord.length > 7
    ) {
      if (firstWord.length !== secondWord.length) {
        console.log("Need to be the same length");
        return;
      }
      console.log("Not valid input lengths");
      return;
    }
  }

  run() {
    let splitFirstWord;
    let char;
    const {
      firstWord,
      secondWord,
      checkIfWordIsInList,
      chainedWords,
      file
    } = this;
    // Input words will be between 3 and 7 letters in length
    this.validateInputs(firstWord, secondWord);
    this.getData(file).then(data => {
      //Push data in an array.
      const database = data.split("\n");
      splitFirstWord = firstWord.split("");
      char = 0;
      chainedWords.push(this.firstWord);
      while (this.firstWord !== this.secondWord) {
        if (this.firstWord[char] !== secondWord[char]) {
          splitFirstWord[char] = secondWord[char];
          if (checkIfWordIsInList(database, splitFirstWord)) {
            this.addsWordToChain(splitFirstWord);
          } else {
            //Change the word back the the normal word
            splitFirstWord[char] = firstWord[char];
            //If the char is the last of the length move to 0 and relay back through the word of arrays
            char === splitFirstWord.length - 1 ? char = 0 : char++;
          }
        } else if (this.firstWord[char] === secondWord[char]) {
          //If the char is the last of the length move to 0 and relay back through the word of arrays
          char === splitFirstWord.length - 1 ? char = 0 : char++;
        }
      }
      this.print();
    });
  }
}

module.exports.WordChain = WordChain;
// Run Class
const wordChain = new WordChain("lead", "gold", "./50kwords.txt");
wordChain.run();
