/**
 * Created by Emil on 18/03/2017.
 */
var ezpz = (function () {
  var _modules = {};
  var _err = function (msg) {
    console.error(msg);
    return false;
  };
  var _verifyName = (function(){
    var _isLetterExpression = /^[a-z_]+$/i;
    return function(name) {
      return typeof name === "string" && _isLetterExpression.test(name);
    };
  })();

  var _createModule = function(name, requiredModules, runFunction) {
    var filtered = requiredModules.filter(function(dep){
      var okay = _verifyName(dep);
      return _err("Bad dependency name: " + dep);
    });

    return {
      name: name,
      required: filtered,
      run: run
    }
  };

  var _addModule = function addModule(name, requiredModules, runFunction) {
    if (!_verifyName(name)) {
      return _err("Invalid module name: " + name);
    }
    if (_modules.hasOwnProperty(name)) {
      return _err("Cannot add module! '" + name + "' already exists!");
    }
    if (!requiredModules || requiredModules.constructor !== Array) {
      return _err("Required modules are not an array.");
    }
    if (typeof runFunction !== "function") {
      return _err("A function is required as a third argument!");
    }
    _modules[name] = _createModule(name, requiredModules, runFunction);
  };

  var _resolve = (function(){
    var _stackTop = true;
    var _toResolve = [];
    var _error = false;
    return function resolve(name) {
      if (_error) {
        return false;
      }
      var module = _modules[name];
      if (!module) {
        _error = true;
        return _err("Module required is missing: " + name);
      }

      var isTopFrame= _stackTop;
      _stackTop = false;
      if(_toResolve.contains(name)) {
        _error = true;
        console.error("Cyclic dependencies: \n");
        return false;
      }
      var resolvedDeps = module.dependencies.map(function (dep) {
        return _resolve(dep);
      });
      if (_error) {
        return false;
      }
      try {
        module.run(resolvedDeps);
      } catch(err) {
        _error = true;
        return _err("Resolve process failed. Module " + module.name + " raised an exception.");
      }
      _stackTop = isTopFrame;
    };
  });

  var _run = function run(name) {
    if (!_modules.hasOwnProperty(name)) {
      return _err("No module registered with name " + name);
    }
    var module = _modules[name];

    _resolve(module.required);
  };

  return {
    module: _addModule,
    run: _run
  };
})();
