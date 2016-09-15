var selectedText = "";
function createDictionaryPopup(word) {
	var popup = document.createElement("div");
	popup.className += "custom-dictionary dictionarypopup";

	for (var i = 0; i < word.partsOfSpeech.length; i++) {

		// container holds info and meanings
		var partOfSpeech = word.partsOfSpeech[i];
		var container = document.createElement("div");

		// info will contain quick info about a word
		var info = document.createElement("div");
		info.className += "custom-dictionary dictionarypopupinfo";

		// set the term name element
		var term = document.createElement("span");
		term.className = "dictionarypopupterm"
		term.textContent = partOfSpeech.term + ' ';

		// create and set the part of speech element
		var pos = document.createElement("span")
		pos.textContent = '[' + partOfSpeech.pos + ']' + ' ';

		// append the items to the info (quick info)
		// inflection whether it has a plural value or not
		info.appendChild(term);
		if (partOfSpeech.inflection) {
			var inflection = document.createElement("span")
			inflection.textContent = partOfSpeech.inflection + " ";
			inflection.className += " inflection";
			info.appendChild(inflection);
		}

		// create and set the phonetic spelling of a word
		if (partOfSpeech.phonetic) {
			var phonetic = document.createElement("span");
			phonetic.textContent = partOfSpeech.phonetic + ' ';
			info.appendChild(phonetic);
		}

		info.appendChild(pos);

		// create and set a words gender value
		if (partOfSpeech.gender) {
			var gender = document.createElement("span")
			gender.textContent = partOfSpeech.gender;
			info.appendChild(gender);
		}

		// create the meaning elements
		var meaning = document.createElement("div");
		meaning.className = "custom-dictionary dictionarypopupmeaning";

		// create and set the meaning of the particular part of speech
		if (partOfSpeech.meanings[0].meaning) {
			var meaningText = document.createElement("p");
			meaningText.textContent = "Meaning: " + partOfSpeech.meanings[0].meaning;
			meaning.appendChild(meaningText);
		}
		// create and set an associated expression.
		if (partOfSpeech.meanings[0].expressions[0]) {
			var expression = document.createElement("p");
			expression.textContent = partOfSpeech.meanings[0].expressions[0].source + "\n" + partOfSpeech.meanings[0].expressions[0].target;
			meaning.appendChild(expression);
		}	
		// create and set related words.
		if (partOfSpeech.meanings[0].related) {
			var relatedWords = partOfSpeech.meanings[0].related.join(', ');
			var related = document.createElement("p");
			related.textContent = "Related words: " + relatedWords;
			meaning.appendChild(related);
		}
		// append info and meaning to container, then append container to popup
		container.appendChild(info);
		container.appendChild(meaning);
		popup.appendChild(container);
	}
	return popup;
}

