import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-versions',
  standalone: true,
  imports: [],
  templateUrl: './versions.component.html',
  styleUrl: './versions.component.css',
})
export class VersionsComponent {
  hostVersions = cleanVersions(
    fetch('http://localhost:4200/remoteEntry.json').then((res) => res.json()),
  );
  remotes = fetch('http://localhost:4200/assets/federation.manifest.json').then(
    (res) => res.json(),
  );
  showDifferentOnly = signal(true);
  versionsOverview = signal<VersionsOverView>({});
  versionsArray = computed(() => {
    const list = Object.entries(this.versionsOverview());
    if (this.showDifferentOnly()) {
      return list.filter(([_, versions]) => {
        const verArr = Object.values(versions);
        return !verArr.every((v) => v === verArr[0]);
      });
    }
    return list;
  });
  mfeArray = signal<string[]>(['host']);

  constructor() {
    this.init();
  }

  async init() {
    const remotes = await this.remotes;
    const result: Record<
      string,
      {
        packageName: string;
        version: string;
      }[]
    > = {};
    for (const [name, remote] of Object.entries(remotes)) {
      this.mfeArray.update((arr) => [...arr, name].sort());
      // @ts-expect-error
      const remoteEntry = fetch(remote).then((res) => res.json());
      result[name] = await cleanVersions(remoteEntry);
    }
    console.log(result);
    const hostVersions = await this.hostVersions;
    const oversight: VersionsOverView = hostVersions.reduce(
      (acc, h) => ({ ...acc, [h.packageName]: { host: h.version } }),
      {},
    );
    for (const [name, versions] of Object.entries(result)) {
      for (const version of versions) {
        const entry = oversight[version.packageName] ?? {};
        oversight[version.packageName] = {
          ...entry,
          [name]: version.version,
        };
      }
    }
    this.versionsOverview.set(oversight);
  }
}

interface VersionsOverView {
  [packageName: string]: {
    host: string;
    [remote: string]: string;
  };
}

const cleanVersions = async (raw: Promise<RemoteEntries>) => {
  const remotes = await raw;
  return remotes.shared.map((s) => ({
    packageName: s.packageName,
    version: s.version,
  }));
};
export interface RemoteEntries {
  name: string;
  shared: Shared[];
  exposes: any[];
}

export interface Shared {
  packageName: string;
  outFileName: string;
  requiredVersion: string;
  singleton: boolean;
  strictVersion: boolean;
  version: string;
  dev: Dev;
}

export interface Dev {
  entryPoint: string;
}
