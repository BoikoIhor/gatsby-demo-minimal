import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import "../styles/questionnaire-page.scss";

export const questionnaireQuery = graphql`
  query {
    contentfulHeaderUpdated {
      logo {
        title
        file {
          url
        }
      }
    }
    allContentfulSlider(
      filter: {type: {eq: "card-banner"}, location: {eq: "questionnaire"}}
    ) {
      edges {
        node {
          type
          location
          sliderTitle
          slides {
            title
            slideImage {
              file {
                url
              }
            }
            slideButton {
              href
            }
          }
        }
      }
    }
  }
`;

const QuestionnairePage = (props) => {
    const data = useStaticQuery(questionnaireQuery);
    const { logo } = data.contentfulHeaderUpdated;
    const cards = data.allContentfulSlider.edges[0].node;

    return (
        <div>
            <Link to={"/"} className="questionnaire__header-icon">
                <img src={logo.file.url} alt={logo.title} />
            </Link>
            <div className="questionnaire__content">
                <h2 className="typography__h1">{cards.sliderTitle}</h2>
                <div className="questionnaire__card-wrapper">
                    { cards.slides.map(card => {
                        return (
                            <a href={card.slideButton.href} className="questionnaire__card">
                                <div>
                                    <img src={card.slideImage.file.url} alt={card.slideImage.title} className="questionnaire__card-img" />
                                </div>
                                <p className="typography__subtitle questionnaire__card-title">
                                    {card.title}
                                </p>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuestionnairePage;
