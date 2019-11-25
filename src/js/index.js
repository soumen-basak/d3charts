'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createStore = Redux.createStore;
var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;

var Button = ReactBootstrap.Button;
var Container = ReactBootstrap.Container;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var monStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Define Chart margins
var margin = { top: 80, right: 50, bottom: 30, left: 100 };

// [START] - Redux Stuff
// define redux action types
var SELECT_TIME_RANGE = 'SELECT_TIME_RANGE';
var OPEN_CHART_MENU = 'OPEN_CHART_MENU';
var CLOSE_CHART_MENU = 'CLOSE_CHART_MENU';
var TOGGLE_CHART_MENU = 'TOGGLE_CHART_MENU';
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

var initialState = {
    selectedRange: {
        id: "all"
    },
    chartMenuOpen: false
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
        default:
            return state;
    }
}

var store = createStore(reducer, initialState);

console.log(store.getState());

var unsubscribe = store.subscribe(function () {
    return console.log(store.getState());
});

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

var Page = function (_React$Component) {
    _inherits(Page, _React$Component);

    function Page(props) {
        _classCallCheck(this, Page);

        var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

        _this.state = { loaded: false };
        return _this;
    }

    _createClass(Page, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var chartMenu = document.getElementById('chartMenu');
            var chartElem = document.getElementById('chartWrapper');
            var rectMenu = chartMenu.getBoundingClientRect();
            var rectChart = chartElem.getBoundingClientRect();
            var calPopup = document.getElementById('calPopup');
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
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                Container,
                { className: "py-4 my-3" },
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { id: "chartWrapper", className: "bg-white py-4 px-0" },
                        React.createElement(Chart, null),
                        React.createElement(TimeRangeMenu, null),
                        React.createElement(ChartMenu, null)
                    )
                )
            );
        }
    }]);

    return Page;
}(React.Component);

var ChartMenu = function (_React$Component2) {
    _inherits(ChartMenu, _React$Component2);

    function ChartMenu(props) {
        _classCallCheck(this, ChartMenu);

        var _this2 = _possibleConstructorReturn(this, (ChartMenu.__proto__ || Object.getPrototypeOf(ChartMenu)).call(this, props));

        _this2.state = { loaded: false };
        return _this2;
    }

    _createClass(ChartMenu, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "chartMenu", className: "position-absolute text-muted mt-4", style: { right: margin.right, top: 0 } },
                React.createElement(
                    Row,
                    { className: "flex-nowrap align-items-center" },
                    React.createElement(
                        Col,
                        { className: "" },
                        React.createElement(
                            Button,
                            { variant: "link", onClick: function onClick() {
                                    return store.dispatch(toggleChartMenu());
                                }, className: "text-muted p-0" },
                            React.createElement("i", { className: "far fa-calendar" })
                        )
                    ),
                    React.createElement(
                        Col,
                        { className: "" },
                        React.createElement("i", { className: "fas fa-ellipsis-v" })
                    ),
                    React.createElement(
                        Col,
                        { className: "" },
                        React.createElement("i", { className: "fas fa-expand" })
                    ),
                    React.createElement(
                        Col,
                        { className: "flex-fill small" },
                        React.createElement("i", { className: "fas fa-ellipsis-v" }),
                        React.createElement("i", { className: "fas fa-ellipsis-v" })
                    )
                )
            );
        }
    }]);

    return ChartMenu;
}(React.Component);

var TimeRangeSelect = function (_React$Component3) {
    _inherits(TimeRangeSelect, _React$Component3);

    function TimeRangeSelect(props) {
        _classCallCheck(this, TimeRangeSelect);

        var _this3 = _possibleConstructorReturn(this, (TimeRangeSelect.__proto__ || Object.getPrototypeOf(TimeRangeSelect)).call(this, props));

        _this3.state = { selected: _this3.props.selected };
        return _this3;
    }

    _createClass(TimeRangeSelect, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;

            store.subscribe(function () {
                var storeState = store.getState();
                if (storeState.selectedRange.id === _this4.props.idstr) {
                    _this4.setState({ selected: true });
                } else {
                    _this4.setState({ selected: false });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            return React.createElement(
                Row,
                { id: this.props.idstr, onClick: function onClick() {
                        return store.dispatch(selectTimeRange(_this5.props.idstr));
                    }, "data-duration": this.props.duration, className: (this.state.selected ? 'selected' : '') + " time-range flex-nowrap align-items-center py-2" },
                React.createElement(
                    Col,
                    { className: "pr-1" },
                    React.createElement("div", { className: "radio-inline" })
                ),
                React.createElement(
                    Col,
                    { className: "flex-fill" },
                    React.createElement(
                        "div",
                        { className: "radio-label" },
                        this.props.label
                    )
                )
            );
        }
    }]);

    return TimeRangeSelect;
}(React.Component);

