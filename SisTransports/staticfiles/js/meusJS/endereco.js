class Endereco{
    constructor(dados) {
        this.id=dados.id
        this.cep = dados.cep
        this.endereco = dados.logradouro
        this.numero=dados.numero
        this.complemento = dados.complemento
        this.bairro=dados.bairro
        this.cidade= dados.cidade
        this.uf=dados.uf
    }
    populaEndereco(identificacao){
        $('#cep'+identificacao).val(this.cep)
        $('#rua'+identificacao).val(this.endereco)
        $('#numero'+identificacao).val(this.numero)
        $('#complemento'+identificacao).val(this.complemento)
        $('#bairro'+identificacao).val(this.bairro)
        $('#cidade'+identificacao).val(this.cidade)
        $('#uf'+identificacao).val(this.uf)
    }
}
