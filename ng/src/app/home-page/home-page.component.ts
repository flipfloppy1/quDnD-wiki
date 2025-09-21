import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Skill, Mutation } from "../app.definitions";

@Component({
  selector: "app-home-page",
  imports: [CommonModule, HeaderComponent, MatProgressSpinnerModule],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
  skillsLoading: boolean = true;
  skillsError = "";
  skills: Skill[] = [];
  mutationsLoading: boolean = true;
  mutationsError = "";
  mutations: Mutation[] = [];
  router = inject(Router);
  http = inject(HttpClient);

  getSkills() {
    this.skillsLoading = true;
    this.http.get("/api/skills").subscribe({
      next: (resp: any) => {
        this.skills = resp.skills;
        this.skillsLoading = false;
      },
      error: (resp: any) => {
        this.skillsError = resp.error.error;
        this.skillsLoading = false;
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
    this.getSkills();
    this.getMutations();
  }
}
