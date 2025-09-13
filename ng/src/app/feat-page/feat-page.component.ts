import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import * as defs from "../app.definitions";

@Component({
  selector: "app-feat-page",
  imports: [HeaderComponent, MatProgressSpinnerModule],
  templateUrl: "./feat-page.component.html",
  styleUrl: "./feat-page.component.css",
})
export class FeatPageComponent {
  featName = "";
  feat?: defs.Feat;
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  snackbar = inject(MatSnackBar);
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

  formatStatOffset(stat: string): string {
    let statNum = Number(stat);
    if (Number.isNaN(statNum)) {
      return stat;
    }

    if (statNum < 0) {
      return "-" + stat;
    }

    return "+" + stat;
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
