'use strict';

ezrouter.addState("root", "RootController", ["statea","stateb"]);
ezrouter.addState("aaa", "AController", []);
ezrouter.addState("bbb", "BController", []);

ezpz.module("RootController", [], function(deps) {
  return {run:function(state){
    console.log("Welcome to Root", state);
    state.gotoState("aaa");
  }};
});

ezpz.module("AController", [], function(deps) {
  return {run:function(state){
    console.log("Welcome to A!", state.getName(), state.getParent().getName());
    setTimeout(function(){
      state.gotoState("bbb");
    }, 3000);
  }};
});

ezpz.module("BController", [], function(deps) {
  return {run:function(state){
    console.log("Welcome to B!", state.getName(), state.getParent().getName());
    setTimeout(function(){
      state.gotoState("aaa");
    }, 3000);
  }};
});

ezrouter.setRootState("root");
ezrouter.runApp();
