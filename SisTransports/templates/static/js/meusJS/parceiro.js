  class Parceiro {
    constructor(cnpj,sufixo) {
      this.cnpj=cnpj
      this.sufixo = sufixo;
    }

    async sendPostRequest(url, onSuccess = () => {}) {
      if (this.cnpj != '') {
        if (validateDocumentNumber(this.cnpj)) {
          let postData = $("form").serialize();
          postData += "&cnpj_cpf=" + this.cnpj;
          try {
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: postData,
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            // Chama o callback de sucesso com o resultado da requisição
            onSuccess(result);
          } catch (error) {
            console.error(error);
            alert("Erro interno !");
          }
        } else {
          alert("CPF/CNPJ Inválido !");
        }
      }
    }
    getWsParceiro=async()=>{
      this.sendPostRequest('/parceiros/searchPartnerWs/',this.populaAPartirMdl);
    }

    readParceiro= async ()=>{
      await this.sendPostRequest("/parceiros/readParceiro/", this.carregaDados);
    } 
    
    createParceiro=()=>{
      this.sendPostRequest('/parceiros/createParceiro/',this.responseCreate);
    }

    responseCreate=async(response) =>{
      switch (response.status) {
        case 200:
          alert('Parceiro cadastrado com sucesso !')
          break;
        case 201:
          alert('Parceiro alterado com sucesso !')
          break;
        case 300:
            alert('Cnpj inválido !')
            break;          
        default:
          alert('Cod Erro : ' + response.status)
          break;

      }
    }
    
    carregaDados= async (response)=>{
      this.status=response.status
      switch (this.status) {
        case 200:
          this.id = response.parceiro.id;
          this.raz_soc = response.parceiro.raz_soc;
          this.cnpj = response.parceiro.cnpj_cpf;
          this.inscr = response.parceiro.insc_est;
          this.fantasia = response.parceiro.nome_fantasia;
          this.obs = response.parceiro.observacao;
          this.cep = response.parceiro.endereco_fk.cep;
          this.rua=response.parceiro.endereco_fk.logradouro
          this.complemento=response.parceiro.endereco_fk.complemento
          this.numero=response.parceiro.endereco_fk.numero
          this.bairro =response.parceiro.endereco_fk.bairro
          this.cidade=response.parceiro.endereco_fk.cidade
          this.uf=response.parceiro.endereco_fk.uf
          this.contatos=response.contatos
          this.tabelas=response.tabelas
          this.populaCampos()
          break;
        case 404 :
          alert('Parceiro nao cadastrado!')
          break;
        default:
          alert('Erro interno')
          break;
      }
    }
  
    populaCampos= async () => {
      $('#insc' + this.sufixo).val(this.inscr);
      $('#fantasia' + this.sufixo).val(this.fantasia);
      $('#razao' + this.sufixo).val(this.raz_soc);
      $('#cep' + this.sufixo).val(this.cep);
      $('#rua' + this.sufixo).val(this.rua);
      $('#numero' + this.sufixo).val(this.numero);
      $('#complemento' + this.sufixo).val(this.complemento);
      $('#bairro' + this.sufixo).val(this.bairro);
      $('#cidade' + this.sufixo).val(this.cidade);
      $('#uf' + this.sufixo).val(this.uf);
    }

   limparCamposDtc=()=> {
      $('#cnpj' + this.sufixo).val('');
      $('#insc' + this.sufixo).val('');
      $('#fantasia' + this.sufixo).val('');
      $('#razao' + this.sufixo).val('');
      $('#cep' + this.sufixo).val('');
      $('#rua' + this.sufixo).val('');
      $('#numero' + this.sufixo).val('');
      $('#complemento' + this.sufixo).val('');
      $('#bairro' + this.sufixo).val('');
      $('#cidade' + this.sufixo).val('');
      $('#uf' + this.sufixo).val('');
    }

    populaAPartirMdl= (result)=>{
      this.status=result.status
      switch (this.status) {
        case 200:
          $('#cnpjMdl').val(result.parceiro.cnpj_cpf)
          $('#razaoMdl').val(result.parceiro.raz_soc)
          $('#insc_estMdl').val(result.parceiro.insc_est)
          $('#fantasiaMdl').val(result.parceiro.nome_fantasia)
          $('#obsMdl').val(result.parceiro.observacao)
    
          $('#cepMdl').val(result.parceiro.endereco_fk.cep)
          $('#ruaMdl').val(result.parceiro.endereco_fk.logradouro)
          $('#numeroMdl').val(result.parceiro.endereco_fk.numero)
          $('#complementoMdl').val(result.parceiro.endereco_fk.complemento)
          $('#bairroMdl').val(result.parceiro.endereco_fk.bairro)
          $('#cidadeMdl').val(result.parceiro.endereco_fk.cidade)     
          $('#ufMdl').val(result.parceiro.endereco_fk.uf) 
          this.populaContatos(result.contatos)
          this.populaTabelas(result.tabelas)  
          break;
        case 404 :

          break;
        default:
          alert('Erro interno')
          break;
      }
      }

      populaTabelas=(response)=>{
        if(response != 'undefined'){
          limpaTabela('#relatorioTabelaParceiro td')
          const data = response;
          let template
          for (let i = 0; i < data.length; i++) {
              template = '<tr class="tr" id="' + data[i].id + '">' +
                  '<td>' + data[i].id + '</td>' +
                  '<td>' + data[i].descricao + '</td>' +
                  '<td>' + data[i].freteMinimo + '</td>' +
                  '<td>' + data[i].adValor + '</td>' +
                  '<td>' + data[i].gris + '</td>' +
                  '<td>' + data[i].despacho + '</td>' +
                  '<td>' + data[i].pedagio + '</td>' +
                  '<td>' + data[i].gris + '</td>' +
                  '<td>' + data[i].outros + '</td>' +
                  '<td><button type="button" class="btn btn-dark ' +
                  'btn-rounded btn-icon" id="exclui"><i class="ti-trash"></i></button></td>' +
                  '<td><button type="button" class="btn btn-dark ' +
                  'btn-rounded btn-icon" id="altera"><i class="ti-new-window"></i></button></td>' +
                  '</tr>'
              $('#relatorioTabelaParceiro tbody').append(template)
            }  
        }
       }

    populaMdl=()=>{
      $('#cnpjMdl').val(this.cnpj)
      $('#razaoMdl').val(this.raz_soc)
      $('#insc_estMdl').val(this.inscr )
      $('#fantasiaMdl').val(this.fantasia)
      $('#obsMdl').val(this.obs)

      $('#cepMdl').val(this.cep )
      $('#ruaMdl').val(this.rua)
      $('#numeroMdl').val(this.numero)
      $('#complementoMdl').val(this.complemento)
      $('#bairroMdl').val(this.bairro)
      $('#cidadeMdl').val(this.cidade)     
      $('#ufMdl').val(this.uf) 
      this.populaContatos(this.contatos)  
    }
  
    openModalParceiro=()=>{
      $('#mdlCadParceiros').show();
      this.populaMdl()

    }  

    aguardaMdl=()=>{
      $('#cnpjMdl').val('Carregando ...')
      $('#razaoMdl').val('Carregando ...')
      $('#insc_estMdl').val('Carregando ...')
      $('#fantasiaMdl').val('Carregando ...')
      $('#obsMdl').val('Carregando ...')

      $('#cepMdl').val('Carregando ...' )
      $('#ruaMdl').val('Carregando ...')
      $('#numeroMdl').val('Carregando ...')
      $('#complementoMdl').val('Carregando ...')
      $('#bairroMdl').val('Carregando ...')
      $('#cidadeMdl').val('Carregando ...')     
      $('#ufMdl').val('Carregando ...') 
    }

    carregaParceiroMdl=()=>{
      this.sendPostRequest('/parceiros/readParceiro/',this.populaAPartirMdl);
    } 

    deleteParceiro=()=>{
      this.sendPostRequest('/parceiros/deleteParceiro/');
    }
    updateParceiro=()=>{
      this.sendPostRequest('/parceiros/updateParceiro/');
    }
    limpaDados=()=>{
      this.id = ''
      this.raz_soc = ''
      this.cnpj = ''
      this.inscr = ''
      this.fantasia = ''
      this.obs = ''

      this.cep = ''
      this.rua=''
      this.complemento=''
      this.numero=''
      this.bairro =''
      this.cidade=''
      this.uf=''

      this.contatos=''

    }

    populaContatos=(listaContatos)=>{
      populaContatos(listaContatos)
    }

    //   buscacidades(){
    //     const estado = 'AC'; // altere para o estado desejado
    //     const apiUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;

    //     fetch(apiUrl)
    //       .then(response => response.json())
    //       .then(cidades => {
    //         console.log(cidades); // lista de cidades do estado selecionado
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });

    //   }
  
    }