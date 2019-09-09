import { on, addClass } from "nanof";
import { session } from "./storage";

const ACK_KEY = "cookie-acknowledge";

export default function($, element) {
  const ack = session.getItem(ACK_KEY);
  console.log("we", session);
  if (ack !== "true") {
    addClass(element, "active open");
    on($('[data-js="ack"]'), "click", () => {
      session.setItem(ACK_KEY, "true");
      addClass(element, "closed");
    });
  }
}
