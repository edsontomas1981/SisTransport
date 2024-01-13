import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from django.http import HttpResponse, JsonResponse, FileResponse
from django.contrib.auth.decorators import login_required
import json
from Classes.dtc import Dtc
import tempfile
import webbrowser
import os
from operacional.classes.formulario_coleta import imprimir_documento
@login_required(login_url='/auth/entrar/')
def print_coletas(request):
    def processar_coletas(data):
        return [Dtc.getDtcId(item.get('id')).to_dict() for item in data]

    if request.method == 'GET':
        return JsonResponse({'status': "imprimirColetas"})
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        coletas_processadas = processar_coletas(data)
        imprimir_documento(coletas_processadas)
        return JsonResponse({'status': 200})


# def gerar_pdf_coleta(dados_coleta, nome_arquivo="coleta.pdf"):
#     buffer = io.BytesIO()

#     # Criação do PDF
#     pdf = canvas.Canvas(buffer, pagesize=letter)
#     try:
#         for coleta in dados_coleta:
#             pdf.drawString(100, 750, f"Coleta ID: {coleta['id']}")
#             pdf.drawString(100, 730, f"Tipo de Frete: {coleta['tipoFrete']}")
#             pdf.drawString(100, 710, f"Data de Cadastro: {coleta['data_cadastro']}")
            
#             remetente = coleta['remetente']
#             pdf.drawString(100, 690, f"Remetente: {remetente['raz_soc']}, {remetente['endereco_fk']['cidade']}, {remetente['endereco_fk']['uf']}")
            
#             destinatario = coleta['destinatario']
#             pdf.drawString(100, 670, f"Destinatário: {destinatario['raz_soc']}, {destinatario['endereco_fk']['cidade']}, {destinatario['endereco_fk']['uf']}")
            
#             coleta_info = coleta['coleta']
#             pdf.drawString(100, 650, f"Nota Fiscal: {coleta_info['notaFiscal']}")
#             pdf.drawString(100, 630, f"Horário: {coleta_info['horario']}")
#             pdf.drawString(100, 610, f"Volume: {coleta_info['volume']}")
#             pdf.drawString(100, 590, f"Peso: {coleta_info['peso']}")
#             pdf.drawString(100, 570, f"Valor: {coleta_info['valor']}")
#             pdf.drawString(100, 550, f"Veículo: {coleta_info['veiculo']}")
#             pdf.drawString(100, 530, f"Mercadoria: {coleta_info['mercadoria']}")
#             pdf.drawString(100, 510, f"Observação: {coleta_info['observacao']}")
            
#             pdf.drawString(100, 490, "="*40)
            
#             # Adicionar mais detalhes conforme necessário

#             pdf.showPage()  # Adicionar uma nova página para cada coleta

#         # Salvar o PDF em um arquivo temporário
#         temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
#         temp_file.write(buffer.getvalue())
#         temp_file.close()

#          # Retornar a resposta HTTP do PDF
#         with open(temp_file.name, 'rb') as f:
#             response = HttpResponse(f.read(), content_type='application/pdf')
#             response['Content-Disposition'] = f'inline; filename="{nome_arquivo}"'

#         # Retornar a resposta HTTP do PDF
#         response = FileResponse(open(temp_file.name, 'rb'), as_attachment=True, filename=nome_arquivo)
#     finally:
#         # Garantir que o arquivo temporário seja excluído
#         buffer.close()
#         os.remove(temp_file.name)

#     return response

        
