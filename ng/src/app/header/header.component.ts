import { Component, input } from "@angular/core";

@Component({
  selector: "app-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  title = input("");
  subtitle = input("");
}
