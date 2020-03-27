export const enumerate = (...arr) => Object.freeze(
    Object.assign(
        {},
        ...arr.map(k => ({[k]: Symbol(k)}))
    )
);
