import { startImprimedCircuit } from "./imprimedCircuit.js";
import { loadHeaderScriptDirect } from "./header.js";

startImprimedCircuit(window.imprimedCircuitConfig);
loadHeaderScriptDirect();
const header = document.querySelector(".header");
if (header) {
  header.classList.add("visible");
}