var CustomDatePicker = function (_React$Component4) {
    _inherits(CustomDatePicker, _React$Component4);

    function CustomDatePicker(props) {
        _classCallCheck(this, CustomDatePicker);

        var _this6 = _possibleConstructorReturn(this, (CustomDatePicker.__proto__ || Object.getPrototypeOf(CustomDatePicker)).call(this, props));

        _this6.state = { drawn: false };
        return _this6;
    }

    _createClass(CustomDatePicker, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    Row,
                    { className: "flex-nowrap align-items-center pt-2" },
                    React.createElement(
                        Col,
                        { className: "font-weight-bold date-select-label" },
                        this.props.label
                    )
                ),
                React.createElement(
                    Row,
                    { className: "flex-nowrap align-items-center pt-1 pb-2" },
                    React.createElement(
                        Col,
                        { className: "" },
                        React.createElement("input", { id: this.props.idstr, className: "date-select", type: "date" })
                    )
                )
            );
        }
    }]);

    return CustomDatePicker;
}(React.Component);

var TimeRangeMenu = function (_React$Component5) {
    _inherits(TimeRangeMenu, _React$Component5);

    function TimeRangeMenu(props) {
        _classCallCheck(this, TimeRangeMenu);

        var _this7 = _possibleConstructorReturn(this, (TimeRangeMenu.__proto__ || Object.getPrototypeOf(TimeRangeMenu)).call(this, props));

        _this7.state = { opened: false };
        return _this7;
    }

    _createClass(TimeRangeMenu, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this8 = this;

            store.subscribe(function () {
                var storeState = store.getState();
                if (storeState.chartMenuOpen) {
                    _this8.setState({ opened: true });
                } else {
                    _this8.setState({ opened: false });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return (
                // <div className="px-4 py-2 bg-white shadow-lg rounded position-absolute transparent invisible">
                React.createElement(
                    "div",
                    { id: "calPopup", className: "px-4 py-2 bg-white shadow-lg rounded position-absolute " + (this.state.opened ? "" : "transparent invisible") },
                    React.createElement(
                        Row,
                        { className: "flex-nowrap" },
                        React.createElement(
                            Col,
                            { className: "flex-fill" },
                            React.createElement(TimeRangeSelect, { idstr: "1day", className: "", duration: "1", label: "1 Day", selected: false }),
                            React.createElement(TimeRangeSelect, { idstr: "2day", className: "", duration: "2", label: "2 Day", selected: false }),
                            React.createElement(TimeRangeSelect, { idstr: "5day", className: "", duration: "5", label: "5 Day", selected: false }),
                            React.createElement(TimeRangeSelect, { idstr: "all", className: "", duration: "all", label: "All", selected: true }),
                            React.createElement(TimeRangeSelect, { idstr: "custom", className: "", duration: "custom", label: "Custom", selected: false })
                        ),
                        React.createElement(
                            Col,
                            { id: "customDetailsDiv", className: "flex-fill d-none" },
                            React.createElement(
                                Row,
                                { className: "flex-nowrap align-items-center pb2" },
                                React.createElement(
                                    Col,
                                    { className: "flex-fill cal-heading" },
                                    "Custom Range"
                                ),
                                React.createElement(
                                    Col,
                                    { className: "" },
                                    React.createElement(
                                        Button,
                                        { id: "customClose", variant: "link", className: "text-dark" },
                                        React.createElement("i", { className: "fas fa-times fa-lg" })
                                    )
                                )
                            ),
                            React.createElement(CustomDatePicker, { label: "From", idstr: "fromDate" }),
                            React.createElement(CustomDatePicker, { label: "To", idstr: "toDate" })
                        )
                    )
                )
            );
        }
    }]);

    return TimeRangeMenu;
}(React.Component);

var domContainer = document.querySelector('#d3charts');
ReactDOM.render(React.createElement(
    Provider,
    { store: store },
    React.createElement(Page, null)
), domContainer);