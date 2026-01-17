// Obtener perfil activo
const currentProfile = JSON.parse(sessionStorage.getItem('currentProfile'));

if (!currentProfile) {
  window.location.href = 'profiles.html';
}

const catalog = [
  {
    id: 1,
    title: 'Inception',
    type: 'movie',
    image: '../assets/movies/inception.webp',
  },
  {
    id: 2,
    title: 'Interstellar',
    type: 'movie',
    image: './assets/movies/interstellar.jpg',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    type: 'movie',
    image: './assets/movies/the dark knight.jpg',
  },
  {
    id: 4,
    title: 'Fight Club',
    type: 'movie',
    image: './assets/movies/fight club.webp',
  },
  {
    id: 5,
    title: 'Forrest Gump',
    type: 'movie',
    image: './assets/movies/forrest gump.jpg',
  },
  {
    id: 6,
    title: 'Gladiator',
    type: 'movie',
    image: './assets/movies/gladiator.jpg',
  },
  {
    id: 7,
    title: 'Titanic',
    type: 'movie',
    image: './assets/movies/titanic.jpg',
  },
  {
    id: 8,
    title: 'Avatar',
    type: 'movie',
    image: './assets/movies/avatar.jpg',
  },
  {
    id: 9,
    title: 'The Matrix',
    type: 'movie',
    image: './assets/movies/matrix.avif',
  },
  {
    id: 10,
    title: 'Joker',
    type: 'movie',
    image: './assets/movies/joker.jpg',
  },

  {
    id: 101,
    title: 'Breaking Bad',
    type: 'series',
    image: './assets/series/breaking-Bad.jpg',
  },
  {
    id: 102,
    title: 'Dark',
    type: 'series',
    image: './assets/series/dark.webp',
  },
  {
    id: 103,
    title: 'Stranger Things',
    type: 'series',
    image: './assets/series/stranger-things.webp',
  },
  {
    id: 104,
    title: 'House',
    type: 'series',
    image: './assets/series/house.jpg',
  },
  {
    id: 105,
    title: 'Better Call Saul',
    type: 'series',
    image: './assets/series/better-call-saul.jpg',
  },
  {
    id: 106,
    title: 'Game Of Thrones',
    type: 'series',
    image: './assets/series/game-of-thrones.webp',
  },
  {
    id: 107,
    title: 'The Office',
    type: 'series',
    image: './assets/series/the-office.jpg',
  },
  {
    id: 108,
    title: 'Dexter',
    type: 'series',
    image: './assets/series/dexter.avif',
  },
];

// Contenedores
const moviesContainer = document.getElementById('movies');
const seriesContainer = document.getElementById('series');

catalog.forEach((item) => {
  const card = document.createElement('div');
  card.classList.add('catalog-card');

  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.title;
  img.classList.add('catalog-img');

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');

  const title = document.createElement('p');
  title.innerText = item.title;
  title.classList.add('card-title');

  const favBtn = document.createElement('i');
  favBtn.classList.add('bi', 'bi-heart', 'catalog-fav');
  favBtn.style.cursor = 'pointer';

  const favs = currentProfile.favorites || {};
  if (favs[item.id]) favBtn.classList.replace('bi-heart', 'bi-heart-fill');

  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (favs[item.id]) {
      delete favs[item.id];
      favBtn.classList.replace('bi-heart-fill', 'bi-heart');
    } else {
      favs[item.id] = item;
      favBtn.classList.replace('bi-heart', 'bi-heart-fill');
    }

    currentProfile.favorites = favs;
    sessionStorage.setItem('currentProfile', JSON.stringify(currentProfile));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((u) => u.email === currentUser.email);
    if (userIndex > -1) {
      const profileIndex = users[userIndex].profiles.findIndex(
        (p) => p.id === currentProfile.id
      );
      users[userIndex].profiles[profileIndex] = currentProfile;
      localStorage.setItem('users', JSON.stringify(users));
    }
  });

  titleContainer.appendChild(title);
  titleContainer.appendChild(favBtn);

  card.appendChild(img);
  card.appendChild(titleContainer);

  card.addEventListener('click', () => alert(item.title));

  if (item.type === 'movie') moviesContainer.appendChild(card);
  else seriesContainer.appendChild(card);
});

const favoritesBtn = document.getElementById('favorites-btn');

favoritesBtn.addEventListener('click', () => {
  const favs = currentProfile.favorites || {};
  const allCards = document.querySelectorAll('.catalog-card');

  allCards.forEach((card) => {
    const title = card.querySelector('.card-title').innerText;
    const itemId = catalog.find((i) => i.title === title).id;

    if (favs[itemId]) {
      card.style.display = 'flex'; // mostrar solo favoritos
    } else {
      card.style.display = 'none';
    }
  });
});
