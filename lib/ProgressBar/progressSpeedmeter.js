export function getProgressSpeedmeter(step, end) {
    var k = step;
    var i = k / 21;
    var end = end || 0.98;

    return function (s) {
        var start = s;

        if (start >= end) {
            return end;
        }

        start += k;
        k -= i;

        if (k < 0.001) {
            k = 0.001;
        }

        return start;
    };
}