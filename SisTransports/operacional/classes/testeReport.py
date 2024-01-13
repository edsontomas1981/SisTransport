










# from weasyprint import HTML,CSS
# import webbrowser
# from datetime import datetime
# from django.conf import settings



# def imprimir_documento(coletas):
#     # Seus dados HTML aqui
#     html_string = """
#     <!DOCTYPE html>
#     <html lang="en">
#     <head>
#         <meta charset="UTF-8">
#         <meta http-equiv="X-UA-Compatible" content="IE=edge">
#         <meta name="viewport" content="width=device-width, initial-scale=1.0">
#         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
#         <style>
#             /* Adicione seus estilos CSS aqui */
#             body {
#                 font-family: 'Helvetica', sans-serif;
#             }
#             .dadosEmitente{
#                 font-size: 12px;
#                 margin-bottom: 0px;
#             }

#             hr{
#                 margin-bottom: 1px;

#             }

#             .ultimaLinha{
#                 margin-bottom: 7px;
#             }
#             .remetenteDestinatario{
#                 font-size: 10px;
#                 margin-bottom: 1px;
#             }
#             .remetenteDestinatarioTitulo{
#                 font-size: 13px;
#                 margin-bottom: 1px;
#                 margin-top: 10px;
#             }
#         </style>
#     </head>
#     <body>
#         <div class="container">"""
#     for coleta in coletas:
#         data_hora_original=coleta['data_cadastro']
#         data_hora_obj = datetime.strptime(data_hora_original, '%Y-%m-%d %H:%M:%S')
#         data_hora_formatada = data_hora_obj.strftime('%d/%m/%Y %H:%M')
#         # Utilize joinpath para concatenar caminhos de maneira adequada
#         imagem_path = settings.STATIC_ROOT.joinpath("images/logonorte.jpg")

#         print(imagem_path)
#         html_string+=f"""<div class="row">
#                 <div class="col-12" id="logo">
#                     <figure>
#                 <img src="{imagem_path}" class="img-thumbnail mx-auto" alt="Minha Figura" style="width:50%;">
#                         <figcaption>Informações da Figura</figcaption>
#                     </figure>
#                 </div>
#                 <div class="col-7" id="dadosEmpresa">                
#                     <p class="dadosEmitente font-monospace fw-bold">Serafim Tranportes De Cargas Ltda - EPP</p>
#                     <p class="dadosEmitente">Rua: Nova Veneza , 172</p>
#                     <p class="dadosEmitente">Cidade Industrial Satelite - Guarulhos - SP</p>
#                     <p class="dadosEmitente ultimaLinha">Fone 11-2481-9121/11-91349-9161</p>
#                 </div>
#                 <div class="col-5" id="numeroPedido">
#                     <p class="dadosEmitente font-monospace fw-bold">Ordem de Coleta #{coleta['id']}</p>
#                     <p class="dadosEmitente">Data de Solicitação: {data_hora_formatada}</p>
#                     <p class="dadosEmitente">Emitido por: {coleta['usuario_cadastro']}</p>
#                     <p class="dadosEmitente ultimaLinha">Solicitado por: {coleta['coleta']['nome']}</p>
#                 </div>
#                 <hr>
#                 <div class="row">
#                     <div class="col-6">
#                         <p class="remetenteDestinatarioTitulo font-monospace fw-bold"> Remetente : {coleta['remetente']['raz_soc'][:25]}</p>
#                         <p class="remetenteDestinatario">{coleta['coleta']['rua']},{coleta['coleta']['numero']}</p>
#                         <p class="remetenteDestinatario">CEP {coleta['coleta']['cep']} - 
#                         {coleta['coleta']['bairro'][:35]} - {coleta['coleta']['cidade']}
#                           - {coleta['coleta']['uf']}</p>
#                         <p class="remetenteDestinatario ultimaLinha">NOME CONTATO : {coleta['coleta']['nome']} TELEFONE {coleta['coleta']['contato']}</p>
#                     </div>
#                     <div class="col-6" >
#                         <p><span class="remetenteDestinatarioTitulo font-monospace fw-bold"> Destinatário : {coleta['destinatario']['raz_soc'][:25]}</span></p>
#                         <p class="remetenteDestinatario">{coleta['destinatario']['endereco_fk']['logradouro']},{coleta['destinatario']['endereco_fk']['numero']}</p>
#                         <p class="remetenteDestinatario">CEP {coleta['destinatario']['endereco_fk']['cep']} - 
#                         {coleta['coleta']['bairro'][:35]} - {coleta['destinatario']['endereco_fk']['cidade']}
#                           - {coleta['destinatario']['endereco_fk']['uf']}</p>
#                     </div>
#                 </div>
#                 <hr>
#                 <div class="col-12" >
#                     <p class="remetenteDestinatarioTitulo font-monospace fw-bold">Dados Gerais : </p>
#                     <p class="remetenteDestinatario">Volumes : {coleta['coleta']['volume']}</p>
#                     <p class="remetenteDestinatario">Peso : {coleta['coleta']['peso']}</p>
#                     <p class="remetenteDestinatario">Volumes : {coleta['coleta']['valor']}</p>
#                     <p class="remetenteDestinatario">Notas Fiscais: {coleta['coleta']['horario']} </p>
#                     <p class="remetenteDestinatario">Horario de Coleta : {coleta['coleta']['horario']}</p>
#                 </div>            
#                 <hr>
#                 <div class="col-12" >
#                     <p class="remetenteDestinatarioTitulo font-monospace fw-bold">Observaçoẽs : </p>
#                     <p class="remetenteDestinatario">{coleta['coleta']['observacao']}</p>
#                 </div>            
#             </div>
#         </div>"""
    
