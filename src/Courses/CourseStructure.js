export default function CourseStructure(props) {
    return (
      <>
          <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header mt-1" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Week 01
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li
                          onClick={() => {
                            props.setVideo(
                              "https://drive.google.com/uc?export=download&id=1ojjs0E86zqo3l9C844fTfNT6oB-oOh4E"
                            );
                            props.setTitle("Chapter 01, Topic 01");
                          }}
                        >
                          Chapter 1 ,Topic 01
                        </li>
                        <li
                          onClick={() => {
                              props.setVideo(
                              "https://drive.google.com/uc?export=download&id=1SZoJLTK-rU7DCSoPcEvKSdzVYK68xAHx"
                            );
                            props.setTitle("Chapter 01, Topic 02");
                          }}
                        >
                          Chapter 1 ,Topic 02
                        </li>
                        <li
                          onClick={() => {
                              props.setVideo(
                              "https://drive.google.com/uc?export=download&id=1wBeaeykUaj4WpcfbQWVcMg6-NUmLTJYz"
                            );
                            props.setTitle("Chapter 01, Topic 03");
                          }}
                        >
                          Chapter 1 ,Topic 03
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header mt-1" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Week 02
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li
                          onClick={() => {
                              props.setVideo(
                              "https://drive.google.com/uc?export=download&id=1KBnqq7L-ev1tAmO9hfCbqLzEdXyavFMr"
                            );
                            props.setTitle("Chapter 02, Topic 01");
                          }}
                        >
                          Chapter 2 ,Topic 01
                        </li>
                        <li
                          onClick={() => {
                              props.setVideo(
                              "https://drive.google.com/uc?export=download&id=1KBnqq7L-ev1tAmO9hfCbqLzEdXyavFMr"
                            );
                            props.setTitle("Chapter 02, Topic 01");
                          }}
                        >
                          Chapter 2 ,Topic 02
                        </li>
                        <li
                          onClick={() => {
                              props.setVideo(
                              "https://drive.google.com/uc?export=download&id=1KBnqq7L-ev1tAmO9hfCbqLzEdXyavFMr"
                            );
                            props.setTitle("Chapter 02, Topic 01");
                          }}
                        >
                          Chapter 2 ,Topic 03
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header mt-1" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Week 03
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>Topic 01</li>
                        <li>Topic 02</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
      </>
    )
  }
  