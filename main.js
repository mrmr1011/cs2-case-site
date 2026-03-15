let balance=100
let inventory=[]

const casesDiv=document.getElementById("cases")

cases.forEach((c,i)=>{
let div=document.createElement("div")
div.className="case"
div.innerHTML="<h3>"+c.name+"</h3><p>$"+c.price+"</p><button onclick='openCase("+i+")'>Open</button>"
casesDiv.appendChild(div)
})

function openCase(i){
let c=cases[i]
if(balance<c.price){alert("No balance");return}
balance-=c.price;updateBalance()
let win=getRandomItem(c)
spin(win,c)
}

function getRandomItem(c){
let roll=Math.random()*100
let cumulative=0
for(let item of c.items){
cumulative+=item.chance
if(roll<=cumulative){return item}
}
}

function spin(win,c){
const roulette=document.getElementById("roulette")
roulette.innerHTML=""
let items=[]
for(let i=0;i<40;i++){items.push(c.items[Math.floor(Math.random()*c.items.length)])}
items.push(win)
items.forEach(item=>{
let div=document.createElement("div")
div.className="slotItem"
div.innerHTML="<img src='"+item.image+"'><p>"+item.name+"</p>"
roulette.appendChild(div)
})
let offset=(items.length-1)*160
roulette.style.transition="transform 4s cubic-bezier(.08,.6,0,1)"
roulette.style.transform="translateX(-"+offset+"px)"
setTimeout(()=>{addItem(win)},4000)
}

function addItem(item){inventory.push(item);renderInventory()}

function renderInventory(){
const inv=document.getElementById("inventory")
inv.innerHTML=""
inventory.forEach((item,i)=>{
let div=document.createElement("div")
div.className="item "+item.rarity
div.innerHTML=item.name+" ($"+item.value+")"+" <button onclick='sell("+i+")'>Sell</button>"
inv.appendChild(div)
})
}

function sell(i){balance+=inventory[i].value;inventory.splice(i,1);renderInventory();updateBalance()}
function updateBalance(){document.getElementById("balance").innerText=balance}

function upgrade(){
if(inventory.length==0)return
let item=inventory.pop()
if(Math.random()<0.5){balance+=item.value*2;alert("Upgrade success!")}
else{alert("Upgrade failed")}
renderInventory();updateBalance()
}

function startBattle(){
let result=Math.random()
const div=document.getElementById("battleResult")
if(result>0.5){balance+=20;div.innerText="You won battle +$20"}
else{div.innerText="Bot won"}
updateBalance()
}

function showPage(page){
document.getElementById("casesPage").classList.add("hidden")
document.getElementById("upgradePage").classList.add("hidden")
document.getElementById("battlePage").classList.add("hidden")
document.getElementById(page+"Page").classList.remove("hidden")
}