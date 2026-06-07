let naudastxt = document.getElementById("Nauda");
let pogas = document.querySelectorAll(".Veikals button");
let rebirthPoga = document.getElementById("rebirthbtn");
let rebirthSkaits = document.getElementById("rebirthCount");
let bonusaTxt = document.getElementById("bonusText");
let kārtis = document.querySelectorAll(".card");

let pirmaKārts = null;
let otraKārts = null;
let nevarSpiest = false;

let rebirthi = 0;
let rebirthBonus = 1;
let reizinātājs = 1;


let money = Number(localStorage.getItem("money")) || 0;
rebirthi = Number(localStorage.getItem("rebirths")) || 0;
rebirthBonus = Number(localStorage.getItem("rebirthBonus")) || 1;

naudastxt.textContent = money;
rebirthSkaits.textContent = rebirthi;
bonusaTxt.textContent = rebirthBonus + "x";


let bildes = [
  "images/IMG_1896.jpeg", "images/IMG_1896.jpeg",
  "images/IMG_1897.jpeg", "images/IMG_1897.jpeg",
  "images/IMG_4141.jpeg", "images/IMG_4141.jpeg",
  "images/IMG_4142.jpeg", "images/IMG_4142.jpeg",
  "images/IMG_4143.jpeg", "images/IMG_4143.jpeg",
  "images/IMG_4144.jpeg", "images/IMG_4144.jpeg",
  "images/IMG_4145.jpeg", "images/IMG_4145.jpeg",
  "images/IMG_4146.jpeg", "images/IMG_4146.jpeg",
  "images/IMG_4147.jpeg", "images/IMG_4147.jpeg",
  "images/IMG_4148.jpeg", "images/IMG_4148.jpeg",
  "images/IMG_4149.jpeg", "images/IMG_4149.jpeg",
  "images/IMG_4150.jpeg", "images/IMG_4150.jpeg",
  "images/IMG_4151.jpeg", "images/IMG_4151.jpeg",
  "images/IMG_4152.jpeg", "images/IMG_4152.jpeg",
  "images/IMG_4154.jpeg", "images/IMG_4154.jpeg"
];

bildes.sort(function() { return Math.random() - 0.5 });


kārtis.forEach(function(kārts, i) {
  let img = kārts.querySelector("img");
  kārts.dataset.image = bildes[i];
  img.src = bildes[i];

  kārts.addEventListener("click", function() {
    if (nevarSpiest == true) return;
    if (this == pirmaKārts) return;
    if (this.classList.contains("matched")) return;

    this.classList.add("show");

    if (pirmaKārts == null) {
      pirmaKārts = this;
    } else {
      otraKārts = this;
      nevarSpiest = true;

      
      if (pirmaKārts.dataset.image == otraKārts.dataset.image) {
        money = money + (10 * reizinātājs * rebirthBonus);
        naudastxt.textContent = money;
        localStorage.setItem("money", money);

        pirmaKārts.classList.add("matched");
        otraKārts.classList.add("matched");

     let uzminētās = document.querySelectorAll(".matched");
        if (uzminētās.length == kārtis.length) {
          alert("Visas kārtis atrastas!");
          
      kārtis.forEach(function(k) {
            k.classList.remove("matched");
            k.classList.remove("show");
          });

          bildes.sort(function() { return Math.random() - 0.5 });
          kārtis.forEach(function(k, index) {
            k.dataset.image = bildes[index];
            k.querySelector("img").src = bildes[index];
          });
        }

        pirmaKārts = null;
        otraKārts = null;
        nevarSpiest = false;
      } else {
        
        setTimeout(function() {
          pirmaKārts.classList.remove("show");
          otraKārts.classList.remove("show");
          pirmaKārts = null;
          otraKārts = null;
          nevarSpiest = false;
        }, 800);
      }
    }
  });
});


pogas[0].addEventListener("click", function() {
  if (money >= 50) {
    money = money - 50;
    reizinātājs = 1.5;
    naudastxt.textContent = money;
    this.innerText = "1.5x Nopirkts";
    localStorage.setItem("money", money);
  }
});

pogas[1].addEventListener("click", function() {
  if (money >= 100) {
    money = money - 100;
    naudastxt.textContent = money;
    this.innerText = "AUTO ON";

    setInterval(function() {
      money = money + 1;
      naudastxt.textContent = money;
      localStorage.setItem("money", money);
    }, 2000);
  }
});

pogas[2].addEventListener("click", function() {
  if (money >= 150) {
    money = money - 150;
    let vecaisReizinātājs = reizinātājs;
    reizinātājs = 2;
    this.innerText = "BOOST ON";

    setTimeout(function() {
      reizinātājs = vecaisReizinātājs;
      pogas[2].innerText = "2X BOOST";
    }, 10000);

    localStorage.setItem("money", money);
  }
});


rebirthPoga.addEventListener("click", function() {
  if (money >= 1000) {
    rebirthi = rebirthi + 1;
    money = 0;
    rebirthBonus = rebirthBonus + 0.25;

    naudastxt.textContent = money;
    rebirthSkaits.textContent = rebirthi;
    bonusaTxt.textContent = rebirthBonus + "x";

    localStorage.setItem("money", money);
    localStorage.setItem("rebirths", rebirthi);
    localStorage.setItem("rebirthBonus", rebirthBonus);

    alert("Rebirth veiksmīgs!");
  } else {
    alert("Nepieciešami 1000$!");
  }
});