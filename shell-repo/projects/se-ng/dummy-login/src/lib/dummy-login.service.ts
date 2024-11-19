import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyLoginService {
  #username = signal('Log in to see the username');
  #loggedIn = signal(false);
  loggedIn = this.#loggedIn.asReadonly();
  username = this.#username.asReadonly();


  login = (username: string) => {
    this.#username.set(username);
    this.#loggedIn.set(true);
  }
  logout = () => {
    this.#username.set('');
    this.#loggedIn.set(false);
  }
}
