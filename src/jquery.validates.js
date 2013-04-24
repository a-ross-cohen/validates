(function( $ ) {
  
  $.fn.validates  = function() {
    validator = [].shift.call( arguments )
    if ( typeof $.validators[validator] === "function" ) {
      [].unshift.call( arguments, this )
      return $.validators[validator].apply( this, arguments )
    } else {
      console.log( 'Unknown validator: ' + validator )
      return null
    }
  }
  
  $.validators = {
    presence: function( that ) {
      return /[^\s]/.test( that.val() )
    },
    alpha: function( that ) {
      return !/[^a-z]/i.test( that.val() )
    },
    numeric: function( that ) {
      return !/[^0-9]/.test( that.val() )
    },
    alphanumeric: function( that ) {
      return !/[^a-z0-9]/i.test( that.val() )
    },
    email: function( that ) {
      return /^[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}$/i.test( that.val() )
    },
    url: function( that ) {
      return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test( that.val() )
    },
    acceptance: function( that ) {
      return that.is(':checked')
    },
    rejection: function( that ) {
      return !that.is(':checked')
    },
    length: function( that, length ) {
      return ensure_type( "number", length, function() {
        return that.val().length == length
      })
    },
    min_length: function( that, length ) {
      return ensure_type( "number", length, function() {
        return that.val().length >= length
      })
    },
    max_length: function( that, length ) {
      return ensure_type( "number", length, function() {
        return that.val().length <= length
      })
    },
    format: function( that, regexp ) {
      return ensure_instance( RegExp, regexp, function() {
        return regexp.test( that.val() )
      })
    },
    inclusion: function( that, array ) {
      return ensure_instance( Array, array, function() {
        for ( var i = 0 ; i < array.length ; i++ ) {
          if ( that.val() == array[i] ) {
            return true
          }
        }
        return false
      })
    },
    exclusion: function( that, array ) {
      return ensure_instance( Array, array, function() {
        for ( var i = 0 ; i < array.length ; i++ ) {
          if ( that.val() == array[i] ) {
            return false
          }
        }
        return true
      })
    }
  }
  
  function ensure_type( type, parameter, action ) {
    if ( typeof parameter == type ) {
      return action()
    } else {
      console.log( 'Expected ' + type + ' but instead received ' + parameter )
    }
  }
  
  function ensure_instance( klass, parameter, action ) {
    if ( parameter instanceof klass ) {
      return action()
    } else {
      console.log( 'Expected ' + klass + ' but instead received ' + parameter )
    }
  }
  
})( jQuery )
