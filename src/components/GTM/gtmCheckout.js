import { string, number, arrayOf, shape } from 'prop-types';
import Push from 'utils/dataLayer';

/**
 * Checkout GTM Event
 * Page Load Event
 *
 * This event should be fired when a user loads a page
 *
 * @typedef GTMCheckoutEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMCheckoutEvent = (props) => {
    Push({
        event: 'checkout',
        ecommerce: {
            ...props
        }
    });
}

/**
 * Prop definitions for {@link GTMCheckoutEvent}
 *
 * @typedef props
 *
 * @property {String} currency The currency of the site in ISO 4217 format
 * @property {Number} value Value of the product (variation that is preselected)
 * @property {String} coupon The coupon name/code associated with the order
 * @property {Number} checkout_step The step in the checkout process
 * @property {Array} items Array of items that are included in the event. Usually 1 item
 * @property {String} items.item_id ID / SKU of the product
 * @property {String} items.item_name Name of the product in the list
 * @property {Number} items.discount The discount value associated with the item. If a product is on sale
 * @property {String} items.item_brand Brand of the product
 * @property {String} items.item_category Top level category of the product
 * @property {String} items.item_variant Selected variant of the product
 * @property {Number} items.price Price of the selected product
 * @property {Number} items.quantity Quantity of selected product
 */
GTMCheckoutEvent.propTypes = {
    currency: string.isRequired,
    value: number.isRequired,
    coupon: string,
    checkout_step: number.isRequired,
    items: arrayOf(shape({
        item_id: string.isRequired,
        item_name: string.isRequired,
        discount: number,
        item_brand: string.isRequired,
        item_category: string.isRequired,
        item_variant: string,
        price: number.isRequired,
        quantity: number.isRequired,
    })).isRequired,
};


/**
 * Purchase GTM Event
 * Page Load Event
 *
 * This event should be fired when a user completing the order
 *
 * @typedef GTMPurchaseEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMPurchaseEvent = (props) => {
    Push({
        event: 'purchase',
        ecommerce: {
            ...props,
        }
    });
};

/**
 * Prop definitions for {@link GTMPurchaseEvent}
 *
 * @typedef props
 *
 * @property {String} currency The currency of the site in ISO 4217 format
 * @property {String} transaction_id ID of the completed transaction in the system
 * @property {Number} value Value of the complete cart in the checkout
 * @property {String} coupon The coupon name/code associated with the order
 * @property {Number} shipping Shipping costs associated with the transaction
 * @property {Number} tax Tax cost associated with the transaction
 * @property {String} payment_type The chosen type of payment for the order
 * @property {Array} items Array of items that are included in the event. Usually 1 item
 * @property {String} items.item_id ID / SKU of the product
 * @property {String} items.item_name Name of the product in the list
 * @property {Number} items.discount The discount value associated with the item. If a product is on sale
 * @property {String} items.item_brand Brand of the product
 * @property {String} items.item_category Top level category of the product
 * @property {String} items.item_variant Selected variant of the product
 * @property {Number} items.price Price of the selected product
 * @property {Number} items.quantity Quantity of selected product
 */
GTMPurchaseEvent.propTypes = {
    currency: string.isRequired,
    transaction_id: string.isRequired,
    value: number.isRequired,
    coupon: string,
    shipping: number.isRequired,
    tax: number.isRequired,
    payment_type: string.isRequired,
    items: arrayOf(shape({
        item_id: string.isRequired,
        item_name: string.isRequired,
        discount: number,
        item_brand: string.isRequired,
        item_category: string.isRequired,
        item_variant: string,
        price: number.isRequired,
        quantity: number.isRequired,
    })).isRequired,
};


/**
 * Payment Failed GTM Event
 * Page Load Event
 *
 * This event should be fired when a payment fails
 *
 * @typedef GTMPaymentFailedEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMPaymentFailedEvent = (props) => {
    Push({
        event: 'payment_failed',
        ...props
    });
}

/**
 * Prop definitions for {@link GTMPaymentFailedEvent}
 *
 * @typedef props
 *
 * @property {String} payment_type The currency of the site in ISO 4217 format
 * @property {Array} ecommerceError Error object of the payment
 * @property {String} items.paymentError Error shown to the user after payment
 * @property {String} items.date Date on which the error took place. Format YYYY/MM/DD
 * @property {String} items.time Time at which the error took place. Format hh:mm:ss
 */
GTMPaymentFailedEvent.propTypes = {
    payment_type: string.isRequired,
    ecommerceError: arrayOf(shape({
        paymentError: string.isRequired,
        date: string.isRequired,
        time: string.isRequired,
    })).isRequired,
};
