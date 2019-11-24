'use strict';

const createStore = Redux.createStore;
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Button = ReactBootstrap.Button;
const Container = ReactBootstrap.Container;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;

// [START] - Redux Stuff
// define redux action types
const SELECT_TIME_RANGE = 'SELECT_TIME_RANGE';
function selectTimeRange(id) {
    return {
        type: SELECT_TIME_RANGE,
        id: id
    }
}

const initialState = {
    selectedRange: {
        id: "all"
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_TIME_RANGE:
            return Object.assign({}, state, {
                selectedRange: { id: action.id }
            })
        default:
            return state
    }
}

const store = createStore(reducer, initialState);

console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(selectTimeRange("1day"));
store.dispatch(selectTimeRange("5days"));

const mapStateToProps = state => {
    return state.selectTimeRange;
}

const mapDispatchToProps = dispatch => {
    return {
        onRangeSelectClick: id => {
            dispatch(selectTimeRange(id));
        }
    }
}

// [END] - Redux Stuff


class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return (
            <Button variant="warning" onClick={() => this.setState({ liked: true })}>
                Like
      </Button>
        );
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
    }

    render() {
        return (
            <Container className="py-4 my-3">
                <Row>
                    <Col id="chartWrapper" className="bg-white py-4 px-0">
                        <Chart />
                        <TimeRangeMenu />
                    </Col>
                </Row>
            </Container>
        )
    }
}

class TimeRangeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: this.props.selected };
    }

    unsubs = store.subscribe(() => {
        let storeState = store.getState();
        if (storeState.selectedRange.id === this.props.idstr) {
            this.setState({ selected: true });
        } else {
            this.setState({ selected: false });
        }
    });

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

    render() {
        return (
            // <div className="px-4 py-2 bg-white shadow-lg rounded position-absolute transparent invisible">
            <div id="calPopup" className="px-4 py-2 bg-white shadow-lg rounded position-absolute transparent invisible">
                <Row className="flex-nowrap">
                    <Col className="flex-fill">
                        <TimeRangeSelect idstr="1day" className="" duration="1" label="1 Day" selected={false} />
                        <TimeRangeSelect idstr="2day" className="" duration="2" label="2 Day" selected={false} />
                        <TimeRangeSelect idstr="5day" className="" duration="5" label="5 Day" selected={false} />
                        <TimeRangeSelect idstr="all" className="" duration="all" label="All" selected={true} />
                        <TimeRangeSelect idstr="custom" className="" duration="custom" label="Custom" selected={false} />
                    </Col>
                    <Col id="customDetailsDiv" className="flex-fill">
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
// ReactDOM.render(<Button variant="danger">Danger</Button>, domContainer);
ReactDOM.render(
    <Provider store={store}>
        <Page />
    </Provider>,
    domContainer
);