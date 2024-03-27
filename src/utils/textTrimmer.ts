export const shortText = (text: string, lenght: number = 3) => {
  let parts = text.split(",");
  if (parts.length >= lenght) {
    parts = parts.slice(0, lenght);
    parts = parts.map((part) => part.trim().replace("Provincia de", "").trim());
    if (parts.join(", ").trim().length > 40) {
      return parts.join(", ").trim().slice(0, 40) + "....";
    }
    return parts.join(", ").trim();
  } else {
    return text;
  }
};
