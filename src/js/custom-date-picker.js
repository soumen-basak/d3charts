var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomDatePicker = function (_React$Component) {
    _inherits(CustomDatePicker, _React$Component);

    function CustomDatePicker(props) {
        _classCallCheck(this, CustomDatePicker);

        var _this = _possibleConstructorReturn(this, (CustomDatePicker.__proto__ || Object.getPrototypeOf(CustomDatePicker)).call(this, props));

        _this.state = { drawn: false };
        return _this;
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