import { string } from 'prop-types';
import Push from 'utils/dataLayer';

/**
 * Select Promotion GTM Event
 * User Click Event
 *
 * This event should be fired when a user clicks hero banner button
 *
 * @typedef GTMSelectPromotionEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMSelectPromotionEvent = (props) => {
    Push({
        event: 'select_promotion',
        click_details: {
            ...props,
        }
    });
};

/**
 * Prop definitions for {@link GTMSelectPromotionEvent}
 *
 * @typedef props
 *x
 * @property {String} creative_name The name of the promotional creative.
 * @property {String} creative_slot The name of the promotional creative slot associated with the event.
 * @property {String} promotion_id
 * @property {String} promotion_name
 */
GTMSelectPromotionEvent.propTypes = {
    creative_name: string.isRequired,
    creative_slot: string,
    promotion_id: string,
    promotion_name: string,
};


/**
 * Select Content GTM Event
 * User Click Event
 *
 * This event should be fired when a user clicks secondary cards under hero or blog card
 *
 * @typedef GTMSelectContentEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMSelectContentEvent = (props) => {
    Push({
        event: 'select_content',
        click_details: {
            ...props,
        }
    });
};

/**
 * Prop definitions for {@link GTMSelectContentEvent}
 *
 * @typedef props
 *
 * @property {String} content_type Type of selected content
 * @property {String} content_id An identifier for the content that was selected
 */
GTMSelectContentEvent.propTypes = {
    content_type: string.isRequired,
    content_id: string,
};
