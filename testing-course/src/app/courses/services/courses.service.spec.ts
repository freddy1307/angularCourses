import {CoursesService} from "./courses.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {COURSES, findLessonsForCourse} from "../../../../server/db-data";
import {error} from "protractor";
import {HttpErrorResponse} from "@angular/common/http";

describe('Courses Services', () => {

  let coursesServices: CoursesService,
      httpClientTest: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });

    coursesServices = TestBed.get(CoursesService);
    httpClientTest = TestBed.get(HttpTestingController)
  });

  it('should find all courses', () => {
    coursesServices.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy();
      expect(courses.length).toBe(12);

      const course = courses.find(course => course.id === 12);

      expect(course.titles.description).toEqual('Angular Testing Course');
    })

    const req = httpClientTest.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({
      payload: Object.values(COURSES)
    })
  });

  it('should find one course', () => {
    const id = 12;
    coursesServices.findCourseById(id).subscribe(course => {
      expect(course).toBeTruthy();

      expect(course.titles.description).toEqual('Angular Testing Course');
    });

    const req = httpClientTest.expectOne(`/api/courses/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush({
      ...COURSES[id]
    });
  })

  it('should save a course', () => {
    const id = 12;
    const changes = { titles: { description: 'New Angular Testing Course' }};
    coursesServices.saveCourse(12, changes).subscribe(course => {
      expect(course.id).toBe(id);
      expect(course.titles.description).toEqual(changes.titles.description);
    });

    const req = httpClientTest.expectOne(`/api/courses/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({
      ...COURSES[id],
      ...changes
    });
  })

  it('should give a error when save a course', () => {
    const id = 12;
    const errorMessage = "Save course failed";
    const changes = { titles: { description: 'New Angular Testing Course' }};
    coursesServices.saveCourse(12, changes)
      .subscribe(course => fail("Error to save"),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500)
          expect(error.message).toContain(errorMessage)
        }
      );

    const req = httpClientTest.expectOne(`/api/courses/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush("", {
      status: 500,
      statusText: errorMessage
    });
  })

  it('should find a list of lessons', () => {
    const id = 12;
    coursesServices.findLessons(id).subscribe(
      (lessons) => {
        expect(lessons).toBeTruthy();
        expect(lessons.length).toBe(3)
      }
    );
    const req = httpClientTest.expectOne(req => req.url === '/api/lessons');
    expect(req.request.method).toBe('GET');
    req.flush({
      payload: findLessonsForCourse(id).slice(0, 3)
    })
  })

  afterEach(() => {
    httpClientTest.verify()
  })

});
