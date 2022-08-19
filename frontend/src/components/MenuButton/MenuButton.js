import React from 'react';

const MENU_BUTTON = 'open menu';

const MenuButton = React.memo((props) => {
    return (
        <button
        title={MENU_BUTTON}
        className="menu-button"
        onClick={props.onOpenMenu}
        />
    )
});

export default MenuButton;