const display = document.getElementById("motivato");
const excuseCard = document.getElementById("excuseCard");
const excuseQuote = document.getElementById("excuseQuote");
const excusePerson = document.getElementById("excusePerson");
const saveExcuseButton = document.getElementById("saveExcuseButton");
const clearGeneratedExcuseButton = document.getElementById("clearGeneratedExcuseButton");
const clearExcusesButton = document.getElementById("clearExcusesButton");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const gifContainer = document.getElementById("gifContainer");
const clearGIFsButton = document.getElementById("clearGIFsButton");

function searchGIF() {
  const searchTerm = searchInput.value;
  if (searchTerm.trim() !== "") {
    const apiKey = 'csx8dZaQHxPwuhacZ0JAs1xjFxE9lsIf';
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

    $.ajax({
      url: searchUrl,
      method: 'GET'
    }).done(function (response) {
      console.log(response);
      const gifUrl = response.data[0].images.original.url;
      const gifContainer = document.getElementById('gifContainer');
      gifContainer.innerHTML = `<img src="${gifUrl}" alt="GIF for ${searchTerm}" />`;
    }).fail(function (xhr, status, error) {
      console.error(error);
    });
  }
}

searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    searchGIF();
  }
});

function clearGIFs() {
  gifContainer.innerHTML = "";
  searchInput.value = "";
  searchInput.placeholder = "GIPHY CURE.";
}

clearGIFsButton.addEventListener("click", clearGIFs);

