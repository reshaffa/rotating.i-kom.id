let initialState = {
    operations : [
        { id : 1, filename: "File Excel SEP W1.xlsx", week: "SEP W1", year: "2020" },
        { id : 2, filename: "File Excel SEP W2.xlsx", week: "SEP W2", year: "2020" },
        { id : 3, filename: "File Excel SEP W3.xlsx", week: "SEP W3", year: "2020" },
        { id : 4, filename: "File Excel SEP W4.xlsx", week: "SEP W4", year: "2020" },
    ],
    error : false
}

const operations = (state = initialState, action) => {
    return state
}

export default operations
