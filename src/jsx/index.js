'use strict';

const createStore = Redux.createStore;
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Button = ReactBootstrap.Button;
const Container = ReactBootstrap.Container;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;

const monStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Define Chart margins
const margin = { top: 80, right: 50, bottom: 30, left: 100 };

// [START] - Redux Stuff
// define redux action types
const SELECT_TIME_RANGE = 'SELECT_TIME_RANGE';
const OPEN_CHART_MENU = 'OPEN_CHART_MENU';
const CLOSE_CHART_MENU = 'CLOSE_CHART_MENU';
const TOGGLE_CHART_MENU = 'TOGGLE_CHART_MENU';
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

console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()))

// const mapStateToProps = state => {
//     return state.selectTimeRange;
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onRangeSelectClick: id => {
//             dispatch(selectTimeRange(id));
//         }
//     }
// }

// [END] - Redux Stuff

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
    }

    componentDidMount() {
        let chartMenu = document.getElementById('chartMenu');
        let chartElem = document.getElementById('chartWrapper');
        let rectMenu = chartMenu.getBoundingClientRect();
        var rectChart = chartElem.getBoundingClientRect();
        let calPopup = document.getElementById('calPopup');
        calPopup.style.top = parseInt(rectMenu.top - rectChart.top + rectMenu.height + 10) + "px";
        calPopup.style.right = parseInt(rectChart.right - rectMenu.right + rectMenu.width - 20) + "px";

        window.addEventListener('click', function (e) {
            var popupElem = document.getElementById('calPopup');
            if (!e.target.classList.contains('fa-calendar')) {
                if (!popupElem.contains(e.target)) {
                    store.dispatch(closeChartMenu());
                }
            }
        });
    }

    render() {
        return (
            <Container className="py-4 my-3">
                <Row>
                    <Col id="chartWrapper" className="bg-white py-4 px-0">
                        <Chart />
                        <TimeRangeMenu />
                        <ChartMenu />
                    </Col>
                </Row>
            </Container>
        )
    }
}

class ChartMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false }
    }
    render() {
        return (
            <div id="chartMenu" className="position-absolute text-muted mt-4" style={{ right: margin.right, top: 0 }}>
                <Row className="flex-nowrap align-items-center">
                    <Col className=""><Button variant="link" onClick={() => store.dispatch(toggleChartMenu())} className="text-muted p-0"><i className="far fa-calendar"></i></Button></Col>
                    <Col className=""><i className="fas fa-ellipsis-v"></i></Col>
                    <Col className=""><i className="fas fa-expand"></i></Col>
                    <Col className="flex-fill small"><i className="fas fa-ellipsis-v"></i><i className="fas fa-ellipsis-v"></i></Col>
                </Row>
            </div>
        )
    }
}

class TimeRangeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: this.props.selected };
    }

    componentDidMount() {
        store.subscribe(() => {
            let storeState = store.getState();
            if (storeState.selectedRange.id === this.props.idstr) {
                this.setState({ selected: true });
            } else {
                this.setState({ selected: false });
            }
        });
    }

    render() {
        return (
            <Row id={this.props.idstr} onClick={() => store.dispatch(selectTimeRange(this.props.idstr))} data-duration={this.props.duration} className={(this.state.selected ? 'selected' : '') + " time-range flex-nowrap align-items-center py-2"}>
                <Col className="pr-1">
                    <div className="radio-inline"></div>
                </Col>
                <Col className="flex-fill">
                    <div className="radio-label">{this.props.label}</div>
                </Col>
            </Row>
        );
    }
}

class CustomDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drawn: false };
    }

    render() {
        return (
            <div>
                <Row className="flex-nowrap align-items-center pt-2">
                    <Col className="font-weight-bold date-select-label">
                        {this.props.label}
                    </Col>
                </Row>
                <Row className="flex-nowrap align-items-center pt-1 pb-2">
                    <Col className="">
                        <input id={this.props.idstr} className="date-select" type="date" />
                    </Col>
                </Row>
            </div>
        );
    }
}

class TimeRangeMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { opened: false };
    }

    componentDidMount() {
        store.subscribe(() => {
            let storeState = store.getState();
            if (storeState.chartMenuOpen) {
                this.setState({ opened: true });
            } else {
                this.setState({ opened: false });
            }
        });
    }


    render() {
        return (
            // <div className="px-4 py-2 bg-white shadow-lg rounded position-absolute transparent invisible">
            <div id="calPopup" className={"px-4 py-2 bg-white shadow-lg rounded position-absolute " + (this.state.opened ? "" : "transparent invisible")}>
                <Row className="flex-nowrap">
                    <Col className="flex-fill">
                        <TimeRangeSelect idstr="1day" className="" duration="1" label="1 Day" selected={false} />
                        <TimeRangeSelect idstr="2day" className="" duration="2" label="2 Day" selected={false} />
                        <TimeRangeSelect idstr="5day" className="" duration="5" label="5 Day" selected={false} />
                        <TimeRangeSelect idstr="all" className="" duration="all" label="All" selected={true} />
                        <TimeRangeSelect idstr="custom" className="" duration="custom" label="Custom" selected={false} />
                    </Col>
                    <Col id="customDetailsDiv" className="flex-fill d-none">
                        <Row className="flex-nowrap align-items-center pb2">
                            <Col className="flex-fill cal-heading">Custom Range</Col>
                            <Col className="">
                                <Button id="customClose" variant="link" className="text-dark">
                                    <i className="fas fa-times fa-lg"></i>
                                </Button>
                            </Col>
                        </Row>
                        <CustomDatePicker label="From" idstr="fromDate" />
                        <CustomDatePicker label="To" idstr="toDate" />
                    </Col>
                </Row>
            </div>
        )
    }
}

let domContainer = document.querySelector('#d3charts');
ReactDOM.render(
    <Provider store={store}>
        <Page />
    </Provider>,
    domContainer
);