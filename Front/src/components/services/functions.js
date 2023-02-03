import { Link } from "react-router-dom";

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function getHashtags(text) {
  let hashtags = [];

  const text_in_caracteres = [];
  for (let i = 0; i < text.length ? text.length: 0 ; i++) {
    text_in_caracteres.push(text[i]);
  }

  for (let i = 0; i < text_in_caracteres.length; i++) {
    let newHashtag = [];
    if (text_in_caracteres[i] === "#") {
      let count = 1;
      while (true) {
        if (
          text_in_caracteres[i + count] === " " ||
          text_in_caracteres[i + count] === "#" ||
          i + count === text_in_caracteres.length
        ) {
          break;
        }

        newHashtag.push(text_in_caracteres[i + count]);
        count++;
      }

      let aux = newHashtag.join("");
      hashtags.push(aux);
    }
  }

  return hashtags.filter((item) => item !== "");
}

export function insert_style_in_hashtags(text, hashtags) {
  const text_in_caracteres = [];
  for (let i = 0; i < text.length; i++) {
    text_in_caracteres.push(text[i]);
  }

  let indexPositions = [];
  for (let i = 0; i < text_in_caracteres.length; i++) {
    if (text_in_caracteres[i] === "#") {
      indexPositions.push(i);
      let count = 1;
      while (true) {
        if (
          text_in_caracteres[i + count] === " " ||
          text_in_caracteres[i + count] === "#" ||
          i + count === text_in_caracteres.length
        ) {
          indexPositions.push(i + count);
          break;
        }

        count++;
      }
    }
  }

  let index_hashtag = 0;
  for (let j = 0; j < indexPositions.length; j++) {
    if (j % 2 === 0) {
      text_in_caracteres.splice(
        indexPositions[j],
        0,
        `<a href=/hashtag/${hashtags[index_hashtag]}>`
      );
      index_hashtag++;
    } else if (j % 2 === 1) {
      text_in_caracteres.splice(indexPositions[j], 0, "</a>");
    }
    indexPositions = indexPositions.map((item) => (item += 1));
  }

  return text_in_caracteres.join("");
}
