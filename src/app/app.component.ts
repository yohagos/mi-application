import { Component, OnChanges } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mi-application';

  public isLoggedIn = false;
  public profile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    console.log(this.isLoggedIn);

    if (this.isLoggedIn) {
      this.profile = await this.keycloak.loadUserProfile();

      let test = await this.keycloak.getToken();
      console.log(test);
    }
  }

  public login() {
    this.keycloak.login()
  }

  public logout() {
    console.log(this.profile);

    this.keycloak.logout()
  }
}
