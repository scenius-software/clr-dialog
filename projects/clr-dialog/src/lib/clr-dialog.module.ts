import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ClrDialogContainer } from './clr-dialog-container';

import { ClrDialogClose, ClrDialogTitle, ClrDialogContent, ClrDialogActions } from './clr-dialog-content-directives';

import { ClrDialogService, CLR_DIALOG_SCROLL_STRATEGY_PROVIDER } from './clr-dialog.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  exports: [
    ClrDialogContainer,
    ClrDialogClose,
    ClrDialogTitle,
    ClrDialogContent,
    ClrDialogActions,
  ],
  declarations: [
    ClrDialogContainer,
    ClrDialogClose,
    ClrDialogTitle,
    ClrDialogActions,
    ClrDialogContent,
  ],
  providers: [
    ClrDialogService,
    CLR_DIALOG_SCROLL_STRATEGY_PROVIDER,
  ],
  entryComponents: [ClrDialogContainer],
})
export class ClrDialogModule { }
