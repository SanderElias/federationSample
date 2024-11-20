import { initFederation } from '@angular-architects/native-federation';
import {
  getVersionOverview,
  type VersionsOverView,
} from './app/versions/get-verions-overview';

type RemoteHostMapping = [string, {
  [remote: string]: string;
  host: string;
}][];

const filterDiffVersions = (overview: VersionsOverView): RemoteHostMapping => {
  const list = Object.entries(overview);
  return list.filter(
    ([_, versions]) => new Set(Object.values(versions)).size > 1,
  );
};

const toTable = (names:string[],list: RemoteHostMapping) => {
  return `
  <h1>Version differences</h1>
  <table>
    <thead>
      <tr>
        <th>Package</th>
        ${names.map((name) => `<th>${name}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${list
        .map(
          ([packageName, versions]) =>
            `<tr>
              <td>${packageName}</td>
              ${Object.values(versions)
                .map((version) => `<td>${version}</td>`)
                .join('')}
            </tr>`,
        )
        .join('')}
    </tbody>
  </table>
  `;
};

(async () => {
  const versions = await getVersionOverview();
  const diffVersions = filterDiffVersions(versions.versionOverview);
  if (diffVersions.length > 0) {
    document.body.innerHTML = toTable(versions.remoteNames,diffVersions);
    throw new Error('Dependencies between federated apps are not in sync');
  }

  initFederation('assets/federation.manifest.json')
    .catch((err) => console.error(err))
    .then((_) => import('./bootstrap'))
    .catch((err) => console.error(err));
})();
