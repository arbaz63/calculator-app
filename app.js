
var txtField = document.getElementById('show');
var output = document.getElementById('show-output');
document.getElementById('show').focus();

function display(txt) {
    txtField.value += txt;
    console.log(txt)
    // textField1+=txt;
    if (txt === 'C') {
        document.getElementById('show').focus();
        txtField.value = "";
        // textField1=""
        output.value="";
        return false;
    }
}

let history={};
let variables={};

//executed when equals to btn is clicked
const answer=()=> {
    var txt
    //for removing spaces
    txtField.value=txtField.value.replace(/\s/g, '')
    //preprocessing before evaluation
    var cos = txtField.value.replace(/\bcos\b/g, "Math.cos");
    var sin = cos.replace(/\bsin\b/g, "Math.sin");
    var tan = sin.replace(/\btan\b/g, "Math.tan");
    var PI = tan.replace(/\bPI\b/g, "3.14");
    var Eular = PI.replace(/\bE\b/g, "2.7182");
    var sqrt = Eular.replace(/\bsqrt\b/g, "Math.sqrt");
    
    var variable="";
    const keys = Object.keys(variables);
    keys.forEach((key,index)=>{
            var re = new RegExp(key, "g");
            // console.log('sqrt')
            sqrt = sqrt.replace(re, variables[key]);
            // console.log(variables[key]) 
    })
    // console.log(variable)
        try {
            txt = eval(sqrt);
            //add to history
            var ul = document.getElementById("history");
            var li = document.createElement("li");
            var h2 = document.createElement("h2");
            var button = document.createElement("button");
            h2.textContent=txtField.value;
            button.innerText="X";
            h2.setAttribute('onClick','addToExp(this)')
            h2.setAttribute('id','hh')
            button.setAttribute('onClick','remove(this)')
            li.appendChild(h2)
            li.appendChild(button)
            ul.appendChild(li)
            output.value = txt;
            history={...history,[txtField.value]:txt}
            console.log(history)
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
        var ul = document.getElementById("variables");
        var li = document.createElement("li");
        var name = document.createElement("h2");
        var value = document.createElement("h2");
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
// var textField1="";
function addVariableExp(element){
    txtField.value+=element.textContent
    // console.log(textField1)
}
function hideVariable(){
    document.getElementById('variableDiv').style.display = "none";
}