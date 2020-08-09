import { memo, createElement } from 'react';
import PropTypes from 'prop-types';

import { CommentEnter } from './Comment/Enter';

const Comment = memo((props) => {
    const inputElement = createElement('div', {});
    const submitElement = createElement('div', {});

    return createElement('div', {
        className: 'comment'
    }, inputElement, submitElement);
});

Comment.Enter = CommentEnter;
Comment.defaultProps = {};
if (window.DEV) {
    Comment.propTypes = {};
}

export { Comment }