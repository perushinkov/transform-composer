'use strict';

ezrouter.addState("root", "RootController", ["statea","stateb"]);
ezrouter.addState("statea", "AController", []);
ezrouter.addState("stateb", "BController", []);

ezpz.module("RootController", [], function(deps) {
  return {run:function(state){
    console.log(state);
  }};
});

ezrouter.setRootState("root");
ezrouter.runApp();
