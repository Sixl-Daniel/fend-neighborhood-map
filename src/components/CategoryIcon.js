import React, { Component } from 'react';

const CategoryIcon = (props) => {
    const { prefix, suffix, size, name, grey } = props;
    const isGrey = grey ? 'bg_' : '';
    return (<img className='category-icon' src={prefix + isGrey + size + suffix} alt='' title={name} />);
}

export default CategoryIcon;
