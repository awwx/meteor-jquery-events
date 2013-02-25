Map of event type (e.g. 'click') to our internal event dispatcher for
that type, which will call all the registered handlers for that type.

    dispatcher = {}


Map of type to array of registered event handlers for that type.

    handlers = {}


Construct a dispatcher function, which when called with an event calls
all the registered handlers for the type.

    dispatch = (type) ->
      (event) ->
        _.each handlers[type], (handler) -> handler(event)
        undefined


Add a dispatcher for this type, if we don't have one already.

    addDispatcher = (type) ->
      return if dispatcher[type]?

Remember the dispatcher function, so that we can pass it to jQuery.off
later.

      dispatcher[type] = dispatch type

Attempt to emulate universal-events bubbling behavior by using a
delegated event handler (see "Direct and delegated events" in
http://api.jquery.com/on/) which selects all ("*") descendents.

      $(document).on type, '*', dispatcher[type]
      undefined


Remove our dispatcher for this type.

    removeDispatcher = (type) ->
      $(document).off type, '*', dispatcher[type]
      delete dispatcher[type]
      undefined


Add a registered handler for this type, which will be called with the
event object when an event of this type occurs.  Add a dispatcher for
this type if we don't have one already.

    addHandler = (type, handler) ->
      unless handlers[type]?
        addDispatcher type
        handlers[type] = []
      unless _.contains(handlers[type], handler)
        handlers[type].push handler
      undefined


Remove this registered handler for the type, and also remove our
dispatcher if we no longer have any listening handlers.

    removeHandler = (type, handler) ->
      handlers[type] = _.without(handlers[type], [handler])
      if handlers[type].length is 0
        removeDispatcher type
        delete handlers[type]
      undefined


Replacement implementation for packages/universal-events/listener.js
`UniversalEventListener`

    class UniversalEventListener

      constructor: (handler) ->
        @handler = handler

      addType: (type) ->
        addHandler type, @handler

      removeType: (type) ->
        removeHandler type, @handler

Ignore IE <= 8 support.

      installHandler: ->


Install `UniversalEventListener` into the global namespace.

    @UniversalEventListener = UniversalEventListener
