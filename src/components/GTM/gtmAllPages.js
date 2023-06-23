import { string, arrayOf, shape } from 'prop-types';
import Push from 'utils/dataLayer';

/**
 * View Page GTM Event
 * Page Load Event
 *
 * This event should be fired when a user views a page
 *
 * @typedef GTMPageViewEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMPageViewEvent = (props) => {
    Push({
        event: 'page_view',
        ...props,
    }, true);
};

/**
 * Prop definitions for {@link GTMPageViewEvent}
 *
 * @typedef props
 *
 * @property {Array} page Array of page details
 * @property {String} page.title Title of the page
 * @property {String} page.type Type of the page
 * @property {Array} user Array of user details
 * @property {String} user.referral Referral page within the website
 * @property {String} user.loggedInStatus Logged in status of the user
 * @property {String} user.language Language of the user
 * @property {Array} cookies Array of cookie details
 * @property {String} cookies.cookieType Accepted cookies by user
 */
GTMPageViewEvent.propTypes = {
    page: arrayOf(shape({
        title: string.isRequired,
        type: string.isRequired,
    })).isRequired,
    user: arrayOf(shape({
        referral: string.isRequired,
        loggedInStatus: string.isRequired,
        language: string.isRequired,
    })).isRequired,
    cookies: arrayOf(shape({
        cookieType: string.isRequired,
    })),
};


/**
 * View Cookie Banner GTM Event
 * Cookie banner shown Event
 *
 * This event should be fired when a user views the cookie banner
 *
 * @typedef GTMViewCookieBannerEvent
 * @kind functional component
 */
export const GTMViewCookieBannerEvent = () => { // TODO: GTM, add event
    Push({
        event: 'view_cookie_banner'
    });
};


/**
 * View Cookie Preferences GTM Event
 * Cookie preferences shown Event
 *
 * This event should be fired when a user opts to view cookie preferences
 *
 * @typedef GTMViewCookiePreferencesEvent
 * @kind functional component
 */
export const GTMViewCookiePreferencesEvent = () => { // TODO: GTM, add event
    Push({
        event: 'view_cookie_preferences'
    });
};


/**
 * Submit Cookie Banner GTM Event
 * Cookies accepted Event
 *
 * This event should be fired when a user accepts cookies
 *
 * @typedef GTMSubmitCookieBannerEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMSubmitCookieBannerEvent = (props) => { // TODO: GTM, add event
    Push({
        event: 'submit_cookie_banner',
        ...props,
    });
};

/**
 * Prop definitions for {@link GTMSubmitCookieBannerEvent}
 *
 * @typedef props
 *
 * @property {Array} cookies Array of cookie details
 * @property {String} cookies.cookieType Accepted cookies by user
 */
GTMSubmitCookieBannerEvent.propTypes = {
    cookies: arrayOf(shape({
        cookieType: string.isRequired,
    })).isRequired,
};


/**
 * Open Mobile Menu GTM Event
 * Mobile Menu opened Event
 *
 * This event should be fired when a user opens mobile menu
 *
 * @typedef GTMOpenMobileMenuEvent
 * @kind functional component
 */
export const GTMOpenMobileMenuEvent = () => {
    Push({
        event: 'open_mobile_menu'
    });
};


/**
 * Close Mobile Menu GTM Event
 * Mobile Menu closed Event
 *
 * This event should be fired when a user closes mobile menu
 *
 * @typedef GTMCloseMobileMenuEvent
 * @kind functional component
 */
export const GTMCloseMobileMenuEvent = () => {
    Push({
        event: 'close_mobile_menu'
    });
};
