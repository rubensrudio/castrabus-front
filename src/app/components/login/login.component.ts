import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user!: SocialUser;
  loggedIn!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '462196977457-v5nq42rfmrr5doq699imvqskju5r5v4t.apps.googleusercontent.com',
      callback: (resp: any) => this.signInWithGoogle(resp)
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle'
    })
  }

  signInWithGoogle(response: any) {
    if(response) {
      const payload = this.authService.decodeToken(response.credential);
      this.authService.signInGoogle(payload).subscribe({
        next: (token) => {
          this.authService.signIn(this.authService.decodeToken(token), token);
          this.router.navigate(['/agendamentos']);
        },
        error: (e) => console.error(e),
      })

    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (v) => {
          this.authService.signIn(this.authService.decodeToken(v), v);
          this.router.navigate(['/agendamentos']);
        },
        error: (e) => console.error(e),
      });
    }
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.authService.signInFacebook(data).subscribe({
          next: (token) => {
            this.authService.signIn(this.authService.decodeToken(token), token);
            this.router.navigate(['/agendamentos']);
          },
          error: (e) => console.error(e),
        })
      }
    )
  }
}
