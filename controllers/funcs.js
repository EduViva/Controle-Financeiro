function getData(mes){

    ano = document.getElementById("ano").value;

    // Verificando Browser
    if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    let url = "../models/listarBrindes.php?total="+total;


    req.open("Get", url, true);

    req.onreadystatechange = function() {
        

        // Verifica se o Ajax realizou todas as operações corretamente
        if(req.readyState == 4 && req.status == 200) {
     
            var resposta = req.responseText;
            

            // caso a resposta seja verdadeira, ele recarrega a página
            if(resposta){
                window.location.reload();
            } else {
                console.log("Esperando atualização..");
            }

        }
    }
    req.send(null);
}

function salvar(){

    let data = document.querySelector("[name='data']").value;
    let descricao = document.querySelector("[name='descricao']").value;
    let categoria = document.querySelector("[name='categoria']").value;
    let valor = document.querySelector("[name='valor']").value;


    let alert = document.querySelector("[id='alert']");
    
    if(!data || !descricao || !categoria || !valor){
       
        alert.style.display = "block";

       
    } else {

        alert.style.display = "none";

        data = data.split("/");
        

        console.log(data + "..." + descricao + "..." + categoria + "..." + valor);

        // Verificando Browser
        if(window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        }
        else if(window.ActiveXObject) {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }

        let url = "models/lancamento.php?dia=" +data[0]+ "&mes=" +data[1]+ "&ano=" +data[2]+ "&desc=" +descricao+ "&cat=" +categoria+ "&valor=" +valor;
        
        req.open("Get", url, true);

        req.onreadystatechange = function() {
            

            // Verifica se o Ajax realizou todas as operações corretamente
            if(req.readyState == 4 && req.status == 200) {
        
            }
        }
        req.send(null);
    }

}