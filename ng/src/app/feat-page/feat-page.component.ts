import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormatterService } from "../services/formatter.service";
import { DropdownComponent } from "../dropdown/dropdown.component";
import * as defs from "../app.definitions";

@Component({
  selector: "app-feat-page",
  imports: [DropdownComponent, HeaderComponent, MatProgressSpinnerModule],
  templateUrl: "./feat-page.component.html",
  styleUrl: "./feat-page.component.css",
})
export class FeatPageComponent {
  featName = "";
  feat?: defs.Feat;
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  snackbar = inject(MatSnackBar);
  format = inject(FormatterService);
  featLoading = true;

  loadFeat(featId: string) {
    this.featLoading = true;
    this.http.get("/api/feats/" + encodeURIComponent(featId)).subscribe({
      next: (res: any) => {
        this.feat = res;
        this.featLoading = false;
      },
      error: (res: any) => {
        this.snackbar.open(res.error.error, "Dismiss");
        this.featLoading = false;
      },
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((map) => {
      let featId = map.get("id");
      if (!featId) {
        this.snackbar.open("feat ID not found", "Dismiss");
      } else {
        this.loadFeat(featId);
      }
    });
  }
}
