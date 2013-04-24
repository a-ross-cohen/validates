#jQuery.validates
A jQuery plugin to facilitate simple semantic validation of DOM object attributes.
##Usage
Just require jquery.validates.js on your page after you've required jQuery
####Using built-in validators
``` javascript
// the simplest built-in validators can just be called directly
$('#id').validates('presence')
// some also take parameters
$('#id').validates('format', /^awesome$/i )
```
####Built-in's by validated attribute
All built in validators will return true or false with proper arguments. They will return undefined with improper arguments.
- value
    - presence
        * non-blank
    - alpha
        * only letters
    - numeric
        * only numbers
    - alphanumeric
        * only letters and/or numbers
    - email
        * only properly formatted emails
    - url
        * only properly formatted urls
    - length, Number
        * length is exactly Number
    - min_length, Number
        * length is equal to or greater than Number
    - max_length, Number
        * length is equal to or less than Number
    - format, RegExp
        * format matches RegExp
    - inclusion, Array
        * exists in Array
    - exclusion
        * does not exist in Array
- checked
    - acceptance
        * checked or non-blank
    - rejection
        * nonexistent

####Using custom validators
You can define your own validators and add them to the $.validators object. They can be called by the key that you define them on, and the only requirement is that they are functions who return true or false. The first argument will always be the element you're validating, and the rest of the arguments are passed on from the call to validates().
```javascript
$.validators['awesomeness'] = function( element, repetitions ) {
  if ( element.val().match( /awesome/g ).length == repetitions ) {
    return true
  } else {
    return false
  }
}
// this can be called just like any of the built-in validators
$('#id').validates('awesomeness', 3) // would return true if the value was "awesome awesome awesome"
```
##Specs
If you open SpecRunner.html in a browser it will run all the specs. Most but not all of the built-in validators are tested as of this writing. You will need a working internet connection as SpecRunner.html expects to find jQuery on a CDN.
##License
This project is released under the MIT License. See license.txt
##Author
This project is written and maintained by A. Ross Cohen ( a.ross.cohen@gmail.com )
