var should = require('chai').should()
var lockTimeCalculator = require('../index')
var calcLockSchedule = lockTimeCalculator.calcLockSchedule
var isInSeason = lockTimeCalculator.isInSeason
var createDaySchedule = lockTimeCalculator.createDaySchedule
var createWeekDaySchedule = lockTimeCalculator.createWeekDaySchedule

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

    describe("weekdays", function() {
        it('create hours for sunday', () => {
            createWeekDaySchedule("2018-06-03").should.eql([
                '2018-06-03T05:00:00.000Z', 
                '2018-06-03T06:00:00.000Z', 
                '2018-06-03T07:00:00.000Z', 
                '2018-06-03T08:00:00.000Z', 
                '2018-06-03T09:00:00.000Z', 
                '2018-06-03T11:00:00.000Z', 
                '2018-06-03T12:00:00.000Z', 
                '2018-06-03T13:00:00.000Z', 
                '2018-06-03T14:00:00.000Z', 
                '2018-06-03T15:00:00.000Z', 
                '2018-06-03T16:00:00.000Z', 
                '2018-06-03T17:00:00.000Z', 
                '2018-06-03T18:00:00.000Z'
            ])
        }),
        it('create hours for monday', () => {
            createWeekDaySchedule("2018-06-04").should.eql([
                '2018-06-04T06:00:00.000Z', 
                '2018-06-04T08:00:00.000Z', 
                '2018-06-04T10:00:00.000Z', 
                '2018-06-04T12:00:00.000Z', 
                '2018-06-04T14:00:00.000Z', 
                '2018-06-04T16:00:00.000Z', 
                '2018-06-04T18:00:00.000Z'
            ])
        }),
        it('create hours for Friday', () => {
            createWeekDaySchedule("2018-06-08").should.eql([
                '2018-06-08T06:00:00.000Z', 
                '2018-06-08T07:00:00.000Z', 
                '2018-06-08T08:00:00.000Z', 
                '2018-06-08T09:00:00.000Z', 
                '2018-06-08T10:00:00.000Z', 
                '2018-06-08T11:00:00.000Z', 
                '2018-06-08T12:00:00.000Z', 
                '2018-06-08T13:00:00.000Z', 
                '2018-06-08T14:00:00.000Z', 
                '2018-06-08T15:00:00.000Z', 
                '2018-06-08T16:00:00.000Z', 
                '2018-06-08T17:00:00.000Z', 
                '2018-06-08T18:00:00.000Z'
            ])
        }),
        it('create hours for Friday', () => {
            createWeekDaySchedule("2018-06-09").should.eql([
                '2018-06-09T06:00:00.000Z', 
                '2018-06-09T07:00:00.000Z', 
                '2018-06-09T08:00:00.000Z', 
                '2018-06-09T09:00:00.000Z', 
                '2018-06-09T11:00:00.000Z', 
                '2018-06-09T12:00:00.000Z', 
                '2018-06-09T13:00:00.000Z', 
                '2018-06-09T14:00:00.000Z', 
                '2018-06-09T15:00:00.000Z', 
                '2018-06-09T16:00:00.000Z', 
                '2018-06-09T17:00:00.000Z', 
                '2018-06-09T18:00:00.000Z'
            ])
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
