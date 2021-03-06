import React from "react";
import "../css/homepage.css";
import "../css/bootstrap.css";
import "../css/accordion.css";
import { Link } from "gatsby";
import { StandardHeader } from "../ProductsComponents";
import { Footer } from "../Components";
import Recaptcha from "react-recaptcha";
import { graphql, StaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    // spread operator
    const params = props.location.search.substr(1);
    // get the state from the parameters
    const state = params
      .split(",")
      .map(pair => {
        const [attribute, value] = pair.split("=");
        return { [attribute]: value };
      })
      .reduce((prev, curr) => ({ ...curr, ...prev }), {});
    // setup the state from the query parameters
    this.state = {
      ...state,
      callback: () => {},
      verifyCallback: response => {},
    };
  }

  Form = props => {
    const object = props.object;
    return (
      <div className="bg-green-transparent app-form">
        <div className="maxer mx-auto">
          <div className="application px-4 p-128 mr-auto text-purple" id="form">
            <h4 className="text-green">Application Form</h4>
            <p className="my-4 mb-5 text-muted maxer-700">
              Fill this form to register your OER repository and get resources
              used to connect to the X5GON OER network. Once connected, we will
              identify the resources you provide and include them into our
              recommendations making it visible within the OER network.
            </p>
            <form action="/api/v1/oer_provider" method="POST">
              <div className="py-3 my-4 btb-green">
                <div className="maxer-500">
                  <p className="p2">Repository Information</p>

                  <div className="form-group">
                    <label
                      htmlFor="oer-repository-name"
                      className="ml-1 text-muted"
                    >
                      OER Repository Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="oer-repository-name"
                      name="name"
                      aria-describedby="oer-repository-name-help"
                      placeholder="Enter repository name"
                      required
                    />
                    <small
                      id="oer-repository-name-help"
                      className="form-text text-muted"
                    >
                      Name of the repository (ex. X5GON Platform)
                    </small>
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="oer-repository-domain"
                      className="ml-1 text-muted"
                    >
                      Repository Domain
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="oer-repository-domain"
                      name="domain"
                      aria-describedby="oer-repository-domain-help"
                      placeholder="Enter repository domain"
                      required
                    />
                    <small
                      id="oer-repository-domain-help"
                      className="form-text text-muted"
                    >
                      Domain where the repository resides (ex.
                      platform.x5gon.org)
                    </small>
                  </div>
                </div>
              </div>
              <p className="p2">Maintainer Information</p>
              <div className="form-group py-1 maxer-500">
                <label htmlFor="contact-email" className="ml-1 text-muted">
                  Maintainer Contact
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="contact-email"
                  name="contact"
                  aria-describedby="contact-email-help"
                  placeholder="Enter email"
                  required
                />
                <small id="contact-email-help" className="form-text text-muted">
                  Person responsible for snippet integration at your institution
                </small>
              </div>

              <Recaptcha
                sitekey="6LeC3FoUAAAAAGcI3ZGRR93q6CzMwXPMxcIbycyE"
                render="explicit"
                verifyCallback={object.verifyCallback}
                onloadCallback={object.callback}
              />

              {object.invalid ? (
                <small className="text-red">
                  You need to activate reCAPTCHA to validate you are not a
                  robot!
                </small>
              ) : object.unsuccessful ? (
                <small className="text-red">
                  The repository submitted is already in the database. Please
                  contact the project administrator for more information.
                </small>
              ) : null}

              <div className="text-muted">
                <small>
                  Already a member of the OER Network?{" "}
                  <Link to="/oer_provider" className="text-green">
                    Login
                  </Link>
                </small>
              </div>

              <button type="submit" className="button-green mt-4 px-4">
                Submit Form
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  Description = () => {
    return (
      <div className="bg-white p-128 maxer mx-auto">
        <div className="mx-lg-1 px-4 offers">
          <h4 className="maxer-880 text-purple">
            X5GON's Recommendation increases user engagement across each of your
            content pages, improving visibility of your content.
          </h4>

          <this.Accordion></this.Accordion>
        </div>
      </div>
    );
  };
  Accordion = () => {
    const contents = [
      {
        title: "What Can We Offer",
        subtitle:
          "Make the most out of your content by joining our platform and let us give you:",

        paragraphs: [
          "Cross-modal technologies for multimodal content understanding,",
          "Cross-site technologies to transparently accompany and analyse users across sites,",
          "Cross-domain technologies for cross domain content analytics,",
          "Cross-language technologies for cross lingual content recommendation,",
          "Cross-cultural technologies for cross cultural learning personalisation.",
        ],
      },
      {
        title: "How Can You Contribute",
        subtitle:
          "Get into a pact that empowers all involved OER stakeholders and allows OER sites:",

        paragraphs: [
          "To become a partner in our Global Network Partnership,",
          "To use our Connect Service as well as all other services,",
          "To give us access to content data and user behaviour data,",
          "To share content recommendations with other OER sites,",
          "To share with us the contacts of their IT managers.",
        ],
      },
      {
        title: "What Do We Promise",
        subtitle: "In return we promise:",
        paragraphs: [
          "To use the X5GON platform to ingest your content and use state of the art technologies such as machine learning, machine translation, machine quality assurance, personalisation, learning analytics, to boost your content visibility and use,",
          "To create fair and inclusive cross-pollination of content to/from other OER sites to your site,",
          "To transparently work with you, and disclose algorithms and produce you with impact metrics,",
          "To not breach any data privacy, ethics or other data and artificial intelligence related boundaries.",
        ],
      },
    ];
    return (
      <div className="accordion pt-128" id="accordionExample">
        {contents.map((object, index) => {
          const targetID = "collapse" + index + object.title.slice(0, 3);
          return (
            <div className="card" key={index}>
              <div className="card-header" id="headingOne">
                <div
                  className="btn w-100 text-left .h4"
                  data-toggle="collapse"
                  data-target={"#" + targetID}
                  aria-expanded="true"
                  aria-controls={"collapse" + targetID}
                >
                  <h4 className="mb-0 text-green">
                    {object.title}
                    <span
                      id={targetID}
                      className="float-right collapse show plus-minus"
                    ></span>
                  </h4>
                </div>
              </div>
              <div
                id={targetID}
                className="collapse"
                aria-labelledby="headingOne"
              >
                <div className="card-body">
                  <p className="text-purple-bold">{object.subtitle}</p>
                  {object.paragraphs.map((paragraph, subindex) => (
                    <p key={subindex} className="text-muted maxer-880">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <BackgroundSection>
          <StandardHeader
            object={{
              background: "bg-none",
              subheader: "CONTRIBUTE",
              product: "Join Forces",
              description:
                "We suggest a pact that empowers all involved OER sites and players.",
              button: {
                text: "Fill in the Form",
                link: "/join#form",
              },
            }}
          />
        </BackgroundSection>
        <this.Description />
        <this.Form object={this.state} />
        <Footer />
      </div>
    );
  }
}

// DUPLICATED FOR GRAPHQL SECURITY REASONS!
const BackgroundSection = props => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "join_forces_header_image.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid;
      return (
        <BackgroundImage
          Tag="section"
          className={""}
          fluid={imageData}
          backgroundColor={`none`}
        >
          {props.children}
        </BackgroundImage>
      );
    }}
  />
);
