// JS+: A collection of shared functions used by all scripts

// Add a second external script, style sheet, or file to a web page from within a JavaScript file
function include(includeSrc)
{
	var includeType = getFileType(includeSrc);
	var includeMime = getMimeType(includeSrc);
	// Determine if the file to be included is a script
	if (includeType=='script')
	{
		// If the script is JavaScript, add a reference to it in the header of the page
		if (includeMime=='text/javascript')
		{
			var script = document.createElement("script");
			script.src = includeSrc;
			script.type = includeMime;
			// If the user gave two arguments, use the second argument as an ID
			if (isSet(arguments[1]))
			{
				script.id = arguments[1];
			}
			getDocumentHead().appendChild(script);
			
			// Return true to indicate success
			return true;
		}
		// If the script is a shader script, get its contents and place it inside a script tag
		else if (includeMime=='application/x-shader')
		{
			var script = document.createElement("script");
			script.type = includeMime;
			// If the user gave two arguments, use the second argument as an ID
			if (isSet(arguments[1]))
			{
				script.id = arguments[1];
			}
			// Get the include's contents and place it inside the script tag
			var fetcher = getXMLHttpRequest();
			fetcher.open("GET", includeSrc, true);
			fetcher.onreadystatechange = function()
			{
				// Once the include has been successfully received, print its contents inside the script tag
				if (fetcher.readyState==4)
				{
					script.insertAdjacentHTML("afterbegin", fetcher.responseText);
				}
			};
			fetcher.send();
			getDocumentHead().appendChild(script);
			
			// Return true to indicate success
			return true;
		}
		// If the script cannot be recognized, don't include it
		else
		{
			// Return false to indicate failure
			return false;
		}
	}
	// Determine if the file to be included is a style file
	else if (includeType=='style')
	{
		// If so, add a reference to it in the header of the page
		var link = document.createElement("link");
		link.href = includeSrc;
		link.type = includeMime;
		link.rel = 'stylesheet';
		// If the user gave two arguments, use the second argument as an ID
		if (isSet(arguments[1]))
		{
			script.id = arguments[1];
		}
		getDocumentHead().appendChild(link);
		
		// Return true to indicate success
		return true;
	}
	// Determine if the file to be included is a text file
	else if (includeType=='text')
	{
		// Get a reference to the script tag we are currently running in
		var thisScript = getCurrentScript();
		
		// Get the include's contents and print it to the page
		var fetcher = getXMLHttpRequest();
		fetcher.open("GET", includeSrc, true);
		fetcher.onreadystatechange = function()
		{
			// Once the include has been successfully received, print its contents below the script tag
			if (fetcher.readyState==4)
			{
				thisScript.insertAdjacentHTML("afterend", fetcher.responseText);
			}
		};
		fetcher.send();
		
		// Return true to indicate success
		return true;
	}
	// If the file to be included is not a script, style, or text file, don't include it
	else
	{
		// Return false to indicate failure
		return false;
	}
}

// Cross-browser alternative for addEventListener and attachEvent
function addListener(control, eventName, eventFunction)
{
	// For most modern browsers
	if (control.addEventListener)
	{
		control.addEventListener(eventName, eventFunction, false);
		
		// Return true to indicate success
		return true;
	}
	// For IE8 and lower (which don't support addEventListener)
	else if (control.attachEvent)
	{
		control.attachEvent('on'+eventName, eventFunction);
		
		// Return true to indicate success
		return true;
	}
	else
	{
		// Return false to indicate failure
		return false;
	}
}

// Cross-browser alternative for document.currentScript for getting the DOM
// element for the currently-running script
// Necessary for include function to work
function getCurrentScript()
{
	// For newer browsers
	if (document.currentScript)
	{
		return document.currentScript;
	}
	// For older browsers
	else if (document.getElementsByTagName("script"))
	{
		var scriptTags = document.getElementsByTagName("script");
		return scriptTags[scriptTags.length-1];
	}
}

// Cross-browser alternative for document.head and document.all for getting
// the head tag
// Necessary for include function to work
function getDocumentHead()
{
	var toReturn;
	// For most modern browsers
	if (document.head)
	{
		toReturn = document.head;
	}
	// For IE8 and lower (which don't support document.head)
	else if (document.all.tags)
	{
		toReturn = document.all.tags("head")[0];
	}
	return toReturn;
}

// Cross-browser alternative for window.innerHeight and document.documentElement.offsetHeight
// for getting the height of the browser window
function getWindowInnerHeight()
{
	var toReturn;
	// For most modern browsers
	if (window.innerHeight)
	{
		toReturn = window.innerHeight;
	}
	// For IE8 and lower (which don't support window.innerHeight)
	else if (document.documentElement.offsetHeight)
	{
		toReturn = document.documentElement.offsetHeight;
	}
	return toReturn;
}

