import Toast from './toast';
import show, { attachPropertiesToComponent } from './show';

export * from './toast';
export * from './toast-props';
export * from './show';

export default attachPropertiesToComponent(Toast, { show });
