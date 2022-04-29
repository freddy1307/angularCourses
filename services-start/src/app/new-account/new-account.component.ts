import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from "../logging.service";
import { AccountService } from "../account.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService, private accountService: AccountService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.onAccountAdded({ name: accountName, status: accountStatus});
    this.loggingService.printStatusLogMessage(status);
  }
}