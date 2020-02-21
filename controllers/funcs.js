soma = 0;

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
                    console.log(thisReq);
                    
                    //id = thisReq[0];

                    addBox(thisReq[1],thisReq[2],thisReq[3],thisReq[4],thisReq[5],thisReq[6]);

                    show(thisReq[7],thisReq[8],thisReq[9],thisReq[10],thisReq[11],thisReq[12]);

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
                if(data[1] == openMes){
                    addBox(data[0],data[1],data[2],descricao,categoria,valor);
                }
                calc(categoria,valor,data[1],openMes);

                let url = "models/movimentacao.php?mes=" +data[1]+ "&ano=" +data[2]+ "&cat=" +categoria+ "&valor=" +valor;
        
                req.open("Get", url, true);

                req.onreadystatechange = function() {
                    
                    // Verifica se o Ajax realizou todas as operações corretamente
                    if(req.readyState == 4 && req.status == 200) {

                    }
                }
                req.send(null);
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

    if(r){
        document.getElementById("renda").innerHTML = r;
    }
    
    if(e){
        document.getElementById("ge").innerHTML = (r * 40/100) - e;
    }

    if(n){
        document.getElementById("gne").innerHTML = (r * 10/100) - n;
    }
    
    if(t){
        document.getElementById("torrar").innerHTML = (r * 10/100) - t;
    }

    if(i){
        document.getElementById("inv").innerHTML = (r * 30/100) - i;
    }

    if(c){
        document.getElementById("caixa").innerHTML = (r * 10/100) - c;
    }

}

function addBox(diaI, mesI, anoI, descI, catI, valI){

    var div = document.createElement("div");
    var ul = document.createElement("ul");
    var date = document.createElement("li");
    var cat = document.createElement("li");
    var sep = document.createElement("li");
    var desc = document.createElement("li");
    var val = document.createElement("li");
    var edit = document.createElement("li");
    var remove = document.createElement("li");
    var hr = document.createElement("hr");

    var editA = document.createElement("a");
    var removeA = document.createElement("a");
    
    //preenche a box principal
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
    
    div.id = 'table-item';
    sep.id = 'separator';
    
    date.appendChild(document.createTextNode(diaI+"/"+mesI+"/"+anoI));
    cat.appendChild(document.createTextNode(catI));
    desc.appendChild(document.createTextNode(descI));
    val.appendChild(document.createTextNode("R$"+valI));

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
}

function calc(cat, valCalc, data, mes){

    let renda = document.getElementById('renda').innerHTML;
    let essenciais = document.getElementById('ge');
    let n_essenciais = document.getElementById('gne');
    let torrar = document.getElementById('torrar');
    let inv = document.getElementById('inv');
    let caixa = document.getElementById('caixa');
    
    valCalc = +(parseFloat(valCalc).toFixed(2));

    switch (cat) {
        case 'Renda':
            if(data == mes){
                soma = (soma + valCalc);
                var ge = (soma * 40/100) - gEssenc;
                var gne = (soma * 10/100) - gNEssenc;
                var tr = (soma * 10/100) - gTor;
                var iv = (soma * 30/100) - gInv;
                var cx = (soma * 10/100) - gCx;
            }
            console.log("Soma:"+soma+" val:"+valCalc);
        break;

        case 'Gastos Essenciais':
            var ge = (renda * 40/100) - gEssenc - valCalc; 
        break;

        case 'Gastos Não Essenciais':
            var gne = (renda * 10/100) - gNEssenc - valCalc; 
        break;

        case 'Torrar':
            var tr = (renda * 10/100) - gTor - valCalc; 
        break;

        case 'Investimento':
            var iv = (renda * 30/100) - gInv - valCalc; 
        break;

        case 'Caixa':
            var cx = (renda * 10/100) - gCx - valCalc; 
        break;
    
        default:
            break;
    }

    if(data == mes){
        if(soma || ge || gne || tr || iv || cx){
            document.getElementById('renda').innerHTML = soma;
            essenciais.innerHTML = ge;
            n_essenciais.innerHTML = gne;
            torrar.innerHTML = tr;
            inv.innerHTML = iv;
            caixa.innerHTML = cx;
        }
    }

}