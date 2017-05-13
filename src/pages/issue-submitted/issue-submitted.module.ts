import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssueSubmittedPage } from './issue-submitted';

@NgModule({
  declarations: [
    IssueSubmittedPage,
  ],
  imports: [
    IonicPageModule.forChild(IssueSubmittedPage),
  ],
  exports: [
    IssueSubmittedPage
  ]
})
export class IssueSubmittedPageModule {}
