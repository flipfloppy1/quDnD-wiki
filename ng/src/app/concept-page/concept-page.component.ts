import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormatterService } from "../services/formatter.service";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-concept-page",
  imports: [HeaderComponent],
  templateUrl: "./concept-page.component.html",
  styleUrl: "./concept-page.component.css",
})
export class ConceptPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  format = inject(FormatterService);
  page = "";

  nav(loc: string) {
    this.router.navigateByUrl(loc);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let page = params.get("id");
      if (!page) {
        this.router.navigateByUrl("/");
      } else {
        this.page = page;
      }
    });
  }
}
