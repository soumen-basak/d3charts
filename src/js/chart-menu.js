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

var ChartMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ChartMenu, _React$Component);

  function ChartMenu(props) {
    var _this;

    _classCallCheck(this, ChartMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChartMenu).call(this, props));
    _this.state = {
      loaded: false
    };
    return _this;
  }

  _createClass(ChartMenu, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "chartMenu",
        className: "position-absolute text-muted mt-4",
        style: {
          right: margin.right,
          top: 0
        }
      }, React.createElement(Row, {
        className: "flex-nowrap align-items-center"
      }, React.createElement(Col, {
        className: ""
      }, React.createElement(Button, {
        variant: "link",
        onClick: function onClick() {
          return store.dispatch(toggleChartMenu());
        },
        className: "text-muted p-0"
      }, React.createElement("i", {
        className: "far fa-calendar"
      }))), React.createElement(Col, {
        className: ""
      }, React.createElement("i", {
        className: "fas fa-ellipsis-v"
      })), React.createElement(Col, {
        className: ""
      }, React.createElement("i", {
        className: "fas fa-expand"
      })), React.createElement(Col, {
        className: "flex-fill small"
      }, React.createElement("i", {
        className: "fas fa-ellipsis-v"
      }), React.createElement("i", {
        className: "fas fa-ellipsis-v"
      }))));
    }
  }]);

  return ChartMenu;
}(React.Component);