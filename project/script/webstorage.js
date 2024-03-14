$(document).ready(function() {
  function saveTip(formId, storageKey) {
    $(formId).on('submit', function(e) {
      e.preventDefault(); // Prevent default form submission

      var gameTip = {
        name: $(this).find('input[name="name"]').val(),
        email: $(this).find('input[name="email"]').val(),
        website: $(this).find('input[name="website"]').val(),
        tip: $(this).find('textarea[name="tip"]').val()
      };

      // Save the game tip to localStorage
      localStorage.setItem(storageKey, JSON.stringify(gameTip));
      alert('Tip saved! Thank you for contributing.');

      // Clear the form
      this.reset();
    });
  }

  // Initialize saveTip function for each game
  saveTip('#skyrim-form', 'skyrimGameTip');
  saveTip('#kenshi-form', 'kenshiGameTip');
  saveTip('#fallout4-form', 'fallout4GameTip');
});

document.addEventListener("DOMContentLoaded", function() {
  updateFavoritesList(); // Call on page load to display stored favorites

   document.getElementById('favoriteGameForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const favoriteGame = document.getElementById('favoriteGameInput').value.trim();
      if (favoriteGame) {
        addFavorite(favoriteGame);
        document.getElementById('favoriteGameInput').value = ''; // Clear input after adding
        updateFavoritesList(); // Update list to display the newly added favorite
      }
    });

    function addFavorite(game) {
      let favorites = JSON.parse(localStorage.getItem('favoritesGames')) || [];
      let now = new Date();
      let gameEntry = {
        name: game,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString() // Store the current date
      };
      favorites.push(gameEntry);
      localStorage.setItem('favoritesGames', JSON.stringify(favorites));
    }

    function updateFavoritesList() {
      const favorites = JSON.parse(localStorage.getItem('favoritesGames')) || [];
      const listElement = document.getElementById('favoritesList');
      listElement.innerHTML = ''; // Clear list before updating
      favorites.forEach(function(item) {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        listElement.appendChild(listItem);
      });

      if (favorites.length > 0) {
        updateGridWithLastFavorite(favorites[favorites.length - 1]);
      }
    }

    function updateGridWithLastFavorite(lastFavorite) {
      document.getElementById('lastFavoriteGame').textContent = lastFavorite.name;
      document.getElementById('lastFavoriteTime').textContent = lastFavorite.time;
      document.getElementById('lastFavoriteDate').textContent = lastFavorite.date; // Display the date
    }

    // Initial call to populate favorites list and grid if data exists
    updateFavoritesList();
  });

