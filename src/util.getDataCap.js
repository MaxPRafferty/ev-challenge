const getDataCap = (data) => {
    let err, result;
    try {
        const [min, max] = data.reduce(
            (a, v) => {
                if (a[0] === -1 || v.y < a[0]) {
                    a[0] = v.y;
                }
                if (v.y > a[1]) {
                    a[1] = v.y;
                }
                return a;
            },
            [-1, -1]
        );
        if (min >= max) {
            err = new Error("Chart scale out of bounds");
        } else {
            result = max + max / 10;
        }
    } catch (error) {
        err = error;
    }
    return [err, result];
};

export default getDataCap;
