import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { Mutation } from "../app.definitions";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormatterService } from "../services/formatter.service";
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: "app-mutation-page",
  imports: [DropdownComponent, MatProgressSpinnerModule, HeaderComponent],
  templateUrl: "./mutation-page.component.html",
  styleUrl: "./mutation-page.component.css",
})
export class MutationPageComponent {
  mutation?: Mutation;
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  format = inject(FormatterService);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let mutationId = params.get("id") as string;
      this.http
        .get("/api/mutations/" + encodeURIComponent(mutationId))
        .subscribe({
          next: (resp) => {
            this.mutation = resp as Mutation;
          },
        });
    });
  }
}
