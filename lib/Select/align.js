import getViewportHeight from '@writ/utils/dom-viewport-height';

export function makeAlign(heightLimit = 20) {
    return function (pointRect, layerRect) {
        const visualHeight = getViewportHeight();
        const topValue = pointRect.y + pointRect.height;
        const HeightDifference = topValue + layerRect.height - visualHeight;

        return {
            top: topValue,
            left: pointRect.x,
            width: pointRect.width,
            height: HeightDifference >= 0 ? (visualHeight - topValue - heightLimit) : 'auto'
        };
    }
}
