import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "quDnD-wiki";
  router = inject(Router);
  ngOnInit() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape" && this.router.url !== "/") {
        this.router.navigateByUrl("/");
      }
    });
  }
}
