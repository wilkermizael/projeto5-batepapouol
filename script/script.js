axios.defaults.headers.common['Authorization'] = 'iPZD20Gl3D27ZLzrmsNtZOMX';

let searchArray = {

};

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
setInterval(searchMesageFromServer,5000);

