

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ProgressBar } from './ProgressBar';
import { useProgress } from './useProgress';
import { getProgressSpeedmeter } from './progressSpeedmeter';
export { getSharedProgressBar };

function getSharedProgressBar(option) {
    const HOC = props => {
        const { value, ...rest } = props;
        const [progress, setProgress] = useProgress(value);
        useEffect(() => {
            context.setProgress = setProgress;
        }, []);
        return React.createElement(ProgressBar, {
            value: progress,
            ...rest
        });
    };
    const context = {
        delay: option.delay > 30 ? option.delay : 30,
        step: option.step || 0.05,
        wait: !!option.wait || true,
        autoStart: !!option.autoStart,
        instance: null,
        container: document.createElement('div'),
        mount() {
            delete option.autoStart;
            delete option.delay;
            delete option.step;
            delete option.wait;
            context.instance = React.createElement(HOC, option);
            ReactDOM.render(context.instance, context.container);
            document.body.appendChild(context.container);
        },
        unmount() {
            ReactDOM.unmountComponentAtNode(context.container);
            document.body.removeChild(context.container);
        },
        run() {
            const progress = context.speedometer(context.form);
            if (progress >= 1) {
                if (context.wait) {
                    context.form = 0;
                    context.puase();
                    return;
                }
                return context.unmount();
            }

            context.setProgress(progress, progress => {
                if (typeof option.onEneded === 'function' && progress >= 1) {
                    option.onEneded();
                } else if (typeof option.onProgress === 'function') {
                    option.onProgress(progress);
                }
            });
        },
        go(form, to, step) {
            context.puase();
            context.step = step || context.step;
            context.form = form;
            context.speedometer = getProgressSpeedmeter(context.step, to || 1);
            context.timer = setInterval(context.run, context.delay);
        },
        start(form, step) {
            context.go(form, 1, step);
        },
        puase() {
            if (context.timer) {
                clearInterval(context.timer);
                context.timer = null;
            }
        },
        restart() {
            context.timer = setInterval(context.run, context.delay);
        },
        end(to) {
            context.go(context.form || 0.98, to || 1);
        },
    };

    if (context.autoStart) {
        context.mount();
    }

    getSharedProgressBar = function wrapperFunc() {
        return context;
    }

    return getSharedProgressBar();
}