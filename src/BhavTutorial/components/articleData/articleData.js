import { Card } from "react-bootstrap";

const articles = [
  {
    title: "Bhav If else",
    titleURL: "Bhav If else".replace(/\s+/g, "-").toLowerCase(),
    texts: [
      "There comes situations in real life when we need to make some decisions and based on these decisions, we decide what should we do next. Similar situations arises in programming also where we need to make some decisions and based on these decisions we will execute the next block of code.",
      "Decision making statements in programming languages decides the direction of flow of program execution. Decision making statements available in python are:",
      <ul>
        <li>if statement</li>
        <li>if..else statements</li>
        <li>nested if statements</li>
        <li>if-elif ladder</li>
        <li>Short Hand if statement</li>
        <li>Short Hand if-else statement</li>
      </ul>,
      <Card.Subtitle className="pt-4">
        <h4>if statement</h4>
      </Card.Subtitle>,
      "if statement is the most simple decision making statement. It is used to decide whether a certain statement or block of statements will be executed or not i.e if a certain condition is true then a block of statement is executed otherwise not.",

      <pre className="bg-light px-4 py-4">
        {"if "}
        <em>condition</em>
        {":\n\t# Statements to execute if \n\t# condition is true"}
      </pre>,
      <div>
        {
          "Here, condition after evaluation will be either true or false. if statement accepts boolean values – if the value is true then it will execute the block of statements below it otherwise not. We can use "
        }
        <em>condition</em>
        {" with bracket ‘(‘ ‘)’ also."}
      </div>,
      "As we know, python uses indentation to identify a block. So the block under an if statement will be identified as shown in the below example:",
      <pre className="bg-light px-4 py-4">
        {"if "}
        <em>condition</em>
        {
          ":\n\tstatement 1 \nstatement2\n\n# Here if the condition is true, if block \n# will consider only statement1 to be inside \n# its block."
        }
      </pre>,
      <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/if-statement.jpg"
        alt=""
        width={200}
      />,
      <Card.Subtitle className="pt-4">
        <h4>if-else</h4>
      </Card.Subtitle>,
      <div>
        {
          "The if statement alone tells us that if a condition is true it will execute a block of statements and if the condition is false it won’t. But what if we want to do something else if the condition is false. Here comes the "
        }
        <em>else</em>
        {" statement. We can use the "} <em>else</em>
        {
          " statement with if statement to execute a block of code when the condition is false."
        }
      </div>,
      <pre className="bg-light px-4 py-4">
        {"if "}
        <em>condition</em>
        {
          ":\n\t# Executes this block if \n\t# condition is true\nelse:\n\t# Executes this block if\n\tcondition is false"
        }
      </pre>,
      <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/if-else.jpg"
        alt=""
        width={200}
      />,
      "The block of code following the else statement is executed as the condition present in the if statement is false after call the statement which is not in block(without spaces).",
      <Card.Subtitle className="pt-4">
        <h4>nested-if</h4>
      </Card.Subtitle>,
      "A nested if is an if statement that is the target of another if statement. Nested if statements means an if statement inside another if statement. Yes, Python allows us to nest if statements within if statements. i.e, we can place an if statement inside another if statement.",
      <pre className="bg-light px-4 py-4">
        {"if (condition1)"}
        {
          ":\n\t# Executes when condition1 is true \n\tif (condition2):\n\t\t# Executes if condition2 is true"
        }
      </pre>,
      <img
        src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200710163548/Nested_if.jpg"
        alt=""
        width={350}
      />,
      <Card.Subtitle className="pt-4">
        <h4>if-elif-else ladder</h4>
      </Card.Subtitle>,
      "Here, a user can decide among multiple options. The if statements are executed from the top down. As soon as one of the conditions controlling the if is true, the statement associated with that if is executed, and the rest of the ladder is bypassed. If none of the conditions is true, then the final else statement will be executed.",
      <pre className="bg-light px-4 py-4">
        {"if (condition1)"}
        {
          ":\n\tstatement \nelif (condition2):\n\tstatement\n.\n.\nelse:\n\tstatement"
        }
      </pre>,
      <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/if-elseif-ladder.jpg"
        alt=""
        width={350}
      />,
    ],
  },
  {
    title: "Bhav for Loop",
    titleURL: "Bhav For Loop".replace(/\s+/g, "-").toLowerCase(),
    texts: [
      "For loops, in general, are used for sequential traversal. It falls under the category of definite iteration. Definite iterations means the number of repetitions is specified explicitly in advance.",
    ],
  },
];

export default articles;