#     html_string+="""
#     </body>
#     </html>
#     """

#     # Salvar o PDF
#     pdf_filename = "pedido_frete_html.pdf"
#     HTML(string=html_string).write_pdf(pdf_filename)

#     try:
#         webbrowser.open(pdf_filename)
#     except Exception as e:
#         print(f"Erro ao abrir o PDF: {e}")

#     # return pdf_filename

# if __name__ == "__main__":
#     pdf_filename = imprimir_documento()
#     print(f"PDF gerado com sucesso: {pdf_filename}")



# from reportlab.lib.pagesizes import letter
# from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
# from reportlab.lib.styles import getSampleStyleSheet
# from reportlab.lib import colors
# import webbrowser


# def imprimir_documento():
#     pdf_filename = "pedido_frete.pdf"
#     doc = SimpleDocTemplate(pdf_filename, pagesize=letter)
#     story = []

#     # Dados do documento
#     dados_documento = [
#         ["SERAFIM TRANSPORTE DE CARGAS LTDA - EPP", "Pedido de Frete: 442548"],
#         ["Endereco: RUA NOVA VENEZA, 172, CUMBICA", "Solicitacao: 08/01/2024 10:46"],
#         ["07221000 - GUARULHOS-SP", "nortecargassp@terra.com.br"],
#         ["Fones: 11 2481 9697 - 11 91349-9161", "http://www.nortecargas.com.br"],
#     ]

#     # Configurações da tabela
#     table_style = TableStyle([
#         ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
#         ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
#         ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
#         ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
#         ('GRID', (0, 0), (-1, -1), 1, colors.black),
#     ])

#     # Criar a tabela e aplicar as configurações
#     table = Table(dados_documento, style=table_style, colWidths=[270, 270])

#     # Adicionar a tabela ao story
#     story.append(table)

#     # Dados do remetente e destinatário
#     remetente_destinatario = [
#         ["Remetente: SIGN BRASIL LTDA","Destinatario: WESLLEY ARAUJO DAMASCENO 06679577314"],
#         ["RUA COIMBRA, 633 ", "QUADRA 362 (CONJ. DIRCEU ARCOVERDE II), 2 "],
#         [],
#         ["JARDIM COLIBRI - 06712410 - COTIA - SP", "ITARARE - 64078520 - TERESINA - PI"],
#         ["Fone:", ""],
#     ]

#     # Adicionar os dados do remetente e destinatário ao story
#     story.append(Table(remetente_destinatario, style=table_style, colWidths=[270, 270]))

#     # Dados Gerais
#     dados_gerais = [
#         ["Dados Gerais"],
#         ["Veiculo:", ""],
#         ["Mercadoria:", "Adesivos"],
#         ["Especie:", "Outros Volumes: 2 Peso: 34 Valor: 2.944,64"],
#         ["Horarios de Coleta:", "08 as 18"],
#         ["NF- | 60*20*20", ""],
#     ]

