let cases = [
  {name:"Kilowatt Case", price:5, items:[]},
  {name:"Revolution Case", price:6, items:[]},
  {name:"Spectrum Case", price:7, items:[]}
];

async function initializeCases() {
  const allSkins = await fetchAllSkins();
  const filteredSkins = allSkins.filter(s => ["Covert","Classified","Restricted","Mil-Spec"].includes(s.rarity));

  cases.forEach(c => {
    c.items = [];
    for(let i=0;i<15;i++){
      const skin = filteredSkins[Math.floor(Math.random()*filteredSkins.length)];
      c.items.push({
        name: skin.name,
        rarity: skin.rarity.toLowerCase(),
        value: Math.floor(Math.random()*100)+5,
        img: getSkinImageUrl(skin.imageid)
      });
    }
  });
}