const {WordChain} = require('./WordChain');

describe('WordChain',  () => {

    it('should return a the chained list',  () => {
      const  wordChainTest  = new WordChain('cat','dog','./50kwords.txt');
     expect(wordChainTest.checkIfWordIsInList()).toBe(true)



    });


});
