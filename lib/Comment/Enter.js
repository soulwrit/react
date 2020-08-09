import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Editable } from '../Editable';
import { Button } from '../Button';

class CommentEnter extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: props.value,
        };
    }

    // 提交
    onSubmit = () => {
        this.props.onSubmit(this.state.value);
    }

    // 编辑区内容发生变化
    onChange = value => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(value)
        }
    }

    // 输入字数统计
    stat() {
        const isOk = this.state.diffSize > 0;
        const hasText = this.state.size > 0;

        return hasText ? isOk ?
            <span className='cmt-num'>还可以输入{this.state.diffSize}个字</span> :
            <span className='cmt-red'>已经超出{Math.abs(this.state.diffSize)}个字</span> :
            null
    }

    render() {
        const { className, children, disabled, maxLength, minLength, placeholder, readonly, size, theme, value } = this.props;

        return (
            <div className={classnames('comment', className)}>
                <div className='hd'></div>
                <div className='bd'>
                    <Editable
                        disabled={disabled}
                        maxLength={maxLength}
                        minLength={minLength}
                        onChange={this.onChange}
                        placeholder={placeholder}
                        readonly={readonly}
                        size={size}
                        theme={theme}
                        value={value}
                    />
                </div>
                <div className='ft'>
                    <div className='side'>
                        {this.stat()}
                    </div>
                    <div className='aside'>
                        <Button onClick={this.onSubmit} theme={theme} size={size} disabled={disabled}>发布</Button>
                    </div>
                </div>
                {children}
            </div>
        );
    }
};

CommentEnter.defaultProps = {
    maxLength: 500,
    minLength: 0,
    onChange: undefined,
    onSubmit: undefined,
    size: 'md', 
};

if (window.DEV) {
    CommentEnter.propTypes = {
        onChange: PropTypes.func,
        onSubmit: PropTypes.func, 
        size: Editable.propTypes.size,
    };
}

export { CommentEnter }