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
  manacost.textContent = card.mana_cost;
  colorId.textContent = card.color_identity.join('');
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
    oracleBtn.textContent = 'Hide Oracle Text';
  } else {
    oracleBtn.textContent = 'Show Oracle Text';
  }
  oracleP.classList.toggle('cardDetails__oracleTextP--show');
};

randomBtn.addEventListener('click', getNewCard);
oracleBtn.addEventListener('click', showOracleText);

getNewCard();
