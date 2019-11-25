"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Page =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page(props) {
    var _this;

    _classCallCheck(this, Page);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Page).call(this, props));
    _this.state = {
      loaded: false
    };
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
      return React.createElement(Container, {
        className: "py-4 my-3"
      }, React.createElement(Row, null, React.createElement(Col, {
        id: "chartWrapper",
        className: "bg-white py-4 px-0"
      }, React.createElement(Chart, null), React.createElement(TimeRangeMenu, null), React.createElement(ChartMenu, null))));
    }
  }]);

  return Page;
}(React.Component);