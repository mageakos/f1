import {
  Component,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from "@angular/core";
import { MyLib } from "../../classes/myLib";

@Component({
  selector: "app-label",
  templateUrl: "./label.component.html",
  styleUrls: ["./label.component.scss"]
})
export class LabelComponent implements OnInit, OnChanges {
  @Input() data = "title";
  @Input() label: string;
  @Input() format: string;
  @Input() mode = "view"; //default mode is view
  @Input() id: string;
  @Output() dataUpdated = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {}

  modelChanged(eventData) {
    this.dataUpdated.emit(eventData.target.value);
  }

  getId() {
    this.id = this.id || MyLib.valid.getId();
    return this.id;
  }
}
