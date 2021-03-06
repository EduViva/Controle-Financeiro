soma=0, ge=0, gne=0, tr=0, iv=0, cx=0;

function getData(mes){

    ano = document.getElementById("ano").value;
    box = document.getElementById("box-table");


    // Verificando Browser
    if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    let url = "models/getData.php?mes="+mes+"&ano="+ano;
    let url2 = "models/getMov.php?mes="+mes+"&ano="+ano;

    req.open("Get", url, true);

    req.onreadystatechange = function() {
        
        // Verifica se o Ajax realizou todas as operações corretamente
        if(req.readyState == 4 && req.status == 200) {
            
            var resposta = req.responseText.split(".#");
            resposta.pop();
            console.log(resposta);

            while (box.childElementCount > 2){
                box.removeChild(box.lastChild);
            }

            // caso a resposta seja verdadeira, ele append os dados
            if(resposta.length > 0){
                
                for(var i = 0; i < resposta.length; i++){
    
                    let thisReq = resposta[i].split(",");

                    addBox(thisReq[0],thisReq[1],thisReq[2],thisReq[3],thisReq[4],thisReq[5],thisReq[6]);

                }
            
            } else {
                let errText = document.createElement("div");
                let div0 = document.createElement("div");
                
                div0.className = "col-md-12 col-xs-12 ls-ico-thumbs-up2";

                errText.appendChild(document.createTextNode("Ops, parece que não há lançamentos neste período!"));
                div0.id = "div0";
                errText.style.textAlign = "center";
                errText.style.margin = "20px";
                div0.style.fontSize = "2em";
                div0.style.marginBottom = "25px";

                box.appendChild(div0);
                box.appendChild(errText);
            }

        }
    }
    req.send(null);

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Botando movimentação na tela//////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

    // Verificando Browser
    if(window.XMLHttpRequest) {
        req2 = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        req2 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    req2.open("Get", url2, true);

    req2.onreadystatechange = function() {
        
        // Verifica se o Ajax realizou todas as operações corretamente
        if(req2.readyState == 4 && req2.status == 200) {
            
            if(req2.responseText){
            
                let thisReq = req2.responseText.split(",");
                                 
                show(thisReq[1],thisReq[2],thisReq[3],thisReq[4],thisReq[5],thisReq[6]);
            
            } else {
                show(0,0,0,0,0,0);
            }
        }
    }
    req2.send(null);
    
}

function salvar(openMes){

    let data = document.querySelector("[name='data']").value;
    let descricao = document.querySelector("[name='descricao']").value;
    let categoria = document.querySelector("[name='categoria']").value;
    let valor = document.querySelector("[name='valor']").value;

    let alert = document.querySelector("[id='alert']");
    
    if(!data || !descricao || !categoria || !valor){
       
        alert.style.display = "block";
        document.getElementById('alert-text').innerHTML = "Preencha os dados antes de salvar!";
    
    } else {

        alert.style.display = "none";

        data = data.split("/");
        valor = valor.replace(".","");
        valor = valor.replace(",",".");
        
        //retirando apresentador tabela vazia
        if(document.getElementById("div0")){
            box.removeChild(box.lastChild);
            box.removeChild(box.lastChild);
        }

        // Verificando Browser
        if(window.XMLHttpRequest) {
            req = new XMLHttpRequest();
            req2 = new XMLHttpRequest();
        }
        else if(window.ActiveXObject) {
            req = new ActiveXObject("Microsoft.XMLHTTP");
            req2 = new ActiveXObject("Microsoft.XMLHTTP");
        }

        let url = "models/lancamento.php?dia=" +data[0]+ "&mes=" +data[1]+ "&ano=" +data[2]+ "&desc=" +descricao+ "&cat=" +categoria+ "&valor=" +valor;
        
        req.open("Get", url, true);

        req.onreadystatechange = function() {
            
            // Verifica se o Ajax realizou todas as operações corretamente
            if(req.readyState == 4 && req.status == 200) {
                
                savedId = req.responseText;

                /////////////////////////
                //Salvando movimentação//
                /////////////////////////
                
                let url2 = "models/movimentacao.php?mes=" +data[1]+ "&ano=" +data[2]+ "&cat=" +categoria.toLowerCase()+ "&valor=" +valor;
                console.log(url2);
                req2.open("Get", url2, true);

                req2.onreadystatechange = function() {
                    
                    // Verifica se o Ajax realizou todas as operações corretamente
                    if(req2.readyState == 4 && req2.status == 200) {
                        if(data[1] == openMes){
                            addBox(savedId,data[0],data[1],data[2],descricao,categoria,valor);
                            getMov(data[1], data[2]);
                        }
                    }
                }
                req2.send(null);
            }
        }
        req.send(null);
        document.querySelector("[name='data']").value = data[0]+"/"+data[1]+"/"+data[2];
        document.querySelector("[name='descricao']").value = "";
        document.querySelector("[name='valor']").value = "";
    }

}

function show(r, e, n, t, i, c){

    gEssenc = e;
    gNEssenc = n;
    gTor = t;
    gInv = i;
    gCx = c;

    document.getElementById("renda").innerHTML = r;    
    document.getElementById("ge").innerHTML = (r * 40/100) - e;
    document.getElementById("gne").innerHTML = (r * 10/100) - n;
    document.getElementById("torrar").innerHTML = (r * 10/100) - t;
    document.getElementById("inv").innerHTML = (r * 30/100) - i;
    document.getElementById("caixa").innerHTML = (r * 10/100) - c;
    
}

function addBox(idI, diaI, mesI, anoI, descI, catI, valI){

    var div = document.createElement("div");
    var ul = document.createElement("ul");
    var date = document.createElement("li");
    var cat = document.createElement("li");
    var sep = document.createElement("li");
    var desc = document.createElement("li");
    var val = document.createElement("li");
    var remove = document.createElement("li");
    var hr = document.createElement("hr");

    var removeA = document.createElement("a");
    
    //preenche a box principal
    div.className = 'col-md-12 col-xs-12 table-item';
    date.className = 'col-md-2 col-xs-5 date';
    cat.className = 'col-md-3 col-xs-5 cat';
    sep.className = 'col-xs-12';
    desc.className = 'col-md-3 col-xs-5 desc';
    val.className = 'col-md-2 col-xs-4 val';
    remove.className = 'col-md-1 col-xs-1 remove';
    hr.className = 'col-md-12 col-xs-12';
    removeA.className = 'ls-ico-remove';

    sep.style.height = '13px';
    div.style.marginLeft = '-10px';
    
    div.id = 'table-item-'+idI;
    sep.id = 'separator';
    
    date.appendChild(document.createTextNode(diaI+"/"+mesI+"/"+anoI));
    cat.appendChild(document.createTextNode(catI));
    desc.appendChild(document.createTextNode(descI));
    val.appendChild(document.createTextNode("R$"+valI));

    remove.appendChild(removeA);

    ul.appendChild(date);
    ul.appendChild(cat);
    ul.appendChild(sep);
    ul.appendChild(desc);
    ul.appendChild(val);
    ul.appendChild(remove);

    div.appendChild(ul);
    div.appendChild(hr);

    box.appendChild(div);
    removeA.addEventListener('click', () => excluir(idI));
    // Fim box principal
}

function getMov(mes, ano){
    
    // Verificando Browser
    if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    let url = "models/getMov.php?mes="+mes+"&ano="+ano;

    req.open("Get", url, true);

    req.onreadystatechange = function() {
        
        // Verifica se o Ajax realizou todas as operações corretamente
        if(req.readyState == 4 && req.status == 200) {
            
            let thisReq = req.responseText.split(",");
                
            show(thisReq[1],thisReq[2],thisReq[3],thisReq[4],thisReq[5],thisReq[6]);
            
        }
    }
    req.send(null);
}

function excluir(id){

    let ok = confirm("Deseja excluir este lançamento?"); 

    if(ok){
        
        //Excluindo do banco

        if(window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        let url = "models/delete.php?id="+id;

        req.open("Get", url, true);

        req.onreadystatechange = function() {
            // Verifica se o Ajax realizou todas as operações corretamente
            if(req.readyState == 4 && req.status == 200) {
                
                let excluirDiv = document.getElementById(`table-item-${id}`);
                excluirDiv.parentNode.removeChild(excluirDiv);
            
                let item = excluirDiv.innerHTML;

                let exCat = item.split('cat">');
                exCat = exCat[1].split("</li");
                console.log('cat = '+exCat[0]);

                let exData = item.split('date">');
                exData = exData[1].split("</li");
                exData = exData[0].split('/');
                console.log(exData);
                
                let exVal = item.split('val">');
                exVal = exVal[1].split("</li");
                exVal = exVal[0].split('$');   
                console.log(exVal[1]);

                exVal = exVal[1] - (exVal[1]*2);
                console.log('result: '+exVal);

                let url2 = "models/movimentacao.php?mes=" +exData[1]+ "&ano=" +exData[2]+ "&cat=" +exCat[0].toLowerCase()+ "&valor=" +exVal;
                console.log(url2);
                
                req2.open("Get", url2, true);

                req2.onreadystatechange = function() {
                    
                    // Verifica se o Ajax realizou todas as operações corretamente
                    if(req2.readyState == 4 && req2.status == 200) {
                        getMov(exData[1], exData[2]);
                    }
                }
                req2.send(null);

            }
        }
        req.send(null);

    }

}