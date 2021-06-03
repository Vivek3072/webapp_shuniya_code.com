import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function QuizResultsModal({ percentage }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {percentage > 0.8
            ? `You scored ${(percentage * 100).toFixed(2)}%. You passed!`
            : `You scored ${(percentage * 100).toFixed(
                2
              )}%. You failed. Try again.`}
          {/* {`You scored ${(percentage * 100).toFixed(2)}%. You passed!`} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QuizResultsModal;
