import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Feat, Mutation } from "../app.definitions";

@Component({
  selector: "app-home-page",
  imports: [CommonModule, HeaderComponent, MatProgressSpinnerModule],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
  featsLoading: boolean = true;
  featsError = "";
  feats: Feat[] = [];
  mutationsLoading: boolean = true;
  mutationsError = "";
  mutations: Mutation[] = [];
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

  getMutations() {
    this.mutationsLoading = true;
    this.http.get("/api/mutations").subscribe({
      next: (resp: any) => {
        this.mutations = resp.mutations;
        this.mutationsLoading = false;
      },
      error: (resp: any) => {
        this.mutationsError = resp.error.error;
        this.mutationsLoading = false;
      },
    });
  }

  mutationCat(cat: string): Mutation[] {
    return this.mutations.filter((val) => {
      return val.mutationCategory === cat;
    });
  }

  ngOnInit() {
    this.getFeats();
    this.getMutations();
  }
}
