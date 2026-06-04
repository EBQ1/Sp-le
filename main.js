const moneyElement = document.getElementById("Nauda");
const buttons = document.querySelectorAll(".Veikals button");
const rebirthBtn = document.getElementById("rebirthbtn");
const rebirthCount = document.getElementById("rebirthCount");
const bonusText = document.getElementById("bonusText");




let rebirths = 0;
let rebirthBonus = 1;

let money = 0;
let multiplier = 1;


const cards = document.querySelectorAll(".card");
let firstCard = null;
let secondCard = null;
let lock = false;

const images = [
  "images/1.png", "images/1.png",
  "images/2.png", "images/2.png",
  "images/3.png", "images/3.png",
  "images/4.png", "images/4.png",
  "images/5.png", "images/5.png",
  "images/6.png", "images/6.png",
  "images/7.png", "images/7.png",
  "images/8.png", "images/8.png",
  "images/9.png", "images/9.png",
  "images/10.png", "images/10.png",
  "images/11.png", "images/11.png",
  "images/12.png", "images/12.png",
  "images/13.png", "images/13.png",
  "images/14.png", "images/14.png",
  "images/15.png", "images/15.png"
];

images.sort(() => Math.random() - 0.5);

cards.forEach((card, i) => {
  const img = card.querySelector("img");

  card.dataset.image = images[i];   

  img.src = images[i];              
         

  card.addEventListener("click", flip);
});

function flip() {
  if (lock) return;
  if (this === firstCard) return;
  if (this.classList.contains("matched")) return;

  this.classList.add("show");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lock = true;

  if (firstCard.dataset.image === secondCard.dataset.image) {
    money += 10 * multiplier * rebirthBonus;
    moneyElement.textContent = money;

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    reset();
  } else {
    setTimeout(() => {
     firstCard.classList.remove("show");
     secondCard.classList.remove("show");
      reset();
    }, 800);
  }
}

function reset() {
  firstCard = null;
  secondCard = null;
  lock = false;
}




buttons[0].addEventListener("click", () => {
  if (money >= 50) {
    money -= 50;
    multiplier = 1.5;
    moneyElement.textContent = money;
    buttons[0].innerText = "1.5x Nopirkts";
  }
});


buttons[1].addEventListener("click", () => {
  if (money >= 100) {
    money -= 100;
    moneyElement.textContent = money;

    setInterval(() => {
      money += 1;
      moneyElement.textContent = money;
    }, 2000);

    buttons[1].innerText = "AUTO ON";
  }
});


buttons[2].addEventListener("click", () => {
  if (money >= 150) {
    money -= 150;
    moneyElement.textContent = money;

    let old = multiplier;
    multiplier = 2;

    buttons[2].innerText = "BOOST ON";

    setTimeout(() => {
      multiplier = old;
      buttons[2].innerText = "2X BOOST";
    }, 10000);
  }
});

rebirthBtn.addEventListener("click", () => {

    if (money >= 1000) { 

        rebirths++;

        money = 0;
        moneyElement.textContent = money;

        rebirthBonus += 0.25;

        rebirthCount.textContent = rebirths;
        bonusText.textContent = rebirthBonus.toFixed(2) + "x";

        alert("Rebirth veiksmīgs!");
    } else {
        alert("Nepieciešami 1000$!");
    }

});