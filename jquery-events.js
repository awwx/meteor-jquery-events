// Generated by CoffeeScript 1.5.0
(function() {
  var UniversalEventListener, addDispatcher, addHandler, dispatch, dispatcher, handlers, removeDispatcher, removeHandler;

  dispatcher = {};

  handlers = {};

  dispatch = function(type) {
    return function(event) {
      _.each(handlers[type], function(handler) {
        return handler(event);
      });
      return void 0;
    };
  };

  addDispatcher = function(type) {
    if (dispatcher[type] != null) {
      return;
    }
    dispatcher[type] = dispatch(type);
    $(document).on(type, '*', dispatcher[type]);
    return void 0;
  };

  removeDispatcher = function(type) {
    $(document).off(type, '*', dispatcher[type]);
    delete dispatcher[type];
    return void 0;
  };

  addHandler = function(type, handler) {
    if (handlers[type] == null) {
      addDispatcher(type);
      handlers[type] = [];
    }
    if (!_.contains(handlers[type], handler)) {
      handlers[type].push(handler);
    }
    return void 0;
  };

  removeHandler = function(type, handler) {
    handlers[type] = _.without(handlers[type], [handler]);
    if (handlers[type].length === 0) {
      removeDispatcher(type);
      delete handlers[type];
    }
    return void 0;
  };

  UniversalEventListener = (function() {

    function UniversalEventListener(handler) {
      this.handler = handler;
    }

    UniversalEventListener.prototype.addType = function(type) {
      return addHandler(type, this.handler);
    };

    UniversalEventListener.prototype.removeType = function(type) {
      return removeHandler(type, this.handler);
    };

    UniversalEventListener.prototype.installHandler = function() {};

    return UniversalEventListener;

  })();

  this.UniversalEventListener = UniversalEventListener;

}).call(this);