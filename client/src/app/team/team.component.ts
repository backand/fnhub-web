// angular
import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BackandService } from '@backand/angular2-sdk';
import { AppService } from '../shared';
import { AuthService } from '../shared';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Component({
  selector: 'team',
  host: {
    '(document:click)': 'onClick($event)',
  },
  templateUrl: './team.component.html',
  providers: [NgbDropdownConfig],
  styleUrls: [
    './team.component.scss'
  ],
})
export class TeamComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  limit: number = 4;
  users: Observable<any>;
  hasSuggestion: boolean = false;
  showSuggestions: boolean = false;
  isExpand: boolean = false;
  error: any;
  canAddMember: boolean = false;
  private loading: boolean = false;
  private module: string;
  private team: any;
  private list: any;
  private searchTerms = new Subject<any>();
  constructor(
    private appService: AppService,
    config: NgbDropdownConfig,
    private backand: BackandService,
    private eRef: ElementRef,
    private authService: AuthService
  ) {
    config.up = true;
    config.autoClose = false;
    this.module = eRef.nativeElement.getAttribute('data-module');
    this.team = JSON.parse(eRef.nativeElement.getAttribute('data-team'));
  }

  ngOnInit(): void {
    console.log('Module -', this.module);
    console.log('Team - ', this.team);
    let user = this.authService.getUser();
    let idx = _.findIndex(this.team, function (t: any) {
      return t.email == _.get(user, 'email');
    });
    console.info('Current user is a member of team', idx);
    this.canAddMember = idx >= 0;
    if (!this.canAddMember) {
      this.limit = 5;
    }
    this.list = _.take(this.team, this.limit);

    this.users = this.searchTerms
      .debounceTime(400)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .do(_ => this.loading = true)
      .switchMap(term => (term && term.length >= 2)   // switch to new observable each time
        // return the http search observable
        ? this.searchUsers(term)
        // or the observable of empty heroes if no search term
        : Observable.of<any[]>([]))
      .do(_ => this.loading = false)
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<any>([]);
      });
    _.delay(_ => {
      console.info('Guid of a member', this.appService.guid);
      if (this.appService.guid && idx < 0) {
        console.info('TeamComponent - Add member to team with guid - ', this.appService.guid);
        this.addTeamMember(user, 'guid');
      }
    }, 300);

  }

  ngOnDestroy(): void {
  }
  search(term: string = ''): void {
    this.searchTerms.next(term);
  }
  searchUsers(q): Observable<any[]> {
    return this.backand.fn.get("getUsers", {
      "pageSize": 10,
      "pageNumber": 1,
      "q": q
    })
      .then(response => {
        this.hasSuggestion = _.get(response, 'data.totalRows') > 0 ? true : false;
        this.showSuggestions = this.hasSuggestion;
        return _.get(response, 'data.data');
      })
      .catch(error => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      })
  }
  /**
   * @function onClick
   * @description click event handler, this is triggered when click on document. 
   * it is used to close team suggestion dropdown when click outside dropdown
   * @param {any} event 
   * @memberof TeamComponent
   */
  onClick(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
      this.error = '';
    }
  }

  /**
   * @function addTeamMember
   * @description function is used to add team member in module
   * @param {*} member 
   * @param {string} [actionType='user'] 
   * @memberof TeamComponent
   */
  addTeamMember(member: any, actionType: string = 'user'): void {
    let idx = _.findIndex(this.team, { email: member.email });
    if (idx >= 0) {
      this.error = 'Already a team member';
      return;
    }
    let params = {
      "path": "addTeamMember",
      "username": member.email,
      "action": "user",
      "moduleName": this.module
    };
    if (actionType === 'guid') {
      params['action'] = 'guid';
      params['guid'] = this.appService.guid;
    }
    this.blockUI.start();
    this.backand.fn.post("module", params, {})
      .then(response => {
        this.blockUI.stop();
        this.team.push(response.data);
        console.info('TeamComponent - addTeamMember - Member has been added to team - ', member, this.appService.guid);
      })
      .catch(error => {
        this.error = _.get(error, 'data.errorMessage') || 'Unable to add member. Please try later';
        console.error('Error while adding new member', error);
        this.blockUI.stop();
      });
  }

  /**
   * @function removeMember
   * @description remove member from team
   * @param {*} member 
   * @memberof TeamComponent
   */
  removeMember(member: any): void {
    this.blockUI.start();
    this.backand.fn.post("module", {
      "path": "removeTeamMember",
      "username": member.email,
      "action": "user",
      "moduleName": this.module
    }, {})
      .then(data => {
        this.removeMemberFromList(member);
        this.blockUI.stop();
      })
      .catch(error => {
        this.error = _.get(error, 'data.errorMessage') || 'Unable to add member. Please try later';
        console.error('Error while adding new member', error);
        this.blockUI.stop();
      });
  }
  /**
   * @function removeMemberFromList
   * @description An helper function which removes , deleted member from Team
   * @param {*} member 
   * @memberof TeamComponent
   */
  removeMemberFromList(member: any) {
    let idx = _.findIndex(this.team, (t: any) => {
      return t.email === member.email;
    });
    this.team.splice(idx, 1);
    this.updateTeam();
  }

  /**
   * @function toggleList
   * @description Toggle[ALL/LESS] team members list 
   * @param {*} $event 
   * @memberof TeamComponent
   */
  toggleList($event: any) {
    $event.preventDefault();
    this.isExpand = !this.isExpand;
    this.updateTeam();
  }

  /**
   * @function updateTeam
   * @description Keep updating this.list with limited records
   * @private
   * @memberof TeamComponent
   */
  private updateTeam(): void {
    if (this.list.length === this.team.length || this.list.length > this.limit) {
      this.list = _.take(this.team, this.limit);
    } else {
      this.list = this.team;
    }
  }

}
