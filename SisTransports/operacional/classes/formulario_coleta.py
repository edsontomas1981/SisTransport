from datetime import datetime
import webbrowser
from django.conf import settings
from weasyprint import HTML
import base64


def get_image_base64(imagem_path):
    with open(imagem_path, "rb") as image_file:
        base64_image = base64.b64encode(image_file.read()).decode("utf-8")
        return f"data:image/jpeg;base64,{base64_image}"

def imprimir_documento(coletas):
    # Ajuste as margens como desejado
    margem_esquerda = "20mm"
    margem_direita = "20mm"
    margem_superior = "20mm"
    margem_inferior = "20mm"

    # HTML content for the PDF
    html_content = f"""
        <html>
        <head>
            <style>
                @page {{
                    size: letter;
                    margin-left: {margem_esquerda};
                    margin-right: {margem_direita};
                    margin-top: {margem_superior};
                    margin-bottom: {margem_inferior};
                }}
                body {{
                    font-family: Courier, monospace;
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
            <br/><br/><font size='14' color='black'>Serafim Tranportes De Cargas Ltda - EPP</font><br/>
            <font size='11'>Rua: Nova Veneza , 172<br/>Cidade Industrial Satelite - Guarulhos - SP<br/>Fone 11-2481-9121/11-91349-9161</font>
        """

        tipo_frete = "CIF"
        if coleta['tipoFrete'] == 2:
            tipo_frete = "FOB"
        elif coleta['tipoFrete'] == 3:
            tipo_frete = "CONSIGNATÁRIO"

        dados_coleta = f"""
            <font size='16' color='black'>Ordem de Coleta Nº {coleta['id']} </font><br/><br/>
            <font size='12' color='black'>Data de Solicitação: {data_hora_formatada}<br/>
            Emitido por:{coleta['usuario_cadastro']}<br/></font>
            <font size='11' color='black'>Tipo Frete : {tipo_frete}</font><br/>
        """

        remetente = f"""
            <font size='14' color='black'>Remetente:</font><br/><br/>
            <font size='11' color='black'>Razão Social : {coleta['remetente']['raz_soc'][:25]}</font><br/>
            <!-- Remaining remetente content... -->
        """

        destinatario = f"""
            <font size='14' color='black'>Destinatário :</font><br/><br/>
            <font size='11' color='black'>Razão Social : {coleta['destinatario']['raz_soc']}</font><br/>
            <!-- Remaining destinatario content... -->
        """

        dados_gerais = f"""
            <font size='14' color='black'>Dados da carga : </font><br/>
            <br/>
            <!-- Remaining dados_gerais content... -->
        """

 # Get base64 representation of the image
        base64_image = get_image_base64(imagem_path)

        # Adicione uma quebra de página antes de cada novo registro
        html_content += f"""
            <div style="page-break-before: always;">
                <img src="{base64_image}" width="150" height="30" style="float: left;">
                <div style="float: left; margin-left: 10px;">
                    {dados_coleta}
                    {titulo_empresa}
                </div>
                <div style="clear: both;"></div>
            </div>
            <hr style="border-top: 1px dashed black; margin-top: 5px; margin-bottom: 5px;">
            <div>
                <div style="float: left; width: 50%;">
                    {remetente}
                </div>
                <div style="float: left; width: 50%;">
                    {destinatario}
                </div>
                <div style="clear: both;"></div>
            </div>
            <div>
                {dados_gerais}
            </div>
            <hr style="border-top: 1px dashed black; margin-top: 5px; margin-bottom: 5px;">
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


    return pdf_filename

if __name__ == "__main__":
    pdf_filename = imprimir_documento()
    print(f"PDF gerado com sucesso: {pdf_filename}")




# from datetime import datetime
# import webbrowser
# from django.conf import settings
# from reportlab.lib.pagesizes import letter
# from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, PageBreak
# from reportlab.lib import colors
# from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
# from reportlab.platypus.frames import Frame
# from reportlab.platypus.flowables import KeepTogether
# from reportlab.platypus.doctemplate import _addGeneratedContent
# from reportlab.platypus.doctemplate import PageTemplate
# from reportlab.platypus import HRFlowable
# from reportlab.platypus import Table, TableStyle




# class TableContent(KeepTogether):
#     def __init__(self, table_data, style):
#         self.table = Table(table_data, style=style)
#         KeepTogether.__init__(self, [self.table])

#     def getKeepWithNext(self):
#         return True

# def imprimir_documento(coletas):
#     pdf_filename = "pedido_frete_reportlab.pdf"

#     # Ajuste as margens como desejado
#     margem_esquerda = 20
#     margem_direita = 20
#     margem_superior = 20
#     margem_inferior = 20

#     # Defina as dimensões da página e as margens
#     width, height = letter

#     doc = SimpleDocTemplate(pdf_filename, pagesize=(width, height), leftMargin=margem_esquerda, rightMargin=margem_direita, topMargin=margem_superior, bottomMargin=margem_inferior)

#     # Inicializa a folha de estilos
#     styles = getSampleStyleSheet()

#     # Adiciona negrito ao estilo BodyText
#     styles.add(ParagraphStyle(name='BodyTextBold', parent=styles['BodyText'], fontWeight='Bold'))
    
#     fonte_dados = "Courier"

#     # Conteúdo do PDF
#     content = []
#     for i, coleta in enumerate(coletas):
#         imagem_path = settings.STATIC_ROOT.joinpath("images/logonorte.jpg")
#         data_hora_original = coleta['data_cadastro']
#         data_hora_obj = datetime.strptime(data_hora_original, '%Y-%m-%d %H:%M:%S')
#         data_hora_formatada = data_hora_obj.strftime('%d/%m/%Y %H:%M')

#         logo = Image(imagem_path, width=150, height=30, hAlign='LEFT')

#         titulo_empresa = f"<br/><br/><font size='14' face={fonte_dados}  color='black'>Serafim Tranportes De Cargas Ltda - EPP</font><br/><font size='11' face={fonte_dados}>Rua: Nova Veneza , 172<br/>Cidade Industrial Satelite - Guarulhos - SP<br/>Fone 11-2481-9121/11-91349-9161</font>"
        
#         tipo_frete = "CIF"

#         if coleta['tipoFrete'] ==2:
#             tipo_frete = "FOB"
#         elif coleta['tipoFrete'] ==3:
#             tipo_frete = "CONSIGNATÁRIO"

#         dados_coleta = f"""
#                     <font size='16' face={fonte_dados} color='black'>Ordem de Coleta Nº {coleta['id']} </font><br/><br/>
#                     <font size='12' face={fonte_dados} color='black'>Data de Solicitação: {data_hora_formatada}<br/>
#                     Emitido por:{coleta['usuario_cadastro']}<br/></font>
#                     <font size='11' face={fonte_dados}  color='black'>Tipo Frete : {tipo_frete}</font><br/>"""