function fetchRecipes() {
  var query = 'chicken soup';

  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
    headers: { 'X-Api-Key': 'R/lbk2JexyYe9JpA0Jdo7w==G6pQbG32x7JQZZox' },
    contentType: 'application/json',
    success: function(result) {
      var apiResponseDiv = document.getElementById('apiResponse');
      apiResponseDiv.innerHTML = '';

      result.forEach(function(recipe, index) {
        var recipeTitle = recipe.title;
        var ingredients = recipe.ingredients;
        var instructions = recipe.instructions;

        var recipeButton = document.createElement('button');
        recipeButton.textContent = recipeTitle + ' (' + (index + 1) + ')';
        recipeButton.className = 'recipe-button';
        recipeButton.addEventListener('click', function() {
          toggleCollapse(recipeButton);
        });

        var starIcon = document.createElement('span');
        starIcon.className = 'favorite-star';
        starIcon.innerHTML = '&#9734;';

        starIcon.addEventListener('click', function(event) {
          event.stopPropagation();
          toggleFavorite(starIcon, recipeTitle);
        });

        var isFavorite = getFavoriteStatus(recipeTitle);
        if (isFavorite) {
          starIcon.classList.add('favorite');
          starIcon.innerHTML = '&#9733;';
        }

        var recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe-container';

        var recipeHeaderDiv = document.createElement('div');
        recipeHeaderDiv.className = 'recipe-header';

        recipeHeaderDiv.appendChild(recipeButton);
        recipeHeaderDiv.appendChild(starIcon);

        var ingredientsDiv = document.createElement('div');
        ingredientsDiv.textContent = 'Ingredients: ' + ingredients;
        ingredientsDiv.style.display = 'none';

        var instructionsDiv = document.createElement('div');
        instructionsDiv.textContent = 'Instructions: ' + instructions;
        instructionsDiv.style.display = 'none';

        recipeDiv.appendChild(recipeHeaderDiv);
        recipeDiv.appendChild(ingredientsDiv);
        recipeDiv.appendChild(instructionsDiv);

        apiResponseDiv.appendChild(recipeDiv);
      });
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

function toggleCollapse(recipeButton) {
  var recipeDiv = recipeButton.parentNode.parentNode;
  var ingredientsDiv = recipeDiv.querySelector('div:nth-child(2)');
  var instructionsDiv = recipeDiv.querySelector('div:nth-child(3)');

  ingredientsDiv.style.display = ingredientsDiv.style.display === 'none' ? 'block' : 'none';
  instructionsDiv.style.display = instructionsDiv.style.display === 'none' ? 'block' : 'none';
}

function toggleFavorite(starIcon, recipeTitle) {
  starIcon.classList.toggle('favorite');
  var isFavorite = starIcon.classList.contains('favorite');

  if (isFavorite) {
    starIcon.innerHTML = '&#9733;';
    saveFavoriteStatus(recipeTitle, true);
  } else {
    starIcon.innerHTML = '&#9734;';
    saveFavoriteStatus(recipeTitle, false);
  }
}

function saveFavoriteStatus(recipeTitle, isFavorite) {
  var favorites = getFavoritesFromStorage();

  if (isFavorite) {
    favorites.push(recipeTitle);
  } else {
    var index = favorites.indexOf(recipeTitle);
    if (index > -1) {
      favorites.splice(index, 1);
    }
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function getFavoriteStatus(recipeTitle) {
  var favorites = getFavoritesFromStorage();
  return favorites.includes(recipeTitle);
}

function getFavoritesFromStorage() {
  var favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

function clearRecipes() {
  document.getElementById('apiResponse').innerHTML = '';
}

//--------------------------------------------------------------

var query = '';

$('#search-input').on('change', function() {
  query = $(this).val();
});

$('#search-input').on('keyup', function(event) {
  if (event.key === 'Enter') {
    makeRequest();
  }
});

function makeRequest() {
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
    headers: { 'X-Api-Key': 'R/lbk2JexyYe9JpA0Jdo7w==G6pQbG32x7JQZZox' },
    contentType: 'application/json',
    success: function(result) {
      displayResults(result);
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

function displayResults(result) {
  var $resultsDiv = $('#results');
  $resultsDiv.empty();

  var votes = JSON.parse(localStorage.getItem('votes')) || {};

  result.forEach(function(item) {
    var formattedString = JSON.stringify(item, null, 2);

    var $pre = $('<pre>').addClass('json-response').text(formattedString.slice(1, -1));

    var $thumbsUp = $('<i>').addClass('fas fa-thumbs-up thumbs-up');
    var $thumbsDown = $('<i>').addClass('fas fa-thumbs-down thumbs-down');

    var $resultItem = $('<div>').addClass('result-item');
    var $contentContainer = $('<div>').addClass('content-container');
    $contentContainer.append($thumbsUp, $thumbsDown, $pre);
    $resultItem.append($contentContainer);
    $resultsDiv.append($resultItem);

    var keyword = query.toLowerCase();

    if (votes[keyword] && votes[keyword][item.id] === 'thumbs-up') {
      $thumbsUp.addClass('voted');
    } else if (votes[keyword] && votes[keyword][item.id] === 'thumbs-down') {
      $thumbsDown.addClass('voted');
    }

    $thumbsUp.on('click', function() {
      if ($thumbsUp.hasClass('voted')) {
        removeVote(keyword, item.id);
        $thumbsUp.removeClass('voted');
      } else {
        saveVote(keyword, item.id, 'thumbs-up');
        $thumbsUp.addClass('voted');
        $thumbsDown.removeClass('voted');
      }
    });

    $thumbsDown.on('click', function() {
      if ($thumbsDown.hasClass('voted')) {
        removeVote(keyword, item.id);
        $thumbsDown.removeClass('voted');
      } else {
        saveVote(keyword, item.id, 'thumbs-down');
        $thumbsUp.removeClass('voted');
        $thumbsDown.addClass('voted');
      }
    });
  });
}

function saveVote(keyword, itemId, vote) {
  var votes = JSON.parse(localStorage.getItem('votes')) || {};

  if (!votes[keyword]) {
    votes[keyword] = {};
  }

  votes[keyword][itemId] = vote;

  localStorage.setItem('votes', JSON.stringify(votes));
}

function removeVote(keyword, itemId) {
  var votes = JSON.parse(localStorage.getItem('votes')) || {};

  if (votes[keyword] && votes[keyword][itemId]) {
    delete votes[keyword][itemId];

    if (Object.keys(votes[keyword]).length === 0) {
      delete votes[keyword];
    }

    localStorage.setItem('votes', JSON.stringify(votes));
  }
}

$('#search-button').on('click', function() {
  makeRequest();
});

$('#clear-button').on('click', function() {
  $('#search-input').val('');
  $('#results').empty();
});


//--------------------------------------------------------------


const motivation = [
  {
    quote: "COUGH",
    person: "Having trouble breathing and coughing only helps."
  },
  {
    quote: "COVID",
    person: "Just got back from Las Vegas and apparently what's supposed to stay in Vegas didn't."
  },
  {
    quote: "DIZZINESS",
    person: "I forgot to eat breakfast and I think my blood sugar is low."
  },
  {
    quote: "HEADACHE",
    person: "I've been thinking about work but now I have a headache."
  },
  {
    quote: "STOMACHACHE",
    person: "I accidentally tried to eat my own cooking and my stomach is protesting in rebellion."
  },
  {
    quote: "FEVER",
    person: "I woke up this morning feeling like I'm auditioning for a role in a hot sauce commercial."
  },
  {
    quote: "SORE THROAT",
    person: "I've been singing like a rock star in the shower and now my throat thinks it's Freddy Mercury."
  },
  {
    quote: "NAUSEA",
    person: "I had a brief encounter with a questionable sandwich and now I'm questioning my choices."
  },
  {
    quote: "ALLERGIES",
    person: "My body has decided to rebel against nature's innocent offerings of pollen and dander."
  },
  {
    quote: "MIGRAINE",
    person: "I've been chosen as the unwilling recipient of an impromptu drum solo inside my skull."
  }
];

const physical = [
  {
    quote: "DUI",
    person: "I accidentally crashed into a fire hydrant because I couldn't afford another parking ticket."
  },
  {
    quote: "TOOTHACHE",
    person: "I was brushing my teeth too aggressively getting ready for work."
  },
  {
    quote: "SKYDIVING",
    person: "My parachute didn't open but I'm alive because I was wearing my helmet."
  },
  {
    quote: "PLAYING FOOTBALL",
    person: "I was on my Playstation and I hurt my thumbs catching the ball."
  },
  {
    quote: "GOT INTO A FIGHT",
    person: "My dog wouldn't listen to me so we argued all night long."
  },
  {
    quote: "BROKEN HEART",
    person: "My significant other left me. Now I have Broken Heart Syndrome."
  },
  {
    quote: "BACK PAIN",
    person: "I tried to do a dance move that clearly required a younger more agile version of myself."
  },
  {
    quote: "MUSCLE CRAMPS",
    person: "I attempted a series of yoga poses that turned me into a human pretzel. Now I can't untwist myself."
  },
  {
    quote: "PAPER CUT",
    person: "I suffered a tiny but excruciating paper cut and I'm unable to operate a keyboard without wincing in pain."
  },
  {
    quote: "SLIPPERY SOCKS",
    person: "I underestimated the dangers of wearing socks on a slippery surfaces. It's hard to walk now."
  }
];

const mental = [
  {
    quote: "GOING CRAZY",
    person: "I'm starting to lose my mind finishing this project with the impossible deadline."
  },
  {
    quote: "FEELING DOWN",
    person: "I woke up this morning and couldn't find my lucky underwear. Without it I'm just not myself."
  },
  {
    quote: "BAD MEMORY",
    person: "I've forgotten my coworkers names and I even tried getting a tattoo of my work schedule."
  },
  {
    quote: "VOICES",
    person: "I'm afraid the voices in my head will write some code that will crash the entire system."
  },
  {
    quote: "ANXIETY",
    person: "There are bugs on the floor. It sounds silly but I can't get out of my bed and debug."
  },
  {
    quote: "INSOMNIA",
    person: "I had a boxing match with Sleep and it won the 1st round with a knockout punch."
  },
  {
    quote: "VERTIGO",
    person: "I've been taking a wild ride on the flight of stairs to the office but sadly without the fun part."
  },
  {
    quote: "DECISION MAKING",
    person: "I'm experiencing an acute case of decision paralysis. I can't decide whether to come to work or stay in bed so I'm stuck in limbo."
  },
  {
    quote: "MIND READING",
    person: "My headphones are missing and discovered I have the uncanny ability to hear everyone's thoughts and the office became way too noisy for me."
  },
  {
    quote: "EXCESSIVE LAUGHTER",
    person: "I accidentally watched a marathon of comedy shows and now I can't stop laughing hysterically. It's quite disruptive."
  }
];

const misc = [
  {
    quote: "DENTIST",
    person: "It's painful to eat lunch at work with my bad teeth."
  },
  {
    quote: "EYE EXAM",
    person: "My coworker told me about cataracts, glaucoma and even blindness. My eyes became watery and wouldn't stop. I need to see my Optometrist."
  },
  {
    quote: "BLOOD TEST",
    person: "I have been pale lately. I'm scared I might turn into a vampire."
  },
  {
    quote: "EAR CARE",
    person: "It all started when I was having a difficult time hearing instructions from my team leaders."
  },
  {
    quote: "DERMATOLOGIST",
    person: "I've been itching my face so I'm afraid it might be contagious."
  },
  {
    quote: "PSYCHIATRIST",
    person: "I need to see a psychiatrist to address my severe and uncontrollable tendency to crack inappropriate jokes during meetings."
  },
  {
    quote: "PHYSICAL THERAPIST",
    person: "I urgently need to see a physical therapist to recover from my addiction to high-five marathons which has left my arm in a state of perpetual high-fiving readiness."
  },
  {
    quote: "FOOT DOCTOR",
    person: "I urgently need to see a foot doctor to regain control over my feet after an unfortunate incident involving The Moonwalk."
  },
  {
    quote: "CARDIOLOGIST",
    person: "I need to see a cardiologist soon to address my Broken Heart Syndrome."
  },
  {
    quote: "OTORHINOLARYNGOLOGISTS",
    person: "I'm undergoing treatment with an otorhinolaryngologist to tackle my extraordinary talent of transforming meetings into humming concerts."
  }
];



//--------------------------------------------------------------


function motivateMe() {
  const listLength = motivation.length;
  const randVal = motivation[Math.floor(Math.random() * listLength)];
  display.innerHTML = `<q>${randVal.quote}</q><br><br><small>${randVal.person}</small>`;
}

function physicalMe() {
  const listLength = physical.length;
  const randVal = physical[Math.floor(Math.random() * listLength)];
  display.innerHTML = `<q>${randVal.quote}</q><br><br><small>${randVal.person}</small>`;
}

function mentalMe() {
  const listLength = mental.length;
  const randVal = mental[Math.floor(Math.random() * listLength)];
  display.innerHTML = `<q>${randVal.quote}</q><br><br><small>${randVal.person}</small>`;
}

function miscMe() {
  const listLength = misc.length;
  const randVal = misc[Math.floor(Math.random() * listLength)];
  display.innerHTML = `<q>${randVal.quote}</q><br><br><small>${randVal.person}</small>`;
}

function saveExcuse(excuse) {
  localStorage.setItem("selectedExcuse", JSON.stringify(excuse));
  updateExcuseCard(excuse);
}

function updateExcuseCard(excuse) {
  excuseQuote.textContent = excuse.quote;
  excusePerson.textContent = excuse.person;
  excuseCard.style.display = "block";
}

function motivateMe() {
  const listLength = motivation.length;
  const randVal = motivation[Math.floor(Math.random() * listLength)];
  display.innerHTML = `<q>${randVal.quote}</q><br><br><small>${randVal.person}</small>`;
  saveExcuseButton.addEventListener("click", () => saveExcuse(randVal));
}

function physicalMe() {
  const listLength = physical.length;
  const randVal = physical[Math.floor(Math.random() * listLength)];
  display.innerHTML = `<q>${randVal.quote}</q><br><br><small>${randVal.person}</small>`;
  saveExcuseButton.addEventListener("click", () => saveExcuse(randVal));
}

function mentalMe() {
  const listLength = mental.length;
  const randVal = mental[Math.floor(Math.random() * listLength)];
  display.innerHTML = `<q>${randVal.quote}</q><br><br><small>${randVal.person}</small>`;
  saveExcuseButton.addEventListener("click", () => saveExcuse(randVal));
}

function miscMe() {
  const listLength = misc.length;
  const randVal = misc[Math.floor(Math.random() * listLength)];
  display.innerHTML = `<q>${randVal.quote}</q><br><br><small>${randVal.person}</small>`;
  saveExcuseButton.addEventListener("click", () => saveExcuse(randVal));
}

function clearGeneratedExcuse() {
  display.innerHTML = "";

  const savedExcuse = getSavedExcuse();
  if (savedExcuse) {
    updateExcuseCard(savedExcuse);
  } else {
    excuseCard.style.display = "none";
  }
}

clearGeneratedExcuseButton.addEventListener("click", clearGeneratedExcuse);

function clearExcuses() {
  localStorage.removeItem("selectedExcuse");
  excuseCard.style.display = "none";
}

function getSavedExcuse() {
  const savedExcuse = localStorage.getItem("selectedExcuse");
  if (savedExcuse) {
    return JSON.parse(savedExcuse);
  }
  return null;
}

const savedExcuse = getSavedExcuse();
if (savedExcuse) {
  updateExcuseCard(savedExcuse);
}

clearExcusesButton.addEventListener("click", clearExcuses);