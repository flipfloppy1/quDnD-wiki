import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormatterService } from "../services/formatter.service";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { Title } from "@angular/platform-browser";
import * as defs from "../app.definitions";

@Component({
  selector: "app-skill-page",
  imports: [DropdownComponent, HeaderComponent, MatProgressSpinnerModule],
  templateUrl: "./skill-page.component.html",
  styleUrl: "./skill-page.component.css",
})
export class SkillPageComponent {
  skillName = "";
  skill?: defs.Skill;
  route = inject(ActivatedRoute);
  router = inject(Router)
  http = inject(HttpClient);
  title = inject(Title);
  snackbar = inject(MatSnackBar);
  format = inject(FormatterService);
  skillLoading = true;

  loadSkill(skillId: string) {
    this.skillLoading = true;
    this.http.get("/api/skills/" + encodeURIComponent(skillId)).subscribe({
      next: (res: any) => {
        this.skill = res;
        this.title.setTitle("quDnD | " + res.name);
        this.skillLoading = false;
      },
      error: (res: any) => {
        this.snackbar.open(res.error.error, "Dismiss");
        this.skillLoading = false;
      },
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((map) => {
      let skillId = map.get("id");
      if (!skillId) {
        this.snackbar.open("skill ID not found", "Dismiss");
      } else {
        this.loadSkill(skillId);
      }
    });
  }
}