#         remetente = f"""<font size='14' face={fonte_dados}  color='black'>Remetente:</font><br/><br/>
#                         <font size='11' face={fonte_dados}  color='black'>Razão Social : {coleta['remetente']['raz_soc'][:25]}</font><br/>
#                         <font size='11' face={fonte_dados}> {coleta['coleta']['rua']}, {coleta['coleta']['numero']} Cep : {coleta['coleta']['cep']} <br/></font>
#                         <font size='11' face={fonte_dados}>  {coleta['coleta']['complemento']} {coleta['coleta']['bairro']}<br/></font>
#                         <font size='11' face={fonte_dados}>  {coleta['coleta']['cidade']}, {coleta['coleta']['uf']}<br/></font>                        
#                         <font size='11' face={fonte_dados}  color='black'>Solicitante : {coleta['coleta']['nome']} Fone : {coleta['coleta']['contato']}</font><br/>
#                         """
        
#         destinatario = f"""<font size='14' face={fonte_dados}  color='black'>Destinatário :</font><br/><br/>
#                         <font size='11' face={fonte_dados}  color='black'>Razão Social : {coleta['destinatario']['raz_soc']}</font><br/>
#                         <font size='11' face={fonte_dados}> {coleta['destinatario']['endereco_fk']['logradouro']}, {coleta['destinatario']['endereco_fk']['numero']} 
#                                                             Cep :{coleta['destinatario']['endereco_fk']['cep']} <br/></font>
#                         <font size='11' face={fonte_dados}> {coleta['destinatario']['endereco_fk']['bairro']}<br/></font>
#                         <font size='11' face={fonte_dados}>  {coleta['destinatario']['endereco_fk']['cidade']}- {coleta['destinatario']['endereco_fk']['uf']}<br/></font>
#                         <font size='11' face={fonte_dados}><br/></font>                        
#                         """
        
