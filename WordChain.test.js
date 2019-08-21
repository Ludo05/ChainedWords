const {WordChain} = require('./WordChain');

describe('WordChain',  () => {

    const list = ['dog','cat','tolo']

    it('should return a the chained list',  () => {
      const  wordChainTest  = new WordChain('cat','dog','./50kwords.txt');
     expect(wordChainTest.checkIfWordIsInList(list,['d','o','g'])).toBe(true)
    });


});
