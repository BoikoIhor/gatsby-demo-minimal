import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { ReactSVG } from "react-svg";
import { ToastContainer } from "react-toastify";
import { useStaticQuery, graphql } from "gatsby";

import { GTMViewQuestionEvent } from 'components/GTM/gtmQuestionnaire';
import IndexProvider from "context";
import { useWindow } from "context/windowContext";
import { useCustomer } from "context/customerContext";

import RadioField from "components/UI/Inputs/RadioField";
import Checkbox from "components/UI/Inputs/Checkbox";
import Button from "components/UI/button";
import CheckoutProvider from "context/checkoutContext";
import CheckoutSteps from "components/UI/Checkout/checkoutSteps";
import QuestionnaireProductCard from "components/UI/Questionnaire/questionnaireProductCard";
import QuestionnaireFileUpload from "components/UI/Questionnaire/questionnaireFileUpload";
import AuthForm from "components/UI/authForm";

import informationIcon from 'images/svg/information-icon.svg';
import backButtonIcon from 'images/svg/back-button-icon.svg';
import questionnaireLoader from 'images/gif/loader-gif.gif';

import 'styles/checkout-page.scss';
import 'styles/questionnaire.scss';

export const headerQuery = graphql`
  query {
    contentfulHeaderUpdated {
      logo {
        title
        file {
          url
        }
      }
    }
  }
`;

const Questionnaire = (props) => {
  return (
    <>
      <IndexProvider>
          <QuestionnaireTemplate {...props}/>
      </IndexProvider>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        draggable
        theme="light"
      />
    </>
  )
}

