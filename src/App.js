import React, {useState} from 'react'
import Wrapper from './components/Wrapper'
import Input from './components/Input'
import Button from './components/Button'

const App = () => {
    const [text, setText] = useState('')
    const [result, setResult] = useState('')

    const BtnList = [
        { display: "7" , value: 7, classes: "numButtonStyles"},
        { display: "8" , value: 8, classes: "numButtonStyles"},
        { display: "9" , value: 9, classes: "numButtonStyles"},
        { display: "/" , value: "/", classes: "opButtonStyles"},
        { display: "4" , value: 4, classes: "numButtonStyles"},
        { display: "5" , value: 5, classes: "numButtonStyles"},
        { display: "6" , value: 6, classes: "numButtonStyles"},
        { display: "X" , value: "*", classes: "opButtonStyles"},
        { display: "1" , value: 1, classes: "numButtonStyles"},
        { display: "2" , value: 2, classes: "numButtonStyles"},
        { display: "3" , value: 3, classes: "numButtonStyles"},
        { display: "+" , value: "+", classes: "opButtonStyles"},
        { display: "0" , value: 0, classes: "numButtonStyles"},
        { display: "." , value: ".", classes: "numButtonStyles"},
        { display: "=" , value: "=", classes: "opButtonStyles"},
        { display: "-" , value: "-", classes: "opButtonStyles"},
        { display: "DEL", value: "DEL", classes: "op2ButtonStyles"},
        { display: "C", value: "C", classes: "op2ButtonStyles"}
    ]

    const onSymbolClick = (val) => {
      const lastChar = text[text.length - 1];
      if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(val)) {
        // If the clicked button is an operator, update the text state to append the operator
        setText((prevText) => prevText.slice(0, -1) + val);
      } else if (val === '=') {
        // If the clicked button is "=", evaluate the expression and update the result state
        try {
          let result = eval(text);
          if (!Number.isInteger(result) && result.toString().split('.')[0].length < 6) {            
            result = parseFloat(result.toPrecision(8));
          }
          else if (result.toString().length > 10 ) {
            result = result.toExponential(4); // Convert to exponential notation with 2 decimal places
          }
          setResult(result.toString());     
        } catch (error) {
          setResult('Error');
          console.log(error)
        }
      } else if (val === 'C') {
        // If the clicked button is "C", clear the input and result
        setText('');
        setResult('');
      } else if (val === 'DEL') {
        // If the clicked button is "DEL", remove the last character from the input
        setText((prevText) => prevText.slice(0, -1));
      } else {
        // If the clicked button is a number or "." or an operator, append it to the input text
        if (['+', '-', '*', '/'].includes(val)) {
          let result = eval(text);
          if (!Number.isInteger(result) && result.toString().split('.')[0].length < 6) {
            
            result = parseFloat(result.toPrecision(8));
          }
          else if (result.toString().length > 10 ) {
            result = result.toExponential(4); // Convert to exponential notation with 2 decimal places
          }
          setResult(result.toString());
        }
        setText((prevText) => prevText + val);
      }
    }

  return (
    <Wrapper>
      <Input text={text? text: 0} result={result ? result: 0}></Input>
      <div className='buttonBox'>
        {BtnList.map((item) => <Button key={item.display} symbol={item.value} classes={item.classes} handleClick={() => onSymbolClick(item.value)}/>)}
      </div>
    </Wrapper>
  )
}

export default App