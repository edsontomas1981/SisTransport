import threading
from enderecos.models.endereco import Enderecos as MdlEnderecos
from enderecos.classes.carrega_coordenadas import carrega_coordenadas  
from Classes.utils import dprint

class Enderecos:
    def __init__(self):
        """Inicializa a classe Enderecos com um modelo de endereço."""
        self.endereco = MdlEnderecos()
    
    def createOrUpdate(self, dados):
        """
        Atualiza os atributos do endereço com os dados fornecidos.

        :param dados: Dicionário contendo os dados do endereço.
        """
        self.endereco.cep = dados['cep']
        self.endereco.logradouro = dados['logradouro']
        self.endereco.numero = dados['numero']
        self.endereco.complemento = dados['complemento']
        self.endereco.bairro = dados['bairro']
        self.endereco.cidade = dados['cidade']
        self.endereco.uf = dados['estado']
    
    def createEndereco(self, dados):
        """
        Cria um novo endereço e inicia o processo de geocodificação em uma thread separada.

        :param dados: Dicionário contendo os dados do novo endereço.
        :return: 200 se o endereço foi criado com sucesso, 400 em caso de erro.
        """
        try:
            self.dados = dados
            self.createOrUpdate(self.dados)
            self.endereco.save()
 
            # Inicia a geocodificação em uma nova thread
            threading.Thread(target=self.geocode_and_save, args=(self.endereco,)).start()
 
            return 200
        except Exception as e:
            print(f"Erro ao criar endereço: {e}")
            return 400
    
    def readEndereco(self, idEndereco):
        """
        Lê um endereço do banco de dados pelo ID.

        :param idEndereco: ID do endereço a ser lido.
        :return: Instância do endereço se existir, caso contrário, retorna False.
        """
        if MdlEnderecos.objects.filter(id=idEndereco).exists():
            self.endereco = MdlEnderecos.objects.filter(id=idEndereco).get()
            # Verifica se lat e lng estão cadastradas
 
            if self.endereco.lat is None or self.endereco.lng is None:
                # Inicia a geocodificação em uma nova thread
                threading.Thread(target=self.geocode_and_save, args=(self.endereco,)).start()
            return self.endereco
        else:
            return False        
    
    def updateEndereco(self, idEndereco, dados):
        """
        Atualiza um endereço existente no banco de dados.

        :param idEndereco: ID do endereço a ser atualizado.
        :param dados: Dicionário contendo os novos dados do endereço.
        :return: 200 se a atualização foi bem-sucedida, 404 se o endereço não existir, 400 em caso de erro.
        """
        if MdlEnderecos.objects.filter(id=idEndereco).exists():
            try:
                self.endereco = MdlEnderecos.objects.filter(id=idEndereco).get()
                self.createOrUpdate(dados)
                self.endereco.save()
                return 200
            except Exception as e:
                print(f"Erro ao atualizar endereço: {e}")
                return 400 
        else:
            return 404  
    
    def deleteEndereco(self, idEndereco):
        """
        Deleta um endereço do banco de dados.

        :param idEndereco: ID do endereço a ser deletado.
        :return: 200 se a deleção foi bem-sucedida, 404 se o endereço não existir, 400 em caso de erro.
        """
        if MdlEnderecos.objects.filter(id=idEndereco).exists():
            try:
                self.endereco = MdlEnderecos.objects.filter(id=idEndereco).get()
                self.endereco.delete()
                return 200
            except Exception as e:
                print(f"Erro ao deletar endereço: {e}")
                return 400 
        else:
            return 404  

    def geocode_and_save(self, endereco):
        """
        Carrega as coordenadas geográficas do endereço e as salva no modelo.

        :param endereco: Instância do modelo Enderecos para o qual as coordenadas serão salvas.
        """
        # Chama a função carrega_coordenadas para obter as coordenadas
        result = carrega_coordenadas(f"{endereco.logradouro}, {endereco.numero}, {endereco.bairro}, {endereco.cidade}, {endereco.uf}")
        if result:
            lat, lng = result

            dprint(f'{type(lat)}, {type(lng)}')

            # Verifica se lat e lng são valores numéricos
            if isinstance(float(lat), (float, int)) and isinstance(float(lng), (float, int)):
                endereco.lat = lat
                endereco.lng = lng
                endereco.save()
                print(f"Coordenadas salvas: {lat}, {lng}")
            else:
                print("Coordenadas inválidas: lat ou lng não são numéricas.")
        else:
            print("Falha ao buscar coordenadas.")