// Cross-browser alternative for window.innerWidth and document.documentElement.offsetWidth
// for getting the width of the browser window
function getWindowInnerWidth()
{
	var toReturn;
	// For most modern browsers
	if (window.innerWidth)
	{
		toReturn = window.innerWidth;
	}
	// For IE8 and lower (which don't support window.innerWidth)
	else if (document.documentElement.offsetWidth)
	{
		toReturn = document.documentElement.offsetWidth;
	}
	return toReturn;
}

// Cross-browser alternative for querySelectorAll and document.all for getting
// elements by class name
function getElementsByClass(className, parent)
{
	// To avoid breaking code relying on the old version of this function,
	// set parent to document if it is not set
	if (!isSet(parent))
	{
		parent = document;
	}
	
	var toReturn;
	// For most modern browsers
	if (document.querySelectorAll)
	{
		// Get all the elements whose class name is equal to className from the page
		if (parent==null)
		{
			toReturn = document.querySelectorAll('.'+className);
		}
		else
		{
			toReturn = parent.querySelectorAll('.'+className);
		}
	}
	// For IE7 and lower (which don't support querySelectorAll)
	else if (document.all)
	{
		toReturn = new Array();
		
		// Parse through all the elements on the web page
		var elementIndex = 0;
		for (var tagIndex=0; tagIndex<document.all.length; tagIndex++)
		{
			// If the class of the element is equal to className, add it to
			// toReturn and increment elementIndex
			if (document.all[tagIndex].className==className)
			{
				toReturn[elementIndex] = document.all[tagIndex];
				elementIndex++;
			}
		}
	}
	return toReturn;
}

// Cross-browser alternative for querySelectorAll and document.all for getting
// elements by ID name
function getElementsByID(IDname, parent)
{
	// To avoid breaking code relying on the old version of this function,
	// set parent to document if it is not set
	if (!isSet(parent))
	{
		parent = document;
	}
	
	var toReturn;
	// For most modern browsers
	if (document.querySelectorAll)
	{
		// Get all the elements whose ID name is equal to IDname from the page
		if (parent==null)
		{
			toReturn = document.querySelectorAll('#'+IDname);
		}
		else
		{
			toReturn = parent.querySelectorAll('#'+IDname);
		}
	}
	// For IE7 and lower (which don't support querySelectorAll)
	else if (document.all)
	{
		toReturn = new Array();
		
		// Parse through all the elements on the web page
		var elementIndex = 0;
		for (var tagIndex=0; tagIndex<document.all.length; tagIndex++)
		{
			// If the ID of the element is equal to IDname, add it to
			// toReturn and increment elementIndex
			if (document.all[tagIndex].id==IDname)
			{
				toReturn[elementIndex] = document.all[tagIndex];
				elementIndex++;
			}
		}
	}
	return toReturn;
}

// Cross-browser alternative for getPropertyValue and getAttribute
function getProperty(element, propertyName)
{
	var toReturn;
	// For most modern browsers
	if (element.getPropertyValue)
	{
		toReturn = element.getPropertyValue(propertyName);
	}
	// For IE8 and lower (which don't support getPropertyValue)
	else if (element.getAttribute)
	{
		toReturn = element.getAttribute(propertyName);
	}
	return toReturn;
}

// Cross-browser alternative for setProperty and setAttribute
function setPropertyValue(element, propertyName, propertyValue)
{
	// For most modern browsers
	if (element.setProperty)
	{
		element.setProperty(propertyName, propertyValue, null);
		
		// Return true to indicate success
		return true;
	}
	// For IE8 and lower (which don't support setProperty)
	else if (element.setAttribute)
	{
		element.setAttribute(propertyName, propertyValue);
		
		// Return true to indicate success
		return true;
	}
	else
	{
		// Return false to indicate failure
		return false;
	}
}

// Cross-browser alternative for window.scrollX and document.documentElement.scrollLeft
function getScrollX()
{
	var toReturn;
	// For most modern browsers
	if (window.scrollX)
	{
		toReturn = window.scrollX;
	}
	// For Internet Explorer
	else if (document.documentElement.scrollLeft)
	{
		toReturn = document.documentElement.scrollLeft;
	}
	return toReturn;
}

// Cross-browser alternative for window.scrollY and document.documentElement.scrollTop
function getScrollY()
{
	var toReturn;
	// For most modern browsers
	if (window.scrollY)
	{
		toReturn = window.scrollY;
	}
	// For Internet Explorer
	else if (document.documentElement.scrollTop)
	{
		toReturn = document.documentElement.scrollTop;
	}
	return toReturn;
}

