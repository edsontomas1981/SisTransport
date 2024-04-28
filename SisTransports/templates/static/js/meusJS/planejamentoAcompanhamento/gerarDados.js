const empresas = [
    "Acme Corporation",
    "Beta Industries",
    "Delta Enterprises",
    "Epic Solutions",
    "Fusion Innovations",
    "Global Network Inc.",
    "Horizon Enterprises",
    "Infinity Technologies",
    "Jupiter Enterprises",
    "Keystone Solutions",
    "Matrix Corporation",
    "Nexus Industries",
    "Omega Enterprises",
    "Phoenix Solutions",
    "Quantum Innovations",
    "Redwood Corporation",
    "Sigma Enterprises",
    "Titan Industries",
    "Unity Solutions",
    "Vanguard Corporation",
    "Apex Technologies",
    "Bright Future Inc.",
    "Crimson Solutions",
    "Dynamic Enterprises",
    "Emerald Innovations",
    "Fortune Enterprises",
    "Golden Gate Corporation",
    "Harmony Solutions",
    "Ivory Industries",
    "Jubilee Corporation",
    "Karma Innovations",
    "Luminous Enterprises",
    "Majestic Solutions",
    "Noble Corporation",
    "Opal Industries",
    "Prime Solutions",
    "Quest Enterprises",
    "Radiant Innovations",
    "Silverado Corporation",
    "Trinity Technologies",
    "Utopia Enterprises",
    "Vertex Corporation",
    "Whispering Solutions",
    "Xenon Innovations",
    "Yellowstone Enterprises",
    "Zephyr Corporation",
    "Alpha Industries",
    "BrightSky Solutions",
    "Cerulean Enterprises",
    "Dynamo Corporation",
    "Elysian Innovations",
    "Flare Enterprises",
    "Galactic Solutions",
    "Helix Corporation",
    "Infinite Innovations",
    "Jade Enterprises",
    "Krypton Solutions",
    "Lunar Corporation",
    "Meridian Innovations",
    "Neptune Enterprises",
    "Orbit Solutions",
    "Polaris Corporation",
    "Quasar Innovations",
    "Radiant Enterprises",
    "Sapphire Solutions",
    "Tranquil Corporation",
    "Umbra Innovations",
    "Vortex Enterprises",
    "Wavelength Solutions",
    "Xanadu Corporation",
    "Zenith Innovations"
];

const nomesMotoristas = [
    "Carlos Silva",
    "Ana Oliveira",
    "Pedro Santos",
    "Mariana Costa",
    "José Pereira",
    "Luana Ferreira",
    "Rafael Oliveira",
    "Amanda Souza",
    "Fernando Rodrigues",
    "Isabela Almeida",
    "Gustavo Lima",
    "Laura Gomes",
    "Lucas Martins",
    "Juliana Silva",
    "Mateus Oliveira",
    "Beatriz Santos",
    "Rodrigo Costa",
    "Gabriela Almeida",
    "Thiago Silva",
    "Camila Pereira",
    "Bruno Oliveira",
    "Larissa Costa",
    "Vinícius Rodrigues",
    "Natalia Souza",
    "Diego Lima",
    "Carolina Gomes",
    "Marcos Almeida",
    "Tatiane Silva",
    "Leandro Pereira",
    "Aline Oliveira",
    "Ricardo Santos",
    "Vanessa Costa",
    "Roberto Rodrigues",
    "Eduarda Souza",
    "Renato Lima",
    "Julia Gomes",
    "Marcelo Almeida",
    "Priscila Silva",
    "Felipe Pereira",
    "Bianca Oliveira",
    "Daniel Santos",
    "Elaine Costa",
    "Guilherme Rodrigues",
    "Patrícia Souza",
    "André Lima",
    "Letícia Gomes",
    "Josiane Almeida",
    "Leonardo Silva",
    "Renata Pereira",
    "Vinícius Oliveira",
    "Fernanda Santos",
    "Wellington Costa",
    "Márcia Rodrigues",
    "Hugo Souza",
    "Camila Lima",
    "Thiago Gomes",
    "Luana Almeida",
    "Rafael Silva",
    "Amanda Pereira",
    "Rodrigo Oliveira",
    "Carolina Santos",
    "Lucas Costa"
];

const placasVeiculos = [
    "ABC-1234",
    "DEF-5678",
    "GHI-9012",
    "JKL-3456",
    "MNO-7890",
    "PQR-1230",
    "STU-4560",
    "VWX-7890",
    "YZA-0120",
    "BCD-3450",
    "EFG-6780",
    "HIJ-9010",
    "KLM-2340",
    "NOP-5670",
    "QRS-8900",
    "TUV-1230",
    "WXY-4560",
    "ZAB-7890",
    "CDE-0120",
    "FGH-3450",
    "IJK-6780",
    "LMN-9010",
    "OPQ-2340",
    "RST-5670",
    "UVW-8900",
];

const bairrosSaoPaulo = [
    "Moema",
    "Pinheiros",
    "Vila Madalena",
    "Itaim Bibi",
    "Vila Mariana",
    "Morumbi",
    "Jardins",
    "Perdizes",
    "Tatuapé",
    "Campo Belo",
    "Vila Olímpia",
    "Brooklin",
    "Santana",
    "Higienópolis",
    "Butantã"
];

const geraCoordenadas = ()=>{
    // Coordenadas aproximadas para São Paulo e Grande São Paulo
    var saoPauloBounds = {
        north: -23.356792,
        south: -23.7452,
        west: -46.825123,
        east: -46.365582
    };

    // Número de linhas e colunas para a grade
    var rows = 6;
    var cols = 10;

    // Calcula o intervalo de latitude e longitude
    var latInterval = (saoPauloBounds.north - saoPauloBounds.south) / rows;
    var lngInterval = (saoPauloBounds.east - saoPauloBounds.west) / cols;

    // Lista para armazenar as coordenadas geradas
    var coordenadas = [];

    // Loop para gerar as coordenadas da grade
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
          // Calcula as coordenadas para o ponto na grade
          var lat = saoPauloBounds.south + latInterval * i + Math.random() * latInterval * 0.8;
          var lng = saoPauloBounds.west + lngInterval * j + Math.random() * lngInterval * 0.8;
          var status = Math.floor(Math.random() * (4 - 0)) + 1
          var idNum = Math.floor(Math.random() * (999999 - 1)) + 1
          var motorista = nomesMotoristas[Math.floor(Math.random() * (15 - 1)) + 1]
          var placa = placasVeiculos[Math.floor(Math.random() * (10 - 1)) + 1]
          var bairro = bairrosSaoPaulo[Math.floor(Math.random() * (14 - 0)) + 1]
          var volumes = Math.floor(Math.random() * (100 - 1)) + 1
          var peso = Math.random() * (2000 - 0) + 1
          coordenadas.push([lat, lng,status,idNum,motorista,placa,bairro,volumes,peso.toFixed(2)]);
      }
    }
    console.log(coordenadas)
    return coordenadas ;
}


const geraQuadTree = ()=>{
 const range = new Rectangle(-46.8, -23.75, -46.7, -23.65); // Área de consulta em latitudes e longitudes
 print(range)
}