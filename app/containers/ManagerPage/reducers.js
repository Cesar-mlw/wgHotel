

const initialState={
    selectedValue: "room",
    selectedValueData: []
}

const selectedValueDataReducer = (state = initialState, action) => {
    switch(action.selectedValue){
        case 'room':
            //this is where the database call will go
            return "room"
        case "guests":
            return "guests"
        case "diner":
            return "diner"
        case "events":
            return "events"
        case "parking":
            return "parking"
        default:
            return state

    }
}


export default selectedValueDataReducer;