// For a MouseEvent, gets the X mouse coordinate relative to the target that triggered the event
function getTargetX(event)
{
	var toReturn = event.pageX - event.target.offsetLeft;
	return toReturn;
}

// For a MouseEvent, gets the Y mouse coordinate relative to the target that triggered the event
function getTargetY(event)
{
	var toReturn = event.pageY - event.target.offsetTop;
	return toReturn;
}

// Cross-browser alternative for string.startsWith
function strStartsWith(element, comparisionString)
{
	// If the browser supports string.startsWith, use that
	if (element.startsWith)
	{
		return element.startsWith(comparisionString);
	}
	// Otherwise, compare the two strings in a for loop
	else
	{
		// Check to see if the comparisionString is as long as the element string
		if (element.length>=comparisionString.length)
		{
			for (var char=0; ((char<element.length)&&(char<comparisionString.length)); char++)
			{
				// If the two characters are not equal, return false
				if (element.charAt(char)!==comparisionString.charAt(char))
				{
					return false;
				}
			}
			// If all the characters were equal, return true
			return true;
		}
		else
		{
			// If not, return false
			return false;
		}
	}
}

// Cross-browser alternative for new XMLHttpRequest()
// Necessary for include function to work
function getXMLHttpRequest()
{
	var toReturn;
	// For most modern browsers
	if (window.XMLHttpRequest)
	{
		toReturn = new XMLHttpRequest();
	}
	// For Internet Explorer
	else if (ActiveXObject)
	{
		toReturn = new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}
	return toReturn;
}

// Return one of several file types for the file given
function getFileType(filePath)
{
	// Check to make sure the file path is not empty
	if (filePath!='')
	{
		// Return a file type based on the file path's extension
		// For binary files
		if ((filePath.match(/[.]exe$/))||(filePath.match(/[.]com$/))||(filePath.match(/[.]bin$/)))
		{
			return 'binary';
		}
		
		// For script files
		if (filePath.match(/[.]js$/))
		{
			return 'script';
		}
		else if (filePath.match(/[.]glsl$/))
		{
			return 'script';
		}
		
		// For style files
		if (filePath.match(/[.]css$/))
		{
			return 'style';
		}
		
		// For image files
		if (filePath.match(/[.]gif$/))
		{
			return 'image';
		}
		else if ((filePath.match(/[.]jpeg$/))||(filePath.match(/[.]jpg$/)))
		{
			return 'image';
		}
		else if (filePath.match(/[.]png$/))
		{
			return 'image';
		}
		else if (filePath.match(/[.]svg$/))
		{
			return 'image';
		}
		else if (filePath.match(/[.]webp$/))
		{
			return 'image';
		}
		
		// For audio files
		if (filePath.match(/[.]aac$/))
		{
			return 'audio';
		}
		else if (filePath.match(/[.]flac$/))
		{
			return 'audio';
		}
		else if (filePath.match(/[.]m4a$/))
		{
			return 'audio';
		}
		else if (filePath.match(/[.]mp3$/))
		{
			return 'audio';
		}
		else if ((filePath.match(/[.]ogg$/))||(filePath.match(/[.]ogx$/)))
		{
			return 'audio';
		}
		else if (filePath.match(/[.]oga$/))
		{
			return 'audio';
		}
		
		// For video files
		if (filePath.match(/[.]flv$/))
		{
			return 'video';
		}
		else if ((filePath.match(/[.]mpeg$/))||(filePath.match(/[.]mpg$/)))
		{
			return 'video';
		}
		else if ((filePath.match(/[.]mp4$/))||(filePath.match(/[.]m4v$/)))
		{
			return 'video';
		}
		else if (filePath.match(/[.]ogv$/))
		{
			return 'video';
		}
		else if (filePath.match(/[.]webm$/))
		{
			return 'video';
		}
		
		// For document files
		if (filePath.match(/[.]pdf$/))
		{
			return 'document';
		}
		
		// For text files
		if ((filePath.match(/[.]html$/))||(filePath.match(/[.]htm$/)))
		{
			return 'text';
		}
		
		// If the file type could not be recognized by the extension, assume plain text
		return 'text';
	}
	else
	{
		// If the file path is empty, return an empty string
		return '';
	}
}

