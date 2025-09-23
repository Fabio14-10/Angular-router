import { HighlightDirective } from "./highlight.directive";
import { ElementRef } from '@angular/core';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const element = document.createElement('div');
    const elRef = new ElementRef(element);
    const directive = new HighlightDirective(elRef);
    expect(directive).toBeTruthy();
  });
});
