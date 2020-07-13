import React from 'react';
import styles from './Fullscreen.css';
import FullscreenIcon from './../Icon/fullscreen.svg';

export default ({ onClick, className, ariaLabel }) => {
    return (
        <div className={[
            styles.component,
            className
        ].join(' ')}>
            <button
                type="button"
                onClick={onClick}
                aria-label={ariaLabel}
                className={styles.button}>
                    <FullscreenIcon
                        fill="#fff"
                        className={styles.icon} />
            </button>
        </div>
    );
};
