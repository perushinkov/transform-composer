"use strict";
/**
 * Created by Emanuil on 01/04/2017.
 */
var ezrouter = (function (ezpz) {
  var _stateDefs = {};
  var _currentState = [];
  //var _ezpz = ezpz;
  var _rootState = "";

  var _gotoState = function(index, name) {
    console.log(index, name, _currentState);
  };
  var _getParent = function(index) {
    return index > 0 ? _currentState[index - 1] : null;
  };

  var _makeState = function(name) {
    var _index = _currentState.length;
    var _state = {
      getName: function() {return name;},
      gotoState: function(name) {_gotoState(_index, name);},
      getParent: function() {_getParent(_index)}
    };
    _currentState.push(_state);
    return _currentState[_currentState.length - 1];
  };

  var addStateDef = function(name, controllerName, children) {
    _stateDefs[name] = {
      controller: controllerName,
      children: children ? children : []
    };
  };

  var setRootState = function(name) {
    _rootState = name;
  };

  var _verifyModuleNames = function() {
    console.log("I'm just gonna assume it's all fine.");
  };

  var runApp = function () {
    _verifyModuleNames();
    _currentState = [];
    ezpz.run(_stateDefs[_rootState].controller, _makeState(_rootState));
  };

  return {
    addState: addStateDef,
    setRootState: setRootState,
    runApp: runApp
  };
})(ezpz);
