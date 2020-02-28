<?php 

include "template.php";
include "controllers/dbAccess.php";

date_default_timezone_set('America/Sao_Paulo');
$atualDate = date('d/m/Y');
$atualAno = date('Y');

?>
<html>
  <head>
  <link href="http://assets.locaweb.com.br/locastyle/3.10.1/stylesheets/locastyle.css" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="style.css">
  <script src="controllers/funcs.js"></script>
  </head>

  <body>

    <main>

      <div class="container-fluid">

        <div class="row">

          <!--Escolha dos meses-->
             <p style="text-align:center; color: white; font-size: 50pt;">ADICIONAR HANDLE DE SUSCESSO BANCO ALERTS</p>
              <div class="ls-tabs-btn col-md-10 col-md-offset-1 visible-md-block" id="tabs">
                <ul class="ls-tabs-btn-nav">
                  <li class="col-md-1 col-sm-4 col-xs-4 ls-active"><label class="ls-btn" data-ls-module="button" data-target="#jan" onclick="getData('01')">Jan <input type="radio" id='1' name="btn" value="01"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#fev" onclick="getData('02')">Fev <input type="radio" name="btn" value="02"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#mar" onclick="getData('03')">Mar <input type="radio" name="btn" value="03"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#abr" onclick="getData('04')">Abr <input type="radio" name="btn" value="04"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#mai" onclick="getData('05')">Mai <input type="radio" name="btn" value="05"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#jun" onclick="getData('06')">Jun <input type="radio" name="btn" value="06"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#jul" onclick="getData('07')">Jul <input type="radio" name="btn" value="07"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#ago" onclick="getData('08')">Ago <input type="radio" name="btn" value="08"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#set" onclick="getData('09')">Set <input type="radio" name="btn" value="09"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#out" onclick="getData('10')">Out <input type="radio" name="btn" value="10"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#nov" onclick="getData('11')">Nov <input type="radio" name="btn" value="11"></label></li>
                  <li class="col-md-1 col-sm-4 col-xs-4"><label class="ls-btn" data-ls-module="button" data-target="#dez" onclick="getData('12')">Dez <input type="radio" name="btn" value="12"></label></li>        
                </ul>
              </div>

          <!--Fim escolha dos meses-->

          
          <div class="col-md-6 col-sm-12 col-md-offset-1 ls-tabs-container" id="box-lanc">
          
            <div class="col-12" id="box-title">Lançamentos
              <select id="ano">
                <?php

                  for($i=2020; $i<=2025; $i++){
                    echo "<option value='". $i ."'>". $i ."</option>";
                  }
                
                ?>
              </select>
            </div>

            <div class="col-12 box-int" id="box-table">  

                <div class="col-md-12 col-xs-12 head">
                  <ul>
                    <li class="col-md-2 col-xs-5" style="margin-left: -15px;">Data</li>
                    <li class="col-md-3 col-xs-5" style="margin-left: 6px;">Categoria</li>
                    <li class="col-md-3 col-xs-5" style="margin-left: 7px;">Descrição</li>
                    <li class="col-md-1 col-xs-5" style="margin-left: 7px;">Valor</li>
                  </ul>
                </div>
                
                <div class="row">
                  <div class="col-md-12 col-xs-12 lanc">
                    <ul>
                      <label for="data" class="col-xs-5 label">Data</label>
                      <label for="categoria" class="col-xs-5 label">Categoria</label>
                      <li class="col-md-2 col-xs-5"><input name="data" id="data" style="width: 120%;" type="text" required value="<?php echo $atualDate; ?>" title="Use o formato dd/mm/aaaa"></li>
                      <li class="col-md-3 col-xs-5 "><select style="width: 120%" name="categoria" id="cat">
                      <option value="Renda">Renda</option>
                      <option value="Gastos Essenciais">Gastos Essenciais</option>
                      <option value="Gastos Não Essenciais">Gastos Não Essenciais</option>
                      <option value="Torrar">Torrar</option>
                      <option value="Investimento">Investimento</option>
                      <option value="Caixa">Caixa</option>
                      </select></li>
                      <label for="descricao" class="col-xs-5 label">Descrição</label>
                      <label for="valor" class="col-xs-5 label">Valor</label>
                      <li class="col-md-3 col-xs-5"><input name="descricao" style="width: 120%;" type="text" required ></li>
                      <li class="col-md-2 col-xs-5 "><input name="valor" id="valor" style="width: 120%;" type="text" required></li>
                      <li class="col-md-2 col-xs-2 adicionar"><a href="#" class="ls-ico-cancel-circle add"></a></li>
                    </ul>
                  </div>
                </div>      
            </div>
          </div>


          <!--Box lateral-->
          <div class="col-md-3 col-sm-12 col-md-offset-1" id="box-lanc">
            <div class="col-12" id="box-title">Renda</div>
            <div class="col-12 box-int" id="box-renda">
              <ul>
                <li>Renda</li>
                <li>R$<span id='renda'></span></li>
              </ul>
              <ul>
                <li>40%</li>
                <li>Gastos Essenciais</li>
                <li>R$<span id='ge'></span></li>
              </ul>
              <ul>
                <li>10%</li>
                <li>Gastos não essenciais</li>
                <li>R$<span id='gne'></span></li>
              </ul>
              <ul>
                <li>10%</li>
                <li>Torrar</li>
                <li>R$<span id='torrar'></span></li>
              </ul>
              <ul>
                <li>30%</li>
                <li>Investimento</li>
                <li>R$<span id='inv'></span></li>
              </ul>
              <ul>
                <li>10%</li>
                <li>Caixa</li>
                <li>R$<span id='caixa'></span></li>
              </ul>
            </div>
          </div>

        </div>

      </div>
      
    </main>

    
  <div class="ls-alert-warning" id="alert" style="display: none">
        <strong>Ops!</strong> <span id="alert-text"></span>
  </div>

    
    <script>getData('01');</script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="https://igorescobar.github.io/jQuery-Mask-Plugin/js/jquery.mask.min.js"></script>
    <script src="http://assets.locaweb.com.br/locastyle/3.10.1/javascripts/locastyle.js" type="text/javascript"></script>
    <script>
    
    jQuery("#ano").change(function(){
      var mes = $("input[name='btn']:checked").val();
      getData(mes);
    });

    jQuery('.add').click(function(){
      var mes = $("input[name='btn']:checked").val();
      salvar(mes);
    });

    $('#valor').mask('#.###.###,00', {reverse: true});
    $('#data').mask('00/00/0000');
    </script>

  </body>

</html> 