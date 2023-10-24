import SentryCli from '@sentry/cli';
import { sentryConfig } from "../config";


export const uploadSourceMap = () => {
  const sentryCli = new SentryCli(null, {
    authToken: sentryConfig.authToken,
    org: sentryConfig.org,
    project: sentryConfig.project,
  });

  const exportVar = (name, value) => {
    process.env[name] = value;
  };

  exportVar('SENTRY_URL', sentryConfig.url);
  exportVar('SENTRY_ORG', 'fee');
  exportVar('SENTRY_AUTH_TOKEN', sentryConfig.authToken);
  exportVar('SENTRY_PROJECT', sentryConfig.project);

  sentryCli.execute([
    'releases',
    'files',
    sentryConfig.release,
    'upload-sourcemaps',
    sentryConfig.include,
    '--ext',
    'map',
    '--url-prefix',
    sentryConfig.urlPrefix || '~/',
    '--log-level',
    'info'
  ], false).then(() => {
    console.log("sourcemap 上传成功", sentryConfig.urlPrefix);
  }).catch(e => {
    console.error("sourcemap 上传失败", e);
  })
}