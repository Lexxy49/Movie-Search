const apiKey = '7775d8b3d2c646d8739d5d38a9486b5f'; // Replace with your actual TMDb API key
    const searchInput = document.getElementById('search');
    const resultDiv = document.getElementById('movieResult');

    searchInput.addEventListener('input', function () {
      const query = this.value.trim();
      if (query.length < 2) return;

      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          const movie = data.results[0]; // Get the first result
          if (!movie) {
            resultDiv.innerHTML = "<p>No results found.</p>";
            return;
          }

          const posterPath = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/200x300?text=No+Image';

          resultDiv.innerHTML = `
            <img src="${posterPath}" alt="Poster">
            <div class="info">
              <h2>${movie.title} (${movie.release_date?.slice(0,4) || 'N/A'})</h2>
              <p><strong>Rating:</strong> ${movie.vote_average}/10</p>
              <p>${movie.overview}</p>
            </div>
          `;
        })
        .catch(err => {
          resultDiv.innerHTML = "<p>Error fetching movie data.</p>";
          console.error(err);
        });
    });