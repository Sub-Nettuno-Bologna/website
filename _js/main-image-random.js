const random = list => list[Math.floor(Math.random() * list.length)];

export default function($, element) {
  const images = JSON.parse(element.getAttribute("data-images"));
  const image = random(images);
  element.style.backgroundImage = `url(${image})`;
}
