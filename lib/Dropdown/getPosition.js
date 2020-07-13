import getVH from '@writ/utils/dom-viewport-width';
import getVW from '@writ/utils/dom-viewport-height';

import { getZIndex } from '../Common/zIndex';

export function getPosition(pRect, lRect, props) {
    const { placement, space } = props;
    const vw = getVW();
    const vh = getVH();
    let pos = {};

    switch (typeof placement) {
        case 'function':
            pos = placement(lRect, pRect);
            break;
        case 'string':
            switch (placement) {
                case 'right':
                    pos.left = pRect.right - Math.max(pRect.width, lRect.width);
                    pos.top = pRect.top + pRect.height + space;
                    break;
                case 'left':
                    pos.left = pRect.left;
                    pos.top = pRect.top + pRect.height;
                    break;
                case 'top':
                    pos.left = pRect.left;
                    pos.bottom = pRect.top;
                    break;
                case 'bottom':
                    pos.left = pRect.left;
                    pos.top = pRect.top + pRect.height;
                    break;
                default: break;
            }
            break;
        case 'object':
            for (let prop in placement) {
                pos[prop] = placement[prop];
            }
            break;
        default:
            pos.top = pRect.top + pRect.height;
            pos.left = pRect.left;
            break;
    }

    pos.zIndex = getZIndex();
    return pos;
}