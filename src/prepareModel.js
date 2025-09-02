export async function readFile() {
  const response = await fetch('./datasets/data.txt');
  const text = await response.text();
  return text;
}