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

var TimeRangeMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimeRangeMenu, _React$Component);

  function TimeRangeMenu(props) {
    var _this;

    _classCallCheck(this, TimeRangeMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeRangeMenu).call(this, props));
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
      return (// <div className="px-4 py-2 bg-white shadow-lg rounded position-absolute transparent invisible">
        React.createElement("div", {
          id: "calPopup",
          className: "px-4 py-2 bg-white shadow-lg rounded position-absolute " + (this.state.opened ? "" : "transparent invisible")
        }, React.createElement(Row, {
          className: "flex-nowrap"
        }, React.createElement(Col, {
          className: "flex-fill"
        }, React.createElement(TimeRangeSelect, {
          idstr: "1day",
          className: "",
          duration: "1",
          label: "1 Day",
          selected: false
        }), React.createElement(TimeRangeSelect, {
          idstr: "2day",
          className: "",
          duration: "2",
          label: "2 Day",
          selected: false
        }), React.createElement(TimeRangeSelect, {
          idstr: "5day",
          className: "",
          duration: "5",
          label: "5 Day",
          selected: false
        }), React.createElement(TimeRangeSelect, {
          idstr: "all",
          className: "",
          duration: "all",
          label: "All",
          selected: true
        }), React.createElement(TimeRangeSelect, {
          idstr: "custom",
          className: "",
          duration: "custom",
          label: "Custom",
          selected: false
        })), React.createElement(Col, {
          id: "customDetailsDiv",
          className: "flex-fill " + (this.state.customMenuOpen ? "" : "disappear")
        }, React.createElement(Row, {
          className: "flex-nowrap align-items-center pb2"
        }, React.createElement(Col, {
          className: "flex-fill cal-heading"
        }, "Custom Range"), React.createElement(Col, {
          className: ""
        }, React.createElement(Button, {
          id: "customClose",
          onClick: function onClick() {
            return store.dispatch(closeCustomMenu());
          },
          variant: "link",
          className: "text-dark"
        }, React.createElement("i", {
          className: "fas fa-times fa-lg"
        })))), React.createElement(CustomDatePicker, {
          label: "From",
          idstr: "fromDate"
        }), React.createElement(CustomDatePicker, {
          label: "To",
          idstr: "toDate"
        }))))
      );
    }
  }]);

  return TimeRangeMenu;
}(React.Component);