function createSearchBarDefinition(word) {
	var searchbar = document.body.getElementsByClassName("globalsearchcontainer")[0];

	var childDefinitions = searchbar.getElementsByClassName("definitions");
	if (childDefinitions.length > 0) {
		for (var i = childDefinitions.length - 1; i >= 0; i--) {
			searchbar = childDefinitions[i].parentNode;
			searchbar.removeChild(childDefinitions[i]);
		}
	}
	for (var i = 0; i < word[0].partsOfSpeech.length; i++) {
		var definition = document.createElement("div");
		definition.className = "definitions";
		var term, phonetic, pos, inflection, meaning, related, example;
		var heading = document.createElement("p");
		var content = document.createElement("div");
		if (word[0].partsOfSpeech[i].term) {
			term = document.createElement("span");
			term.textContent = word[0].partsOfSpeech[i].term + ' ';
			heading.appendChild(term);
		}
		if (word[0].partsOfSpeech[i].phonetic) {
			phonetic = document.createElement("span");
			phonetic.textContent = word[0].partsOfSpeech[i].phonetic + ' ';
			heading.appendChild(phonetic);
		}
		if (word[0].partsOfSpeech[i].pos) {
			pos = document.createElement("span");
			pos.textContent = '[' + word[0].partsOfSpeech[i].pos + '] ';
			heading.appendChild(pos);
		}
		if (word[0].partsOfSpeech[i].inflection) {
			inflection = document.createElement("span");
			inflection.textContent = word[0].partsOfSpeech[i].inflection;
			heading.appendChild(inflection);
		}
		if (word[0].partsOfSpeech[i].meanings.length > 0) {
			meaning = document.createElement("p");
			meaning.textContent = word[0].partsOfSpeech[i].meanings[0].meaning;
			content.appendChild(meaning);
		}
		if (word[0].partsOfSpeech[i].related) {
			related = document.createElement("p");
			related.textContent = word[0].partsOfSpeech[i].related.join(', ');
			content.appendChild(related);
		}
		if (word[0].partsOfSpeech[i].expressions) {
			example = document.createElement("p");
			example.textContent = word[0].partsOfSpeech[i].expressions[0].source + '\n' + word[0].partsOfSpeech[i].expressions[0].target; 
			content.appendChild(example);
		}
		content.className = "definition";
		definition.appendChild(heading);
		definition.appendChild(content);
		if (i != word[0].partsOfSpeech.length - 1) {
			definition.appendChild(document.createElement("hr"));			
		}
		searchbar.appendChild(definition);
	}
}
function toggleSearchBar() {
	// create the searchbar
	if (document.body.getElementsByClassName("globalsearchcontainer").length == 0) {
		var content = document.createElement("div");
		var container = document.createElement("div");
		container.className = "searchbar";
		content.className = "globalsearchcontainer";

		// create the input searchbar
		var searchbar = document.createElement("input");
		searchbar.setAttribute("type", "text");
		searchbar.value = selectedText;

		// create the magnifying glass icon
		var glass = document.createElement("span");
		var glassicon = document.createElement("img");
		glassicon.src = chrome.extension.getURL("public/source/img/glassGRAY.png");
		glass.appendChild(glassicon);
		glass.className += " glass"


		container.appendChild(glass);
		container.appendChild(searchbar);

		// create the flag buttons
		var languages = [chrome.extension.getURL("public/source/img/originals/de.png"), chrome.extension.getURL("public/source/img/originals/es.png"), chrome.extension.getURL("public/source/img/originals/fr.png"), chrome.extension.getURL("public/source/img/originals/it.png")]
		var languagescontainer = document.createElement("div");
		for (var i = 0; i < languages.length; i++) {
			var btn = document.createElement("button");
			var img = document.createElement("img");
			img.className += " searchlanguage";
			img.src = languages[i];
			var language = languages[i].substr(languages[i].length - 6, 2);
			img.setAttribute("language", language)

			// add click listener on flag buttons
			img.addEventListener("click", function() {
				this.parentNode.parentNode.setAttribute("language", this.getAttribute("language"));
				var buttons = this.parentNode.parentNode.childNodes;
				for (var j = 0; j < buttons.length; j++) {
					buttons[j].className = "";
				}
				this.parentNode.className += " active";
			})
			btn.appendChild(img);
			languagescontainer.appendChild(btn);
		}
		container.appendChild(languagescontainer);

		// add listener for when the user hits return to search
		container.addEventListener("keydown", function onKey(event) {
			if (event.keyCode == 13) {
				chrome.runtime.sendMessage({search: container.childNodes[1].value, language: container.childNodes[2].getAttribute("language")});			
			}
		})
		content.appendChild(container);
		document.body.appendChild(content);
	}

	// toggle the hot key search on or off
	else {
		var globalsearch = document.body.getElementsByClassName("globalsearchcontainer")[0];
		if (globalsearch.className.indexOf('hide') == -1) {
			globalsearch.className += " hide";
		}
		else {
			globalsearch.className = "globalsearchcontainer";
		}
		var input = globalsearch.childNodes[0].childNodes[1];
		input.value = selectedText;
	}
	// focus the new input element
	var input = document.body.getElementsByClassName("globalsearchcontainer")[0].childNodes[0];
	input = input.getElementsByTagName("input")[0];
	input.focus();
}

function traverse(item, words) {
	if (item.childNodes.length > 0) {
		for (var i = 0; i < item.childNodes.length; i++) {
				traverse(item.childNodes[i], words);			
		}
	}
	else {
		createElement(item, words);
	}
}

