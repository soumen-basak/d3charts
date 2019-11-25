var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_React$Component) {
    _inherits(Page, _React$Component);

    function Page(props) {
        _classCallCheck(this, Page);

        var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

        _this.state = { loaded: false };
        return _this;
    }

    _createClass(Page, [{
        key: 'componentDidMount',
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
                        React.createElement(TimeRangeMenu, null),
                        React.createElement(ChartMenu, null)
                    )
                )
            );
        }
    }]);

    return Page;
}(React.Component);