#     # Adicionar os dados gerais ao story
#     story.append(Table(dados_gerais, style=table_style, colWidths=[270, 270]))

#     # Gerar o PDF
#     doc.build(story)
#     try:
#         webbrowser.open(pdf_filename)
#     except Exception as e:
#         print(f"Erro ao abrir o PDF: {e}")    

# if __name__ == "__main__":
#     imprimir_documento()


# from reportlab.lib.pagesizes import letter
# from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle
# from reportlab.lib.styles import getSampleStyleSheet
# from reportlab.lib import colors

# def imprimir_documento():
#     pdf_filename = "documento.pdf"
#     doc = SimpleDocTemplate(pdf_filename, pagesize=letter)
#     story = []
#     empresa_nome = "SERAFIM TRANSPORTE DE CARGAS LTDA"
#     empresa_endereco = "Rua : Nova Veneza,172 Cumbica – Guarulhos-SP"
#     empresa_telefones = "Tel(11)2481-9121/2481-9697/2412-4886/2412-3927"
#     comunicacao_interna = "COMUNICAÇÃO INTERNA Nº 1138"
#     origem_destino =  "SPO - THE"
#     # Dados da tabela
#     table_data = [
#         [[Paragraph(empresa_nome, style=getSampleStyleSheet()["BodyText"])]],
#         ["linha2 Col 1", "linha2 Col 2"]
#     ]

#     # Configurações da tabela
#     table_style = TableStyle([
#         ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
#         ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
#         ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
#         ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
#         ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
#         ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
#         ('GRID', (0, 0), (-1, -1), 1, colors.black)
#     ])

#     # Defina a largura da tabela em relação à largura da página
#     largura_tabela = 7.5  # Substitua pelo valor desejado em polegadas
#     largura_pagina = letter[0]
#     table_width = largura_tabela * (largura_pagina / 8.5)

#     # Criar a tabela e aplicar as configurações
#     table = Table(table_data, style=table_style, colWidths=[table_width / len(table_data[0])] * len(table_data[0]))

#     # Adicionar a tabela ao story
#     story.append(table)

#     # Gerar o PDF
#     doc.build(story)

# if __name__ == "__main__":
#     imprimir_documento()



# from reportlab.lib.styles import getSampleStyleSheet
# from reportlab.platypus import SimpleDocTemplate, Paragraph, Image
# from reportlab.lib import colors
# import webbrowser
# from reportlab.lib.pagesizes import letter
# from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle
# from reportlab.lib.styles import getSampleStyleSheet


# def imprimir_documento():

#     # # Texto com quebras de linha
#     # texto_com_quebras = """
#     # <br />
#     # <br />
#     # <br />
#     # """
#     # # logo_image = Image("logonorte.jpg", width=75, height=12)
#     # # logo_image.hAlign = 'LEFT'
#     # # Dados do documento

#     # data = "02/09/2023"
#     # destinatario = "Srº Serafim"
#     # manifesto_numero = "4691 – THE"
#     # valor_a_ser_pago = "R$ 28.000,00"
#     # responsavel_pagamento = "Jasciano de Oliveira Rodrigues"
#     # conhecimentos_frete = "CIF e FOB"
#     # caixas_destinatario = "Srº Ewaldo Alves da Silva"
#     # transportadora = "Nortecargas – SP"

#     # Tamanho da página
#     width, height = letter

#     # Margens
#     left_margin = 30
#     right_margin = 30
#     top_margin = 30
#     bottom_margin = 30

#     # # Configurar o PDF
#     pdf_filename = "documento.pdf"
#     doc = SimpleDocTemplate(pdf_filename, pagesize=letter, leftMargin=left_margin, rightMargin=right_margin,
#                             topMargin=top_margin, bottomMargin=bottom_margin)
#     story = []

#     # Estilos de texto
#     styles = getSampleStyleSheet()
#     normal_style = styles["Normal"]
#     normal_style.alignment = 0  # 0 = left, 1 = center, 2 = right

