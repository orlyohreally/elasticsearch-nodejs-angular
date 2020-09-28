export const flatMap = (arr, f) => [].concat.apply([], arr.map(f));
