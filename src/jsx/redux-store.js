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

const initialState = {
    selectedRange: {
        id: "all"
    },
    chartMenuOpen: false
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
        default:
            return state
    }
}

const store = createStore(reducer, initialState);