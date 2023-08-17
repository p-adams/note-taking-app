import "./style.css";
import { setupNotes } from "./notes.ts";
import { $el } from "./utils.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   
    <h1>NoteMosaic</h1>
    <div id="notes">
     
    </div>
    
  </div>
`;

setupNotes($el<HTMLDivElement>("#notes")!);
