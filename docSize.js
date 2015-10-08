// Resize the document object to fit the browser window
function setDocumentObjectSize()
{
	// Get the document object
	try
	{
		var documentObject = document.getElementById("documentObject");
		
		// Set the height and width of the object tag
		try
		{
			setPropertyValue(documentObject, "height", (getWindowInnerHeight()-167));
			setPropertyValue(documentObject, "width", (getWindowInnerWidth()-40));
		}
		catch (MissingSupport)
		{
			// Do nothing
		}
	}
	catch (CanvasUnrecongized)
	{
		// Do nothing
	}
}
