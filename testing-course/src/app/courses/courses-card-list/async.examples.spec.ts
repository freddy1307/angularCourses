import {fakeAsync, flush, flushMicrotasks, tick} from "@angular/core/testing";
import {delay} from "rxjs/operators";
import {of} from "rxjs";

describe('Async examples', () => {


  it('Using done() to validate async condition ', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done()
    }, 1000)
  });


  it('should validate async condition (setTimeout()) with fakeAsync and tick()', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000)

    //Using tick method you have to simulate the same time that the async operations takes.
    // In this example the async operation takes 1000 ms and I have to define 1000 ms using tick method to pass the tess.
    tick(500)
    tick(490)
    tick(10)

    expect(test).toBeTruthy();
  }));


  it('should validate async condition (setTimeout()) with fakeAsync and flush()', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000)
    flush();

    expect(test).toBeTruthy();
  }));


  it('should validate promise with fakeAsync', fakeAsync(() => {
    let test = false;

    Promise.resolve().then(() => {
      console.log("First promise finished")
      return Promise.resolve();
    }).then(() => {
      test = true;
      console.log("Second promise finished")
    });
    flushMicrotasks()

    expect(test).toBeTruthy();
  }));


  it('should validate promise with (setTimeout()) - fakeAsync', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
    }).then(() => {
      counter = 10
      setTimeout(() => {
        counter = 12;
      }, 1500);
    });
    expect(counter).toBe(0)
    flushMicrotasks()
    expect(counter).toBe(10);
    tick(1500)
    expect(counter).toBe(12);
  }));

  it('should validate observables with fakeAsync', fakeAsync(() => {
    let test = false;

    console.log("Creating Observable")

    const test$ = of(test).pipe(delay(1000))

    test$.subscribe(() => {
      test = true;
    })

    tick(1000)

    expect(test).toBeTruthy();
  }));

});
