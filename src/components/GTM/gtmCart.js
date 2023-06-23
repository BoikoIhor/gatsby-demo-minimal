import { string, number, arrayOf, shape } from 'prop-types';
import Push from 'utils/dataLayer';

/**
 * View Cart GTM Event
 * Page Load Event
 *
 * This event should be fired when a user view their cart
 *
 * @typedef GTMViewCartEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMViewCartEvent = (props) => {
    Push({
        event: 'view_cart',
        ecommerce: {
            ...props,
        }
    });
};

/**
 * Prop definitions for {@link GTMViewCartEvent}
 *
 * @typedef props
 *
 * @property {String} currency The currency of the site in ISO 4217 format
 * @property {Number} value Value of the product (variation that is preselected)
 * @property {Array} items Array of items that are included in the event. Usually 1 item
 * @property {String} items.item_id ID / SKU of the product
 * @property {String} items.item_name Name of the product in the list
 * @property {Number} items.discount The discount value associated with the item. If a product is on sale
 // * @property {String} items.item_brand Brand of the product
 // * @property {String} items.item_category Top level category of the product
 * @property {String} items.item_variant Selected variant of the product
 * @property {Number} items.price Price of the selected product
 * @property {Number} items.quantity Quantity of selected product
 */
GTMViewCartEvent.propTypes = {
    currency: string.isRequired,
    value: number.isRequired,
    items: arrayOf(shape({
        item_id: string.isRequired,
        item_name: string.isRequired,
        discount: number,
        // item_brand: string.isRequired,
        // item_category: string.isRequired,
        item_variant: string,
        price: number.isRequired,
        quantity: number.isRequired,
    })).isRequired,
};
