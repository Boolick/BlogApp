export function ShufflePosts(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 1; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
 
