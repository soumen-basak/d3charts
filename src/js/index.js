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

// [START] - Redux Stuff
// define redux action types
var SELECT_TIME_RANGE = 'SELECT_TIME_RANGE';
function selectTimeRange(id) {
    return {
        type: SELECT_TIME_RANGE,
        id: id
    };
}

var initialState = {
    selectedRange: {
        id: "all"
    }
};

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case SELECT_TIME_RANGE:
            return Object.assign({}, state, {
                selectedRange: { id: action.id }
            });
        default:
            return state;
    }
}

var store = createStore(reducer, initialState);

console.log(store.getState());

var unsubscribe = store.subscribe(function () {
    return console.log(store.getState());
});

store.dispatch(selectTimeRange("1day"));
store.dispatch(selectTimeRange("5days"));

var mapStateToProps = function mapStateToProps(state) {
    return state.selectTimeRange;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onRangeSelectClick: function onRangeSelectClick(id) {
            dispatch(selectTimeRange(id));
        }
    };
};

// [END] - Redux Stuff


var LikeButton = function (_React$Component) {
    _inherits(LikeButton, _React$Component);

    function LikeButton(props) {
        _classCallCheck(this, LikeButton);

        var _this = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

        _this.state = { liked: false };
        return _this;
    }

    _createClass(LikeButton, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.state.liked) {
                return 'You liked this.';
            }

            return React.createElement(
                Button,
                { variant: 'warning', onClick: function onClick() {
                        return _this2.setState({ liked: true });
                    } },
                'Like'
            );
        }
    }]);

    return LikeButton;
}(React.Component);

var Page = function (_React$Component2) {
    _inherits(Page, _React$Component2);

    function Page(props) {
        _classCallCheck(this, Page);

        var _this3 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

        _this3.state = { loaded: false };
        return _this3;
    }

    _createClass(Page, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                Container,
                { className: 'py-4 my-3' },
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { id: 'chartWrapper', className: 'bg-white py-4 px-0' },
                        React.createElement(Chart, null),
                        React.createElement(TimeRangeMenu, null)
                    )
                )
            );
        }
    }]);

    return Page;
}(React.Component);

var TimeRangeSelect = function (_React$Component3) {
    _inherits(TimeRangeSelect, _React$Component3);

    function TimeRangeSelect(props) {
        _classCallCheck(this, TimeRangeSelect);

        var _this4 = _possibleConstructorReturn(this, (TimeRangeSelect.__proto__ || Object.getPrototypeOf(TimeRangeSelect)).call(this, props));

        _this4.unsubs = store.subscribe(function () {
            var storeState = store.getState();
            if (storeState.selectedRange.id === _this4.props.idstr) {
                _this4.setState({ selected: true });
            } else {
                _this4.setState({ selected: false });
            }
        });

        _this4.state = { selected: _this4.props.selected };
        return _this4;
    }

    _createClass(TimeRangeSelect, [{
        key: 'render',
        value: function render() {
            var _this5 = this;

            return React.createElement(
                Row,
                { id: this.props.idstr, onClick: function onClick() {
                        return store.dispatch(selectTimeRange(_this5.props.idstr));
                    }, 'data-duration': this.props.duration, className: (this.state.selected ? 'selected' : '') + " time-range flex-nowrap align-items-center py-2" },
                React.createElement(
                    Col,
                    { className: 'pr-1' },
                    React.createElement('div', { className: 'radio-inline' })
                ),
                React.createElement(
                    Col,
                    { className: 'flex-fill' },
                    React.createElement(
                        'div',
                        { className: 'radio-label' },
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
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    Row,
                    { className: 'flex-nowrap align-items-center pt-2' },
                    React.createElement(
                        Col,
                        { className: 'font-weight-bold date-select-label' },
                        this.props.label
                    )
                ),
                React.createElement(
                    Row,
                    { className: 'flex-nowrap align-items-center pt-1 pb-2' },
                    React.createElement(
                        Col,
                        { className: '' },
                        React.createElement('input', { id: this.props.idstr, className: 'date-select', type: 'date' })
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
        key: 'render',
        value: function render() {
            return (
                // <div className="px-4 py-2 bg-white shadow-lg rounded position-absolute transparent invisible">
                React.createElement(
                    'div',
                    { id: 'calPopup', className: 'px-4 py-2 bg-white shadow-lg rounded position-absolute transparent invisible' },
                    React.createElement(
                        Row,
                        { className: 'flex-nowrap' },
                        React.createElement(
                            Col,
                            { className: 'flex-fill' },
                            React.createElement(TimeRangeSelect, { idstr: '1day', className: '', duration: '1', label: '1 Day', selected: false }),
                            React.createElement(TimeRangeSelect, { idstr: '2day', className: '', duration: '2', label: '2 Day', selected: false }),
                            React.createElement(TimeRangeSelect, { idstr: '5day', className: '', duration: '5', label: '5 Day', selected: false }),
                            React.createElement(TimeRangeSelect, { idstr: 'all', className: '', duration: 'all', label: 'All', selected: true }),
                            React.createElement(TimeRangeSelect, { idstr: 'custom', className: '', duration: 'custom', label: 'Custom', selected: false })
                        ),
                        React.createElement(
                            Col,
                            { id: 'customDetailsDiv', className: 'flex-fill' },
                            React.createElement(
                                Row,
                                { className: 'flex-nowrap align-items-center pb2' },
                                React.createElement(
                                    Col,
                                    { className: 'flex-fill cal-heading' },
                                    'Custom Range'
                                ),
                                React.createElement(
                                    Col,
                                    { className: '' },
                                    React.createElement(
                                        Button,
                                        { id: 'customClose', variant: 'link', className: 'text-dark' },
                                        React.createElement('i', { className: 'fas fa-times fa-lg' })
                                    )
                                )
                            ),
                            React.createElement(CustomDatePicker, { label: 'From', idstr: 'fromDate' }),
                            React.createElement(CustomDatePicker, { label: 'To', idstr: 'toDate' })
                        )
                    )
                )
            );
        }
    }]);

    return TimeRangeMenu;
}(React.Component);

var domContainer = document.querySelector('#d3charts');
// ReactDOM.render(<Button variant="danger">Danger</Button>, domContainer);
ReactDOM.render(React.createElement(
    Provider,
    { store: store },
    React.createElement(Page, null)
), domContainer);