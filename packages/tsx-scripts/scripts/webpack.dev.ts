import { merge } from 'webpack-merge';
import { Eenvironment } from './enum';
import { Configuration } from 'webpack';
import { getOverrideConfig } from '../utils';

import getWebpackBaseConfig from './webpack.base';


const getWebpackDevConfig = async (envData: Record<string, any>) => {

    const baseConfig: Configuration = getWebpackBaseConfig(envData);
    const config: Configuration = await getOverrideConfig(baseConfig, envData.NODE_ENV, 'webpack.override.ts') || baseConfig;
    
    return merge(baseConfig, {
        //@ts-ignore
        mode: Eenvironment.development,
    }, config);
}
export default getWebpackDevConfig;
