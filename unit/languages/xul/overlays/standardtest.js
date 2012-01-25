var countSeconds = 0;

function setUpPage() {
    if (setUpPageStatus != 'complete' && countSeconds < 10) {
        setTimeout('setUpPage()', 1000);
        countSeconds++;
    }
}

function standard_test(testID,numchildren) {
    assertEquals("The overlay did not load successfully.","complete",setUpPageStatus);
    //Check for parent
    var	oElement	= ample.getElementById(testID);
    assertNotUndefined("Parent not defined", oElement);
    //Check for the right number of children
    assertEquals("There should be "+numchildren+" children.",numchildren,oElement.childNodes.length);
}

function checkExists(testID,numbers) {
    //Check for parent
    var	oElement	= ample.getElementById(testID);
    assertNotUndefined("Parent not defined", oElement);
    numbers.forEach(function(number) {
        assertTrue("Not enough children to reach child "+number,number <= oElement.childNodes.length)                     
        //Check that the child exists.
        var oChild = oElement.childNodes.item(number-1);
        assertNotUndefined("Child "+number+" is undefined.", oChild);
        //Check that the child's value matches 'correct'
        assertEquals("Child "+number+"'s value is incorrect.",'correct',oChild.getAttribute('value'));
        //Check that the child's position, insertbefore, and insertafter attributes were stripped.
        assertFalse("Child "+number+"'s position attribute was not stripped.", oChild.hasAttribute('position'));
        assertFalse("Child "+number+"'s insertbefore attribute was not stripped.", oChild.hasAttribute('insertbefore'));
        assertFalse("Child "+number+"'s insertafter attribute was not stripped.", oChild.hasAttribute('insertafter'));
    });
}

function checkNotExists(testID,numbers) {
    //Check for parent
    var	oElement	= ample.getElementById(testID);
    assertNotUndefined("Parent not defined", oElement);
    numbers.forEach(function(number) {
        //Check that child doesn't exist.
        if (number <= oElement.childNodes.length) {
            var oChild = oElement.childNodes.item(number-1);
            assertUndefined("Child "+number+" still exists when it should not.", oChild);
        }
    });
}

function checkIDs(testID,numbers) {
    //Check for parent
    var	oElement	= ample.getElementById(testID);
    assertNotUndefined("Parent not defined", oElement);
    numbers.forEach(function(number) {
        //Check that the numbered child exists.
        var oChild = oElement.childNodes.item(number-1);
        assertNotUndefined("Child "+number+" is undefined.", oChild);
        //Check that second child's ID matches testID + '-' + number.
        assertTrue("Child "+number+" has no ID.", oChild.hasAttribute('id'));
        assertEquals("Child "+number+"'s ID is wrong.", testID + '-' + number, oChild.getAttribute('id'));
    });
}
