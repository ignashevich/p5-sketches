export const getSketchDefaults = (inputs) => {
    let newValues = {}
    inputs.forEach(input => {
        newValues[input.id] = input.default;
    })

    return newValues;
}
