axios.defaults.headers.common['Authorization'] = 'iPZD20Gl3D27ZLzrmsNtZOMX';
//Enviar nome e verificar se é valido------------------------------------------------------
let nome={
};
let nameUsuario ='';
let verificaNome ={};
let existe;
function existName(resposta){
        if (resposta.status === 200){
    
        searchMesageFromServer()
        setInterval(searchMesageFromServer,3000);
        
    }
}

function existNameError(resposta){
    let statusCode = resposta.response.status;
    if( statusCode === 400){
        window.location.reload();
    }else if( statusCode ===200){
        //console.log("Tudo certo");
    }
}

function sendName(){
    nameUsuario = prompt('Digite um nome válido');
    nameUsuario = nameUsuario;
    nome = {
      name: nameUsuario
    };
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants',nome);
    promise.then(existName);
    promise.catch(existNameError);
}
let searchArray = {
    
};
sendName()

//ENVIANDO STATUS DE ONLINE PARA O SERVIDOR---------------------------------------------------------------------------------------

function statusOnline (){
    
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nome);
    promise.then(statusOk);
    promise.catch(statusErro);
}

function statusOk(resposta){
    if(resposta.data === 'OK'){
    console.log('Deu muito Bom')};
}

function statusErro(resposta){
    if(resposta.response.data === 400){
    console.log('Status erro');}
}
setInterval(statusOnline, 5000);

//Enviando Mensagens para o chat-----------------------------------------------------------------------------------------------------

function sendMessage(resposta){
    
    if(resposta.status === 200){
        console.log("Mensagem enviada ao servidor");
        document.querySelector('Form').reset();
    }
    
}

function sendMesageErro(resposta){
    console.log(resposta);
    
}

let messageInput = '';
let messageToServer = {};
function messageFromInput(){
    
    messageInput = document.querySelector('input').value;
    // Enviar para o servidor
    messageToServer ={
        from: nome.name,
        to: "Todos",
        text: messageInput,
        type: "message"
    }
    const promise =axios.post('https://mock-api.driven.com.br/api/vm/uol/messages',messageToServer);
    promise.then(sendMessage);
    promise.catch(sendMesageErro);
    

    // Buscar mensagens atualizadas
    
}
//ENVIANDO MENSAGEM COM ENTER-----------------------------------------------------------------------------------------------------------------------------------
let input = document.querySelector('.input-click');

input.addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        document.querySelector('.icon').click;
        messageFromInput();
    }
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------------


let boxMesage ='';
let messageArray = '';
function mesageOnPage(resposta){
    messageArray = resposta.data;

    boxMesage = document.querySelector('ul');
    boxMesage.innerHTML ='';
    for( let i = 0; i < messageArray.length; i++){
            if(messageArray[i].text === 'entra na sala...' ||messageArray[i].text === 'sai da sala...' ){
                boxMesage.innerHTML +=`
                <div data-test="message" class=" estilo gray">
                    <li>
                        <div> ${messageArray[i].time}</div>
                    </li>
                    
                    <li>
                        <div> ${messageArray[i].from}</div>
                    </li>
    
                    <li>
                        <div> ${messageArray[i].text}</div>
                    </li>
    
                </div>`

            }else if(messageArray[i].type ==='private_message'){
                boxMesage.innerHTML +=`
            <div data-test="message" class=" estilo pink">
                <li>
                    <div> ${messageArray[i].time}</div>
                </li>
                
                <li>
                    <div> ${messageArray[i].from}</div>
                </li>
                <li>
                    <div> reservadamente para: ${messageArray[i].to}</div>
                </li>
                <li>
                    <div> ${messageArray[i].text}</div>
                </li>
            </div>`}else{
            boxMesage.innerHTML +=`
            <div data-test="message" class=" estilo">
                <li>
                    <div> ${messageArray[i].time}</div>
                </li>
                
                <li>
                    <div> ${messageArray[i].from}</div>
                </li>
                <li>
                    <div>para: ${messageArray[i].to}</div>
                </li>
                <li>
                    <div> ${messageArray[i].text}</div>
                </li>
            </div>`}
        
    }
}


// Trazendo as mensagens do servidor para  a tela do Usuário
function searchMesageFromServer(){
    let promise = {};
    promise = axios.get(' https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then(mesageOnPage);
    //promise.catch(mesageOnPageErro);        
}
// Enviando mensagem com o Enter

