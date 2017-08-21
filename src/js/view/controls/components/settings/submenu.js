import SubmenuTemplate from 'view/controls/templates/settings/submenu';
import { createElement, emptyElement, toggleClass } from 'utils/dom';

export default function SettingsSubmenu(name, categoryButton) {
    let active;
    let contentItems = [];
    const submenuElement = createElement(SubmenuTemplate(name));
    const categoryButtonElement = categoryButton.element();
    categoryButton.show();

    const instance = {
        addContent(items) {
            if (!items) {
                return;
            }
            items.forEach(item => {
                submenuElement.appendChild(item.element());
            });
            contentItems = items;
        },
        replaceContent(items) {
            emptyElement(submenuElement);
            this.addContent(items);
        },
        removeContent() {
            emptyElement(submenuElement);
            contentItems = [];
        },
        activate() {
            toggleClass(submenuElement, 'jw-settings-submenu-active', true);
            submenuElement.setAttribute('aria-expanded', 'true');
            categoryButtonElement.setAttribute('aria-checked', 'true');
            active = true;
        },
        deactivate() {
            toggleClass(submenuElement, 'jw-settings-submenu-active', false);
            submenuElement.setAttribute('aria-expanded', 'false');
            categoryButtonElement.setAttribute('aria-checked', 'false');
            active = false;
        },
        activateItem(itemOrdinal = 0) {
            const item = contentItems[itemOrdinal];
            if (!item || item.active) {
                return;
            }
            deactivateAllItems(contentItems);
            item.activate();
        },
        element() {
            return submenuElement;
        },
        destroy() {
            if (!contentItems) {
                return;
            }
            contentItems.forEach(item => {
                item.destroy();
            });
            this.removeContent();
        }
    };

    Object.defineProperty(instance, 'name', {
        enumerable: true,
        get: () => name
    });

    Object.defineProperty(instance, 'active', {
        enumerable: true,
        get: () => active
    });

    Object.defineProperty(instance, 'categoryButtonElement', {
        enumerable: true,
        get: () => categoryButtonElement
    });

    return instance;
}

const deactivateAllItems = (items) => {
    items.forEach(item => {
        item.deactivate();
    });
};
