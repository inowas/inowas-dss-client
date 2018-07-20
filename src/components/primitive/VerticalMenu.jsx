import React from 'react';
import PropTypes from 'prop-types';
import {Menu} from 'semantic-ui-react';
import {pure} from 'recompose';

const styles = {
    menu: {
        width: '100%',
        fontSize: 'unset',
        marginLeft: -5
    }
};

const VerticalMenu = ({items, activeItem, onClick, style}) => {
    return (
        <Menu pointing secondary vertical style={{...styles.menu, ...style}}>
            {items.map((item, idx) => (
                <Menu.Item
                    key={idx}
                    name={item.name}
                    active={item.id === activeItem}
                    onClick={() => onClick(item.id)}
                >
                    {item.name}
                </Menu.Item>))
            }
        </Menu>
    );
};

VerticalMenu.propTypes = {
    activeItem: PropTypes.string,
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default pure(VerticalMenu);
