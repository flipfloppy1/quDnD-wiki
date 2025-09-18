import { Injectable } from "@angular/core";
import { DiceRoll } from "../app.definitions";

@Injectable({
  providedIn: "root",
})
export class FormatterService {
  constructor() {}

  statOffset(stat: string): string {
    let statNum = Number(stat);
    if (Number.isNaN(statNum)) {
      return stat;
    }

    if (statNum < 0) {
      return "-" + stat;
    }

    return "+" + stat;
  }

  diceRoll(dice: DiceRoll): string {
    let formatted = "";
    for (let i = 0; i < dice.dice.length; i++) {
      if (i < dice.dice.length - 1) {
        formatted += dice.dice[i] + " + ";
      } else {
        formatted += dice.dice[i];
      }
    }

    if (dice.statBonus != "none") {
      formatted += " + " + dice.statBonus;
    }

    if (dice.offset < 0) {
      if (formatted.length) formatted += " - " + Math.abs(dice.offset);
      else formatted += "-" + Math.abs(dice.offset);
    } else if (dice.offset > 0) {
      if (formatted.length) formatted += " + " + dice.offset;
      else formatted += dice.offset;
    }

    return formatted;
  }
}