// Return a MIME type for the file at the path given based on its extension
function getMimeType(filePath)
{
	// Check to make sure the file path is not empty
	if (filePath!='')
	{
		// Search extensions based on the type of the file
		// For binary files
		var fileType = getFileType(filePath);
		if (fileType=='binary')
		{
			// Return a MIME type based on the file path's extension
			if ((filePath.match(/[.]exe$/))||(filePath.match(/[.]com$/))||(filePath.match(/[.]bin$/)))
			{
				return 'application/binary';
			}
			else
			{
				return 'application';
			}
		}
		// For script files
		else if (fileType=='script')
		{
			// Return a MIME type based on the file path's extension
			if (filePath.match(/[.]js$/))
			{
				return 'text/javascript';
			}
			else if (filePath.match(/[.]glsl$/))
			{
				return 'application/x-shader';
			}
			else
			{
				return 'application/x-script';
			}
		}
		// For style files
		else if (fileType=='style')
		{
			if (filePath.match(/[.]css$/))
			{
				return 'text/css';
			}
			else
			{
				return 'text/x-style';
			}
		}
		// For image files
		else if (fileType=='image')
		{
			// Return a MIME type based on the file path's extension
			if (filePath.match(/[.]gif$/))
			{
				return 'image/gif';
			}
			else if ((filePath.match(/[.]jpeg$/))||(filePath.match(/[.]jpg$/)))
			{
				return 'image/jpeg';
			}
			else if (filePath.match(/[.]png$/))
			{
				return 'image/png';
			}
			else if (filePath.match(/[.]svg$/))
			{
				return 'image/svg+xml';
			}
			else if (filePath.match(/[.]webp$/))
			{
				return 'image/webp';
			}
			else
			{
				return 'image';
			}
		}
		// For audio files
		else if (fileType=='audio')
		{
			// Return a MIME type based on the file path's extension
			if (filePath.match(/[.]aac$/))
			{
				return 'audio/aac';
			}
			else if (filePath.match(/[.]flac$/))
			{
				return 'audio/flac';
			}
			else if (filePath.match(/[.]m4a$/))
			{
				return 'audio/mp4';
			}
			else if (filePath.match(/[.]mp3$/))
			{
				return 'audio/mpeg';
			}
			else if ((filePath.match(/[.]ogg$/))||(filePath.match(/[.]ogx$/)))
			{
				return 'application/ogg';
			}
			else if (filePath.match(/[.]oga$/))
			{
				return 'audio/ogg';
			}
			else
			{
				return 'audio';
			}
		}
		// For video files
		else if (fileType=='video')
		{
			// Return a MIME type based on the file path's extension
			if (filePath.match(/[.]flv$/))
			{
				return 'video/x-flv';
			}
			else if ((filePath.match(/[.]mpeg$/))||(filePath.match(/[.]mpg$/)))
			{
				return 'video/mpeg';
			}
			else if ((filePath.match(/[.]mp4$/))||(filePath.match(/[.]m4v$/)))
			{
				return 'video/mp4';
			}
			else if (filePath.match(/[.]ogv$/))
			{
				return 'video/ogg';
			}
			else if (filePath.match(/[.]webm$/))
			{
				return 'video/webm';
			}
			else
			{
				return 'video';
			}
		}
		// For document files
		else if (fileType=='document')
		{
			if (filePath.match(/[.]pdf$/))
			{
				return 'application/pdf';
			}
			else
			{
				return 'document';
			}
		}
		// For text
		else if (fileType=='text')
		{
			if ((filePath.match(/[.]html$/))||(filePath.match(/[.]htm$/)))
			{
				return 'text/html';
			}
			else
			{
				return 'text/plain';
			}
		}
		// If the file type could not be recognized by the extension, assume binary data
		else
		{
			return 'application/octet-stream';
		}
	}
	else
	{
		// If the file path is empty, return an empty string
		return '';
	}
}

// Returns the GET argument for the parameter given
function _GET(parameter)
{
	// Retrieve the arguments after the URL
	var GET_data = location.search;
	
	// Determine if the requested parameter is defined in the GET arguments
	var paramStart = GET_data.match(new RegExp("[\?\&]"+parameter+"=."));
	if (paramStart!=null)
	{
		// If the requested parameter is found, return its contents
		var paramStartPoint = GET_data.indexOf(paramStart[0])+paramStart[0].length-1;
		
		var paramEnd = GET_data.match(new RegExp("[\?\&]"+parameter+"=(.+?)(?=\&|\#|$)"));
		var paramEndPoint = GET_data.indexOf(paramEnd[0])+paramEnd[0].length;
		var paramData = GET_data.substr(paramStartPoint, (paramEndPoint-paramStartPoint));
		return paramData;
	}
}

// Checks whether the variable has been defined
function isSet(variable)
{
	// If the type of the variable is undefined, return false
	if ((typeof variable)=='undefined')
	{
		return false;
	}
	// Otherwise return true
	else
	{
		return true;
	}
}

// Checks whether the variable is an array (including associative arrays)
function isArray(variable)
{
	// If the type of the variable is array or object (for associative arrays), return false
	if (((typeof variable)=='array')||((typeof variable)=='object'))
	{
		return true;
	}
	// Otherwise return true
	else
	{
		return false;
	}
}

// Returns the length of a string
// Used for newly defined strings
function strlen(string)
{
	return string.length;
}
