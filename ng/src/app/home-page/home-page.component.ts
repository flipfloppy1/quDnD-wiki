import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home-page",
  imports: [CommonModule, HeaderComponent, MatProgressSpinnerModule],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
  featsLoading: boolean = true;
  featsError = "";
  feats: any;
  router = inject(Router);
  http = inject(HttpClient);

  getFeats() {
    this.featsLoading = true;
    this.http.get("/api/feats").subscribe({
      next: (resp: any) => {
        this.feats = resp.feats;
        this.featsLoading = false;
      },
      error: (resp: any) => {
        this.featsError = resp.error.error;
        this.featsLoading = false;
      },
    });
  }

  ngOnInit() {
    this.getFeats();
  }
}