#     h1 = styles['Heading1']
#     h1.alignment = 1  # 0 = left, 1 = center, 2 = right
#     h2 = styles['Heading2']
#     h2.alignment = 1  # 0 = left, 1 = center, 2 = right
#     h3 = styles['Heading3']     
#     h3.alignment = 1  # 0 = left, 1 = center, 2 = right
#     h5 = styles['Heading5']         
#     h5.alignment = 1  # 0 = left, 1 = center, 2 = right
#     h6 = styles['Heading6']         
#     h6.alignment = 1  # 0 = left, 1 = center, 2 = right


#     # Inserir a imagem no documento
#     # story.append(logo_image)

#     # # Criar um objeto Paragraph com o texto
#     # story.append(Paragraph(texto_com_quebras, normal_style))

#     # # # Adicionar texto ao documento
#     # # story.append(Paragraph('Comunicação Interna', h1))
#     # story.append(Paragraph(empresa_nome, h1))
#     # story.append(Paragraph(empresa_endereco, h5))
#     # story.append(Paragraph(empresa_telefones, h5))
#     # story.append(Paragraph("", normal_style))  # Linha em branco
#     # # Criar um objeto Paragraph com o texto
#     # story.append(Paragraph(texto_com_quebras, normal_style))

#     # story.append(Paragraph(comunicacao_interna, h3))
#     # story.append(Paragraph(f"Data : {data} Percurso : {origem_destino}", h5))

#     # # Criar um objeto Paragraph com o texto     
#     # story.append(Paragraph(texto_com_quebras, normal_style))

#     # texto = f"{destinatario},<br /><br />" \
#     #         f"Estamos enviando o manifesto de transporte de cargas nº {1}. Este manifesto inclui conhecimentos de frete {1}.<br /><br />" \
#     #         f"De acordo com este manifesto, solicitamos o pagamento de R$ {1} ao motorista {1}, referente à Ordem de Pagamento (OP).<br /><br />" \
#     #         f"Para mais informações, entre em contato conosco na transportadora {1}.<br /><br />"


#     # observacao =f"Também informamos que estamos despachando 12 caixas que estão aos cuidados do. {1}.<br /><br />" \
    
#     empresa_nome = "SERAFIM TRANSPORTE DE CARGAS LTDA"
#     empresa_endereco = "Rua : Nova Veneza,172 Cumbica – Guarulhos-SP"
#     empresa_telefones = "Tel(11)2481-9121/2481-9697/2412-4886/2412-3927"
#     comunicacao_interna = "COMUNICAÇÃO INTERNA Nº 1138"
#     origem_destino =  "SPO - THE"

#     empresa_nome = "SERAFIM TRANSPORTE DE CARGAS LTDA"
#     table_data = [
#         [Paragraph(empresa_nome, style=getSampleStyleSheet()["BodyText"])],
#         [Paragraph(empresa_nome, style=getSampleStyleSheet()["BodyText"])],
#     ]

#     # Configurações da tabela
#     style = TableStyle([
#         ('BACKGROUND', (0, 0), (-1, 0), colors.white),
#         ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
#         ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
#         ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
#         ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
#         ('BACKGROUND', (0, 1), (-1, -1), colors.white),
#         ('GRID', (0, 0), (-1, -1), 1, colors.black)
#     ])

#     # Criar a tabela e aplicar as configurações
#     table = Table(table_data,style=style)

#     # Adicionar a tabela ao story
#     story.append(table)

#     # story.append(Paragraph(texto, normal_style))
#     # story.append(Paragraph(observacao, normal_style))

#     # # Criar um objeto Paragraph com o texto     
#     # story.append(Paragraph(texto_com_quebras, normal_style))

#     # # Criar um objeto Paragraph com o texto     
#     # story.append(Paragraph(texto_com_quebras, normal_style))


#     # story.append(Paragraph(transportadora, normal_style))

#     # Gerar o PDF
#     doc.build(story)

#     try:
#         webbrowser.open(pdf_filename)
#     except Exception as e:
#         print(f"Erro ao abrir o PDF: {e}")

# # if __name__ == "__main__":
# #     imprimir_documento()

# #     # Após gerar o PDF, abrir automaticamente para impressão
# #     pdf_filename = "documento.pdf"
# #     try:
# #         webbrowser.open(pdf_filename)
# #     except Exception as e:
# #         print(f"Erro ao abrir o PDF: {e}")