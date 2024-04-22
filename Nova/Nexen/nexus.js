import fetch from "node-fetch"

export async function tiktok(query) {
  try {
  let nexus = await fetch(`https://skizo.tech/api/tiktok?apikey=${skizo}&url=${query}`)
  let result = nexus.json()
  return result;
 } catch (error) {}
}
