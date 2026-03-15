// skins-api.js
const SKINS_API_URL = "https://huggingface.co/datasets/While402/CounterStrike2Skins/resolve/main/output.jsonl";

async function fetchAllSkins() {
  try {
    const response = await fetch(SKINS_API_URL);
    const text = await response.text();
    
    // JSONL formatından array’e dönüştürme
    const lines = text.trim().split("\n");
    const skins = lines.map(line => JSON.parse(line));
    return skins;
  } catch (error) {
    console.error("Skin API fetch error:", error);
    return [];
  }
}

function getSkinImageUrl(imageid) {
  return `https://raw.githubusercontent.com/While402/CounterStrike2Skins/main/images/${imageid}.png`;
}