function createElement(item, words) {
	try {
		if (item.parentNode.className.indexOf("custom-dictionary") == -1 && item.parentNode.parentNode.className.indexOf("custom-dictionary") == -1 && item.parentNode.className.indexOf("definition") == -1  && item.parentNode.parentNode.className.indexOf("definition") == -1 && item.parentNode.tagName == "P") {
			var replace = false;
			var contentNode = item.cloneNode(true);
			var content = item.textContent.split(' ').map(function transformation(word) {
				for (var i = 0; i < words.length; i++) {
					if (word.toLowerCase() == words[i].term) {
						var popup = createDictionaryPopup(words[i]);
						replace = true;
						var replacewith = document.createElement("span");
						replacewith.textContent = word + ' ';
						replacewith.appendChild(popup);
						replacewith.className = 'dictionary-' + words[i].term.toLowerCase();
						replacewith.className += ' custom-dictionary';
						return replacewith;
					}
					else if (word.toLowerCase() == words[i].term + ',') {
						var popup = createDictionaryPopup(words[i]);
						replace = true;
						var replacewith = document.createElement("span");
						replacewith.textContent = word + ' ';
						replacewith.appendChild(popup);
						replacewith.className = 'dictionary-' + words[i].term.toLowerCase();
						replacewith.className += ' custom-dictionary';
						return replacewith;
					}
				}
				return word;
			});

			if (replace) {
				var start = 0,
				end = 0;
				resultElements = [];
				for (var i = 0; i < content.length; i++) {
					if (typeof content[i] == "object") {
						end = i;
						var text = content.slice(start, end).join(' ');
						var textNode = document.createTextNode(text);
						resultElements.push(text);
						resultElements.push(content[i]);
						start = i + 1;
					}
					else if (i == content.length - 1) {
						var text = content.slice(start, i).join(' ');
						var textNode = document.createTextNode(text);
						resultElements.push(text);
					}
				}
				for (var i = resultElements.length - 1; i >= 0; i--) {
					if (typeof resultElements[i] == "string") {
						item.parentNode.insertBefore(document.createTextNode(resultElements[i] + ' '), item.nextSibling);							
					}
					else {
						item.parentNode.insertBefore(resultElements[i], item.nextSibling);
					}
				}
				item.parentNode.removeChild(item);			
			}
		}
	}
	catch (e) {
		console.log('an error ocurred adding a definition element to the page', e);
	}
}

// Add event listeners for the new elements.
var addEventListeners = function() {
	return {
		addListeners: function(words, language) {
			for (var i = 0; i < words.length; i++) {
				var elements = document.getElementsByClassName('dictionary-' + words[i].term);
				for (var j = 0; j < elements.length; j++) {
					var element = elements[j];
					if (element.className.indexOf("dictionary-language-" + language) == -1) {
						element.className += " dictionary-language-" + language;
					}
					element.addEventListener("mouseenter", function (event) {
						var theElement = this.getElementsByClassName('custom-dictionary')[0];
						theElement.style.display = "block";
						theElement.addEventListener("mouseleave", function (event) {
							this.style.display = "none";
						});
					});
				}
			}
		}
	}
}();

// add event listener for when DOM loads.
document.addEventListener('DOMContentLoaded', fireContentLoadedEvent(), false);

// function that adds content for saved words, then calls addEventListeners.addListeners to add event listeners for new elements.
function fireContentLoadedEvent () {
	// grab currently selected text when mouse moves
	document.addEventListener("mouseup", function callback() {
		selectedText = window.getSelection().toString();
	})
	// get all dictionaries from local storage
	chrome.storage.local.get('dictionaries', function callback(result) {
		// if there are stored dictionaries create popups for words and add event listeners
		if (result.dictionaries) {
			var languages = ['fr', 'es', 'de', 'it'];
			var divs = document.body.getElementsByTagName("DIV");
			var lang = document.getElementsByTagName('html')[0].lang;
			if (result.dictionaries[lang]) {
				for (var i = 0; i < divs.length; i++) {
						traverse(divs[i], result.dictionaries[lang]);
						addEventListeners.addListeners(result.dictionaries[lang], lang);
				}
			}
		}
	})
};

// add event listener for page change without new DOM.
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		// if the request contains key "words", then it is a one off lookup and this word should then be found in page and event listeners attached.
		if (request.words) {
			createSearchBarDefinition(request.words);
			var divs = document.body.getElementsByTagName("DIV");
			for (var i = 0; i < divs.length; i++) {
				traverse(divs[i], request.words);				
			}
			addEventListeners.addListeners(request.words, request.language);		
		}
		// if the message is the result of shortcut keys
		else if ( (request.toggleSearch != undefined) && !request.dictionaries ) {
			toggleSearchBar();
		}
		// else the DOM may not have reloaded, but page location changed and all words should be found/listeners attached
		else {
			fireContentLoadedEvent()
		}
	}
);