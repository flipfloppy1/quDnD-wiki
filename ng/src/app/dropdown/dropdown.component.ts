import { Component, model } from "@angular/core";

@Component({
  selector: "app-dropdown",
  imports: [],
  templateUrl: "./dropdown.component.html",
  styleUrl: "./dropdown.component.css",
})
export class DropdownComponent {
  open = model(false);

  toggle() {
    this.open.set(!this.open());
  }
}
