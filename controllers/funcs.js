function getData(mes){

    ano = document.getElementById("ano").value;
    var box = document.getElementById("box-table");

    // Verificando Browser
    if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    let url = "models/getData.php?mes="+mes+"&ano="+ano;


    req.open("Get", url, true);

    req.onreadystatechange = function() {
        
        // Verifica se o Ajax realizou todas as operações corretamente
        if(req.readyState == 4 && req.status == 200) {
     
            var resposta = req.responseText.split(".#");
            resposta.pop();

            while (box.childElementCount > 2){
                box.removeChild(box.lastChild);
            }

            // caso a resposta seja verdadeira, ele append os dados
            if(resposta.length > 0){
    
                for(var i = 0; i < resposta.length; i++){
    
                    let thisReq = resposta[i].split(",");
                    
                    //preenche a box principal
                    let div = document.createElement("div");
                    let ul = document.createElement("ul");
                    let date = document.createElement("li");
                    let cat = document.createElement("li");
                    let sep = document.createElement("li");
                    let desc = document.createElement("li");
                    let val = document.createElement("li");
                    let edit = document.createElement("li");
                    let remove = document.createElement("li");
                    let hr = document.createElement("hr");
    
                    let editA = document.createElement("a");
                    let removeA = document.createElement("a");
    
                    div.className = 'col-md-12 col-xs-12 table-item';
                    date.className = 'col-md-2 col-xs-5';
                    cat.className = 'col-md-3 col-xs-5';
                    sep.className = 'col-xs-12';
                    desc.className = 'col-md-3 col-xs-5';
                    val.className = 'col-md-2 col-xs-4';
                    edit.className = 'col-md-1 col-xs-1';
                    remove.className = 'col-md-1 col-xs-1';
                    hr.className = 'col-md-12 col-xs-12';
                    editA.className = 'ls-ico-pencil';
                    removeA.className = 'ls-ico-remove';
    
                    sep.style.height = '13px';
                    div.style.marginLeft = '-10px';
                    
                    div.id = 'table-item-'+thisReq[0];
                    sep.id = 'separator';
                    
                    date.appendChild(document.createTextNode(thisReq[1]+"/"+thisReq[2]+"/"+thisReq[3]));
                    cat.appendChild(document.createTextNode(thisReq[5]));
                    desc.appendChild(document.createTextNode(thisReq[4]));
                    val.appendChild(document.createTextNode("R$"+thisReq[6]));
    
                    edit.appendChild(editA);
                    remove.appendChild(removeA);
    
                    ul.appendChild(date);
                    ul.appendChild(cat);
                    ul.appendChild(sep);
                    ul.appendChild(desc);
                    ul.appendChild(val);
                    ul.appendChild(edit);
                    ul.appendChild(remove);
    
                    div.appendChild(ul);
                    div.appendChild(hr);
    
                    box.appendChild(div);
                    // Fim box principal

                   calc(cat, val);

                }
            
            } else {
                let errText = document.createElement("div");
                let div0 = document.createElement("div");
                
                div0.className = "col-md-12 col-xs-12 ls-ico-thumbs-up2";

                errText.appendChild(document.createTextNode("Ops, parece que não há lançamentos neste período!"));
                div0.id = "div0";
                errText.style.textAlign = "center";

                box.appendChild(div0);
                box.appendChild(errText);
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
                getData();
            }
        }
        req.send(null);
    }

}

function calc(cat, val){

    switch (cat) {
        case Renda:
            s_renda += val;
            break;
    
        default:
            break;
    }

    //preenche a box lateral
    let renda = document.getElementById('renda');
    let essenciais = document.getElementById('ge');
    let n_essenciais = document.getElementById('gne');
    let torrar = document.getElementById('torrar');
    let caixa = document.getElementById('caixa');

    renda.innerHTML = s_renda;

}