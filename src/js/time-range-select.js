var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeRangeSelect = function (_React$Component) {
    _inherits(TimeRangeSelect, _React$Component);

    function TimeRangeSelect(props) {
        _classCallCheck(this, TimeRangeSelect);

        var _this = _possibleConstructorReturn(this, (TimeRangeSelect.__proto__ || Object.getPrototypeOf(TimeRangeSelect)).call(this, props));

        _this.state = { selected: _this.props.selected };
        return _this;
    }

    _createClass(TimeRangeSelect, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            store.subscribe(function () {
                var storeState = store.getState();
                if (storeState.selectedRange.id === _this2.props.idstr) {
                    _this2.setState({ selected: true });
                } else {
                    _this2.setState({ selected: false });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                Row,
                { id: this.props.idstr, onClick: function onClick() {
                        return store.dispatch(selectTimeRange(_this3.props.idstr));
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