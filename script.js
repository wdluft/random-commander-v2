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

const fetchCard = async () => {
  const res = await fetch(SCRYFALL_URL);
  const data = await res.json();
  if (data.legalities.commander === 'not_legal') {
    getCard();
  }
  showCard(data);
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

const showOracleText = () => {
  oracleP.classList.toggle('cardInfo__oracleTextP--show');
};

randomBtn.addEventListener('click', fetchCard);
oracleBtn.addEventListener('click', showOracleText);
