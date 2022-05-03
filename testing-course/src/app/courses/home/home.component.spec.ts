import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let courseService: any;

  beforeEach(async(() => {

    const courseServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses'])

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers:[
        { provide: CoursesService, useValue: courseServiceSpy }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      })
    courseService = TestBed.get(CoursesService);

  }));

  const findCoursesByCategory = (categoryName) => setupCourses().filter(course => course.category === categoryName);

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {
      courseService.findAllCourses.and.returnValue(of(findCoursesByCategory('BEGINNER')));
      fixture.detectChanges();

      const tabs = el.queryAll(By.css(".mat-tab-label"));
      expect(tabs.length).toBe(1, "Unexpected error found more tabs")
  });


  it("should display only advanced courses", () => {
    courseService.findAllCourses.and.returnValue(of(findCoursesByCategory('ADVANCED')));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected error found more tabs")
  });


  it("should display both tabs", () => {
    courseService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(2, "Unexpected quantity of tabs found")
  });


  it("should display advanced courses when tab clicked", (done: DoneFn) => {
    courseService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    click(tabs[1])
    fixture.detectChanges();

    setTimeout(() => {
      const cards = el.queryAll(By.css(".mat-tab-body-active .mat-card-title"));
      expect(cards.length).toBe(3, "There are more courses than 3 for the advanced category")
      expect(cards[0].nativeElement.textContent).toContain("Angular Security Course")
      done();
    }, 600)
  });

});


