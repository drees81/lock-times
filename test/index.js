var should = require('chai').should()
var lockTimeCalculator = require('../index')
var calcLockSchedule = lockTimeCalculator.calcLockSchedule
var isInSeason = lockTimeCalculator.isInSeason
var createDaySchedule = lockTimeCalculator.createDaySchedule

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
    }),

    describe("createDaySchedule", function() {
        it('create all hours', () => {
            createDaySchedule('2018-06-01', 8, 12, false, false ).should.eql([
                '2018-06-01T06:00:00.000Z', 
                '2018-06-01T07:00:00.000Z',
                '2018-06-01T08:00:00.000Z',
                '2018-06-01T09:00:00.000Z', 
                '2018-06-01T10:00:00.000Z'
            ])
        })
        it('create only even hours', () => {
            createDaySchedule('2018-05-31', 8, 12, true, false ).should.eql([
                '2018-05-31T06:00:00.000Z', 
                '2018-05-31T08:00:00.000Z',
                '2018-05-31T10:00:00.000Z'
            ])
        })
        it('create only even hours and skip noon', () => {
            createDaySchedule('2018-05-31', 10, 14, false, true ).should.eql([
                '2018-05-31T08:00:00.000Z', 
                '2018-05-31T09:00:00.000Z',
                '2018-05-31T11:00:00.000Z',
                '2018-05-31T12:00:00.000Z'
            ])
        })
    })

})
