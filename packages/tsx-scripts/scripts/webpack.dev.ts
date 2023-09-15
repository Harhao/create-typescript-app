import { merge } from 'webpack-merge';
import { Eenvironment } from './enum';
import { Configuration } from 'webpack';
import { getOverrideConfig } from '../utils';

import getWebpackBaseConfig from './webpack.base';

const getWebpackDevConfig = async (envData: Record<string, any>) => {
    const config: Configuration = await getOverrideConfig('webpack.override.ts') || {};
    return merge(getWebpackBaseConfig(envData), {
        //@ts-ignore
        mode: Eenvironment.development,
    }, config);
}
export default getWebpackDevConfig;
