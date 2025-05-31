import storage from '../redux/store'; // Import your existing storage instance

export async function getAccessToken() {
  const tokens = await storage.get('tokens');
  // console.log(tokens);
  return tokens ? tokens.access : null; // Extract the access token (or null if not found)
}