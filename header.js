// Create a list of links from the array
function createLinks(documents, container)
{
	// Create the list of links
	for (var page in documents)
	{
		// If the link is an array, create a submenu
		if (isArray(documents[page]))
		{
			// Create a new <ul> tag for the submenu
			var submenu = document.createElement("ul");
			
			// Call this function recursively to create a submenu
			createLinks(documents[page], submenu);
			
			// Once the submenu is created, add it to the page
			container.appendChild(submenu);
		}
		else
		{
			var sanitizedPage;
			// Create a sanitized page string for linking and mime-type purposes
			if (page.indexOf('?')!=-1)
			{
				sanitizedPage = page.substr(0, page.indexOf('?'));
			}
			else if (page.indexOf('#')!=-1)
			{
				sanitizedPage = page.substr(0, page.indexOf('#'));
			}
			else
			{
				sanitizedPage = page;
			}
			
			// If the page matches the name of a document set (for virtual papers), open it in document.html
			// Changed because it takes too long to determine if a file exists
			if (isSet(docSets[sanitizedPage]))
			{
				sanitizedPage = "document.html?doc="+page;
			}
			// If the page is not a HTML file, open it in document.html by URL
			else if (getMimeType(sanitizedPage).indexOf('application/')!=-1)
			{
				sanitizedPage = "document.html?url="+page;
			}
			
			// Create the list item and the link to go in it
			var listItem = document.createElement("li");
			var itemLink = document.createElement("a");
			itemLink.href = sanitizedPage;
			itemLink.innerHTML = documents[page];
			
			// If the link is pointing to this page, set its class name to "here"
			if ((itemLink.href===location.href)
				||(strStartsWith(location.href, itemLink.href+'#'))
				||(strStartsWith(location.href, itemLink.href+'?')))
			{
				itemLink.className = "here";
			}
			
			// Put the link inside the list item and place it on the page
			listItem.appendChild(itemLink);
			container.appendChild(listItem);
		}
	}
}

// Create a function to be run when the includes have finished
var onInclude = function()
{
	// To ensure that this is all done on the header, get the header container
	var header = document.getElementById('header');
	
	// Get the primary title container and fill it with the site title
	var primaryTitle = getElementsByClass('primary', header);
	// Check to see if the included elements are available
	if (primaryTitle[0]!=null)
	{
		primaryTitle[0].insertAdjacentHTML("beforeend", site_title);
		
		// If the included elements are available, remove the timer
		// and proceed with the function
		window.clearTimeout(onIncludeTimeoutID);
	}
	else
	{
		// If the included elements are not yet available, set a timer
		// for this function and exit
		onIncludeTimeoutID = window.setTimeout(onInclude, 1000);
		return;
	}
	
	// Get the links list and fill it with the links
	var linksList = getElementsByID('links', header);
	createLinks(documents, linksList[0]);
	
	// Get the links inside the list and the links list's submenus
	var links = linksList[0].getElementsByTagName('a');
	var linksSubmenus = linksList[0].getElementsByTagName('ul');
	
	// Align the submenus to their previous element and give them a consistent width
	for (var submenuIndex=0; submenuIndex<linksSubmenus.length; submenuIndex++)
	{
		// Set the left value equal to the left value of the previous element
		if (linksSubmenus[submenuIndex].previousElementSibling)
		{
			linksSubmenus[submenuIndex].style.left = linksSubmenus[submenuIndex].previousElementSibling.offsetLeft+"px";
		}
	}
};

// Set a timeout ID for this function (to be defined when the timer is set)
var onIncludeTimeoutID = -1;

// Run this function when the page loads
addListener(window, 'load', onInclude);
