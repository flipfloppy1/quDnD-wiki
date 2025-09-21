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
    title: "quDnD Wiki | Home",
  },
  {
    path: "skill/:id",
    component: SkillPageComponent,
    title: "quDnD Wiki | Skills",
  },
  {
    path: "mutation/:id",
    component: MutationPageComponent,
    title: "quDnD Wiki | Mutations",
  },
  {
    path: "cybernetic/:id",
    component: CyberneticPageComponent,
    title: "quDnD Wiki | Cybernetics",
  },
  {
    path: "concept/:id",
    component: ConceptPageComponent,
    title: "quDnD Wiki | Concepts",
  },
];
