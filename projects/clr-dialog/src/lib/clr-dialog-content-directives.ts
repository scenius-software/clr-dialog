/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ElementRef,
} from '@angular/core';
import { ClrDialogRef } from './clr-dialog-ref';
import { ClrDialogService } from './clr-dialog.service';


/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;

/**
 * Button that will close the current dialog.
 */
@Directive({
  selector: `button[clr-dialog-close], button[clrDialogClose]`,
  exportAs: 'clrDialogClose',
  host: {
    '(click)': 'dialogRef.close(dialogResult)',
    '[attr.aria-label]': 'ariaLabel || null',
    'type': 'button', // Prevents accidental form submits.
  }
})
export class ClrDialogClose implements OnInit, OnChanges {
  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Dialog close input. */
  @Input('clr-dialog-close') dialogResult: any;

  @Input('clrDialogClose') _clrDialogClose: any;

  constructor(
    @Optional() public dialogRef: ClrDialogRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: ClrDialogService) { }

  ngOnInit() {
    if (!this.dialogRef) {
      // When this directive is included in a dialog via TemplateRef (rather than being
      // in a Component), the DialogRef isn't available via injection because embedded
      // views cannot be given a custom injector. Instead, we look up the DialogRef by
      // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
      // be resolved at constructor time.
      this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs)!;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const proxiedChange = changes['_clrDialogClose'] || changes['_clrDialogCloseResult'];

    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }
}

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
@Directive({
  selector: '[clr-dialog-title], [clrDialogTitle]',
  exportAs: 'clrDialogTitle',
  host: {
    'class': 'modal-title',
    '[id]': 'id',
  },
})
export class ClrDialogTitle implements OnInit {
  @Input() id = `clr-dialog-title-${dialogElementUid++}`;

  constructor(
    @Optional() private _dialogRef: ClrDialogRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: ClrDialogService) { }

  ngOnInit() {
    if (!this._dialogRef) {
      this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs)!;
    }

    if (this._dialogRef) {
      Promise.resolve().then(() => {
        const container = this._dialogRef._containerInstance;

        if (container && !container._ariaLabelledBy) {
          container._ariaLabelledBy = this.id;
        }
      });
    }
  }
}


/**
 * Scrollable content container of a dialog.
 */
@Directive({
  selector: `[clr-dialog-content], clr-dialog-content, [clrDialogContent]`,
  host: { 'class': 'clr-dialog-content' }
})
export class ClrDialogContent { }


/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
  selector: `[clr-dialog-actions], clr-dialog-actions, [clrDialogActions]`,
  host: { 'class': 'modal-footer' }
})
export class ClrDialogActions { }


/**
 * Finds the closest ClrDialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(element: ElementRef<HTMLElement>, openDialogs: ClrDialogRef<any>[]) {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent && !parent.classList.contains('clr-dialog-container')) {
    parent = parent.parentElement;
  }

  return parent ? openDialogs.find(dialog => dialog.id === parent!.id) : null;
}
