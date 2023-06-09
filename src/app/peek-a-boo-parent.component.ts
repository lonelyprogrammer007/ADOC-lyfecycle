import { Component } from '@angular/core';

import { LoggerService } from './logger.service';

@Component({
  selector: 'peek-a-boo-parent',
  template: `
  <hr />
  <div class="parent">
    <h2>Peek-A-Boo</h2>

    <button type="button" (click)="toggleChild()">
      {{hasChild ? 'Destroy' : 'Create'}} PeekABooComponent
    </button>
    <button type="button" (click)="updateHero()" [hidden]="!hasChild">Update Hero</button>

    <div class="info">
      <peek-a-boo *ngIf="hasChild" [name]="heroName"></peek-a-boo>

      <h3>Lifecycle Hook Log</h3>
      <div *ngFor="let msg of hookLog" class="log">{{msg}}</div>
    </div>
  </div>
  `,
  // providers: [LoggerService],
})
export class PeekABooParentComponent {
  hasChild = false;
  hookLog: string[] = [];

  heroName = '';

  constructor(private logger: LoggerService) {
    this.hookLog = this.logger.logs;
  }

  toggleChild() {
    this.hasChild = !this.hasChild;
    if (this.hasChild) {
      this.heroName = 'Windstorm';
      this.logger.clear(); // clear log on create
    }
    this.hookLog = this.logger.logs;
    // this.logger.tick();
  }

  updateHero() {
    this.heroName += '!';
    this.logger.tick();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
