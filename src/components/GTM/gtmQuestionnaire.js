import { string, number } from 'prop-types';
import Push from 'utils/dataLayer';

/**
 * View Question GTM Event
 * Page Load Event
 *
 * This event should be fired when a user views a question in the questionnaire
 *
 * @typedef GTMViewQuestionEvent
 * @kind functional component
 *
 * @param {props} props React component props
 */
export const GTMViewQuestionEvent = (props) => {
    Push({
        event: 'view_question',
        ...props,
    });
};

/**
 * Prop definitions for {@link GTMViewQuestionEvent}
 *
 * @typedef props
 *
 * @property {String} question_id ID of the question in the questionnaire
 * @property {String} question_name Name of the question in the questionnaire
 * @property {String} question_category Category of the questionnaire
 * @property {Number} question_step Step of the user in the questionnaire
 */
GTMViewQuestionEvent.propTypes = {
    question_id: string.isRequired,
    question_name: string.isRequired,
    question_category: string.isRequired,
    question_step: number.isRequired,
};
