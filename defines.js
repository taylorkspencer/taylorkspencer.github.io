// Shared JavaScript functions and variables used by all files

// Check if the document has a title defined
// Defined as a function so it can be run recursively
function checkForTitle(docArray, page)
{
	if (isSet(docArray[page]))
	{
		// If a title could be found, return it
		return docArray[page];
	}
	else
	{
		// Search deeper in the array for a title
		for (var index in docArray)
		{
			// If another array is found, recursively search inside it
			if (isArray(docArray[index]))
			{
				var docTitle = checkForTitle(docArray[index], page);
				
				if (docTitle!==false)
				{
					// If a title could be found, return it
					return docTitle;
				}
			}
		}
		
		// If a title couldn't be found, return false
		return false;
	}
}


// Set site_title equal to the site's title
var site_title = "Taylor Spencer's ePortfolio";

// Set site_tagline equal to the site's tagline
var site_tagline = "Local SEO Expert, Web, and Mobile App Developer";

// Set site_GTMCODE equal to the site's GTM code
define('site_GTMCODE', "GTM-M88SN92");

// Set site_GAID equal to the site's Google Analytics ID
define('site_GAID', "UA-133764936-1");

// Set the names and paths of the documents used in the site
var documents = {"./": "Home",
		"education.html": "Education",
		"education.html#": {"education.html#UNT": "University of North Texas",
				"education.html#NLC": "North Lake College",
				"education.html#Certifications": "Certifications"},
		"experience.html": "Experience",
		"experience.html#": {"experience.html#TheCrouchGroup": "The Crouch Group",
				"experience.html#SproutsFarmersMarket": "Sprouts Farmers Market"},
		"myApps.html": "My Apps",
		"myApps.html#": {"myApps.html#MobileApps": "Mobile Apps",
				"myApps.html#MobileApps#": {"myApps.html#FBCLewisvilleApp": "FBC Lewisville App",
							"myApps.html#Networks": "Networks",
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
		"papers.html": "Papers",
  		"papers.html#": {"papers.html#major": "Major Papers",
  			"papers.html#major#": {"the-advent-of-bitcoin": "The Advent of Bitcoin: Its Design, History, Spinoffs, and Threats",
  				"proposal-new-undergrad-CS-course-python": "Proposal for New Undergraduate Computer Science Course in Python",
	  			"the-legalities-and-ethics-of-data-sharing-vs-privacy": "The Legalities and Ethics of Data Sharing vs Privacy",
	  			"how-to-make-online-tests-quizzes-and-learning-materials-accessible": "How to Make Online Tests, Quizzes, and Learning Materials Accessible",
	  			"how-technical-writing-skills-matter-to-a-computer-programmer": "How Technical Writing Skills Matter to a Computer Programmer"},
	  		"papers.html#minor": "Minor Papers",
	  		"papers.html#minor#": {"technical-procedures-and-manuals_level-1-brochures": "Technical Procedures and Manuals Level 1 Brochures",
	  			"wireless-networks-and-protocols_new-services-for-5G-presentation": "Wireless Networks and Protocols New Services for 5G Presentation",
	  			"wireless-networks-and-protocols_project-3-report": "Wireless Networks and Protocols Project 3 Report"}},
		"resume.pdf": "Resum\xE9",
		"references.pdf": "References",
		"contactMe.html": "Contact Me"};

// Define the document sets used for this site
var docSets = {"the-advent-of-bitcoin": "<p>Bitcoin is a revolutionary invention, with a long, storied history full of interesting characters, growth and collapse, and conspiracies.&nbsp; In this paper, I discuss the invention of Bitcoin, its rise and challenges, and the spin-offs it spawned.</p><p>This paper was written for an Advanced Technical Writing class during the Spring 2015 semester.</p>",
  		"the-advent-of-bitcoin_": {"papers/the-advent-of-bitcoin_paper.pdf": "Paper",
  			"papers/the-advent-of-bitcoin_outline.pdf": "Outline"},
  		"proposal-new-undergrad-CS-course-python": "<p>The Python programming language is used by several major technology companies, and it is the most discussed programming language on the Internet.&nbsp; However, neither UNT nor any other university in Texas teaches Python.&nbsp; In this paper, I discuss the case for teaching Python, detail a possible Python course that could be taught at the University of North Texas in the future, and tell how UNT, by introducing a Python programming course, could improve the prospects of its graduates for jobs both inside and outside of Texas.</p><p>This paper was written for an Advanced Technical Writing class during the Spring 2015 semester.</p>",
  		"proposal-new-undergrad-CS-course-python_": {"papers/proposal-new-undergrad-CS-course-python_paper.pdf": "Paper",
  			"papers/proposal-new-undergrad-CS-course-python_outline.pdf": "Outline"},
  		"the-legalities-and-ethics-of-data-sharing-vs-privacy": "<p>There have been lots of controversies involving privacy lately.&nbsp; In this paper, I look at and give a multi-faceted view of data privacy on the Internet.&nbsp; First, I examine the legal side of the issue.&nbsp; Then I try to present an idealistic view of how, in my opinion, things should be as it relates to privacy.&nbsp; Last, I reconcile this with the status quo, and see if there is anything we can do to improve our privacy.</p><p>This paper was written for a Social Issues in Computing class during the Spring 2013 semester.</p>",
  		"the-legalities-and-ethics-of-data-sharing-vs-privacy_": {"papers/the-legalities-and-ethics-of-data-sharing-vs-privacy_paper.pdf": "Paper",
  			"papers/the-legalities-and-ethics-of-data-sharing-vs-privacy_outline.pdf": "Outline",
  			"papers/the-legalities-and-ethics-of-data-sharing-vs-privacy_abstract.pdf": "Abstract"},
  		"how-to-make-online-tests-quizzes-and-learning-materials-accessible": "<p>Ensuring that the tests and quizzes you administer online are accessible is one of the most important, if not the most, important duty to your students as an instructor.&nbsp; In this paper, I detail what instructors at the University of North Texas need to do in order to ensure their tests are accessible for people with disabilities.&nbsp; Accompanying this paper is a memo that makes the case for this paper.</p><p>This paper, along with the memo accompanying it, was written for a Technical Writing class during the Fall 2011 semester.</p>",
  		"how-to-make-online-tests-quizzes-and-learning-materials-accessible_": {"papers/how-to-make-online-tests-quizzes-and-learning-materials-accessible_paper.pdf": "Paper",
  			"papers/how-to-make-online-tests-quizzes-and-learning-materials-accessible_memo.pdf": "Memo"},
  		"how-technical-writing-skills-matter-to-a-computer-programmer": "<p>Due to prominent leaders in the computer programming field being college dropouts, there has been a history of aspiring computer programmers blowing off their core courses to focus on their major-related courses, to the point where they drop out of college.&nbsp; However, I believe that these courses do not amount to a reason for dropping out.&nbsp; In this paper, I explain why a computer programmer needs technical writing and how they will use it at their job.</p><p>This paper was written for a Technical Writing class during the Fall 2011 semester.</p>",
  		"how-technical-writing-skills-matter-to-a-computer-programmer_": {"papers/how-technical-writing-skills-matter-to-a-computer-programmer_paper.pdf": "Paper"},
  		"technical-procedures-and-manuals_level-1-brochures": "<p>As part of a Technical Procedures and Manuals class during the Spring 2015 semester, I created two brochures, one short-form and the other long-form, to promote Level 1 Construction.&nbsp; Both advise homeowners not to let damage linger and accumulate over multiple storms just because they think it is minor or to trust fly-by-night roofers that show up after a storm, but to trust Level 1 Construction to repair their storm damage to the homeowner's satisfaction.</p><p>These brochures were written for a Technical Procedures and Manuals class during the Spring 2015 semester.</p>",
  		"technical-procedures-and-manuals_level-1-brochures_": {"papers/minor/technical-procedures-and-manuals_level-1-brochures_attention-homeowner.pdf": "Attention Homeowner! (Short-Form)",
  			"papers/minor/technical-procedures-and-manuals_level-1-brochures_3-things-every-homeowner-must-know-after-experiencing-a-hailstorm.pdf": "3 Things Every Homeowner Must Know After Experiencing A Hailstorm (Long-Form)"},
  		"wireless-networks-and-protocols_new-services-for-5G-presentation": "<p>As part of a Wireless Networks and Protocols class during the Fall 2014 semester, students put together a series of presentations exploring new services for 5G.&nbsp; I, along with several other students, made this presentation to explore the uses and concerns for 5G in smart cities.</p><p>This presentation was made for a Wireless Networks and Protocols class during the Fall 2014 semester.</p>",
  		"wireless-networks-and-protocols_new-services-for-5G-presentation_": {"papers/minor/wireless-networks-and-protocols_new-services-for-5G-presentation_smart-cities.pdf": "Smart Cities Presentation"},
  		"wireless-networks-and-protocols_project-3-report": "<p>The last project for a Wireless Networks and Protocols class during the Fall 2014 semester involved creating an Android application for collecting the longitude and latitude information, tower ID, neighbor list, and signal strength using Android APIs.&nbsp; This report consists of an event chart for the app, which I continue to develop outside of class under the name of Networks, along with state diagrams, maps and tables (created by the app) collected from various locations in town.&nbsp; Accompanying this data is a report that details the creation and structure of the app which I continue to develop as Networks.</p><p>This report was made to accompy an app called Networks, which was written for a Wireless Networks and Protocols class during the Fall 2014 semester.</p>",
  		"wireless-networks-and-protocols_project-3-report_": {"papers/minor/wireless-networks-and-protocols_project-3-report.pdf": "Report"}};

// Set the names and paths of external resources to be redirected to
var externRedirs = {"linkedin": "https://www.linkedin.com/in/taylorkspencer",
			"github": "https://github.com/taylorkspencer",
			"fbclewisvilleapp_itunes": "https://itunes.apple.com/us/app/fbc-lewisville/id1168128641?mt=8",
  			"fbclewisvilleapp_gplay": "https://play.google.com/store/apps/details?id=org.fbclewisville.app",
  			"fbclewisvilleapp_amazon": "https://www.amazon.com/gp/mas/dl/android?p=org.fbclewisville.app"};

// Set document_title equal to the name of the document being loaded
var page = location.href;
// Strip out any target or GET arguments from the URL
var sanitizedPage;
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
// Strip out the path before the page
sanitizedPage = sanitizedPage.substr(sanitizedPage.lastIndexOf("/")+1);

// If document.html is the file, extract either the doc argument,
// or if that is not defined, the URL argument
if (sanitizedPage.indexOf("document.html")!=-1)
{
	if (isSet(_GET("doc")))
	{
		sanitizedPage = _GET("doc");
	}
	else if (isSet(_GET("url")))
	{
		sanitizedPage = _GET("url");
	}
}
// Check if the document has a title defined
var document_title = checkForTitle(documents, sanitizedPage);
if (document_title==false)
{
	// If a title couldn't be found, set document_title to "No Title"
	document_title = "No Title";
}
