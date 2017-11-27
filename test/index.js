var should = require('chai').should()
var lockTimeCalculator = require('../index')
var calcLockSchedule = lockTimeCalculator.calcLockSchedule
var isInSeason = lockTimeCalculator.isInSeason

describe("calcSchedule - out of season", function(){
    it('last day before the season', function() {
        calcLockSchedule('2018-04-14').length.should.equal(0)
    })
    it('first day after the season', function() {
        calcLockSchedule('2018-10-16').length.should.equal(0)
    })
})


describe("helper functions", function() {

    describe("isInSeason", function(){
        it('first day of the year', function() {
            isInSeason('2018-01-01').should.be.false
        })
        it('a day before the season', function() {
            isInSeason('2018-02-15').should.be.false
        })

        it('first day of the season', function() {
            isInSeason('2018-04-15').should.be.true
        })

        it('a day in the season', function() {
            isInSeason('2018-07-15').should.be.true
        })
        it('last day of the season', function() {
            isInSeason('2018-10-15').should.be.true
        })
        it('first day after the season', function() {
            isInSeason('2018-10-16').should.be.false
        })

        it('a day after the season', function() {
            isInSeason('2018-11-15').should.be.false
        })
        it('the last day of the year', function() {
            isInSeason('2018-11-15').should.be.false
        })    
    })

})
