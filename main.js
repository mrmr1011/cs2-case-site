let balance = 100;
let inventory = [];

const balanceSpan = document.getElementById("balance");
const casesDiv = document.getElementById("cases");
const roulette = document.getElementById("roulette");
const inventoryDiv = document.getElementById("inventory");
const upgradeInventory = document.getElementById("upgradeInventory");
const battleResult = document.getElementById("battleResult");

function updateBalance(){
  balanceSpan.innerText = balance;
}

function showPage(page){
  document.getElementById("casesPage").classList.add("hidden");
  document.getElementById("inventoryPage").classList.add("hidden");
  document.getElementById("upgradePage").classList.add("hidden");
  document.getElementById("battlePage").classList.add("hidden");
  document.getElementById(page+"Page").classList.remove("hidden");
}

function renderCases(){
  casesDiv.innerHTML="";
  cases.forEach((c,i) => {
    const div = document.createElement("div");
    div.className = "case";
    div.innerHTML = `
      <h3>${c.name}</h3>
      <p>Price: $${c.price}</p>
      <button onclick="openCase(${i})">Open</button>
    `;
    casesDiv.appendChild(div);
  });
}
renderCases();

function openCase(index){
  const selected = cases[index];
  if(balance < selected.price){
    alert("Yeterli bakiye yok!");
    return;
  }
  balance -= selected.price;
  updateBalance();

  roulette.innerHTML="";
  let items = [];
  for(let i=0; i<25; i++){
    const randItem = selected.items[Math.floor(Math.random() * selected.items.length)];
    items.push(randItem);
    const div = document.createElement("div");
    div.className = "slotItem";
    div.innerHTML = `<img src="${randItem.img}"><p class="${randItem.rarity}">${randItem.name}</p>`;
    roulette.appendChild(div);
  }

  const winner = selected.items[Math.floor(Math.random() * selected.items.length)];
  const divWin = document.createElement("div");
  divWin.className="slotItem";
  divWin.innerHTML = `<img src="${winner.img}"><p class="${winner.rarity}">${winner.name}</p>`;
  roulette.appendChild(divWin);

  const totalWidth = roulette.scrollWidth;
  const viewport = roulette.parentElement.offsetWidth;
  const offset = (totalWidth - viewport)/2;
  roulette.style.transform = `translateX(-${offset}px)`;

  setTimeout(()=>{
    addToInventory(winner);
  },4000);
}

function addToInventory(item){
  inventory.push(item);
  renderInventory();
}

function renderInventory(){
  inventoryDiv.innerHTML="";
  upgradeInventory.innerHTML="";
  inventory.forEach((item) => {
    const div = document.createElement("div");
    div.className="item";
    div.innerHTML = `<img src="${item.img}"><br>${item.name}<br><span class="${item.rarity}">${item.rarity}</span>`;
    inventoryDiv.appendChild(div);

    const upg = div.cloneNode(true);
    upgradeInventory.appendChild(upg);
  });
}

function upgrade(){
  if(inventory.length < 1) return;
  if(Math.random() < 0.5){
    alert("Upgrade başarısız!");
  } else {
    alert("Upgrade başarılı!");
  }
}

function startBattle(){
  if(inventory.length < 1){
    alert("Inventory boş!");
    return;
  }
  const win = Math.random() < 0.5;
  if(win){
    balance += 20;
    battleResult.innerHTML="<p style='color:green;'>Kazandın +$20</p>";
  } else {
    balance -= 20;
    battleResult.innerHTML="<p style='color:red;'>Kaybettin -$20</p>";
  }
  updateBalance();
}