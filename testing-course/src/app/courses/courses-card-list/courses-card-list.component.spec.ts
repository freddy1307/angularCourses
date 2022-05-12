import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent,
      fixture: ComponentFixture<CoursesCardListComponent>,
      el: DebugElement;

  beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoursesModule]
      })
        .compileComponents()
        .then(() => {
           fixture = TestBed.createComponent(CoursesCardListComponent);
           component = fixture.componentInstance;
           el = fixture.debugElement;
        })
  }))


  it("should create the component", () => {
      expect(component).toBeTruthy()
  });


  it("should display the course list", () => {
      component.courses = setupCourses();
      fixture.detectChanges();

      const cards = el.queryAll(By.css(".course-card"))
      expect(cards).toBeTruthy("Could not find cards")
      expect(cards.length).toBe(12)
  });


  it("should display the first course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();

    const course = COURSES[12];
    const card = el.query(By.css(".course-card:first-child")),
          title = card.query(By.css("mat-card-title")),
          image = card.query(By.css("img"));

    expect(title.nativeElement.textContent).toEqual(course.titles.description);
    expect(image.nativeElement.src).toEqual(course.iconUrl)
  });


});


