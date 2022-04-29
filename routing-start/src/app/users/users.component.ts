import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "./users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit{
  users: {id:number, name: string}[] = []

	constructor(private router: Router, private usersService: UsersService) {
	}

	async userSelected(user) {
		await this.router.navigate(['users', user.id, user.name])
	}

  ngOnInit(): void {
    this.users = this.usersService.users;
  }
}
