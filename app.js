
var txtField = document.getElementById('show');
var output = document.getElementById('show-output');
document.getElementById('show').focus();

function display(txt) {
    txtField.value += txt;
    if (txt === 'C') {
        document.getElementById('show').focus();
        txtField.value = "";
        output.value="";
        return false;
    }
}

let history={};
let variables={};

function operate(s,arr, index, op1, op2)
{
    switch(s)
    {
        case "+":
          {
            arr[index - 1] = (op1 + op2).toString();
            arr.splice(index, 2);
            break;
          }
        case "-":
          {
            arr[index - 1] = (op1 - op2).toString();
            arr.splice(index, 2);
            break;
          }
        case "*":
          {
            arr[index - 1] = (op1 * op2).toString();
            arr.splice(index, 2);
            break;
          }
        case "/":
          {
            arr[index - 1] = (op1 / op2).toString();
            arr.splice(index, 2);
            break;
          }
        case "^":
          {
            arr[index - 1] = Math.pow(op1, op2).toString();
            arr.splice(index, 2);
            break;
          }
        case "sin":
          {
            op1 = (op1 * Math.PI) / 180;
            arr[index] = Math.sin(op1).toString();
            arr.splice(index + 1, 1);
            break;
          }
        case "cos":
        {
          op1 = (op1 * Math.PI) / 180;
          arr[index] = Math.cos(op1).toString();
          arr.splice(index + 1, 1);
          break;
        }
        case "tan":
        {
          op1 = (op1 * Math.PI) / 180;
          arr[index] = Math.tan(op1).toString();
          arr.splice(index + 1, 1);
          break;
        }
        case "sqrt":
        {
          arr[index] = Math.sqrt(op1).toString();
          arr.splice(index + 1, 1);
          break;
        }
    }
}
  
function calculate(expArray) {
  console.log('calculate',expArray)
  let i = 0;
  let op1 = 0;
  let op2 = 0;
  let value = 0;
  while (i < expArray.length) {
    char = expArray[i];
      if (expArray[i] == "sin" ||expArray[i] == "cos" ||expArray[i] == "tan" ||expArray[i] == "sqrt"
      ) {
        value = parseFloat(expArray[i + 1]);
        console.log('value',expArray)
        operate(expArray[i],expArray,i, value, 0);
        i -= 1;
        
        continue
      }
      if (expArray[i] == "/"||expArray[i] == "*"||expArray[i] == "^") {
        op1 = parseFloat(expArray[i - 1]);
        console.log(i)
        op2 = parseFloat(expArray[i + 1]);
        operate(expArray[i],expArray, i, op1, op2);
        i -= 1;
        continue;
      } 
    i += 1;
  }
  i = 0;
  while (i < expArray.length) {
      if (expArray[i] == "+"||expArray[i] == "-") {
        op1 = parseFloat(expArray[i - 1]);
        op2 = parseFloat(expArray[i + 1]);
        operate(expArray[i],expArray, i,op1, op2);
        continue;
      }
    i += 1;
  }
  return expArray;
}

//executed when equals to btn is clicked
const answer=(str)=> {
    //for removing spaces
    txtField.value=str||txtField.value.replace(/\s/g, '')
    let s=txtField.value
    s = s.replace(/\bPI\b/g, "3.14");
    s = s.replace(/\bE\b/g, "2.7182");
    //replacing variables with their values
    const keys = Object.keys(variables);
    keys.forEach((key,index)=>{
            var re = new RegExp(key, "g");
            s = s.replace(re, variables[key]);
    })
    let splitted=[]
    splitted=s.split(/[\+ \* \/ \( \) \^  -]/)
    let ops=[]
    let combine=[]
    for(let o=0;o<s.length;o++)
    {
        if(s[o]=='+'||s[o]=='-'||s[o]=='*'||s[o]=='/'||s[o]=='^'||s[o]=='('||s[o]==')')
        {
            ops.push(s[o])
          }
        }
        for(let com=0;com<splitted.length+ops.length;com++)
        {
            combine.push(splitted[com])
            combine.push(ops[com])
    }
    let i = "new expression"
    //since It came with spaces, I changed it to don't have any space
    combine=combine.filter((item) => item != "")
    combine=combine.filter((item) => item != undefined)
    expArray= combine;
    //calculating whole expression
    try {
    for (let j = 0; j < expArray.length; j++) {
      if (expArray[j] == "(") {
        for (let k = j; k < expArray.length; k++) {
          expArray[j] = expArray[k];
          if (expArray[j] == ")") {
            let parnArr = [...expArray.slice(j + 1, k)];
            expArray[j] = calculate(parnArr);
            expArray.splice(j + 1, k - j);
            break;
          }
        }
      }
    }
    
    output.value=isNaN(calculate(expArray))?'Syntax Error':calculate(expArray);
    //add to history
    let ul = document.getElementById("history");
    let li = document.createElement("li");
    let h2 = document.createElement("h2");
    let button = document.createElement("button");
    h2.textContent=txtField.value;
    button.innerText="X";
    h2.setAttribute('onClick','addToExp(this)')
    h2.setAttribute('id','hh')
    button.setAttribute('onClick','remove(this)')
    li.appendChild(h2)
    li.appendChild(button)
    ul.appendChild(li)
    history={...history,[s]:output.value}
    } catch (error) {
        output.value = "Syntax error";
    }
}
//history
function displayDivs(){
    document.getElementById('historyDiv').style.display = "block";
    document.getElementById('variableDiv').style.display = "block";
}
function hideHistory(){
    document.getElementById('historyDiv').style.display = "none";
}
function remove(element)
{
 console.log(element.parentNode.parentNode.removeChild(element.parentNode))
}

function addToExp(element)
{
    txtField.value=element.textContent
    output.value=history[element.textContent]
}

//variables
function addVariable()
{
    var temp=document.getElementById('vName').value
    var temp1=document.getElementById('vValue').value
    if((Object.keys(variables).indexOf(temp)===-1)&&(temp!="")&&(temp1!="")&&(temp!="sin")&&(temp!="cos")&&(temp!="tan")&&(temp!="sqrt")&&(temp!="e")&&(temp!="PI"))
    {
      let ul = document.getElementById("variables");
      let li = document.createElement("li");
      let name = document.createElement("h2");
      let value = document.createElement("h2");
        name.textContent=document.getElementById('vName').value;
        value.textContent=document.getElementById('vValue').value
        name.setAttribute('onClick','addVariableExp(this)')
        li.appendChild(name)
        li.appendChild(value)
        ul.appendChild(li)
    
        variables={...variables,[name.textContent]:value.textContent}
        //make inputs null
        document.getElementById('vName').value="";
        document.getElementById('vName').focus();
        document.getElementById('vValue').value="";

    }
}
function addVariableExp(element){
    txtField.value+=element.textContent
}
function hideVariable(){
    document.getElementById('variableDiv').style.display = "none";
}