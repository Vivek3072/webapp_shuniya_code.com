import React from "react";
import { Card, CardColumns } from "react-bootstrap";

function TestcaseData({ testCaseResults, testCaseNumber }) {
  return (
    <Card>
      <Card.Header>{`Testcase ${testCaseNumber}`}</Card.Header>
      <Card.Body>
        <>
          <Card.Text className=" my-2 test-case-data-heading">
            Testcase Status
          </Card.Text>
          <Card.Text className="my-0 p-2 test-case-data">
            {testCaseResults["test_case_" + testCaseNumber + "_status"]}
          </Card.Text>
        </>
        {testCaseResults["test_case_input_" + testCaseNumber] !== undefined && (
          <>
            <Card.Text className=" my-2 mt-4 test-case-data-heading">{`Testcase Input: `}</Card.Text>
            <Card.Text className="my-0 p-2 test-case-data">{`${atob(
              testCaseResults["test_case_input_" + testCaseNumber]
            )}`}</Card.Text>
          </>
        )}
        {testCaseResults["expected_output_" + testCaseNumber] !== undefined && (
          <>
            <Card.Text className=" my-2 mt-4 test-case-data-heading">{`Expected Output: `}</Card.Text>
            <Card.Text className="my-0 p-2 test-case-data">{`${atob(
              testCaseResults["expected_output_" + testCaseNumber]
            )}`}</Card.Text>
          </>
        )}
        {testCaseResults["test_case_user_output_" + testCaseNumber] !==
          undefined && (
          <>
            <Card.Text className=" my-2 mt-4 test-case-data-heading">{`Your Output: `}</Card.Text>
            <Card.Text className="my-0 p-2 test-case-data">{`${atob(
              testCaseResults["test_case_user_output_" + testCaseNumber]
            )}`}</Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default TestcaseData;
