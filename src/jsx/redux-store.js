function selectTimeRange(id) {
    return {
        type: SELECT_TIME_RANGE,
        id: id
    }
}
function openChartMenu() {
    return {
        type: OPEN_CHART_MENU
    }
}
function closeChartMenu() {
    return {
        type: CLOSE_CHART_MENU
    }
}
function toggleChartMenu() {
    return {
        type: TOGGLE_CHART_MENU
    }
}
function openCustomMenu() {
    return {
        type: OPEN_CUSTOM_MENU
    }
}
function closeCustomMenu() {
    return {
        type: CLOSE_CUSTOM_MENU
    }
}

const initialState = {
    selectedRange: {
        id: "all"
    },
    chartMenuOpen: false,
    customMenuOpen: false
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_TIME_RANGE:
            return Object.assign({}, state, {
                selectedRange: { id: action.id }
            })
        case OPEN_CHART_MENU:
            return Object.assign({}, state, {
                chartMenuOpen: true
            })
        case CLOSE_CHART_MENU:
            return Object.assign({}, state, {
                chartMenuOpen: false
            })
        case TOGGLE_CHART_MENU:
            if (state.chartMenuOpen) {
                return Object.assign({}, state, {
                    chartMenuOpen: false
                })
            } else {
                return Object.assign({}, state, {
                    chartMenuOpen: true
                })
            }
        case OPEN_CUSTOM_MENU:
            return Object.assign({}, state, {
                customMenuOpen: true
            })
        case CLOSE_CUSTOM_MENU:
            return Object.assign({}, state, {
                customMenuOpen: false
            })
        default:
            return state
    }
}

const store = createStore(reducer, initialState);

// Create a wrapper over store.subscribe to respond to changes to specific state changes
function observeStore(store, select, onChange) {
    let currentState;

    function handleChange() {
        let nextState = select(store.getState());
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}
// select functions for observeStore
function stateRangeId(state) {
    return state.selectedRange.id
}
function stateChartMenuOpen(state) {
    return state.chartMenuOpen
}
function stateCustomMenuOpen(state) {
    return state.customMenuOpen
}