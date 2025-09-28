import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { SkillPageComponent } from "./skill-page/skill-page.component";
import { MutationPageComponent } from "./mutation-page/mutation-page.component";
import { CyberneticPageComponent } from "./cybernetic-page/cybernetic-page.component";
import { ConceptPageComponent } from "./concept-page/concept-page.component";

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    title: "quDnD | Home",
  },
  {
    path: "skill/:id",
    component: SkillPageComponent,
  },
  {
    path: "mutation/:id",
    component: MutationPageComponent,
  },
  {
    path: "cybernetic/:id",
    component: CyberneticPageComponent,
  },
  {
    path: "concept/:id",
    component: ConceptPageComponent,
  },
];
