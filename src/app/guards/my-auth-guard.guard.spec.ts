import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { myAuthGuardGuard } from './my-auth-guard.guard';

describe('myAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => myAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
