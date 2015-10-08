// Shared JavaScript functions and variables used by all files
// Set site_title equal to the site title
var site_title = "Taylor Spencer's ePortfolio";

// Set the names and paths of the documents used in the site
var documents = {"./": "Home",
		"education.html": "Education",
		"education.html#": {"education.html#UNT": "University of North Texas",
				"education.html#NLC": "North Lake College"},
		"myApps.html": "My Apps",
		"myApps.html#": {"myApps.html#AndroidApps": "Android Apps",
				"myApps.html#AndroidApps#": {"myApps.html#Networks": "Networks",
							"myApps.html#UNTBusFinder": "UNT Bus Finder",
							"myApps.html#LoginAssistant": "Login Assistant"},
				"myApps.html#PHPWebApps": "PHP/Web Apps",
				"myApps.html#PHPWebApps#": {"myApps.html#WebAuthoringAssignments": "Web Authoring Assignments",
							"myApps.html#CollaborativeProjectSite": "Collaborative Project Site",
							"myApps.html#PhotoUploader": "Photo Uploader",
							"myApps.html#ImageSelector": "Image Selector",
							"myApps.html#WebPresentation": "Web Presentation"},
				"myApps.html#OtherApps": "Other Apps",
				"myApps.html#OtherApps#": {"myApps.html#bjavaloader-gui": "bjavaloader-gui"}},
		"resume.pdf": "Resum\xE9",
		"references.pdf": "References",
		"contactMe.html": "Contact Me"};

// Set the names and paths of external resources to be redirected to
var externRedirs = {"linkedin": "https://www.linkedin.com/pub/taylor-spencer/b2/1b6/3a0/en",
			"github": "https://github.com/taylorkspencer",
			"networks_gplay": "https://play.google.com/store/apps/details?id=com.spencers.networks.free",
			"networks_amazon": "http://www.amazon.com/gp/mas/dl/android?p=com.spencers.networks.free",
			"loginassistant_gplay": "https://play.google.com/store/apps/details?id=com.Spencers.LoginAssistant.free",
			"loginassistant_amazon": "http://www.amazon.com/gp/mas/dl/android?p=com.Spencers.LoginAssistant.free"};

// Set document_title equal to the name of the document being loaded
var page = location.href.substr(location.href.lastIndexOf("/")+1);
if (page.indexOf("document.html")!=-1)
{
	// If document.html is the file, extract the URL argument
	page = _GET("url");
}
var document_title;
// Check if the document has a title defined
if (isSet(documents[page]))
{
	document_title = documents[page];
}
else
{
	// If not, set document_title to "No Title"
	document_title = "No Title";
}
