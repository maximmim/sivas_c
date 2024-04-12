import React, { forwardRef } from 'react';

const GMene = forwardRef(({ op, text, styles }, ref) => {
    return (
        <button ref={ref} onClick={op} id={styles} className={styles}>
            {text}
        </button>
    );
});

export default GMene;
