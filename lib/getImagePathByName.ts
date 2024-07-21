export default function getImagePath(authorName: string) {
  const translatedName = authorName
    .toLowerCase()
    .replaceAll("а", "a")
    .replaceAll("б", "b")
    .replaceAll("в", "v")
    .replaceAll("г", "g")
    .replaceAll("д", "d")
    .replaceAll("е", "e")
    .replaceAll("ж", "zh")
    .replaceAll("з", "z")
    .replaceAll("и", "i")
    .replaceAll("й", "y")
    .replaceAll("к", "k")
    .replaceAll("л", "l")
    .replaceAll("м", "m")
    .replaceAll("н", "n")
    .replaceAll("о", "o")
    .replaceAll("п", "p")
    .replaceAll("р", "r")
    .replaceAll("с", "s")
    .replaceAll("т", "t")
    .replaceAll("у", "u")
    .replaceAll("ф", "f")
    .replaceAll("х", "h")
    .replaceAll("ц", "ts")
    .replaceAll("ч", "ch")
    .replaceAll("ш", "sh")
    .replaceAll("щ", "sht")
    .replaceAll("ъ", "y")
    .replaceAll("ь", "y")
    .replaceAll("ю", "yu")
    .replaceAll("я", "ya")
    .replaceAll(" ", "-");

  console.log(translatedName);

  return `/authors/${translatedName}.jpg`;
}
