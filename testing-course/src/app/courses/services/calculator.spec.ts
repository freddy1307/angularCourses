import {TestBed} from "@angular/core/testing";
import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";

describe('Calculator Service', () => {

  let calculator: CalculatorService,
      loggerSpy: any;

  beforeEach(() => {

    loggerSpy = jasmine.createSpyObj('LoggerService', ['log'])

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    })
    calculator = TestBed.get(CalculatorService)
  })

  it('should add numbers', () => {
    const rest = calculator.add(2, 2);
    expect(rest).toBe(4)
    expect(loggerSpy.log).toHaveBeenCalledTimes(1)
  })

  it('should subtract numbers', () => {
    const rest = calculator.subtract(2, 2);
    expect(rest).toBe(0)
    expect(loggerSpy.log).toHaveBeenCalledTimes(1)
  })

});
