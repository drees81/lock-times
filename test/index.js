var should = require('chai').should()
var lockTimeCalculator = require('../index')
var calcLockSchedule = lockTimeCalculator.calcLockSchedule

describe("calcSchedule", function(){
    it('return no times for a date in January', function() {
        calcLockSchedule('2018-01-01').length.should.equal(0)
    })
})
