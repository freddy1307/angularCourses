export class LoggingService {
  printStatusLogMessage(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
