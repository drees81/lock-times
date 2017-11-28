const seasonStart = new Date('2000-04-15 00:00:00.0');
const seasonEnd = new Date('2000-10-15 00:00:00.0');

module.exports = {

    calcLockSchedule: date => {
        if (module.exports.isInSeason(date)) {
            return ['x'];
        } else {
            return(module.exports.createDaySchedule(date));
        }
    },

    isInSeason: isoDate => {
        const date = new Date(isoDate);
        date.setYear(2000);
        date.setHours(0, 0 ,0 ,0);

        return date >= seasonStart && date <= seasonEnd;
    },

    createWeekDaySchedule: isoDate => {
        const daySchedule = module.exports.createDaySchedule;
        const weekDay = new Date(isoDate).getDay();
        switch (weekDay) {
            case 0: // SUNDAY
                return daySchedule(isoDate, 7, 20, false, true);
            case 5: // FRIDAY
                return daySchedule(isoDate, 8, 20, false, false);
            case 6: // SATURDAY
                return daySchedule(isoDate, 8, 20, false, true);
            default:
                return daySchedule(isoDate, 8, 20, true, false);
        }
    },

    createDaySchedule: (isoDate, startHour, endHour, onlyEvenHours, skipNoon) => {
        const result = [];
        const date = new Date(isoDate);

        for (let hour=startHour; hour<=endHour; hour++) {
            if ( (isEven(hour) || !onlyEvenHours) && (hour!=12 || !skipNoon)) {
                date.setHours(hour)
                result.push(date.toJSON())
            }
        }

        return result;
    },
};

function isEven(n) {
    return n % 2 == 0;
}
