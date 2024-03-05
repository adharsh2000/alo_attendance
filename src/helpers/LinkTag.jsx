import React from 'react';
import Link from 'next/link';

const LinkTag = ({ href, label, className }) => {
    return (
        <Link href={href} className={className}>{label}</Link>
    );
};
export default LinkTag;