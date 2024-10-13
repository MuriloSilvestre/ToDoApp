import { HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { TokenstorageService } from '../auth/service/tokenstorage.service';

const TOKEN_HEADER_KEY = 'Authorization';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(TokenstorageService).getToken();

  // Clone the request to add the authentication header.
  if (authToken) {
    const newReq = req.clone({
      headers: req.headers.append(
        TOKEN_HEADER_KEY,
        `Bearer ${authToken.accessToken}`
      ),
    });
    return next(newReq);
  } else {
    return next(req);
  }
}
