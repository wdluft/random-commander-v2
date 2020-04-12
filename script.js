const img = document.querySelector('.cardInfo__img');
const name = document.querySelector('.cardDetails__name');
const type = document.querySelector('.cardDetails__type');
const manacost = document.querySelector('.cardDetails__cost');
const colorId = document.querySelector('.cardDetails__colorId');
const oracleP = document.querySelector('.cardDetails__oracleTextP');
const oracleBtn = document.querySelector('.cardDetails__oracleTextBtn');
const edhRec = document.querySelector('.cardDetails__edhRec');
const randomBtn = document.querySelector('.cardDetails__randomCardBtn');
const SCRYFALL_URL = 'https://api.scryfall.com/cards/random?q=is%3Acommander';
const showHTML = `
  Show Oracle Text
  <svg width="10" height="10" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.70711 5.70711C1.31658 6.09763 0.683418 6.09763 0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289L4.29289 0.292893C4.68342 -0.0976311 5.31658 -0.0976311 5.70711 0.292893L9.70711 4.29289C10.0976 4.68342 10.0976 5.31658 9.70711 5.70711C9.31658 6.09763 8.68342 6.09763 8.29289 5.70711L5 2.41421L1.70711 5.70711Z"/>
  </svg>
`;
const hideHTML = `
  Hide Oracle Text
  <svg width="10" height="10" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 0.292893C8.68342 -0.0976311 9.31658 -0.0976311 9.70711 0.292893C10.0976 0.683418 10.0976 1.31658 9.70711 1.70711L5.70711 5.70711C5.31658 6.09763 4.68342 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L5 3.58579L8.29289 0.292893Z"/>
  </svg>
`;

// Display promise errors
const handleErrors = (err) => {
  console.log('Oh no, something went wrong!');
  console.log(err);
};

const fetchCard = async () => {
  const res = await fetch(SCRYFALL_URL);
  const data = await res.json();
  return data;
};

// If card is not legal, get new card
const checkCommanderLegality = (card) => {
  if (card.legalities.commander === 'not_legal') {
    getNewCard();
  }
};

const showCard = async (card) => {
  img.src = card.image_uris.png;
  // img.src = card.image_uris.border_crop;
  name.textContent = card.name;
  type.textContent = card.type_line;
  manacost.textContent = `Casting Cost: ${card.mana_cost}`;
  colorId.textContent = `Color Id: ${card.color_identity.join('')}`;
  oracleP.textContent = card.oracle_text;
  edhRec.href = card.related_uris.edhrec;
};

const getNewCard = async () => {
  const newCard = await fetchCard().catch(handleErrors);
  checkCommanderLegality(newCard);
  showCard(newCard);
};

// Toggle whether the card's updated rules text is displayed
const showOracleText = () => {
  if (!oracleP.classList.contains('cardDetails__oracleTextP--show')) {
    oracleBtn.innerHTML = hideHTML;
  } else {
    oracleBtn.innerHTML = showHTML;
  }
  oracleP.classList.toggle('cardDetails__oracleTextP--show');
};

randomBtn.addEventListener('click', getNewCard);
oracleBtn.addEventListener('click', showOracleText);

getNewCard();
