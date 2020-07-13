const placements = {
    topLeft: function calcTopLeft(rRect, cRect, space) {
        return {
            top: rRect.top - cRect.height - space,
            left: rRect.left
        };
    },
    top: function calcTop(rRect, cRect, space) {
        const widthDifference = (cRect.width - rRect.width) / 2;
        return {
            top: rRect.top - (cRect.height + space),
            left: rRect.left + (widthDifference > 0 ? -widthDifference : widthDifference)
        };
    },
    topRight: function calcTopRight(rRect, cRect, space) {
        const widthDifference = cRect.width - rRect.width;
        return {
            top: rRect.top - cRect.height - space,
            left: rRect.left + (widthDifference > 0 ? -widthDifference : widthDifference)
        };
    },
    rightTop: function calcRightTop(rRect, cRect, space) {
        return {
            top: rRect.top,
            left: rRect.right + space
        };
    },
    right: function calcRight(rRect, cRect, space) {
        const heightDifference = (cRect.height - rRect.height);
        return {
            top: rRect.top + (heightDifference > 0 ? -heightDifference : heightDifference) / 2,
            left: rRect.right + space
        };
    },
    rightBottom: function calcRightBottom(rRect, cRect, space) {
        const heightDifference = cRect.height - rRect.height;

        return {
            top: rRect.top + (heightDifference > 0 ? -heightDifference : heightDifference),
            left: rRect.right + space
        };
    },
    bottomLeft: function calcBottomLeft(rRect, cRect, space) {
        return {
            top: rRect.bottom + space,
            left: rRect.left
        };
    },
    bottom: function calcBottom(rRect, cRect, space) {
        const widthDifference = (cRect.width - rRect.width) / 2;
        return {
            top: rRect.bottom + space,
            left: rRect.left + (widthDifference > 0 ? -widthDifference : widthDifference)
        };
    },
    bottomRight: function calcBottomRight(rRect, cRect, space) {
        const widthDifference = cRect.width - rRect.width;

        return {
            top: rRect.bottom + space,
            left: rRect.left + (widthDifference > 0 ? -widthDifference : widthDifference)
        };
    },
    leftTop: function calcLeftTop(rRect, cRect, space) {
        return {
            top: rRect.top,
            left: rRect.left - cRect.width - space
        };
    },
    left: function calcLeft(rRect, cRect, space) {
        const heightDifference = (cRect.height - rRect.height);
        return {
            top: rRect.top + (heightDifference > 0 ? -heightDifference : heightDifference) / 2,
            left: rRect.left - cRect.width - space
        };
    },
    leftBottom: function calcLeftBottom(rRect, cRect, space) {
        const heightDifference = cRect.height - rRect.height;

        return {
            top: rRect.top + (heightDifference > 0 ? -heightDifference : heightDifference),
            left: rRect.left - cRect.width - space
        };
    },
};

export function getCoord(placement, space = 10) {
    return function (pointRect, layerRect) {
        return placements[placement](pointRect, layerRect, space);
    };
};