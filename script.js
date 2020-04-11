const img = document.querySelector('.cardInfo__img');
const name = document.querySelector('.cardInfo__name');
const type = document.querySelector('.cardInfo__type');
const manacost = document.querySelector('.cardInfo__cost');
const colorId = document.querySelector('.cardInfo__colorId');
const oracleP = document.querySelector('.cardInfo__oracleTextP');
const oracleBtn = document.querySelector('.cardInfo__oracleTextBtn');
const edhRec = document.querySelector('.cardInfo__edhRec');
const randomBtn = document.querySelector('.cardInfo__randomCardBtn');
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
  img.src = card.image_uris.normal;
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
  oracleP.classList.toggle('cardInfo__oracleTextP--show');
};

randomBtn.addEventListener('click', getNewCard);
oracleBtn.addEventListener('click', showOracleText);

getNewCard();
