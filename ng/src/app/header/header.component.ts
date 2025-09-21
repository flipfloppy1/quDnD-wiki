import { Component, inject, input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  title = input("");
  subtitle = input("");
  router = inject(Router);

  navigateHome() {
    this.router.navigateByUrl("/");
  }
}
