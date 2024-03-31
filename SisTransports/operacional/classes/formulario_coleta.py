from datetime import datetime
import webbrowser
from django.conf import settings
from weasyprint import HTML
import base64


def get_image_base64(imagem_path):
    """
    Converte uma imagem em base64.

    Args:
        imagem_path (str): O caminho para o arquivo da imagem.

    Returns:
        str: A representação da imagem em base64.
    """
    with open(imagem_path, "rb") as image_file:
        base64_image = base64.b64encode(image_file.read()).decode("utf-8")
        return f"data:image/jpeg;base64,{base64_image}"

def imprimir_documento(coletas):
    """
    Gera um documento PDF contendo informações sobre coletas.

    Args:
        coletas (list): Lista de dicionários representando informações de coletas.

    Returns:
        str: O nome do arquivo PDF gerado.

    Raises:
        Exception: Se ocorrer um erro ao abrir o navegador para exibir o PDF.
    """
    margem_esquerda = "10mm"
    margem_direita = "10mm"
    margem_superior = "0mm"
    margem_inferior = "0mm"

    # HTML content for the PDF
    html_content = f"""
        <html>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            <style>
                @page {{
                    size: letter;
                    margin-left: {margem_esquerda};
                    margin-right: {margem_direita};
                    margin-top: {margem_superior};
                    margin-bottom: {margem_inferior};
                }}
                body {{
                    font-family: Arial, monospace;
                }}
                #logo{{
                    margin-top:15px;
                      width : 200px; 
                      height : 40px;
                }}
                .titulo-empresa{{
                    text-align: left; /* Adiciona a propriedade text-align para centralizar o texto */
                    margin: 0 auto; 
                    font-weight: bold;
                    padding:10px;

                }}
                .texto-descricao{{
                    font-size: 12px;
                    text-align: left; /* Adiciona a propriedade text-align para centralizar o texto */
                    margin: 0 auto; 
                    padding:10px;

                }}
                .texto-descricao-coleta{{
                    font-size: 10px;
                    text-align: rigth;
                    margin-right:30px; 
                }}
                .bordaRemetenteDestinatario{{
                    border-style:solid;
                    margin:5px;
                    padding:10px;
                    border-width:0.5px;
                    border-radius: 10px;

                }}
                .remetente-destinatario{{
                    font-size: 12px;
                    text-align: left;
                    margin: 0 auto; 
                }}
                .numero-coleta{{
                    text-align: right;
                    font-weight: bold;
                }}
                .titulo{{
                    text-align: left;
                    font-weight: bold;
                }}

            .divisao {{
                margin-top: 10px;
                border-top: 1px dashed black;
                width: 100%; /* Ou a largura desejada */
            }}
            .negrito {{
                font-weight: bold;
            }}
            .coleta-numero {{
                font-size:15px;
            }}
            </style>
        </head>
        <body>
    """

    for coleta in coletas:
        imagem_path = settings.STATIC_ROOT.joinpath("images/logonorte.jpg")
        data_hora_original = coleta['data_cadastro']
        data_hora_obj = datetime.strptime(data_hora_original, '%Y-%m-%d %H:%M:%S')
        data_hora_formatada = data_hora_obj.strftime('%d/%m/%Y %H:%M')

        titulo_empresa = f"""
            <h5 class="titulo-empresa">Serafim Tranportes De Cargas Ltda - EPP</h5>
            <p class="texto-descricao">Rua: Nova Veneza , 172<br/>Cidade Industrial Satelite - Guarulhos - SP<br/>Fone 11-2481-9121/11-91349-9161</p>
        """

        tipo_frete = "CIF"
        if coleta['tipoFrete'] == 2:
            tipo_frete = "FOB"
        elif coleta['tipoFrete'] == 3:
            tipo_frete = "CONSIGNATÁRIO"

        dados_coleta = f"""
            <h6 class="texto-descricao-coleta coleta-numero negrito ">Coleta Nº #{coleta['id']} </h6>
            <p class="texto-descricao-coleta">Data : {data_hora_formatada}
            Emitido por:{coleta['usuario_cadastro']} <br/>Tipo Frete : {tipo_frete}</p><br/>
        """

        remetente = f"""
            <h6>Remetente: {coleta.get('remetente', {}).get('raz_soc', 'Não Informado')[:25]}</h6>
            <p class="remetente-destinatario"> {coleta['coleta']['rua']}, {coleta['coleta']['numero']} <br/></p>
            <p class="remetente-destinatario"> {coleta['coleta']['bairro']} {coleta['coleta']['complemento']}<br/></p>
            <p class="remetente-destinatario"> {coleta['coleta']['cidade']},{coleta['coleta']['uf']} Cep : {coleta['coleta']['cep']} <br/></p>                        
            <p class="remetente-destinatario">Solicitante : {coleta['coleta']['nome']} Fone : {coleta['coleta']['contato']}</p>
        """

        destinatario = f"""
            <h6>Destinatário : {coleta.get('destinatario', {}).get('raz_soc', 'Não Informado')[:25]}</h6>
            <p class="remetente-destinatario"> {coleta.get('destinatario', {}).get('endereco_fk', {}).get('logradouro', 'Não Informado')}, {coleta.get('destinatario', {}).get('endereco_fk', {}).get('numero', '')}<br/></p>
            <p class="remetente-destinatario"> {coleta.get('destinatario', {}).get('endereco_fk', {}).get('bairro', 'Não Informado')}<br/></p>
            <p class="remetente-destinatario"> {coleta.get('destinatario', {}).get('endereco_fk', {}).get('cidade', 'Não Informado')}- {coleta.get('destinatario', {}).get('endereco_fk', {}).get('uf', 'Não Informado')} Cep :{coleta.get('destinatario', {}).get('endereco_fk', {}).get('cep', '')}</p>
        """


        dados_gerais = f"""
            <h6 class="titulo">Dados da carga : </h6>
            <h7>Volumes : {coleta['coleta']['volume']} Peso : {coleta['coleta']['peso']}  M³ : {coleta['coleta']['cubM3']} Valor :R$ {coleta['coleta']['valor']} </h7><br/>                        
            <h7>Notas Fiscais : {coleta['coleta']['notaFiscal']} Horario de Coleta : {coleta['coleta']['horario']}</h7><br/> 
            <h7>Veículo :<span> {coleta['coleta']['veiculo']} Espécie : {coleta['coleta']['especie']} Mercadoria : {coleta['coleta']['valor']}  </span></h7><br/>
            <h7>Observação : {coleta['coleta']['observacao']}</h7>
        """

        # Get base64 representation of the image
        base64_image = get_image_base64(imagem_path)

        # Adicione uma quebra de página antes de cada novo registro
        html_content += f"""
            <div class="row" style="page-break-before: always;">
                <div class="col-12">
                    <img src="{base64_image}" id="logo">
                </div>
                <div class="col-8">
                    {titulo_empresa}
                </div>
                <div class="col-4 numero-coleta">
                    <br/>
                    {dados_coleta}
                </div>
                <div class="col-12 bordaRemetenteDestinatario">
                    <div class="row">
                        <div class="col-6 ">
                            {remetente}
                        </div>
                        <div  class="col-6 ">
                            {destinatario}
                        </div>
                    </div>
                </div>
                <div class="col-12 bordaRemetenteDestinatario">
                    <div class="row">
                        <div class="col-12">
                            {dados_gerais}
                        </div>
                    </div>
                </div>

                <div class="divisao col-12"></div>

                <div class="col-12">
                    <img src="{base64_image}" id="logo">
                    <br/>
                </div>
                <div class="col-8">
                    <br/>
                    {titulo_empresa}
                </div>
                <div class="col-4 numero-coleta">
                    <br/>
                    {dados_coleta}
                </div>
                <div class="col-12 bordaRemetenteDestinatario">
                    <div class="row">
                        <div class="col-6 ">
                            {remetente}
                        </div>
                        <div  class="col-6 ">
                            {destinatario}
                        </div>
                    </div>
                </div>
                <div class="col-12 bordaRemetenteDestinatario">
                    <div class="row">
                        <div class="col-12">
                            {dados_gerais}
                        </div>
                    </div>
                </div>                
            </div>            
        """

    html_content += """
        </body>
        </html>
    """

    # Output PDF
    pdf_filename = "pedido_frete_weasyprint.pdf"
    HTML(string=html_content).write_pdf(pdf_filename)


    try:
        webbrowser.open(pdf_filename)
    except Exception as e:
        print(f"Erro ao abrir o PDF: {e}")

    return pdf_filename


if __name__ == "__main__":
    # Este bloco será executado somente quando o script for executado diretamente.
    # Pode ser útil para testes ou execução independente.
    pdf_filename = imprimir_documento()
    print(f"PDF gerado com sucesso: {pdf_filename}")

