import { Component, EventEmitter, Input, Output } from '@angular/core';
import RoundeFinished from '../events/RoundFinished';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [],
  templateUrl: './row.component.html',
  styleUrl: './row.component.css'
})
export class RowComponent {
  
  @Input() row: number[] = [1, 0, -1];
  @Input() rowx: number = 0;
  @Output() roundValueEvent = new EventEmitter<RoundeFinished>();

  parse(r: number): string {
    if(r == 0) {
      return "O";
    }
    if(r == 1) {
      return "X";
    }
    return "";
  }
  putRoundValue(py: number) {
    this.roundValueEvent.emit({
      py,
    });
  }
}
