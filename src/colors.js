const colors = {
  green: "#69D639",
  blue: "#03A9FF",
  purple: "#9356F3",
  pink: "#F779A3",
  red: "#E75E75",
  orange: "#F79963"
};

export const typeColors = {
  normal: "A8A77A",
  fire: "EE8130",
  water: "6390F0",
  electric: "F7D02C",
  grass: "7AC74C",
  ice: "96D9D6",
  fighting: "C22E28",
  poison: "A33EA1",
  ground: "E2BF65",
  flying: "A98FF3",
  psychic: "F95587",
  bug: "A6B91A",
  rock: "B6A136",
  ghost: "735797",
  dragon: "6F35FC",
  dark: "705746",
  steel: "B7B7CE",
  fairy: "D685AD"
};

export const getColor = (type) => {
  switch (type) {
    case "hp":
      return colors.red;
    case "attack":
      return colors.orange;
    case "defense":
      return colors.purple;
    case "special-attack":
      return colors.blue;
    case "special-defense":
      return colors.green;
    case "speed":
      return colors.pink;
    default:
      return "#fff";
  }
};