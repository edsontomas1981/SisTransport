from enderecos.models.municipios import Municipios as MdlMunicipio
from Classes.utils import checaUf

class Municipios:
    
    def __init__(self):
        pass
    
    def getMunicipios(self,uf):
        uf=uf.upper()
        if checaUf(uf):
            municipios=MdlMunicipio.objects.filter(uf_code=uf)
            listaMunicipios=[municipio.to_dict() for municipio in municipios]
            return listaMunicipios        



        