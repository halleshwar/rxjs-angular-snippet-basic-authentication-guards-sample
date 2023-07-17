// app/core/auth/iflogged.component.ts
// app/core/components/navbar.component.ts
import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { Subject } from "rxjs";
import { distinctUntilChanged, map, takeUntil } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Directive({
  selector: "[appIfLogged]"
})
export class IfloggedDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(
    private template: TemplateRef<any>,
    private view: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isLogged$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(isLogged => {
        if (isLogged) {
          this.view.createEmbeddedView(this.template);
        } else {
          this.view.clear();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
