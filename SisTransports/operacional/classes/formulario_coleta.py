from datetime import datetime
import webbrowser
from django.conf import settings
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, PageBreak
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus.frames import Frame
from reportlab.platypus.flowables import KeepTogether
from reportlab.platypus.doctemplate import _addGeneratedContent
from reportlab.platypus.doctemplate import PageTemplate


class TableContent(KeepTogether):
    def __init__(self, table_data, style):
        self.table = Table(table_data, style=style)
        KeepTogether.__init__(self, [self.table])

    def getKeepWithNext(self):
        return True

def imprimir_documento(coletas):
    pdf_filename = "pedido_frete_reportlab.pdf"

    # Ajuste as margens como desejado
    margem_esquerda = 20
    margem_direita = 20
    margem_superior = 20
    margem_inferior = 20

    # Defina as dimensões da página e as margens
    width, height = letter
    print(letter)
    doc = SimpleDocTemplate(pdf_filename, pagesize=(width, height), leftMargin=margem_esquerda, rightMargin=margem_direita, topMargin=margem_superior, bottomMargin=margem_inferior)

    # Lista para armazenar os frames
    frames = []

    # Adiciona um frame para o cabeçalho
    header_frame = Frame(margem_esquerda, height - 150, width - margem_esquerda - margem_direita, 100, showBoundary=1)
    frames.append(header_frame)

    # Adiciona um frame para o corpo do relatório
    body_frame = Frame(margem_esquerda, margem_inferior, width - margem_esquerda - margem_direita, height - margem_superior - margem_inferior - 150, showBoundary=1)
    frames.append(body_frame)

    # Adiciona um frame para o rodapé
    footer_frame = Frame(margem_esquerda, 0, width - margem_esquerda - margem_direita, 50, showBoundary=1)
    frames.append(footer_frame)

    # Adiciona um modelo de página padrão ao objeto doc com os frames
    doc.addPageTemplates([PageTemplate(id='default', frames=frames)])

    # Inicializa a folha de estilos
    styles = getSampleStyleSheet()

    # Adiciona negrito ao estilo BodyText
    styles.add(ParagraphStyle(name='BodyTextBold', parent=styles['BodyText'], fontWeight='Bold'))

    # Conteúdo do PDF
    content = []
    for i, coleta in enumerate(coletas):
        data_hora_original = coleta['data_cadastro']
        data_hora_obj = datetime.strptime(data_hora_original, '%Y-%m-%d %H:%M:%S')
        data_hora_formatada = data_hora_obj.strftime('%d/%m/%Y %H:%M')

        imagem_path = settings.STATIC_ROOT.joinpath("images/logonorte.jpg")

        # Adiciona informações da empresa e ordem de coleta em uma tabela
        table_data = [
            [Image(imagem_path, width=100, height=20, hAlign='LEFT')],
            [Paragraph("<font size='14' face='Helvetica'  color='green'>Serafim Tranportes De Cargas Ltda - EPP</font>", styles['BodyTextBold']),
             Paragraph(f"<font size='14' face='Helvetica' color='black'>Ordem de Coleta #{coleta['id']}</font>", styles['BodyTextBold'])],
            [Paragraph("<font size='12' face='Helvetica' color='black'>Rua: Nova Veneza , 172<br/>Cidade Industrial Satelite - Guarulhos - SP<br/>Fone 11-2481-9121/11-91349-9161</font>", styles['BodyText']),
             Paragraph(f"<font size='12' face='Helvetica' color='black'>Data de Solicitação: {data_hora_formatada}<br/>Emitido por: {coleta['usuario_cadastro']}<br/>Solicitado por: {coleta['coleta']['nome']}</font>", styles['BodyText'])]
        ]

        # Estilo da tabela
        table_style = [('VALIGN', (0, 0), (-1, -1), 'TOP')]

        # Adiciona a tabela ao conteúdo
        content.append(TableContent(table_data, table_style))

        if i < len(coletas) - 1:
            # Adiciona uma quebra de página antes do próximo conjunto de informações
            content.append(PageBreak())

    # Adiciona o conteúdo ao PDF
    _addGeneratedContent(content, doc)
    
    doc.build(content)

    try:
        webbrowser.open(pdf_filename)
    except Exception as e:
        print(f"Erro ao abrir o PDF: {e}")

    return pdf_filename

if __name__ == "__main__":
    pdf_filename = imprimir_documento()
    print(f"PDF gerado com sucesso: {pdf_filename}")
