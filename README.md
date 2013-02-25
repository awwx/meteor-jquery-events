# jquery-events

Experimental stab at a universal-events implementation using jQuery,
for playing around with.

I made no attempt see how Meteor's and jQuery's event normalization
might be different, so any compatibility with Meteor is accidental.
:-)


## Use

With Meteorite, reference the package in your smart.json file:

````
"packages": {
  "jquery-events": {
    "git": "git://github.com/awwx/meteor-jquery-events.git"
  }
}
````

And add `jquery-events` to your `.meteor/packages` file.


## Implementation

Fun implementation using
[Literate CoffeeScript](http://coffeescript.org/#literate)
here: [source](jquery-events.md)
