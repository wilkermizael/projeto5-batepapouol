axios.defaults.headers.common['Authorization'] = 'iPZD20Gl3D27ZLzrmsNtZOMX';
//Enviar nome e verificar se é valido------------------------------------------------------
let nome={
};
function existName(erroName){
    if(erroName.status === 200){
        console.log('ok');
    }
}


function existNameError(erroName){
    if(erroName.response.status === 400){
        sendName();
    }
}


function sendName(){
    
    nome = {
      name:prompt('Digite um nome válido!')
    };
    promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nome);
    promise.then(existName);
    promise.catch(existNameError)
}
let searchArray = {

};
sendName();

//FIM---------------------------------------------------------------------------------------
let boxMesage ='';

function mesageOnPage(array){
    
    boxMesage = document.querySelector('ul');
    boxMesage.innerHTML ='';
    for( let i = 0; i < array.length; i++){
        if( array[i].status === "status"){
            
            boxMesage.innerHTML +=`
            <div class=" estilo">
                <li>
                    <div> ${array[i].time}</div>
                </li>
                
                <li>
                    <div> ${array[i].from}</div>
                </li>

                <li>
                    <div> Para: ${array[i].text}</div>
                </li>

            </div>`
        }else{

        boxMesage.innerHTML +=`
            <div class=" estilo">
                <li>
                    <div> ${array[i].time}</div>
                </li>
                
                <li>
                    <div> ${array[i].from}</div>
                </li>

                <li>
                    <div> Para: ${array[i].to}</div>
                </li>
                
                <li>
                    <div> ${array[i].text}</div>
                </li>

            </div>`};
    }
    //boxMesage.scrollTop = boxMesage.scrollHeight;
   
}

function searchMesageFromServer(){
    axios.get(' https://mock-api.driven.com.br/api/vm/uol/messages').then( function (response){
        searchArray = response.data;
        mesageOnPage(searchArray);
    });
   ;    
}
searchMesageFromServer();
setInterval(searchMesageFromServer,3000);

