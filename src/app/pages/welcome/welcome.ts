import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TopicCardComponent } from './topic-card/topic-card';

@Component({
  selector: 'app-welcome',
  imports: [MatCardModule, MatButtonModule, RouterLink, TopicCardComponent],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {}
