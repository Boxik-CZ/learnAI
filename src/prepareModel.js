export async function readFile(path) {
  const response = await fetch(path);
  const text = await response.text();
  return text;
}

export async function getDataset(path) {
  const text = await readFile(path);
  console.log(text);
  const lines = text.trim().split("\n");
  if (lines.length < 2) throw new Error("Soubor musí mít alespoň dva řádky");

  const parseLine = (line) =>
    line.split(";").map(part =>
      part.split(",").map(num => parseInt(num))
    );

  const x = parseLine(lines[0]);
  const y = parseLine(lines[1]);

  return [x, y];
}