const QuestionnaireTemplate = ({pageContext}) => {
  const { questions, category, products } = pageContext;
  const numQuestions = questions.fields?.length || 0;
  const data = useStaticQuery(headerQuery);

  const [answers, setAnswers] = useState([questions.id]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(questions.fields[0].ref);
  const [prevQuestions, setPrevQuestions] = useState([questions.fields[0].ref]);
  const [currentSku, setCurrentSku] = useState(null);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const [stepIndex, setStepIndex] = useState(1);
  const progress = stepIndex / numQuestions;

  const textAreaRef = useRef(null);
  const { localStorage } = useWindow();
  const { customerData } = useCustomer();

  const {
    logo,
  } = data.contentfulHeaderUpdated;

  const handleBackButton = () => {
    const prevQuestionIndex = prevQuestions.pop();

    setAnswers(prevAnswers => prevAnswers.slice(0, -1));
    setCurrentQuestionIndex(prevQuestionIndex);
    setPrevQuestions([...prevQuestions]);
  };

  const handleCheckout = () => {
    setAnswers((previousAnswers) => {
      return [...previousAnswers, {questionTitle: "Product", answer: "Finished", color: ""}]
    })

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsCheckout(true);
    }, 1500)
  }

  let checkedChoices = [];
  const handleSubmitButtonClick = (title, ref, index) => {
    handleAnswerSelect(title, ref, checkedChoices.join(', '), index);
  };

  const handleAnswerSelect = (questionTitle, questionIndex, answer, answerIndex) => {
    setIsLoading(true);

    setTimeout(() => {
      questions.logic.map((question) => {
        if (question.ref === questionIndex) {
          const transitions = question.actions.filter(action => action.action === 'jump');
          const colors = question.actions.filter(action => action.action === 'set' && action.details.target.value === 'color');
          const products = question.actions.filter(action => action.action === 'set' && action.details.target.value === 'product');

          let  color;
          question.actions.map((action) => {
            if (action.condition.op == 'always')
              setCurrentQuestionIndex(transitions[0].details.to.value);
            else
              setCurrentQuestionIndex(transitions[answerIndex]?.details.to.value);

            if (colors.length != 0) {
              color = colors[answerIndex].details.value.value;
            }

            if (products.length === 1) {
              setCurrentSku(products[0].details.value.value);
            }
            else if (products.length > 1) {
              setCurrentSku(products[answerIndex].details.value.value);
            }
          });

          setAnswers((previousAnswers) => {
            return [...previousAnswers, {questionTitle, answer: answer, color: color ?? ""}]
          })
          setStepIndex(stepIndex + 1);
          setPrevQuestions(prevQuestions => [...prevQuestions, currentQuestionIndex]);
        }
      });

      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    setCurrentProduct(products.filter(product => product.variants.some(variant => variant.sku === currentSku)));
  }, [currentSku]);

  useEffect(() => {
    console.log("Answers:", answers);

    localStorage.setItem('answers', JSON.stringify(answers));

    if (answers.length > 1 && answers.find(obj => obj.answer === "Finished")) {
      const response = axios
          .post('/api/external_server/save_pdf', {answers, customerData})
          .then(response =>
              localStorage.setItem('questionnaire_file_url', response.data.file_url)
          );
    }
  }, [answers])

  useEffect(() => {
    const { ref, title } = questions.fields.find(question => question.ref === currentQuestionIndex)
    GTMViewQuestionEvent({
      question_id: ref,
      question_name: title,
      question_category: category,
      question_step: stepIndex,
    });
  }, [stepIndex])

  return (
    <body>
      <div>
        <a className="questionnaire__header-icon">
          <img src={logo.file.url} alt={logo.title} />
        </a>
        {isCheckout ? (
          <div className="questionnaire__wrapper--checkout">
            <CheckoutProvider>
              <div className="checkout__wrapper">
                  <CheckoutSteps/>
              </div>
            </CheckoutProvider>
          </div>
        ) : (
          <div className={`questionnaire__wrapper`}>
            <div className={`questionnaire__loader ${isLoading ? 'show' : ''}`}>
              <p className="typography__p">We're on it</p>
              <h3 className="typography__h3">Let's help to find right treatment</h3>
              <img className="questionnaire__loader-img" src={questionnaireLoader} alt="Loading..." />
            </div>

            <div className={`questionnaire__progressbar ${isLoading ? 'display-none' : ''}`}>
              {Array.from({length: 7}).map((_, index) => (
                <div key={index} className={`questionnaire__progressbar--${index <= progress * 7 ? "filled" : ""}`}></div>
              ))}
            </div>

            {prevQuestions.length > 1 && (
                <button className={`questionnaire__back-button ${isLoading ? 'display-none' : ''}`}
                  onClick={handleBackButton}
                >
                <ReactSVG src={backButtonIcon} />
                <span className="typography__small">vorige</span>
              </button>
            )}

            {questions.fields?.map((item) => {
              if (item.ref === currentQuestionIndex) {
                return (
                  <div key={item.ref} className={isLoading ? 'display-none' : 'questionnaire__content-wrapper'}>
                    {(item.type !== 'statement' && item.type !== 'website' && item.type !== 'email') && (
                      <div>
                        <h2 className="typography__h3 questionnaire__title">
                          {item.title}
                        </h2>
                        <button className="typography__small questionnaire__subtitle">
                          <ReactSVG className="questionnaire__information-icon" src={informationIcon} />
                          <span>waarom vragen jullie dit?</span>
                          <div className="questionnaire__information-tooltip typography__small">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere unde deleniti molestiae explicabo quos maxime praesentium sit! Natus, in.
                            </p>
                          </div>
                        </button>
                      </div>
                    )}
                    {item.type === 'multiple_choice' && (
                      <>
                        {item.properties.allow_multiple_selection ? (
                          <div className="questionnaire__checkbox">
                            {item.properties.choices.map((choice, choiceIndex) => (
                                <Checkbox
                                  key={choiceIndex}
                                  className="form__checkbox"
                                  name="answer"
                                  value={choice.label}
                                  required={true}
                                  onChange={(event) => {
                                    const isChecked = event.target.checked;
                                    if (isChecked) {
                                      checkedChoices.push(choice.label);
                                    } else {
                                      const indexToRemove = checkedChoices.indexOf(choice.label);
                                      if (indexToRemove !== -1) {
                                        checkedChoices.splice(indexToRemove, 1);
                                      }
                                    }
                                  }}
                                />
                            ))}
                            <Button
                              className="questionnaire__button"
                              value="Submit"
                              type="dark"
                              isArrowShow={true}
                              onClick={() => {
                                handleSubmitButtonClick(item.title, item.ref, 0);
                              }}
                            />
                          </div>
                        ) : (
                          item.properties.choices.map((choice, choiceIndex) => (
                            <RadioField
                              key={choiceIndex}
                              className="form__radio"
                              name="answer"
                              value={choice.label}
                              required={true}
                              onChange={() => {
                                handleAnswerSelect(item.title, item.ref, choice.label, choiceIndex);
                              }}
                            />
                          ))
                        )}
                      </>
                    )}
                    <div className="questionnaire__image-choice-wrapper">
                      {item.type === 'picture_choice' && item.properties?.choices?.map((choice, choiceIndex) => (
                        <div className="questionnaire__image-choice" onClick={() => { handleAnswerSelect(item.title, item.ref, choice.label, choiceIndex) }}>
                          <img className="questionnaire__image-choice-picture" src={choice.attachment.href} alt={`Choice image ${choiceIndex}`} />
                          <p className="typography__p">{choice.label}</p>
                        </div>
                      ))}
                    </div>
                    {item.type === 'statement' && (
                      <div>
                        <h2 className="typography__h3 questionnaire__title">{item.title}</h2>
                        <button className="typography__small questionnaire__subtitle questionnaire__subtitle--statement">
                          <ReactSVG className="questionnaire__information-icon" src={informationIcon} />
                          <span>waarom vragen jullie dit?</span>
                          <div className="questionnaire__information-tooltip typography__small">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum facere unde deleniti molestiae explicabo quos maxime praesentium sit! Natus, in.
                            </p>
                          </div>
                        </button>
                        <ul className="typography__p--inter questionnaire__statement">
                          {item.properties.description?.split('•').map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                        <Button
                          value="Continue"
                          type="dark"
                          isArrowShow={true}
                          onClick={() => { handleAnswerSelect(item.title, item.ref, "OK", 0) }}
                        />
                      </div>
                    )}
                    {item.type === 'yes_no' && (
                      <div>
                        { item.properties.description && (
                          <ul className="typography__p--inter questionnaire__yes-no">
                            {item.properties.description?.split('•').map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        )}
                        <RadioField
                          className={'form__radio'}
                          name={'answer'}
                          value="Yes"
                          required={true}
                          onChange={() => { handleAnswerSelect(item.title, item.ref, "Yes", 0) }}
                        />
                        <RadioField
                          className={'form__radio'}
                          name={'answer'}
                          value="No"
                          required={true}
                          onChange={() => { handleAnswerSelect(item.title, item.ref, "No", 1) }}
                        />
                      </div>
                    )}
                    {item.type === 'long_text' && (
                      <div>
                        <textarea
                          type='text'
                          placeholder="Type your answer here"
                          className="questionnaire__textarea"
                          ref={textAreaRef}
                        />
                        <Button
                          value="Continue"
                          type="dark"
                          isArrowShow={true}
                          onClick={() => { handleAnswerSelect(item.title, item.ref, textAreaRef.current.value, 0) }}
                        />
                      </div>
                    )}
                    {item.type === 'short_text' && (
                      <div>
                        <input
                          type='text'
                          placeholder="Type your answer here"
                          className="questionnaire__text-field"
                          ref={textAreaRef}
                        />
                        <Button
                          value="Continue"
                          type="dark"
                          isArrowShow={true}
                          onClick={() => {
                            handleAnswerSelect(
                              item.title,
                              item.ref,
                              textAreaRef.current.value,
                              0
                            );
                          }}
                        />
                      </div>
                    )}
                    {item.type === 'dropdown' && (
                      <div>
                        <Button
                          value="Dropdown"
                          type="dark"
                          isArrowShow={true}
                          onClick={() => { handleAnswerSelect(item.title, item.ref, "OK", 0) }}
                        />
                      </div>
                    )}
                    {item.type === 'email' && (
                      Object.keys(customerData).length > 0 ? (
                        <>
                          <h3 className="typography__h3 questionnaire__title">
                                Welcome {customerData.first_name} {customerData.last_name}. You're already logged!
                          </h3>
                          <Button
                            className='bottom-banner__button'
                            value="Continue"
                            type="dark"
                            isArrowShow={true}
                            onClick={() => { handleAnswerSelect(item.title, item.ref, "Client logged", 0) }}
                          />
                        </> 
                      ) : (
                        <AuthForm
                          isQuestionnaire
                          afterAuth={() => {
                            handleAnswerSelect(item.title, item.ref, "Client logged", 0);
                          }}
                        ></AuthForm>
                      )
                    )}

                    {item.type === 'file_upload' && (
                      <div>
                        <QuestionnaireFileUpload
                          onClick={() => { handleAnswerSelect(item.title, item.ref, "File", 0) }}
                        />
                      </div>
                    )}
                    {item.type === 'website' && (
                      <div>
                        <h2 className="typography__h3 questionnaire__title ">
                          {item.title}
                        </h2>
                        { currentSku != "" && currentProduct.length > 0 ? (
                          <QuestionnaireProductCard
                            questionnaireSku = {currentProduct[0].variants?.find(
                              (el) => el.sku === currentSku
                            )?.id}
                            currentProduct={currentProduct}
                            onClick={handleCheckout}
                          />
                        ) : (
                          <Button
                            className='bottom-banner__button'
                            value="Continue"
                            type="dark"
                            isArrowShow={true}
                            href={item.properties?.description}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )
              } else {
                return null;
              }
            })}
          </div>
        )}
      </div>
    </body>
  );
};

export default Questionnaire;
