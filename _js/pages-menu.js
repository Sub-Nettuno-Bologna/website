import { on } from "nanof";

export default function($) {
  on($(".with-children"), "click", ({ target }) => {
    if (target.classList.contains("open")) {
      target.classList.remove("open");
    } else {
      target.classList.add("open");
    }
  });
}
