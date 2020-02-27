export default function shuffleArray(arr) {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * i);
    const temp = shuffled[rand];
    shuffled[rand] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled;
}
