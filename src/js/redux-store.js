function selectTimeRange(id) {
    return {
        type: SELECT_TIME_RANGE,
        id: id
    };
}
function openChartMenu() {
    return {
        type: OPEN_CHART_MENU
    };
}
function closeChartMenu() {
    return {
        type: CLOSE_CHART_MENU
    };
}
function toggleChartMenu() {
    return {
        type: TOGGLE_CHART_MENU
    };
}
function openCustomMenu() {
    return {
        type: OPEN_CUSTOM_MENU
    };
}
function closeCustomMenu() {
    return {
        type: CLOSE_CUSTOM_MENU
    };
}

var initialState = {
    selectedRange: {
        id: "all"
    },
    chartMenuOpen: false,
    customMenuOpen: false
};

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case SELECT_TIME_RANGE:
            return Object.assign({}, state, {
                selectedRange: { id: action.id }
            });
        case OPEN_CHART_MENU:
            return Object.assign({}, state, {
                chartMenuOpen: true
            });
        case CLOSE_CHART_MENU:
            return Object.assign({}, state, {
                chartMenuOpen: false
            });
        case TOGGLE_CHART_MENU:
            if (state.chartMenuOpen) {
                return Object.assign({}, state, {
                    chartMenuOpen: false
                });
            } else {
                return Object.assign({}, state, {
                    chartMenuOpen: true
                });
            }
        case OPEN_CUSTOM_MENU:
            return Object.assign({}, state, {
                customMenuOpen: true
            });
        case CLOSE_CUSTOM_MENU:
            return Object.assign({}, state, {
                customMenuOpen: false
            });
        default:
            return state;
    }
}

var store = createStore(reducer, initialState);

// Create a wrapper over store.subscribe to respond to changes to specific state changes
function observeStore(store, select, onChange) {
    var currentState = void 0;

    function handleChange() {
        var nextState = select(store.getState());
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    var unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}
// select functions for observeStore
function stateRangeId(state) {
    return state.selectedRange.id;
}
function stateChartMenuOpen(state) {
    return state.chartMenuOpen;
}
function stateCustomMenuOpen(state) {
    return state.customMenuOpen;
}