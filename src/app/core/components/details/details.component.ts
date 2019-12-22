import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { MyLib } from "../../classes/myLib";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  @Input() id: string;
  @Input() actions: any;
  @Input() entityData: any;
  @Input() mode: string; // View || Edit || Add

  constructor() {}

  ngOnInit() {}

  dataChanged(e) {
    return e;
  }

  getId() {
    this.id = this.id || MyLib.valid.getId();
    return this.id;
  }
}
