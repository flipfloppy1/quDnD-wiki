import { inject, Injectable } from "@angular/core";
import { Mutation } from "../app.definitions";
import { Observable, Subscriber } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MutationsService {
  private http = inject(HttpClient);
  private mutations: Mutation[] = [];
  private checkMutations(): Observable<void> {
    return new Observable<void>((subscriber: Subscriber<void>) => {
      if (this.mutations.length) {
        subscriber.next();
        subscriber.complete();
        return;
      }
      this.http.get("/api/mutations").subscribe((data: any) => {
        this.mutations = data.mutations as Mutation[];
        subscriber.next();
        subscriber.complete();
      });
    });
  }

  getMutation(mutationId: string): Observable<Mutation> {
    return new Observable<Mutation>((subscriber: Subscriber<Mutation>) => {
      this.checkMutations().subscribe(() => {
        let mutation = this.mutations.filter((val) => {
          return val.id === mutationId;
        })[0];
        if (!mutation) {
          subscriber.error();
          subscriber.complete();
          return;
        } else {
          subscriber.next(mutation);
          subscriber.complete();
        }
      });
    });
  }

  getIncompatibilities(mutationId: string): Observable<Mutation[]> {
    return new Observable<Mutation[]>((subscriber: Subscriber<Mutation[]>) => {
      this.checkMutations().subscribe(() => {
        let incompatibilities = this.mutations.filter((val) => {
          return val.incompatibilities.includes(mutationId);
        });
        subscriber.next(incompatibilities);
        subscriber.complete();
      });
    });
  }

  constructor() {}
}
