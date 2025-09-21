import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Skill, Mutation } from "../app.definitions";
import { Observable, Subscriber } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SkillsService {
  private http = inject(HttpClient);
  private skills: Skill[] = [];
  private checkSkills(): Observable<void> {
    return new Observable<void>((subscriber: Subscriber<void>) => {
      if (this.skills.length) {
        subscriber.next();
        subscriber.complete();
        return;
      }
      this.http.get("/api/skills").subscribe((data: any) => {
        this.skills = data.skills as Skill[];
        subscriber.next();
        subscriber.complete();
      });
    });
  }

  getSkill(skillId: string): Observable<Skill> {
    return new Observable<Skill>((subscriber: Subscriber<Skill>) => {
      this.checkSkills().subscribe(() => {
        let skill = this.skills.filter((val) => {
          return val.id === skillId;
        })[0];
        if (!skill) {
          subscriber.error();
          subscriber.complete();
          return;
        } else {
          subscriber.next(skill);
          subscriber.complete();
        }
      });
    });
  }

  getRequiredFor(skillId: string): Observable<Skill[]> {
    return new Observable<Skill[]>((subscriber: Subscriber<Skill[]>) => {
      this.checkSkills().subscribe(() => {
        let requiredFor = this.skills.filter((val) => {
          return val.prereqs.includes(skillId);
        });
        subscriber.next(requiredFor);
        subscriber.complete();
      });
    });
  }

  getPrereqs(skillId: string): Observable<Skill[]> {
    return new Observable<Skill[]>((subscriber: Subscriber<Skill[]>) => {
      this.getSkill(skillId).subscribe((skill) => {
        let prereqs = this.skills.filter((val) => {
          return skill.prereqs.includes(val.id);
        });
        subscriber.next(prereqs);
        subscriber.complete();
      });
    });
  }

  constructor() {}
}
