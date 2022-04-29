import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
	userSubscription: Subscription;

  constructor(private route: ActivatedRoute,
							private router: Router,
              private usersService: UsersService) { }

  ngOnInit() {
		this.user = this.usersService.findUserById(+this.route.snapshot.params['id'])
		this.userSubscription = this.route.params.subscribe((params: Params) => {
			this.user = this.usersService.findUserById(+params['id']);
		})
  }

	ngOnDestroy(): void {
		this.userSubscription.unsubscribe();
	}
}
