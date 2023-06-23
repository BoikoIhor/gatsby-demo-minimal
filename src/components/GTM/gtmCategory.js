import { string, number, arrayOf, shape } from 'prop-types';
import Push from 'utils/dataLayer';

/**
 * View Item List GTM Event
 * Page Load Event
 *
 * This event should be fired when a user views category page
 *
 * @typedef GTMViewItemListEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMViewItemListEvent = (props) => {
    Push({
        event: 'view_item_list',
        ecommerce: {
            ...props,
        }
    });
};

/**
 * Prop definitions for {@link GTMViewItemListEvent}
 *
 * @typedef props
 *
 * @property {String} item_list_id The ID of the list that is represented to the user
 * @property {String} item_list_name The name of the list that is represented to the user
 * @property {Array} items Array of items that are in the list represented to the user
 * @property {String} items.item_id ID / SKU of the product
 * @property {String} items.item_name Name of the product in the list
 * @property {String} items.currency The currency of the site in ISO 4217 format
 * @property {Number} items.discount The discount value associated with the item. If a product is on sale
 * @property {Number} items.index Position of item in list
 * @property {String} items.item_brand Brand of the product
 * @property {String} items.item_category Top level category of the product
 * @property {String} items.item_category2 Main category of the product
 * @property {String} items.item_variant The item variant shown to the user in the list
 * @property {Number} items.price Price of the item in the list
 */
GTMViewItemListEvent.propTypes = {
    item_list_id: string.isRequired,
    item_list_name: string.isRequired,
    items: arrayOf(shape({
        item_id: string.isRequired,
        item_name: string.isRequired,
        currency: string.isRequired,
        discount: number,
        index: number.isRequired,
        item_brand: string.isRequired,
        item_category: string.isRequired,
        item_category2: string.isRequired,
        item_variant: string,
        price: number.isRequired,
    })).isRequired,
};


/**
 * Select Item GTM Event
 * Click Event
 *
 * This event should be fired when a user clicks on an item to view the PDP
 *
 * @typedef GTMSelectItemEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMSelectItemEvent = (props) => {
    Push({
        event: 'select_item',
        ecommerce: {
            ...props,
        }
    }, true);
};

/**
 * Prop definitions for {@link GTMSelectItemEvent}
 *
 * @typedef props
 *
 * @property {String} item_list_id The ID of the list that is represented to the user
 * @property {String} item_list_name The name of the list that is represented to the user
 * @property {Array} items Array object with details of the product that the user selects
 * @property {String} items.item_id ID / SKU of the product
 * @property {String} items.item_name Name of the product in the list
 * @property {String} items.currency The currency of the site in ISO 4217 format
 * @property {Number} items.discount The discount value associated with the item. If a product is on sale
 * @property {Number} items.index Position of item in list
 * @property {String} items.item_brand Brand of the product
 * @property {String} items.item_category Top level category of the product
 * @property {String} items.item_category2 Main category of the product
 * @property {String} items.item_variant The item variant shown to the user in the list
 * @property {Number} items.price Price of the item in the list
 */
GTMSelectItemEvent.propTypes = {
    item_list_id: string.isRequired,
    item_list_name: string.isRequired,
    items: arrayOf(shape({
        item_id: string.isRequired,
        item_name: string.isRequired,
        currency: string.isRequired,
        discount: number,
        index: number.isRequired,
        item_brand: string.isRequired,
        item_category: string.isRequired,
        item_category2: string.isRequired,
        item_variant: string,
        price: number.isRequired,
    })).isRequired,
};
