import { Subject } from "rxjs";

export class AlertService {

    showAlert = new Subject<{submitted: boolean, msg: string}>();



}