import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { Mutation } from "../app.definitions";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormatterService } from "../services/formatter.service";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { MutationsService } from "../services/mutations.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-mutation-page",
  imports: [DropdownComponent, MatProgressSpinnerModule, HeaderComponent],
  templateUrl: "./mutation-page.component.html",
  styleUrl: "./mutation-page.component.css",
})
export class MutationPageComponent {
  mutation?: Mutation;
  route = inject(ActivatedRoute);
  router = inject(Router);
  title = inject(Title);
  mutations = inject(MutationsService);
  format = inject(FormatterService);
  incompatibilities: Mutation[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let mutationId = params.get("id") as string;
      this.mutations.getMutation(mutationId).subscribe((mutation) => {
        this.title.setTitle("quDnD | " + mutation.name);
        this.mutation = mutation;
        this.mutation.name = this.format.capitalize(this.mutation.name);
        this.mutations
          .getIncompatibilities(mutationId)
          .subscribe((incompat) => {
            this.incompatibilities = incompat;
          });
      });
    });
  }
}
