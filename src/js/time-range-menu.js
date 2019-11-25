var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeRangeMenu = function (_React$Component) {
    _inherits(TimeRangeMenu, _React$Component);

    function TimeRangeMenu(props) {
        _classCallCheck(this, TimeRangeMenu);

        var _this = _possibleConstructorReturn(this, (TimeRangeMenu.__proto__ || Object.getPrototypeOf(TimeRangeMenu)).call(this, props));

        _this.state = {
            opened: false,
            customMenuOpen: false
        };
        return _this;
    }

    _createClass(TimeRangeMenu, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            observeStore(store, stateChartMenuOpen, function (chartMenuOpen) {
                _this2.setState({
                    opened: chartMenuOpen
                });
            });
            observeStore(store, stateCustomMenuOpen, function (customMenuOpen) {
                _this2.setState({
                    customMenuOpen: customMenuOpen
                });
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
                            { id: "customDetailsDiv", className: "flex-fill " + (this.state.customMenuOpen ? "" : "disappear") },
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
                                        { id: "customClose", onClick: function onClick() {
                                                return store.dispatch(closeCustomMenu());
                                            }, variant: "link", className: "text-dark" },
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