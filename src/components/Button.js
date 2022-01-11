import React from 'react';
import cx from 'classnames';

const Button = (props) => {
    return (
        <button {...props} className={cx("border p-1 cursor-pointer", props.className)} >{props.children}</button>
    );
};

export default Button;
