import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { FeatPageComponent } from "./feat-page/feat-page.component";
import { MutationPageComponent } from "./mutation-page/mutation-page.component";
import { CyberneticPageComponent } from "./cybernetic-page/cybernetic-page.component";

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    title: "quDnD Wiki | Home",
  },
  {
    path: "feat/:id",
    component: FeatPageComponent,
    title: "quDnD Wiki | Feats",
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
];