#         dados_gerais = f"""
#                         <font size='14' face={fonte_dados} color='black'>Dados da carga : </font><br/>
#                         <br/>
#                         <font size='12' face={fonte_dados} color='black'>Veículo : {coleta['coleta']['veiculo']}</font><br/>
#                         <font size='12' face={fonte_dados} color='black'>Volumes : {coleta['coleta']['volume']}   
#                         Peso : {coleta['coleta']['peso']}  </font><br/>
#                         <font size='12' face={fonte_dados} color='black'>M³ : {coleta['coleta']['cubM3']}   
#                         Valor :R$ {coleta['coleta']['valor']}  </font><br/>                        
#                         <font size='12' face={fonte_dados} color='black'>Espécie : {coleta['coleta']['especie']}   
#                         Mercadoria : {coleta['coleta']['valor']}  </font><br/>
#                         <font size='12' face={fonte_dados} color='black'>Notas Fiscais : {coleta['coleta']['notaFiscal']}   
#                         Horario de Coleta : {coleta['coleta']['horario']}</font><br/> 
#                         <font size='12' face={fonte_dados} color='black'>Observação : {coleta['coleta']['observacao']}</font><br/>                         
#                         """
#         # Seu primeiro conjunto de dados
#         header = [
#             [[logo],[Paragraph(dados_coleta, styles['BodyText'])]],
#             [[Paragraph(titulo_empresa, styles['BodyText'])]],
#         ]

#         pontilhado = [
#             [],
#             [HRFlowable(width='100%', color='black', thickness=1, lineCap='round', dash=(2, 2), spaceBefore=5, spaceAfter=5)]
#         ]

#         # Seu primeiro conjunto de dados
#         separador = [
#                 [HRFlowable(width='100%', color='black', spaceBefore=5, spaceAfter=5)]          
#         ]

#         remetente_destinatario = [
#             [Paragraph(remetente, styles['BodyText']), Paragraph(destinatario, styles['BodyText'])],
#         ]

#         dados_mercadoria = [
#             [Paragraph(dados_gerais, styles['BodyText'])]
#         ]


#         # Estilo da tabela
#         table_style = [('VALIGN', (0, 0), (-1, -1), 'TOP')]

#         # Cria a tabela com os dados e aplica estilos
#         table = Table(remetente_destinatario)
#         styles = getSampleStyleSheet()
#         style = TableStyle([('LINEBELOW', (0, -2), (-1, -2), 2, colors.black)])  # Define a linha abaixo da HRFlowable
#         table.setStyle(style)

#         content.extend([Table(header), Table(separador), Table(remetente_destinatario),Table(separador),Table(dados_mercadoria),Table(pontilhado),Table(header), Table(separador), Table(remetente_destinatario),Table(separador),Table(dados_mercadoria)])

#         if i < len(coletas) - 1:
#             # Adiciona uma quebra de página antes do próximo conjunto de informações
#             content.append(PageBreak())

#     # Adiciona o conteúdo ao PDF
#     _addGeneratedContent(content, doc)

#     doc.build(content)

#     try:
#         webbrowser.open(pdf_filename)
#     except Exception as e:
#         print(f"Erro ao abrir o PDF: {e}")

#     return pdf_filename

# if __name__ == "__main__":
#     pdf_filename = imprimir_documento()
#     print(f"PDF gerado com sucesso: {pdf_filename}")
