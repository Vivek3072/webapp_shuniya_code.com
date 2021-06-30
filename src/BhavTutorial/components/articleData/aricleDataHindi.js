import { Card } from "react-bootstrap";
import './articleData.css';

const articlesHindi = [
  {
    title: "भव यद तद",
    titleURL: "भव यद तद".replace(/\s+/g, "-").toLowerCase(),
    texts: [
      "वास्तविक जीवन में ऐसे हालात आते हैं जब हमें कुछ निर्णय लेने की आवश्यकता होती है और इन्हीं निर्णयों के आधार पर हम तय करते हैं कि हमें आगे क्या करना चाहिए। प्रोग्रामिंग में भी ऐसी ही स्थितियाँ उत्पन्न होती हैं जहाँ हमें कुछ निर्णय लेने की आवश्यकता होती है।",
      "भव में उपलब्ध निर्णय लेने के बयान हैं:",
      <ul>
        <li>यद स्टेटमेंट</li>
        <li>यद..तद स्टेटमेंट</li>
        <li>नेस्टेड यद स्टेटमेंट</li>
      </ul>, 
      <Card.Subtitle className="pt-4">
        <h3>यद स्टेटमेंट</h3>
      </Card.Subtitle>,
      "यद स्टेटमेंट सबसे सरल है। इसका उपयोग यह तय करने के लिए किया जाता है कि एक निश्चित बयान या बयान के ब्लॉक को निष्पादित किया जाएगा या नहीं, यानी यदि कोई निश्चित बयान सत्य है तो बयान के एक ब्लॉक को निष्पादित किया जाता है अन्यथा नहीं।",
    
      <pre className="syntax">
        {"यद "}
        <em>स्थिति </em>
        {":\n\t# निष्पादित करने के लिए कथन यद \n\t# स्थिति सच है"}
      </pre>,
      <div>
        {
          "यहां, मूल्यांकन के बाद की स्थिति या तो सही होगी या गलत। यदि कथन बूलियन मान स्वीकार करता है - यदि मान सत्य है तो यह नीचे दिए गए कथनों के ब्लॉक को निष्पादित करेगा अन्यथा नहीं। हम इसका उपयोग कर सकते हैं "
        }
        <em>स्थिति</em>
        {"    ब्रैकेट '(' ')' के साथ भी।"}
      </div>,
      "जैसा कि हम जानते हैं, भव एक ब्लॉक की पहचान करने के लिए इंडेंटेशन का उपयोग करता है। तो नीचे दिए गए उदाहरण में दिखाए गए अनुसार एक if स्टेटमेंट के तहत ब्लॉक की पहचान की जाएगी:",
      <h4>सिंटेक्स </h4>,
      <pre className="syntax">
        {"यद "}
        <em>स्थिति</em>
        {
          ":\n\tस्टेटमेंट 1"
        }
      </pre>,
      <h4>उदाहरण</h4>,
      <pre className="syntax">
        {"क = 10\nयद क>=0"}
        {
          ":\n\tपश्य ('पॉजिटिव')"
        }
      </pre>,
      <h4>परिणाम</h4>,
      <pre className="output">
        {"पॉजिटिव"}
      </pre>,
      <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/if-statement.jpg"
        alt=""
        width={200}
      />,
      <Card.Subtitle className="pt-4">
        <h3>यद-तद स्टेटमेंट</h3>
      </Card.Subtitle>,
      <div>
        {
          "यद केवल हमें बताता है कि यदि कोई शर्त सत्य है तो वह कथनों के एक ब्लॉक को निष्पादित करेगा और यदि शर्त गलत है तो ऐसा नहीं होगा। लेकिन क्या होगा अगर हम कुछ और करना चाहते हैं अगर शर्त झूठी है। ये आ गया"
        }
        <em>तद</em>
        {" स्टेटमेंट . हम उपयोग कर सकते हैं"} <em>तद</em>
        {
          " स्टेटमेंट यद स्थिति गलत होने पर कोड के ब्लॉक को निष्पादित करने के लिए कथन के साथ।"
        }
      </div>,
      <pre className="card-bg">
        {"यद "}
        <em>स्थिति</em>
        {
          ":\n\t# इस ब्लॉक को निष्पादित करता है अगर \n\t# स्थिति सच है\nतद:\n\t# इस ब्लॉक को निष्पादित करता है अगर\n\t# स्थिति झूठी है"
        }
      </pre>,
      <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/if-else.jpg"
        alt=""
        width={200}
      />,
      "तद कथन के बाद कोड के ब्लॉक को निष्पादित किया जाता है क्योंकि यद कथन में मौजूद स्थिति गलत है, तो उस कथन को कॉल करें जो ब्लॉक में नहीं है (रिक्त स्थान के बिना)।",
    ],
  },
  {
    title: "Bhav for Loop",
    titleURL: "Bhav For Loop".replace(/\s+/g, "-").toLowerCase(),
    texts: [
      "The for loop is used to iterate the statements or a part of the program several times. It is frequently used to traverse the data structures like list, tuple, or dictionary.",
    ],
  },
  {
    title: "भव प्रोग्रामिंग भाषा",
    titleURL: "भव प्रोग्रामिंग भाषा".replace(/\s+/g, "-").toLowerCase(),
    texts: [
      "The for loop is used to iterate the statements or a part of the program several times. It is frequently used to traverse the data structures like list, tuple, or dictionary.",
    ],
  },
];

export default articlesHindi;