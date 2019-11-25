var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartMenu = function (_React$Component) {
    _inherits(ChartMenu, _React$Component);

    function ChartMenu(props) {
        _classCallCheck(this, ChartMenu);

        var _this = _possibleConstructorReturn(this, (ChartMenu.__proto__ || Object.getPrototypeOf(ChartMenu)).call(this, props));

        _this.state = { loaded: false };
        return _this;
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