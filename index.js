const seasonStart = new Date("2000-04-15 00:00:00.0");
const seasonEnd = new Date("2000-10-15 00:00:00.0");

module.exports = {

    calcLockSchedule: function(date) {
        if (module.exports.isInSeason(date)) {
            return ['x']
        } else {
            return []
        }
    },

    isInSeason: function(isoDate) {
        const date = new Date(isoDate);
        date.setYear(2000)
        date.setHours(0, 0 ,0 ,0);
        
        return date >= seasonStart && date <= seasonEnd;
    },

    createDaySchedule: function(isoDate, startHour, endHour, onlyEvenHours, skipNoon) {
        const result = [];
        const date = new Date(isoDate)

        for (hour=startHour; hour<=endHour; hour++) {
            if ( (isEven(hour) || !onlyEvenHours) && (hour!=12 || !skipNoon)) {
                date.setHours(hour)
                result.push(date.toJSON())
            }
        }

        return result;
    }
};

function isEven(n) {
    return n % 2 == 0;
}
