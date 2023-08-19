import "./style.css";
import { setupNotes } from "./notes.ts";
import { $el } from "./utils.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="main">
    <div class="mosaic-container">
      <div class="mosaic-tile blue"></div>
      <div class="mosaic-tile black"></div>
      <div class="mosaic-tile black"></div>
      <div class="mosaic-tile blue"></div>
    </div>
    <h1>NoteMosaic</h1>
    <div id="notes"></div>
  </div>
`;

setupNotes($el<HTMLDivElement>("#notes")!);
