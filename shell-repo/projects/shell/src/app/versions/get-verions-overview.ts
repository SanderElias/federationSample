export const getVersionOverview = (
  base = 'http://localhost:4200/',
): Promise<{ remoteNames: string[]; versionOverview: VersionsOverView }> =>
  fetch(`${base}assets/federation.manifest.json`)
    .then((res) => res.json())
    .then(loadRemoteVersions(base));

const loadRemoteVersions =
  (base: string) => async (remotes: Record<string, string>) => {
    // add in the host
    const allRemotes = { host: `${base}remoteEntry.json`, ...remotes };
    const remoteNames = Object.keys(allRemotes) as (keyof typeof allRemotes)[];
    // fetch all the remoteEntry files
    const remoteVersions: [string, RemoteVersions][] = await Promise.all(
      remoteNames.map(async (remoteName) => [
        remoteName,
        await cleanVersions(
          fetch(allRemotes[remoteName]).then((res) => res.json()),
        ),
      ]),
    );
    const versionOverview: VersionsOverView = {};
    const versionObj = () =>
      // create an object with all the remotes and the host with a default value of '-'
      remoteNames.reduce((acc, mfe) => ({ ...acc, [mfe]: '-' }), {});
    // combine all the remoteEntry files into one object
    for (const [name, versions] of remoteVersions) {
      for (const version of versions) {
        const entry = versionOverview[version.packageName] ?? versionObj();
        // merge in the version
        versionOverview[version.packageName] = {
          ...entry,
          [name]: version.version,
        };
      }
    }
    return { remoteNames: remoteNames as string[], versionOverview };
  };

/**
 * clean up the remoteEntry file data to only include the package name and versions
 * @param raw
 * @returns
 */
const cleanVersions = async (raw: Promise<RemoteEntries>) => {
  const remotes = await raw;
  return remotes.shared.map((s) => ({
    packageName: s.packageName,
    version: s.version,
  }));
};

type RemoteVersions = {
  packageName: string;
  version: string;
}[];

export interface VersionsOverView {
  [packageName: string]: {
    host: string;
    [remote: string]: string;
  };
}

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
