describe( "jQuery.validates", function() {
  
  var element;
  
  describe( "when validating an element's value attribute for", function() {
    
    beforeEach(function() {
      element = $('<input type="text" name="test">')
    })
    
    describe( "presence", function() {
      
      it( "should return false if it's an empty string", function() {
        element.val('')
        expect( element.validates('presence') ).toBe( false )
      })
      
      it( "should return false if it's a blank string", function() {
        element.val(" \n \t ")
        expect( element.validates('presence') ).toBe( false )
      })
      
      it( "should return true if it contains a non whitespace character", function() {
        element.val('a')
        expect( element.validates('presence') ).toBe( true )
      })
      
    })
    
    describe( "alpha", function() {
      
      it( "should return false if it contains a non-letter character", function() {
        element.val('lett3rs')
        expect( element.validates('alpha') ).toBe( false )
      })
      
      it( "should return true if it's blank", function() {
        expect( element.validates('alpha') ).toBe( true )
      })
      
      it( "should check case insensitively", function() {
        element.val('ABC')
        expect( element.validates('alphanumeric') ).toBe( true )
      })
      
      it( "should return true if it contains only letter characters", function() {
        element.val('letters')
        expect( element.validates('alpha') ).toBe( true )
      })
      
    })
    
    describe( "numeric", function() {
    
      it( "should return false if it contains a non-number character", function() {
        element.val('1234five6789')
        expect( element.validates('numeric') ).toBe( false )
      })
      
      it( "should return true if it's blank", function() {
        expect( element.validates('numeric') ).toBe( true )
      })
      
      it( "should return true if it contains only number characters", function() {
        expect( element.validates('numeric') ).toBe( true )
      })
    
    })
    
    describe( "alphanumeric", function() {
    
      it( "should return false if it contains a character that is neither a letter or a number", function() {
        element.val('123.abc')
        expect( element.validates('alphanumeric') ).toBe( false )
      })
      
      it( "should return true if it contains only letter characters", function() {
        element.val('abc')
        expect( element.validates('alphanumeric') ).toBe( true )
      })
      
      it( "should check case insensitively", function() {
        element.val('ABC')
        expect( element.validates('alphanumeric') ).toBe( true )
      })
      
      it( "should return true if it contains only number characters", function() {
        element.val('123')
        expect( element.validates('alphanumeric') ).toBe( true )
      })
      
      it( "should return true if it contains both letter and number characters", function() {
        element.val('123abc')
        expect( element.validates('alphanumeric') ).toBe( true )
      })
    
    })
    
    describe( "length", function() {
    
      beforeEach(function() {
        element.val('12345')
      })
      
      it( "should return false if its longer than the given length", function() {
        expect( element.validates('length', 4 ) ).toBe( false )
      })
    
      it( "should return false if its shorter than the given length", function() {
        expect( element.validates('length', 6 ) ).toBe( false )
      })
      
      it( "should return true if its length equals the given length", function() {
        expect( element.validates('length', 5 ) ).toBe( true )
      })
      
      it( "should return undefined if the given length is not a number", function() {
        expect( element.validates('length', '5' ) ).toBe( undefined )
      })
    
    })
    
    describe( "min_length", function() {
    
      beforeEach(function() {
        element.val('12345')
      })
      
      it( "should return false if its shorter than the given length", function() {
        expect( element.validates('min_length', 6 ) ).toBe( false )
      })
      
      it( "should return true if its equal to the given length", function() {
        expect( element.validates('min_length', 5 ) ).toBe( true )
      })
      
      it( "should return true if its longer than the given length", function() {
        expect( element.validates('min_length', 4 ) ).toBe( true )
      })
      
      it( "should return undefined if the given length is not a number", function() {
        expect( element.validates('min_length', '5' ) ).toBe( undefined )
      })
      
    })
    
    describe( "max_length", function() {
    
      beforeEach(function() {
        element.val('12345')
      })
      
      it( "should return false if its longer than the given length", function() {
        expect( element.validates('max_length', 4 ) ).toBe( false )
      })
      
      it( "should return true if its equal to the given length", function() {
        expect( element.validates('max_length', 5 ) ).toBe( true )
      })
      
      it( "should return true if its shorter than the given length", function() {
        expect( element.validates('max_length', 6 ) ).toBe( true )
      })
      
      it( "should return undefined if the given length is not a number", function() {
        expect( element.validates('max_length', '5' ) ).toBe( undefined )
      })
      
    })

  })
  
  describe( "when validating an elements checked attribute for", function() {
    
    beforeEach(function() {
      element = $('<input type="checkbox" name="test" value="checkbox">')
    })
    
    describe( "acceptance", function() {
      
      it( "should return false if it's missing", function() {
        element.removeAttr('checked')
        expect( element.validates('acceptance') ).toBe( false )
      })
      
      it( "should return true if it's blank", function() {
        element.attr('checked', '')
        expect( element.validates('acceptance') ).toBe( true )
      })
      
      it( "should return true if it's non-blank", function() {
        element.attr('checked', 'stuff')
        expect( element.validates('acceptance') ).toBe( true )
      })
    
      it( "should return true if it's checked", function() {
        element.attr('checked', 'checked')
        expect( element.validates('acceptance') ).toBe( true )
      })
    
    })
    
    describe( "rejection", function() {
      
      it( "should return true if it's missing", function() {
        element.removeAttr('checked')
        expect( element.validates('rejection') ).toBe( true )
      })
      
      it( "should return false if it's blank", function() {
        element.attr('checked', '')
        expect( element.validates('rejection') ).toBe( false )
      })
      
      it( "should return false if it's non-blank", function() {
        element.attr('checked', 'stuff')
        expect( element.validates('rejection') ).toBe( false )
      })
    
      it( "should return false if it's checked", function() {
        element.attr('checked', 'checked')
        expect( element.validates('rejection') ).toBe( false )
      })
    
    })
  
  })
  
  describe( "when called with an undefined validator", function() {
  
    it( "should return null", function() {
      expect( element.validates('undefined-validator') ).toBe( null )
    })
  
  })
  
})