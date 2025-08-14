let input = document.getElementById('inputscreen');
let buttons = document.querySelectorAll('button');

let string ="";
let arr = Array.from(buttons);

arr.forEach(buttons =>{
    buttons.addEventListener('click',(e) =>{
        if(e.target.innerHTML == '='){
            try{
                //string = string.replace(/&times;/g ,'*');
                //string = string.replace(/&divide;/g,'/');
                string = eval(string);
                input.value = string;
            }
            catch(error){
                input.value="ERROR";
            }
        }
        else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string ;
        }
        else if(e.target.innerHTML == 'DEL'){
            string = string.substring(0,string.length-1);
            input.value = string;
        }
        else{
            string += e.target.innerHTML;
            input.value = string ;
        }
      
    });
});
