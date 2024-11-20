import { Component, computed, signal } from '@angular/core';
import { type VersionsOverView, getVersionOverview } from './get-verions-overview';

@Component({
  selector: 'app-versions',
  standalone: true,
  imports: [],
  templateUrl: './versions.component.html',
  styleUrl: './versions.component.css',
})
export class VersionsComponent {
  showDifferentOnly = signal(true);
  versionsOverview = signal<VersionsOverView>({});
  versionsArray = computed(() => {
    const list = Object.entries(this.versionsOverview());
    if (this.showDifferentOnly()) {
      return list.filter(
        ([_, versions]) => new Set(Object.values(versions)).size > 1,
      );
    }
    return list;
  });
  mfeArray = signal<string[]>([]);
  constructor() {
    getVersionOverview().then((v) => {
      this.versionsOverview.set(v.versionOverview);
      this.mfeArray.set(v.remoteNames);
    });
  }
}


