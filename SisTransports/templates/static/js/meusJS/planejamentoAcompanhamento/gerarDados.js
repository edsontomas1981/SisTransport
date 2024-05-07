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
    return coordenadas ;
}

const geraDadosPoligonoZmrc = ()=>{
return {
    "name": "SaoPaulo",
    "geometries": [
        {
            "name": "ZMRC",
            "vertices": [
                {
                    "longitude": -46.587706,
                    "latitude": -23.52815
                },
                {
                    "longitude": -46.588152,
                    "latitude": -23.528258
                },
                {
                    "longitude": -46.588469,
                    "latitude": -23.528343
                },
                {
                    "longitude": -46.588995,
                    "latitude": -23.528454
                },
                {
                    "longitude": -46.589192,
                    "latitude": -23.528475
                },
                {
                    "longitude": -46.589451,
                    "latitude": -23.528483
                },
                {
                    "longitude": -46.589675,
                    "latitude": -23.528452
                },
                {
                    "longitude": -46.589882,
                    "latitude": -23.528423
                },
                {
                    "longitude": -46.590605,
                    "latitude": -23.528195
                },
                {
                    "longitude": -46.590934,
                    "latitude": -23.527966
                },
                {
                    "longitude": -46.591596,
                    "latitude": -23.52782
                },
                {
                    "longitude": -46.59181,
                    "latitude": -23.527728
                },
                {
                    "longitude": -46.59238,
                    "latitude": -23.527615
                },
                {
                    "longitude": -46.594536,
                    "latitude": -23.527037
                },
                {
                    "longitude": -46.595168,
                    "latitude": -23.52682
                },
                {
                    "longitude": -46.596443,
                    "latitude": -23.526458
                },
                {
                    "longitude": -46.597526,
                    "latitude": -23.525992
                },
                {
                    "longitude": -46.597881,
                    "latitude": -23.525751
                },
                {
                    "longitude": -46.598874,
                    "latitude": -23.524952
                },
                {
                    "longitude": -46.600855,
                    "latitude": -23.523329
                },
                {
                    "longitude": -46.601316,
                    "latitude": -23.523018
                },
                {
                    "longitude": -46.602049,
                    "latitude": -23.522621
                },
                {
                    "longitude": -46.602469,
                    "latitude": -23.522299
                },
                {
                    "longitude": -46.602794,
                    "latitude": -23.522164
                },
                {
                    "longitude": -46.603684,
                    "latitude": -23.521935
                },
                {
                    "longitude": -46.60421,
                    "latitude": -23.521872
                },
                {
                    "longitude": -46.604693,
                    "latitude": -23.521816
                },
                {
                    "longitude": -46.605168,
                    "latitude": -23.52179
                },
                {
                    "longitude": -46.605481,
                    "latitude": -23.521777
                },
                {
                    "longitude": -46.605833,
                    "latitude": -23.521805
                },
                {
                    "longitude": -46.606694,
                    "latitude": -23.521935
                },
                {
                    "longitude": -46.606921,
                    "latitude": -23.521971
                },
                {
                    "longitude": -46.607061,
                    "latitude": -23.522047
                },
                {
                    "longitude": -46.607211,
                    "latitude": -23.522177
                },
                {
                    "longitude": -46.607345,
                    "latitude": -23.522197
                },
                {
                    "longitude": -46.607911,
                    "latitude": -23.522315
                },
                {
                    "longitude": -46.608522,
                    "latitude": -23.522453
                },
                {
                    "longitude": -46.608892,
                    "latitude": -23.522492
                },
                {
                    "longitude": -46.609294,
                    "latitude": -23.52249
                },
                {
                    "longitude": -46.609546,
                    "latitude": -23.522371
                },
                {
                    "longitude": -46.609862,
                    "latitude": -23.522318
                },
                {
                    "longitude": -46.610261,
                    "latitude": -23.52223
                },
                {
                    "longitude": -46.610458,
                    "latitude": -23.522157
                },
                {
                    "longitude": -46.610679,
                    "latitude": -23.522124
                },
                {
                    "longitude": -46.610876,
                    "latitude": -23.522064
                },
                {
                    "longitude": -46.611197,
                    "latitude": -23.52195
                },
                {
                    "longitude": -46.611674,
                    "latitude": -23.521709
                },
                {
                    "longitude": -46.611764,
                    "latitude": -23.52166
                },
                {
                    "longitude": -46.612088,
                    "latitude": -23.521433
                },
                {
                    "longitude": -46.61234,
                    "latitude": -23.521266
                },
                {
                    "longitude": -46.612642,
                    "latitude": -23.521145
                },
                {
                    "longitude": -46.613111,
                    "latitude": -23.520782
                },
                {
                    "longitude": -46.614258,
                    "latitude": -23.519916
                },
                {
                    "longitude": -46.614578,
                    "latitude": -23.519704
                },
                {
                    "longitude": -46.614765,
                    "latitude": -23.519591
                },
                {
                    "longitude": -46.615027,
                    "latitude": -23.519436
                },
                {
                    "longitude": -46.615474,
                    "latitude": -23.5192
                },
                {
                    "longitude": -46.615573,
                    "latitude": -23.519103
                },
                {
                    "longitude": -46.615797,
                    "latitude": -23.518874
                },
                {
                    "longitude": -46.615934,
                    "latitude": -23.518792
                },
                {
                    "longitude": -46.616313,
                    "latitude": -23.518625
                },
                {
                    "longitude": -46.616543,
                    "latitude": -23.518526
                },
                {
                    "longitude": -46.616797,
                    "latitude": -23.518411
                },
                {
                    "longitude": -46.617127,
                    "latitude": -23.518308
                },
                {
                    "longitude": -46.617582,
                    "latitude": -23.518168
                },
                {
                    "longitude": -46.617917,
                    "latitude": -23.51812
                },
                {
                    "longitude": -46.618283,
                    "latitude": -23.518069
                },
                {
                    "longitude": -46.618518,
                    "latitude": -23.518053
                },
                {
                    "longitude": -46.618886,
                    "latitude": -23.518028
                },
                {
                    "longitude": -46.619241,
                    "latitude": -23.518009
                },
                {
                    "longitude": -46.619499,
                    "latitude": -23.51801
                },
                {
                    "longitude": -46.619708,
                    "latitude": -23.51799
                },
                {
                    "longitude": -46.620308,
                    "latitude": -23.518054
                },
                {
                    "longitude": -46.620852,
                    "latitude": -23.518104
                },
                {
                    "longitude": -46.621333,
                    "latitude": -23.51818
                },
                {
                    "longitude": -46.621854,
                    "latitude": -23.518281
                },
                {
                    "longitude": -46.622335,
                    "latitude": -23.518384
                },
                {
                    "longitude": -46.622606,
                    "latitude": -23.518457
                },
                {
                    "longitude": -46.622858,
                    "latitude": -23.518501
                },
                {
                    "longitude": -46.623029,
                    "latitude": -23.518526
                },
                {
                    "longitude": -46.623169,
                    "latitude": -23.518542
                },
                {
                    "longitude": -46.623372,
                    "latitude": -23.518534
                },
                {
                    "longitude": -46.623664,
                    "latitude": -23.518566
                },
                {
                    "longitude": -46.623781,
                    "latitude": -23.518641
                },
                {
                    "longitude": -46.623938,
                    "latitude": -23.518633
                },
                {
                    "longitude": -46.624554,
                    "latitude": -23.518588
                },
                {
                    "longitude": -46.624894,
                    "latitude": -23.518581
                },
                {
                    "longitude": -46.625099,
                    "latitude": -23.518552
                },
                {
                    "longitude": -46.625348,
                    "latitude": -23.518524
                },
                {
                    "longitude": -46.625453,
                    "latitude": -23.518509
                },
                {
                    "longitude": -46.625633,
                    "latitude": -23.518491
                },
                {
                    "longitude": -46.625934,
                    "latitude": -23.518466
                },
                {
                    "longitude": -46.626184,
                    "latitude": -23.518446
                },
                {
                    "longitude": -46.626345,
                    "latitude": -23.518434
                },
                {
                    "longitude": -46.626525,
                    "latitude": -23.51839
                },
                {
                    "longitude": -46.62673,
                    "latitude": -23.518365
                },
                {
                    "longitude": -46.626907,
                    "latitude": -23.518344
                },
                {
                    "longitude": -46.627247,
                    "latitude": -23.518323
                },
                {
                    "longitude": -46.627724,
                    "latitude": -23.51829
                },
                {
                    "longitude": -46.628143,
                    "latitude": -23.518261
                },
                {
                    "longitude": -46.628525,
                    "latitude": -23.518228
                },
                {
                    "longitude": -46.628777,
                    "latitude": -23.518204
                },
                {
                    "longitude": -46.629005,
                    "latitude": -23.518179
                },
                {
                    "longitude": -46.629348,
                    "latitude": -23.518137
                },
                {
                    "longitude": -46.629569,
                    "latitude": -23.518112
                },
                {
                    "longitude": -46.629884,
                    "latitude": -23.518088
                },
                {
                    "longitude": -46.630048,
                    "latitude": -23.518078
                },
                {
                    "longitude": -46.630118,
                    "latitude": -23.518016
                },
                {
                    "longitude": -46.630222,
                    "latitude": -23.517988
                },
                {
                    "longitude": -46.630453,
                    "latitude": -23.517986
                },
                {
                    "longitude": -46.630594,
                    "latitude": -23.518017
                },
                {
                    "longitude": -46.630878,
                    "latitude": -23.518121
                },
                {
                    "longitude": -46.631168,
                    "latitude": -23.518203
                },
                {
                    "longitude": -46.631597,
                    "latitude": -23.51831
                },
                {
                    "longitude": -46.631945,
                    "latitude": -23.518307
                },
                {
                    "longitude": -46.632481,
                    "latitude": -23.518262
                },
                {
                    "longitude": -46.633616,
                    "latitude": -23.518154
                },
                {
                    "longitude": -46.634625,
                    "latitude": -23.518066
                },
                {
                    "longitude": -46.635102,
                    "latitude": -23.518026
                },
                {
                    "longitude": -46.636887,
                    "latitude": -23.517907
                },
                {
                    "longitude": -46.638533,
                    "latitude": -23.517793
                },
                {
                    "longitude": -46.640454,
                    "latitude": -23.517686
                },
                {
                    "longitude": -46.640738,
                    "latitude": -23.517655
                },
                {
                    "longitude": -46.641203,
                    "latitude": -23.517616
                },
                {
                    "longitude": -46.641769,
                    "latitude": -23.517563
                },
                {
                    "longitude": -46.642807,
                    "latitude": -23.517463
                },
                {
                    "longitude": -46.644511,
                    "latitude": -23.517256
                },
                {
                    "longitude": -46.64616,
                    "latitude": -23.517053
                },
                {
                    "longitude": -46.646652,
                    "latitude": -23.516996
                },
                {
                    "longitude": -46.647131,
                    "latitude": -23.516936
                },
                {
                    "longitude": -46.647677,
                    "latitude": -23.516873
                },
                {
                    "longitude": -46.648211,
                    "latitude": -23.516801
                },
                {
                    "longitude": -46.648625,
                    "latitude": -23.516749
                },
                {
                    "longitude": -46.649012,
                    "latitude": -23.516694
                },
                {
                    "longitude": -46.649332,
                    "latitude": -23.516657
                },
                {
                    "longitude": -46.649563,
                    "latitude": -23.516644
                },
                {
                    "longitude": -46.649747,
                    "latitude": -23.516697
                },
                {
                    "longitude": -46.649817,
                    "latitude": -23.516656
                },
                {
                    "longitude": -46.649939,
                    "latitude": -23.516591
                },
                {
                    "longitude": -46.650008,
                    "latitude": -23.516573
                },
                {
                    "longitude": -46.650175,
                    "latitude": -23.516534
                },
                {
                    "longitude": -46.650394,
                    "latitude": -23.51649
                },
                {
                    "longitude": -46.650563,
                    "latitude": -23.51642
                },
                {
                    "longitude": -46.650752,
                    "latitude": -23.51631
                },
                {
                    "longitude": -46.650937,
                    "latitude": -23.516153
                },
                {
                    "longitude": -46.651169,
                    "latitude": -23.515967
                },
                {
                    "longitude": -46.651308,
                    "latitude": -23.515836
                },
                {
                    "longitude": -46.651416,
                    "latitude": -23.515796
                },
                {
                    "longitude": -46.651506,
                    "latitude": -23.515774
                },
                {
                    "longitude": -46.651635,
                    "latitude": -23.515731
                },
                {
                    "longitude": -46.651737,
                    "latitude": -23.515729
                },
                {
                    "longitude": -46.65191,
                    "latitude": -23.515729
                },
                {
                    "longitude": -46.652122,
                    "latitude": -23.515823
                },
                {
                    "longitude": -46.652253,
                    "latitude": -23.515852
                },
                {
                    "longitude": -46.652425,
                    "latitude": -23.515889
                },
                {
                    "longitude": -46.652609,
                    "latitude": -23.515948
                },
                {
                    "longitude": -46.652685,
                    "latitude": -23.515952
                },
                {
                    "longitude": -46.652803,
                    "latitude": -23.51596
                },
                {
                    "longitude": -46.652893,
                    "latitude": -23.515966
                },
                {
                    "longitude": -46.65315,
                    "latitude": -23.515962
                },
                {
                    "longitude": -46.653421,
                    "latitude": -23.515946
                },
                {
                    "longitude": -46.653536,
                    "latitude": -23.515898
                },
                {
                    "longitude": -46.653773,
                    "latitude": -23.515884
                },
                {
                    "longitude": -46.653849,
                    "latitude": -23.515877
                },
                {
                    "longitude": -46.653961,
                    "latitude": -23.515859
                },
                {
                    "longitude": -46.654054,
                    "latitude": -23.515843
                },
                {
                    "longitude": -46.654196,
                    "latitude": -23.515827
                },
                {
                    "longitude": -46.654323,
                    "latitude": -23.515809
                },
                {
                    "longitude": -46.654506,
                    "latitude": -23.515793
                },
                {
                    "longitude": -46.65473,
                    "latitude": -23.51578
                },
                {
                    "longitude": -46.654947,
                    "latitude": -23.515754
                },
                {
                    "longitude": -46.655208,
                    "latitude": -23.515722
                },
                {
                    "longitude": -46.65535,
                    "latitude": -23.515697
                },
                {
                    "longitude": -46.655654,
                    "latitude": -23.515652
                },
                {
                    "longitude": -46.655921,
                    "latitude": -23.515608
                },
                {
                    "longitude": -46.656272,
                    "latitude": -23.515554
                },
                {
                    "longitude": -46.656509,
                    "latitude": -23.515516
                },
                {
                    "longitude": -46.656756,
                    "latitude": -23.515489
                },
                {
                    "longitude": -46.656967,
                    "latitude": -23.515459
                },
                {
                    "longitude": -46.657068,
                    "latitude": -23.51548
                },
                {
                    "longitude": -46.657125,
                    "latitude": -23.515452
                },
                {
                    "longitude": -46.657431,
                    "latitude": -23.515395
                },
                {
                    "longitude": -46.657825,
                    "latitude": -23.515326
                },
                {
                    "longitude": -46.658303,
                    "latitude": -23.515254
                },
                {
                    "longitude": -46.658723,
                    "latitude": -23.515194
                },
                {
                    "longitude": -46.659399,
                    "latitude": -23.515103
                },
                {
                    "longitude": -46.659879,
                    "latitude": -23.515039
                },
                {
                    "longitude": -46.660459,
                    "latitude": -23.514966
                },
                {
                    "longitude": -46.66079,
                    "latitude": -23.514916
                },
                {
                    "longitude": -46.661235,
                    "latitude": -23.514864
                },
                {
                    "longitude": -46.661922,
                    "latitude": -23.514773
                },
                {
                    "longitude": -46.662156,
                    "latitude": -23.514785
                },
                {
                    "longitude": -46.662211,
                    "latitude": -23.514777
                },
                {
                    "longitude": -46.662895,
                    "latitude": -23.514684
                },
                {
                    "longitude": -46.663583,
                    "latitude": -23.514592
                },
                {
                    "longitude": -46.664315,
                    "latitude": -23.514514
                },
                {
                    "longitude": -46.664547,
                    "latitude": -23.514494
                },
                {
                    "longitude": -46.664943,
                    "latitude": -23.514461
                },
                {
                    "longitude": -46.665257,
                    "latitude": -23.514435
                },
                {
                    "longitude": -46.665473,
                    "latitude": -23.514423
                },
                {
                    "longitude": -46.665649,
                    "latitude": -23.514402
                },
                {
                    "longitude": -46.666051,
                    "latitude": -23.51436
                },
                {
                    "longitude": -46.666355,
                    "latitude": -23.514328
                },
                {
                    "longitude": -46.666525,
                    "latitude": -23.514311
                },
                {
                    "longitude": -46.666622,
                    "latitude": -23.514297
                },
                {
                    "longitude": -46.666773,
                    "latitude": -23.514282
                },
                {
                    "longitude": -46.667041,
                    "latitude": -23.514237
                },
                {
                    "longitude": -46.667123,
                    "latitude": -23.514243
                },
                {
                    "longitude": -46.667246,
                    "latitude": -23.514224
                },
                {
                    "longitude": -46.667766,
                    "latitude": -23.514144
                },
                {
                    "longitude": -46.668214,
                    "latitude": -23.514063
                },
                {
                    "longitude": -46.669197,
                    "latitude": -23.513908
                },
                {
                    "longitude": -46.669655,
                    "latitude": -23.513835
                },
                {
                    "longitude": -46.670071,
                    "latitude": -23.513778
                },
                {
                    "longitude": -46.670729,
                    "latitude": -23.513686
                },
                {
                    "longitude": -46.671257,
                    "latitude": -23.513613
                },
                {
                    "longitude": -46.67183,
                    "latitude": -23.513545
                },
                {
                    "longitude": -46.672295,
                    "latitude": -23.513501
                },
                {
                    "longitude": -46.672656,
                    "latitude": -23.51345
                },
                {
                    "longitude": -46.672932,
                    "latitude": -23.513409
                },
                {
                    "longitude": -46.673181,
                    "latitude": -23.513383
                },
                {
                    "longitude": -46.673527,
                    "latitude": -23.513342
                },
                {
                    "longitude": -46.673743,
                    "latitude": -23.513318
                },
                {
                    "longitude": -46.673924,
                    "latitude": -23.513303
                },
                {
                    "longitude": -46.674176,
                    "latitude": -23.513285
                },
                {
                    "longitude": -46.674372,
                    "latitude": -23.513246
                },
                {
                    "longitude": -46.674603,
                    "latitude": -23.5132
                },
                {
                    "longitude": -46.676276,
                    "latitude": -23.512997
                },
                {
                    "longitude": -46.676749,
                    "latitude": -23.51294
                },
                {
                    "longitude": -46.677172,
                    "latitude": -23.512841
                },
                {
                    "longitude": -46.677413,
                    "latitude": -23.51274
                },
                {
                    "longitude": -46.677559,
                    "latitude": -23.512733
                },
                {
                    "longitude": -46.677641,
                    "latitude": -23.512713
                },
                {
                    "longitude": -46.677881,
                    "latitude": -23.512629
                },
                {
                    "longitude": -46.678158,
                    "latitude": -23.512519
                },
                {
                    "longitude": -46.678402,
                    "latitude": -23.512414
                },
                {
                    "longitude": -46.678532,
                    "latitude": -23.512339
                },
                {
                    "longitude": -46.678725,
                    "latitude": -23.512214
                },
                {
                    "longitude": -46.678825,
                    "latitude": -23.512167
                },
                {
                    "longitude": -46.679137,
                    "latitude": -23.511966
                },
                {
                    "longitude": -46.679397,
                    "latitude": -23.511766
                },
                {
                    "longitude": -46.680037,
                    "latitude": -23.511299
                },
                {
                    "longitude": -46.680726,
                    "latitude": -23.510785
                },
                {
                    "longitude": -46.681237,
                    "latitude": -23.510393
                },
                {
                    "longitude": -46.681603,
                    "latitude": -23.510149
                },
                {
                    "longitude": -46.682056,
                    "latitude": -23.509889
                },
                {
                    "longitude": -46.682514,
                    "latitude": -23.509648
                },
                {
                    "longitude": -46.682727,
                    "latitude": -23.509573
                },
                {
                    "longitude": -46.682781,
                    "latitude": -23.509514
                },
                {
                    "longitude": -46.683319,
                    "latitude": -23.509284
                },
                {
                    "longitude": -46.683953,
                    "latitude": -23.509088
                },
                {
                    "longitude": -46.68532,
                    "latitude": -23.508838
                },
                {
                    "longitude": -46.685657,
                    "latitude": -23.508778
                },
                {
                    "longitude": -46.685753,
                    "latitude": -23.508761
                },
                {
                    "longitude": -46.685865,
                    "latitude": -23.508743
                },
                {
                    "longitude": -46.685924,
                    "latitude": -23.508731
                },
                {
                    "longitude": -46.686043,
                    "latitude": -23.508712
                },
                {
                    "longitude": -46.686174,
                    "latitude": -23.508687
                },
                {
                    "longitude": -46.686278,
                    "latitude": -23.50867
                },
                {
                    "longitude": -46.686507,
                    "latitude": -23.508637
                },
                {
                    "longitude": -46.686751,
                    "latitude": -23.508603
                },
                {
                    "longitude": -46.686958,
                    "latitude": -23.508573
                },
                {
                    "longitude": -46.687165,
                    "latitude": -23.508543
                },
                {
                    "longitude": -46.687392,
                    "latitude": -23.508508
                },
                {
                    "longitude": -46.687459,
                    "latitude": -23.508476
                },
                {
                    "longitude": -46.687522,
                    "latitude": -23.508446
                },
                {
                    "longitude": -46.687706,
                    "latitude": -23.508441
                },
                {
                    "longitude": -46.687874,
                    "latitude": -23.508415
                },
                {
                    "longitude": -46.688054,
                    "latitude": -23.508382
                },
                {
                    "longitude": -46.688238,
                    "latitude": -23.508348
                },
                {
                    "longitude": -46.688453,
                    "latitude": -23.508303
                },
                {
                    "longitude": -46.688734,
                    "latitude": -23.508259
                },
                {
                    "longitude": -46.688962,
                    "latitude": -23.508213
                },
                {
                    "longitude": -46.689299,
                    "latitude": -23.508143
                },
                {
                    "longitude": -46.689371,
                    "latitude": -23.508133
                },
                {
                    "longitude": -46.689559,
                    "latitude": -23.508078
                },
                {
                    "longitude": -46.689715,
                    "latitude": -23.508058
                },
                {
                    "longitude": -46.689855,
                    "latitude": -23.508038
                },
                {
                    "longitude": -46.690278,
                    "latitude": -23.507881
                },
                {
                    "longitude": -46.690608,
                    "latitude": -23.50785
                },
                {
                    "longitude": -46.69073,
                    "latitude": -23.50783
                },
                {
                    "longitude": -46.690924,
                    "latitude": -23.507795
                },
                {
                    "longitude": -46.69115,
                    "latitude": -23.507748
                },
                {
                    "longitude": -46.691545,
                    "latitude": -23.507658
                },
                {
                    "longitude": -46.691706,
                    "latitude": -23.50767
                },
                {
                    "longitude": -46.692032,
                    "latitude": -23.507585
                },
                {
                    "longitude": -46.692702,
                    "latitude": -23.5074
                },
                {
                    "longitude": -46.693036,
                    "latitude": -23.507342
                },
                {
                    "longitude": -46.69358,
                    "latitude": -23.507216
                },
                {
                    "longitude": -46.694303,
                    "latitude": -23.507061
                },
                {
                    "longitude": -46.695014,
                    "latitude": -23.506957
                },
                {
                    "longitude": -46.695447,
                    "latitude": -23.506918
                },
                {
                    "longitude": -46.695895,
                    "latitude": -23.506906
                },
                {
                    "longitude": -46.696532,
                    "latitude": -23.506894
                },
                {
                    "longitude": -46.696838,
                    "latitude": -23.50691
                },
                {
                    "longitude": -46.697665,
                    "latitude": -23.506975
                },
                {
                    "longitude": -46.697954,
                    "latitude": -23.506975
                },
                {
                    "longitude": -46.700062,
                    "latitude": -23.507239
                },
                {
                    "longitude": -46.700204,
                    "latitude": -23.507218
                },
                {
                    "longitude": -46.700749,
                    "latitude": -23.507239
                },
                {
                    "longitude": -46.700824,
                    "latitude": -23.507214
                },
                {
                    "longitude": -46.701462,
                    "latitude": -23.507262
                },
                {
                    "longitude": -46.70153,
                    "latitude": -23.50734
                },
                {
                    "longitude": -46.702057,
                    "latitude": -23.507385
                },
                {
                    "longitude": -46.702181,
                    "latitude": -23.50744
                },
                {
                    "longitude": -46.703216,
                    "latitude": -23.50756
                },
                {
                    "longitude": -46.703808,
                    "latitude": -23.507634
                },
                {
                    "longitude": -46.703935,
                    "latitude": -23.507612
                },
                {
                    "longitude": -46.704098,
                    "latitude": -23.50763
                },
                {
                    "longitude": -46.704841,
                    "latitude": -23.507715
                },
                {
                    "longitude": -46.70521,
                    "latitude": -23.507746
                },
                {
                    "longitude": -46.705663,
                    "latitude": -23.507798
                },
                {
                    "longitude": -46.705853,
                    "latitude": -23.507828
                },
                {
                    "longitude": -46.706057,
                    "latitude": -23.507844
                },
                {
                    "longitude": -46.706296,
                    "latitude": -23.507862
                },
                {
                    "longitude": -46.706533,
                    "latitude": -23.507884
                },
                {
                    "longitude": -46.706745,
                    "latitude": -23.507908
                },
                {
                    "longitude": -46.706934,
                    "latitude": -23.507904
                },
                {
                    "longitude": -46.707037,
                    "latitude": -23.507833
                },
                {
                    "longitude": -46.707178,
                    "latitude": -23.507778
                },
                {
                    "longitude": -46.707383,
                    "latitude": -23.507727
                },
                {
                    "longitude": -46.707487,
                    "latitude": -23.507678
                },
                {
                    "longitude": -46.707729,
                    "latitude": -23.507676
                },
                {
                    "longitude": -46.707969,
                    "latitude": -23.507659
                },
                {
                    "longitude": -46.708234,
                    "latitude": -23.507648
                },
                {
                    "longitude": -46.708323,
                    "latitude": -23.507651
                },
                {
                    "longitude": -46.708624,
                    "latitude": -23.507644
                },
                {
                    "longitude": -46.70867,
                    "latitude": -23.507658
                },
                {
                    "longitude": -46.7088,
                    "latitude": -23.507697
                },
                {
                    "longitude": -46.708951,
                    "latitude": -23.50772
                },
                {
                    "longitude": -46.709111,
                    "latitude": -23.507789
                },
                {
                    "longitude": -46.709274,
                    "latitude": -23.507775
                },
                {
                    "longitude": -46.709823,
                    "latitude": -23.507723
                },
                {
                    "longitude": -46.710166,
                    "latitude": -23.50769
                },
                {
                    "longitude": -46.710806,
                    "latitude": -23.507626
                },
                {
                    "longitude": -46.711133,
                    "latitude": -23.507596
                },
                {
                    "longitude": -46.711436,
                    "latitude": -23.507579
                },
                {
                    "longitude": -46.711979,
                    "latitude": -23.507503
                },
                {
                    "longitude": -46.712751,
                    "latitude": -23.507447
                },
                {
                    "longitude": -46.712815,
                    "latitude": -23.507444
                },
                {
                    "longitude": -46.71312,
                    "latitude": -23.507376
                },
                {
                    "longitude": -46.713909,
                    "latitude": -23.507342
                },
                {
                    "longitude": -46.714176,
                    "latitude": -23.507343
                },
                {
                    "longitude": -46.714777,
                    "latitude": -23.507321
                },
                {
                    "longitude": -46.714959,
                    "latitude": -23.507306
                },
                {
                    "longitude": -46.715462,
                    "latitude": -23.50724
                },
                {
                    "longitude": -46.716189,
                    "latitude": -23.507179
                },
                {
                    "longitude": -46.716952,
                    "latitude": -23.507172
                },
                {
                    "longitude": -46.717323,
                    "latitude": -23.507197
                },
                {
                    "longitude": -46.718096,
                    "latitude": -23.507301
                },
                {
                    "longitude": -46.718537,
                    "latitude": -23.507387
                },
                {
                    "longitude": -46.719189,
                    "latitude": -23.507557
                },
                {
                    "longitude": -46.719712,
                    "latitude": -23.507768
                },
                {
                    "longitude": -46.720198,
                    "latitude": -23.507977
                },
                {
                    "longitude": -46.720598,
                    "latitude": -23.508224
                },
                {
                    "longitude": -46.720987,
                    "latitude": -23.508473
                },
                {
                    "longitude": -46.721123,
                    "latitude": -23.508666
                },
                {
                    "longitude": -46.721354,
                    "latitude": -23.508855
                },
                {
                    "longitude": -46.721661,
                    "latitude": -23.509209
                },
                {
                    "longitude": -46.72181,
                    "latitude": -23.509403
                },
                {
                    "longitude": -46.721908,
                    "latitude": -23.509543
                },
                {
                    "longitude": -46.722241,
                    "latitude": -23.510022
                },
                {
                    "longitude": -46.722602,
                    "latitude": -23.51056
                },
                {
                    "longitude": -46.722874,
                    "latitude": -23.510984
                },
                {
                    "longitude": -46.723055,
                    "latitude": -23.511237
                },
                {
                    "longitude": -46.723275,
                    "latitude": -23.511465
                },
                {
                    "longitude": -46.72362,
                    "latitude": -23.511758
                },
                {
                    "longitude": -46.723909,
                    "latitude": -23.511946
                },
                {
                    "longitude": -46.724365,
                    "latitude": -23.512316
                },
                {
                    "longitude": -46.724641,
                    "latitude": -23.512595
                },
                {
                    "longitude": -46.724756,
                    "latitude": -23.512728
                },
                {
                    "longitude": -46.72513,
                    "latitude": -23.513013
                },
                {
                    "longitude": -46.725566,
                    "latitude": -23.513283
                },
                {
                    "longitude": -46.725954,
                    "latitude": -23.513503
                },
                {
                    "longitude": -46.726218,
                    "latitude": -23.513635
                },
                {
                    "longitude": -46.726484,
                    "latitude": -23.513783
                },
                {
                    "longitude": -46.726606,
                    "latitude": -23.513851
                },
                {
                    "longitude": -46.726786,
                    "latitude": -23.513971
                },
                {
                    "longitude": -46.726965,
                    "latitude": -23.514029
                },
                {
                    "longitude": -46.727044,
                    "latitude": -23.514103
                },
                {
                    "longitude": -46.727257,
                    "latitude": -23.514217
                },
                {
                    "longitude": -46.727457,
                    "latitude": -23.514296
                },
                {
                    "longitude": -46.727954,
                    "latitude": -23.514486
                },
                {
                    "longitude": -46.728231,
                    "latitude": -23.514641
                },
                {
                    "longitude": -46.728459,
                    "latitude": -23.514772
                },
                {
                    "longitude": -46.729409,
                    "latitude": -23.51532
                },
                {
                    "longitude": -46.730285,
                    "latitude": -23.515801
                },
                {
                    "longitude": -46.730933,
                    "latitude": -23.516167
                },
                {
                    "longitude": -46.731193,
                    "latitude": -23.516323
                },
                {
                    "longitude": -46.731602,
                    "latitude": -23.516519
                },
                {
                    "longitude": -46.73212,
                    "latitude": -23.516708
                },
                {
                    "longitude": -46.732631,
                    "latitude": -23.516834
                },
                {
                    "longitude": -46.732846,
                    "latitude": -23.516878
                },
                {
                    "longitude": -46.733385,
                    "latitude": -23.516924
                },
                {
                    "longitude": -46.733744,
                    "latitude": -23.516936
                },
                {
                    "longitude": -46.73454,
                    "latitude": -23.516902
                },
                {
                    "longitude": -46.735225,
                    "latitude": -23.516881
                },
                {
                    "longitude": -46.736874,
                    "latitude": -23.516847
                },
                {
                    "longitude": -46.738224,
                    "latitude": -23.516874
                },
                {
                    "longitude": -46.738855,
                    "latitude": -23.516898
                },
                {
                    "longitude": -46.739408,
                    "latitude": -23.516898
                },
                {
                    "longitude": -46.739761,
                    "latitude": -23.516849
                },
                {
                    "longitude": -46.739992,
                    "latitude": -23.516665
                },
                {
                    "longitude": -46.740612,
                    "latitude": -23.516673
                },
                {
                    "longitude": -46.740981,
                    "latitude": -23.516659
                },
                {
                    "longitude": -46.741974,
                    "latitude": -23.516617
                },
                {
                    "longitude": -46.742779,
                    "latitude": -23.51662
                },
                {
                    "longitude": -46.743231,
                    "latitude": -23.516678
                },
                {
                    "longitude": -46.743764,
                    "latitude": -23.516765
                },
                {
                    "longitude": -46.74437,
                    "latitude": -23.516955
                },
                {
                    "longitude": -46.744783,
                    "latitude": -23.517121
                },
                {
                    "longitude": -46.745156,
                    "latitude": -23.517285
                },
                {
                    "longitude": -46.745308,
                    "latitude": -23.517376
                },
                {
                    "longitude": -46.74579,
                    "latitude": -23.51768
                },
                {
                    "longitude": -46.746091,
                    "latitude": -23.517881
                },
                {
                    "longitude": -46.746328,
                    "latitude": -23.518079
                },
                {
                    "longitude": -46.746693,
                    "latitude": -23.518416
                },
                {
                    "longitude": -46.747012,
                    "latitude": -23.518775
                },
                {
                    "longitude": -46.747281,
                    "latitude": -23.51912
                },
                {
                    "longitude": -46.747678,
                    "latitude": -23.519688
                },
                {
                    "longitude": -46.747955,
                    "latitude": -23.52022
                },
                {
                    "longitude": -46.748142,
                    "latitude": -23.520717
                },
                {
                    "longitude": -46.748385,
                    "latitude": -23.521286
                },
                {
                    "longitude": -46.748626,
                    "latitude": -23.52177
                },
                {
                    "longitude": -46.748661,
                    "latitude": -23.521925
                },
                {
                    "longitude": -46.748962,
                    "latitude": -23.522439
                },
                {
                    "longitude": -46.749221,
                    "latitude": -23.522722
                },
                {
                    "longitude": -46.749442,
                    "latitude": -23.522936
                },
                {
                    "longitude": -46.749637,
                    "latitude": -23.523135
                },
                {
                    "longitude": -46.749917,
                    "latitude": -23.523356
                },
                {
                    "longitude": -46.750556,
                    "latitude": -23.524357
                },
                {
                    "longitude": -46.750835,
                    "latitude": -23.525143
                },
                {
                    "longitude": -46.750943,
                    "latitude": -23.525714
                },
                {
                    "longitude": -46.751037,
                    "latitude": -23.52647
                },
                {
                    "longitude": -46.751029,
                    "latitude": -23.526973
                },
                {
                    "longitude": -46.751065,
                    "latitude": -23.527993
                },
                {
                    "longitude": -46.750882,
                    "latitude": -23.529387
                },
                {
                    "longitude": -46.750754,
                    "latitude": -23.530486
                },
                {
                    "longitude": -46.750602,
                    "latitude": -23.531616
                },
                {
                    "longitude": -46.750498,
                    "latitude": -23.531996
                },
                {
                    "longitude": -46.750376,
                    "latitude": -23.532322
                },
                {
                    "longitude": -46.75,
                    "latitude": -23.533007
                },
                {
                    "longitude": -46.749588,
                    "latitude": -23.533576
                },
                {
                    "longitude": -46.748987,
                    "latitude": -23.534128
                },
                {
                    "longitude": -46.74835,
                    "latitude": -23.53473
                },
                {
                    "longitude": -46.747073,
                    "latitude": -23.53585
                },
                {
                    "longitude": -46.745449,
                    "latitude": -23.537291
                },
                {
                    "longitude": -46.744919,
                    "latitude": -23.537799
                },
                {
                    "longitude": -46.740659,
                    "latitude": -23.541596
                },
                {
                    "longitude": -46.739884,
                    "latitude": -23.542282
                },
                {
                    "longitude": -46.738541,
                    "latitude": -23.543456
                },
                {
                    "longitude": -46.736917,
                    "latitude": -23.544974
                },
                {
                    "longitude": -46.736288,
                    "latitude": -23.545584
                },
                {
                    "longitude": -46.735975,
                    "latitude": -23.546021
                },
                {
                    "longitude": -46.735779,
                    "latitude": -23.546425
                },
                {
                    "longitude": -46.735316,
                    "latitude": -23.546925
                },
                {
                    "longitude": -46.734167,
                    "latitude": -23.547525
                },
                {
                    "longitude": -46.732691,
                    "latitude": -23.548794
                },
                {
                    "longitude": -46.729576,
                    "latitude": -23.550483
                },
                {
                    "longitude": -46.726394,
                    "latitude": -23.55208
                },
                {
                    "longitude": -46.719077,
                    "latitude": -23.555609
                },
                {
                    "longitude": -46.713219,
                    "latitude": -23.55848
                },
                {
                    "longitude": -46.712693,
                    "latitude": -23.558714
                },
                {
                    "longitude": -46.712204,
                    "latitude": -23.55911
                },
                {
                    "longitude": -46.712075,
                    "latitude": -23.559208
                },
                {
                    "longitude": -46.711492,
                    "latitude": -23.559504
                },
                {
                    "longitude": -46.710895,
                    "latitude": -23.559762
                },
                {
                    "longitude": -46.710699,
                    "latitude": -23.559853
                },
                {
                    "longitude": -46.709737,
                    "latitude": -23.560305
                },
                {
                    "longitude": -46.709312,
                    "latitude": -23.560518
                },
                {
                    "longitude": -46.708941,
                    "latitude": -23.560723
                },
                {
                    "longitude": -46.708799,
                    "latitude": -23.560786
                },
                {
                    "longitude": -46.708489,
                    "latitude": -23.560956
                },
                {
                    "longitude": -46.708061,
                    "latitude": -23.561247
                },
                {
                    "longitude": -46.707764,
                    "latitude": -23.561499
                },
                {
                    "longitude": -46.707303,
                    "latitude": -23.561959
                },
                {
                    "longitude": -46.707018,
                    "latitude": -23.562279
                },
                {
                    "longitude": -46.706655,
                    "latitude": -23.562643
                },
                {
                    "longitude": -46.706359,
                    "latitude": -23.563021
                },
                {
                    "longitude": -46.706155,
                    "latitude": -23.563285
                },
                {
                    "longitude": -46.706013,
                    "latitude": -23.563559
                },
                {
                    "longitude": -46.705746,
                    "latitude": -23.564045
                },
                {
                    "longitude": -46.705555,
                    "latitude": -23.564469
                },
                {
                    "longitude": -46.705364,
                    "latitude": -23.564966
                },
                {
                    "longitude": -46.705149,
                    "latitude": -23.565513
                },
                {
                    "longitude": -46.704854,
                    "latitude": -23.566417
                },
                {
                    "longitude": -46.704531,
                    "latitude": -23.567356
                },
                {
                    "longitude": -46.704087,
                    "latitude": -23.568714
                },
                {
                    "longitude": -46.703921,
                    "latitude": -23.569137
                },
                {
                    "longitude": -46.703705,
                    "latitude": -23.569673
                },
                {
                    "longitude": -46.703366,
                    "latitude": -23.570361
                },
                {
                    "longitude": -46.703287,
                    "latitude": -23.57069
                },
                {
                    "longitude": -46.703022,
                    "latitude": -23.570998
                },
                {
                    "longitude": -46.702592,
                    "latitude": -23.571795
                },
                {
                    "longitude": -46.70245,
                    "latitude": -23.572073
                },
                {
                    "longitude": -46.702242,
                    "latitude": -23.572286
                },
                {
                    "longitude": -46.702025,
                    "latitude": -23.572324
                },
                {
                    "longitude": -46.701738,
                    "latitude": -23.572306
                },
                {
                    "longitude": -46.701545,
                    "latitude": -23.572487
                },
                {
                    "longitude": -46.70141,
                    "latitude": -23.57265
                },
                {
                    "longitude": -46.701096,
                    "latitude": -23.573001
                },
                {
                    "longitude": -46.700575,
                    "latitude": -23.573556
                },
                {
                    "longitude": -46.700152,
                    "latitude": -23.573931
                },
                {
                    "longitude": -46.699704,
                    "latitude": -23.574307
                },
                {
                    "longitude": -46.697973,
                    "latitude": -23.576012
                },
                {
                    "longitude": -46.697453,
                    "latitude": -23.576682
                },
                {
                    "longitude": -46.697108,
                    "latitude": -23.577204
                },
                {
                    "longitude": -46.696821,
                    "latitude": -23.577725
                },
                {
                    "longitude": -46.696525,
                    "latitude": -23.578246
                },
                {
                    "longitude": -46.695344,
                    "latitude": -23.580277
                },
                {
                    "longitude": -46.694737,
                    "latitude": -23.581366
                },
                {
                    "longitude": -46.694351,
                    "latitude": -23.582035
                },
                {
                    "longitude": -46.69381,
                    "latitude": -23.582961
                },
                {
                    "longitude": -46.693178,
                    "latitude": -23.584073
                },
                {
                    "longitude": -46.692752,
                    "latitude": -23.584866
                },
                {
                    "longitude": -46.692621,
                    "latitude": -23.585346
                },
                {
                    "longitude": -46.692478,
                    "latitude": -23.585787
                },
                {
                    "longitude": -46.69242,
                    "latitude": -23.586034
                },
                {
                    "longitude": -46.692373,
                    "latitude": -23.586393
                },
                {
                    "longitude": -46.692412,
                    "latitude": -23.587026
                },
                {
                    "longitude": -46.692471,
                    "latitude": -23.58763
                },
                {
                    "longitude": -46.692918,
                    "latitude": -23.588887
                },
                {
                    "longitude": -46.693238,
                    "latitude": -23.589454
                },
                {
                    "longitude": -46.693451,
                    "latitude": -23.589893
                },
                {
                    "longitude": -46.693697,
                    "latitude": -23.59032
                },
                {
                    "longitude": -46.693755,
                    "latitude": -23.590455
                },
                {
                    "longitude": -46.69382,
                    "latitude": -23.590544
                },
                {
                    "longitude": -46.693996,
                    "latitude": -23.590705
                },
                {
                    "longitude": -46.694188,
                    "latitude": -23.59089
                },
                {
                    "longitude": -46.694352,
                    "latitude": -23.591042
                },
                {
                    "longitude": -46.694446,
                    "latitude": -23.591197
                },
                {
                    "longitude": -46.694619,
                    "latitude": -23.591464
                },
                {
                    "longitude": -46.694648,
                    "latitude": -23.59157
                },
                {
                    "longitude": -46.69467,
                    "latitude": -23.591709
                },
                {
                    "longitude": -46.694647,
                    "latitude": -23.591908
                },
                {
                    "longitude": -46.694654,
                    "latitude": -23.592186
                },
                {
                    "longitude": -46.694637,
                    "latitude": -23.592498
                },
                {
                    "longitude": -46.694585,
                    "latitude": -23.592816
                },
                {
                    "longitude": -46.69447,
                    "latitude": -23.593119
                },
                {
                    "longitude": -46.694361,
                    "latitude": -23.593363
                },
                {
                    "longitude": -46.694251,
                    "latitude": -23.593571
                },
                {
                    "longitude": -46.694172,
                    "latitude": -23.593682
                },
                {
                    "longitude": -46.693807,
                    "latitude": -23.594171
                },
                {
                    "longitude": -46.693089,
                    "latitude": -23.595122
                },
                {
                    "longitude": -46.692507,
                    "latitude": -23.595874
                },
                {
                    "longitude": -46.691952,
                    "latitude": -23.596391
                },
                {
                    "longitude": -46.691806,
                    "latitude": -23.596473
                },
                {
                    "longitude": -46.691098,
                    "latitude": -23.596868
                },
                {
                    "longitude": -46.690298,
                    "latitude": -23.597271
                },
                {
                    "longitude": -46.689214,
                    "latitude": -23.597824
                },
                {
                    "longitude": -46.688388,
                    "latitude": -23.598173
                },
                {
                    "longitude": -46.687838,
                    "latitude": -23.598449
                },
                {
                    "longitude": -46.687422,
                    "latitude": -23.598724
                },
                {
                    "longitude": -46.686085,
                    "latitude": -23.599408
                },
                {
                    "longitude": -46.685187,
                    "latitude": -23.599918
                },
                {
                    "longitude": -46.684379,
                    "latitude": -23.600397
                },
                {
                    "longitude": -46.683605,
                    "latitude": -23.600973
                },
                {
                    "longitude": -46.682975,
                    "latitude": -23.601495
                },
                {
                    "longitude": -46.682542,
                    "latitude": -23.601801
                },
                {
                    "longitude": -46.682061,
                    "latitude": -23.602185
                },
                {
                    "longitude": -46.681297,
                    "latitude": -23.602812
                },
                {
                    "longitude": -46.681008,
                    "latitude": -23.603194
                },
                {
                    "longitude": -46.680686,
                    "latitude": -23.603454
                },
                {
                    "longitude": -46.680403,
                    "latitude": -23.603674
                },
                {
                    "longitude": -46.680171,
                    "latitude": -23.603865
                },
                {
                    "longitude": -46.680055,
                    "latitude": -23.603971
                },
                {
                    "longitude": -46.679955,
                    "latitude": -23.604072
                },
                {
                    "longitude": -46.679894,
                    "latitude": -23.604163
                },
                {
                    "longitude": -46.679769,
                    "latitude": -23.604367
                },
                {
                    "longitude": -46.679548,
                    "latitude": -23.604803
                },
                {
                    "longitude": -46.679246,
                    "latitude": -23.605413
                },
                {
                    "longitude": -46.679197,
                    "latitude": -23.605663
                },
                {
                    "longitude": -46.678452,
                    "latitude": -23.607163
                },
                {
                    "longitude": -46.678103,
                    "latitude": -23.607727
                },
                {
                    "longitude": -46.677856,
                    "latitude": -23.607907
                },
                {
                    "longitude": -46.677603,
                    "latitude": -23.608113
                },
                {
                    "longitude": -46.677473,
                    "latitude": -23.608228
                },
                {
                    "longitude": -46.677085,
                    "latitude": -23.608544
                },
                {
                    "longitude": -46.676966,
                    "latitude": -23.608694
                },
                {
                    "longitude": -46.676413,
                    "latitude": -23.609146
                },
                {
                    "longitude": -46.676204,
                    "latitude": -23.609222
                },
                {
                    "longitude": -46.67595,
                    "latitude": -23.609383
                },
                {
                    "longitude": -46.675654,
                    "latitude": -23.60974
                },
                {
                    "longitude": -46.675254,
                    "latitude": -23.610297
                },
                {
                    "longitude": -46.674855,
                    "latitude": -23.61083
                },
                {
                    "longitude": -46.674738,
                    "latitude": -23.61097
                },
                {
                    "longitude": -46.674499,
                    "latitude": -23.611166
                },
                {
                    "longitude": -46.673705,
                    "latitude": -23.611739
                },
                {
                    "longitude": -46.672754,
                    "latitude": -23.61219
                },
                {
                    "longitude": -46.671807,
                    "latitude": -23.612618
                },
                {
                    "longitude": -46.670329,
                    "latitude": -23.613347
                },
                {
                    "longitude": -46.669864,
                    "latitude": -23.613647
                },
                {
                    "longitude": -46.669086,
                    "latitude": -23.614283
                },
                {
                    "longitude": -46.668642,
                    "latitude": -23.614632
                },
                {
                    "longitude": -46.667832,
                    "latitude": -23.615259
                },
                {
                    "longitude": -46.667378,
                    "latitude": -23.615515
                },
                {
                    "longitude": -46.666956,
                    "latitude": -23.615701
                },
                {
                    "longitude": -46.666446,
                    "latitude": -23.615842
                },
                {
                    "longitude": -46.665877,
                    "latitude": -23.615976
                },
                {
                    "longitude": -46.66453,
                    "latitude": -23.616261
                },
                {
                    "longitude": -46.663996,
                    "latitude": -23.616412
                },
                {
                    "longitude": -46.663603,
                    "latitude": -23.616568
                },
                {
                    "longitude": -46.662494,
                    "latitude": -23.617121
                },
                {
                    "longitude": -46.661743,
                    "latitude": -23.61747
                },
                {
                    "longitude": -46.660617,
                    "latitude": -23.618007
                },
                {
                    "longitude": -46.659737,
                    "latitude": -23.618426
                },
                {
                    "longitude": -46.659103,
                    "latitude": -23.618731
                },
                {
                    "longitude": -46.656772,
                    "latitude": -23.619842
                },
                {
                    "longitude": -46.656372,
                    "latitude": -23.620074
                },
                {
                    "longitude": -46.655292,
                    "latitude": -23.620778
                },
                {
                    "longitude": -46.654872,
                    "latitude": -23.621051
                },
                {
                    "longitude": -46.652223,
                    "latitude": -23.622779
                },
                {
                    "longitude": -46.651658,
                    "latitude": -23.62314
                },
                {
                    "longitude": -46.651387,
                    "latitude": -23.623321
                },
                {
                    "longitude": -46.651206,
                    "latitude": -23.623447
                },
                {
                    "longitude": -46.650958,
                    "latitude": -23.623633
                },
                {
                    "longitude": -46.650726,
                    "latitude": -23.623817
                },
                {
                    "longitude": -46.650493,
                    "latitude": -23.624028
                },
                {
                    "longitude": -46.650282,
                    "latitude": -23.624247
                },
                {
                    "longitude": -46.650141,
                    "latitude": -23.62438
                },
                {
                    "longitude": -46.649999,
                    "latitude": -23.624541
                },
                {
                    "longitude": -46.649793,
                    "latitude": -23.624781
                },
                {
                    "longitude": -46.649692,
                    "latitude": -23.624926
                },
                {
                    "longitude": -46.649577,
                    "latitude": -23.625087
                },
                {
                    "longitude": -46.649451,
                    "latitude": -23.625299
                },
                {
                    "longitude": -46.649373,
                    "latitude": -23.625432
                },
                {
                    "longitude": -46.649293,
                    "latitude": -23.625577
                },
                {
                    "longitude": -46.649205,
                    "latitude": -23.625764
                },
                {
                    "longitude": -46.649041,
                    "latitude": -23.626166
                },
                {
                    "longitude": -46.648791,
                    "latitude": -23.626724
                },
                {
                    "longitude": -46.648695,
                    "latitude": -23.626966
                },
                {
                    "longitude": -46.648593,
                    "latitude": -23.627197
                },
                {
                    "longitude": -46.648459,
                    "latitude": -23.627531
                },
                {
                    "longitude": -46.648331,
                    "latitude": -23.627865
                },
                {
                    "longitude": -46.648142,
                    "latitude": -23.628358
                },
                {
                    "longitude": -46.647944,
                    "latitude": -23.628802
                },
                {
                    "longitude": -46.647842,
                    "latitude": -23.629067
                },
                {
                    "longitude": -46.647719,
                    "latitude": -23.629347
                },
                {
                    "longitude": -46.647605,
                    "latitude": -23.629576
                },
                {
                    "longitude": -46.647486,
                    "latitude": -23.629817
                },
                {
                    "longitude": -46.647345,
                    "latitude": -23.629966
                },
                {
                    "longitude": -46.647175,
                    "latitude": -23.630095
                },
                {
                    "longitude": -46.647035,
                    "latitude": -23.63017
                },
                {
                    "longitude": -46.646944,
                    "latitude": -23.630211
                },
                {
                    "longitude": -46.646782,
                    "latitude": -23.630278
                },
                {
                    "longitude": -46.64656,
                    "latitude": -23.630352
                },
                {
                    "longitude": -46.646356,
                    "latitude": -23.630427
                },
                {
                    "longitude": -46.64613,
                    "latitude": -23.630496
                },
                {
                    "longitude": -46.645687,
                    "latitude": -23.630643
                },
                {
                    "longitude": -46.645236,
                    "latitude": -23.630803
                },
                {
                    "longitude": -46.645016,
                    "latitude": -23.630853
                },
                {
                    "longitude": -46.6448,
                    "latitude": -23.630873
                },
                {
                    "longitude": -46.64449,
                    "latitude": -23.630859
                },
                {
                    "longitude": -46.64426,
                    "latitude": -23.630816
                },
                {
                    "longitude": -46.644031,
                    "latitude": -23.630738
                },
                {
                    "longitude": -46.643804,
                    "latitude": -23.630601
                },
                {
                    "longitude": -46.643493,
                    "latitude": -23.630418
                },
                {
                    "longitude": -46.643149,
                    "latitude": -23.630128
                },
                {
                    "longitude": -46.642768,
                    "latitude": -23.629853
                },
                {
                    "longitude": -46.642455,
                    "latitude": -23.629675
                },
                {
                    "longitude": -46.642169,
                    "latitude": -23.629554
                },
                {
                    "longitude": -46.641869,
                    "latitude": -23.629436
                },
                {
                    "longitude": -46.641553,
                    "latitude": -23.629361
                },
                {
                    "longitude": -46.640919,
                    "latitude": -23.629286
                },
                {
                    "longitude": -46.640419,
                    "latitude": -23.629302
                },
                {
                    "longitude": -46.640094,
                    "latitude": -23.629317
                },
                {
                    "longitude": -46.638305,
                    "latitude": -23.629501
                },
                {
                    "longitude": -46.637101,
                    "latitude": -23.629607
                },
                {
                    "longitude": -46.635649,
                    "latitude": -23.629762
                },
                {
                    "longitude": -46.635062,
                    "latitude": -23.629817
                },
                {
                    "longitude": -46.634442,
                    "latitude": -23.629834
                },
                {
                    "longitude": -46.633765,
                    "latitude": -23.629793
                },
                {
                    "longitude": -46.633499,
                    "latitude": -23.629786
                },
                {
                    "longitude": -46.633013,
                    "latitude": -23.629727
                },
                {
                    "longitude": -46.631391,
                    "latitude": -23.629513
                },
                {
                    "longitude": -46.63076,
                    "latitude": -23.629418
                },
                {
                    "longitude": -46.629827,
                    "latitude": -23.629274
                },
                {
                    "longitude": -46.628978,
                    "latitude": -23.629151
                },
                {
                    "longitude": -46.627876,
                    "latitude": -23.629275
                },
                {
                    "longitude": -46.627402,
                    "latitude": -23.629143
                },
                {
                    "longitude": -46.626897,
                    "latitude": -23.629009
                },
                {
                    "longitude": -46.626252,
                    "latitude": -23.628879
                },
                {
                    "longitude": -46.625281,
                    "latitude": -23.62857
                },
                {
                    "longitude": -46.625139,
                    "latitude": -23.628536
                },
                {
                    "longitude": -46.623979,
                    "latitude": -23.628415
                },
                {
                    "longitude": -46.623264,
                    "latitude": -23.628336
                },
                {
                    "longitude": -46.62154,
                    "latitude": -23.627958
                },
                {
                    "longitude": -46.620269,
                    "latitude": -23.627725
                },
                {
                    "longitude": -46.619672,
                    "latitude": -23.6276
                },
                {
                    "longitude": -46.619133,
                    "latitude": -23.627474
                },
                {
                    "longitude": -46.618249,
                    "latitude": -23.627197
                },
                {
                    "longitude": -46.6175,
                    "latitude": -23.626951
                },
                {
                    "longitude": -46.616967,
                    "latitude": -23.626716
                },
                {
                    "longitude": -46.616487,
                    "latitude": -23.626469
                },
                {
                    "longitude": -46.616009,
                    "latitude": -23.626181
                },
                {
                    "longitude": -46.614552,
                    "latitude": -23.62511
                },
                {
                    "longitude": -46.613859,
                    "latitude": -23.624529
                },
                {
                    "longitude": -46.613385,
                    "latitude": -23.624081
                },
                {
                    "longitude": -46.612806,
                    "latitude": -23.623457
                },
                {
                    "longitude": -46.612456,
                    "latitude": -23.622974
                },
                {
                    "longitude": -46.612132,
                    "latitude": -23.622544
                },
                {
                    "longitude": -46.612004,
                    "latitude": -23.622333
                },
                {
                    "longitude": -46.611771,
                    "latitude": -23.621833
                },
                {
                    "longitude": -46.61148,
                    "latitude": -23.621211
                },
                {
                    "longitude": -46.611352,
                    "latitude": -23.620973
                },
                {
                    "longitude": -46.611072,
                    "latitude": -23.620388
                },
                {
                    "longitude": -46.610985,
                    "latitude": -23.620192
                },
                {
                    "longitude": -46.61065,
                    "latitude": -23.619496
                },
                {
                    "longitude": -46.610391,
                    "latitude": -23.618919
                },
                {
                    "longitude": -46.61024,
                    "latitude": -23.618611
                },
                {
                    "longitude": -46.609938,
                    "latitude": -23.617957
                },
                {
                    "longitude": -46.609651,
                    "latitude": -23.617362
                },
                {
                    "longitude": -46.609263,
                    "latitude": -23.616547
                },
                {
                    "longitude": -46.609082,
                    "latitude": -23.61617
                },
                {
                    "longitude": -46.608859,
                    "latitude": -23.61572
                },
                {
                    "longitude": -46.608648,
                    "latitude": -23.615277
                },
                {
                    "longitude": -46.608286,
                    "latitude": -23.614325
                },
                {
                    "longitude": -46.607506,
                    "latitude": -23.612257
                },
                {
                    "longitude": -46.607397,
                    "latitude": -23.611983
                },
                {
                    "longitude": -46.607178,
                    "latitude": -23.611383
                },
                {
                    "longitude": -46.60705,
                    "latitude": -23.611026
                },
                {
                    "longitude": -46.606852,
                    "latitude": -23.610511
                },
                {
                    "longitude": -46.606666,
                    "latitude": -23.610077
                },
                {
                    "longitude": -46.606553,
                    "latitude": -23.60971
                },
                {
                    "longitude": -46.60584,
                    "latitude": -23.607868
                },
                {
                    "longitude": -46.605688,
                    "latitude": -23.607452
                },
                {
                    "longitude": -46.605521,
                    "latitude": -23.606984
                },
                {
                    "longitude": -46.605409,
                    "latitude": -23.606723
                },
                {
                    "longitude": -46.605275,
                    "latitude": -23.606411
                },
                {
                    "longitude": -46.605083,
                    "latitude": -23.606115
                },
                {
                    "longitude": -46.604882,
                    "latitude": -23.605874
                },
                {
                    "longitude": -46.604699,
                    "latitude": -23.605663
                },
                {
                    "longitude": -46.604487,
                    "latitude": -23.605445
                },
                {
                    "longitude": -46.604296,
                    "latitude": -23.605261
                },
                {
                    "longitude": -46.603914,
                    "latitude": -23.604875
                },
                {
                    "longitude": -46.6036,
                    "latitude": -23.604596
                },
                {
                    "longitude": -46.603362,
                    "latitude": -23.604362
                },
                {
                    "longitude": -46.603083,
                    "latitude": -23.60416
                },
                {
                    "longitude": -46.602905,
                    "latitude": -23.604035
                },
                {
                    "longitude": -46.602681,
                    "latitude": -23.603902
                },
                {
                    "longitude": -46.602415,
                    "latitude": -23.60378
                },
                {
                    "longitude": -46.602199,
                    "latitude": -23.603704
                },
                {
                    "longitude": -46.602004,
                    "latitude": -23.603649
                },
                {
                    "longitude": -46.601899,
                    "latitude": -23.603638
                },
                {
                    "longitude": -46.601643,
                    "latitude": -23.603637
                },
                {
                    "longitude": -46.601391,
                    "latitude": -23.603628
                },
                {
                    "longitude": -46.601221,
                    "latitude": -23.60361
                },
                {
                    "longitude": -46.601095,
                    "latitude": -23.603592
                },
                {
                    "longitude": -46.600962,
                    "latitude": -23.603566
                },
                {
                    "longitude": -46.600775,
                    "latitude": -23.603522
                },
                {
                    "longitude": -46.600602,
                    "latitude": -23.603475
                },
                {
                    "longitude": -46.600402,
                    "latitude": -23.603379
                },
                {
                    "longitude": -46.600188,
                    "latitude": -23.603273
                },
                {
                    "longitude": -46.599957,
                    "latitude": -23.603064
                },
                {
                    "longitude": -46.599743,
                    "latitude": -23.602856
                },
                {
                    "longitude": -46.599622,
                    "latitude": -23.6027
                },
                {
                    "longitude": -46.599321,
                    "latitude": -23.602366
                },
                {
                    "longitude": -46.599062,
                    "latitude": -23.60207
                },
                {
                    "longitude": -46.598794,
                    "latitude": -23.601762
                },
                {
                    "longitude": -46.598609,
                    "latitude": -23.601526
                },
                {
                    "longitude": -46.598454,
                    "latitude": -23.601275
                },
                {
                    "longitude": -46.598203,
                    "latitude": -23.600889
                },
                {
                    "longitude": -46.598024,
                    "latitude": -23.600625
                },
                {
                    "longitude": -46.597751,
                    "latitude": -23.600241
                },
                {
                    "longitude": -46.59761,
                    "latitude": -23.600037
                },
                {
                    "longitude": -46.597478,
                    "latitude": -23.59985
                },
                {
                    "longitude": -46.597453,
                    "latitude": -23.599813
                },
                {
                    "longitude": -46.597434,
                    "latitude": -23.599764
                },
                {
                    "longitude": -46.597364,
                    "latitude": -23.599607
                },
                {
                    "longitude": -46.597315,
                    "latitude": -23.599414
                },
                {
                    "longitude": -46.597207,
                    "latitude": -23.598979
                },
                {
                    "longitude": -46.59713,
                    "latitude": -23.598695
                },
                {
                    "longitude": -46.597073,
                    "latitude": -23.598451
                },
                {
                    "longitude": -46.597005,
                    "latitude": -23.598059
                },
                {
                    "longitude": -46.596993,
                    "latitude": -23.597879
                },
                {
                    "longitude": -46.596994,
                    "latitude": -23.597655
                },
                {
                    "longitude": -46.597039,
                    "latitude": -23.59717
                },
                {
                    "longitude": -46.597078,
                    "latitude": -23.596849
                },
                {
                    "longitude": -46.597136,
                    "latitude": -23.596164
                },
                {
                    "longitude": -46.597206,
                    "latitude": -23.59553
                },
                {
                    "longitude": -46.59723,
                    "latitude": -23.595247
                },
                {
                    "longitude": -46.597342,
                    "latitude": -23.593813
                },
                {
                    "longitude": -46.597431,
                    "latitude": -23.592838
                },
                {
                    "longitude": -46.597579,
                    "latitude": -23.591595
                },
                {
                    "longitude": -46.597675,
                    "latitude": -23.590543
                },
                {
                    "longitude": -46.597726,
                    "latitude": -23.589847
                },
                {
                    "longitude": -46.597824,
                    "latitude": -23.588949
                },
                {
                    "longitude": -46.597812,
                    "latitude": -23.588632
                },
                {
                    "longitude": -46.597877,
                    "latitude": -23.588492
                },
                {
                    "longitude": -46.597828,
                    "latitude": -23.588249
                },
                {
                    "longitude": -46.597726,
                    "latitude": -23.588099
                },
                {
                    "longitude": -46.597551,
                    "latitude": -23.587912
                },
                {
                    "longitude": -46.597327,
                    "latitude": -23.587756
                },
                {
                    "longitude": -46.597015,
                    "latitude": -23.587612
                },
                {
                    "longitude": -46.596859,
                    "latitude": -23.587571
                },
                {
                    "longitude": -46.596697,
                    "latitude": -23.587646
                },
                {
                    "longitude": -46.596388,
                    "latitude": -23.587777
                },
                {
                    "longitude": -46.596023,
                    "latitude": -23.587939
                },
                {
                    "longitude": -46.595539,
                    "latitude": -23.588159
                },
                {
                    "longitude": -46.595365,
                    "latitude": -23.5882
                },
                {
                    "longitude": -46.59515,
                    "latitude": -23.588243
                },
                {
                    "longitude": -46.594976,
                    "latitude": -23.588258
                },
                {
                    "longitude": -46.594856,
                    "latitude": -23.588262
                },
                {
                    "longitude": -46.594512,
                    "latitude": -23.58823
                },
                {
                    "longitude": -46.59333,
                    "latitude": -23.587912
                },
                {
                    "longitude": -46.592974,
                    "latitude": -23.587822
                },
                {
                    "longitude": -46.592569,
                    "latitude": -23.587745
                },
                {
                    "longitude": -46.59221,
                    "latitude": -23.58769
                },
                {
                    "longitude": -46.591752,
                    "latitude": -23.587621
                },
                {
                    "longitude": -46.591429,
                    "latitude": -23.587598
                },
                {
                    "longitude": -46.591155,
                    "latitude": -23.587508
                },
                {
                    "longitude": -46.590937,
                    "latitude": -23.58735
                },
                {
                    "longitude": -46.590755,
                    "latitude": -23.587193
                },
                {
                    "longitude": -46.590294,
                    "latitude": -23.586795
                },
                {
                    "longitude": -46.589968,
                    "latitude": -23.586527
                },
                {
                    "longitude": -46.589233,
                    "latitude": -23.586106
                },
                {
                    "longitude": -46.588851,
                    "latitude": -23.585887
                },
                {
                    "longitude": -46.588444,
                    "latitude": -23.585675
                },
                {
                    "longitude": -46.587814,
                    "latitude": -23.585326
                },
                {
                    "longitude": -46.58732,
                    "latitude": -23.585053
                },
                {
                    "longitude": -46.58705,
                    "latitude": -23.584899
                },
                {
                    "longitude": -46.586616,
                    "latitude": -23.584668
                },
                {
                    "longitude": -46.586384,
                    "latitude": -23.584543
                },
                {
                    "longitude": -46.586215,
                    "latitude": -23.584444
                },
                {
                    "longitude": -46.586068,
                    "latitude": -23.584372
                },
                {
                    "longitude": -46.585895,
                    "latitude": -23.584305
                },
                {
                    "longitude": -46.585706,
                    "latitude": -23.58426
                },
                {
                    "longitude": -46.585483,
                    "latitude": -23.584235
                },
                {
                    "longitude": -46.585273,
                    "latitude": -23.584238
                },
                {
                    "longitude": -46.585085,
                    "latitude": -23.584245
                },
                {
                    "longitude": -46.584953,
                    "latitude": -23.584289
                },
                {
                    "longitude": -46.584753,
                    "latitude": -23.584362
                },
                {
                    "longitude": -46.584014,
                    "latitude": -23.584711
                },
                {
                    "longitude": -46.58363,
                    "latitude": -23.584906
                },
                {
                    "longitude": -46.583331,
                    "latitude": -23.585042
                },
                {
                    "longitude": -46.58313,
                    "latitude": -23.585096
                },
                {
                    "longitude": -46.582892,
                    "latitude": -23.585135
                },
                {
                    "longitude": -46.582691,
                    "latitude": -23.585151
                },
                {
                    "longitude": -46.582381,
                    "latitude": -23.585126
                },
                {
                    "longitude": -46.580667,
                    "latitude": -23.584857
                },
                {
                    "longitude": -46.5797,
                    "latitude": -23.584716
                },
                {
                    "longitude": -46.578166,
                    "latitude": -23.584481
                },
                {
                    "longitude": -46.577229,
                    "latitude": -23.584343
                },
                {
                    "longitude": -46.576918,
                    "latitude": -23.584257
                },
                {
                    "longitude": -46.576566,
                    "latitude": -23.584269
                },
                {
                    "longitude": -46.575868,
                    "latitude": -23.584152
                },
                {
                    "longitude": -46.575445,
                    "latitude": -23.583866
                },
                {
                    "longitude": -46.574864,
                    "latitude": -23.583492
                },
                {
                    "longitude": -46.574181,
                    "latitude": -23.583174
                },
                {
                    "longitude": -46.573546,
                    "latitude": -23.583033
                },
                {
                    "longitude": -46.572874,
                    "latitude": -23.582982
                },
                {
                    "longitude": -46.571339,
                    "latitude": -23.582971
                },
                {
                    "longitude": -46.570481,
                    "latitude": -23.582973
                },
                {
                    "longitude": -46.570138,
                    "latitude": -23.582985
                },
                {
                    "longitude": -46.57013,
                    "latitude": -23.582795
                },
                {
                    "longitude": -46.570618,
                    "latitude": -23.582706
                },
                {
                    "longitude": -46.570897,
                    "latitude": -23.582682
                },
                {
                    "longitude": -46.571246,
                    "latitude": -23.582651
                },
                {
                    "longitude": -46.571328,
                    "latitude": -23.582621
                },
                {
                    "longitude": -46.571545,
                    "latitude": -23.582557
                },
                {
                    "longitude": -46.571678,
                    "latitude": -23.58244
                },
                {
                    "longitude": -46.571794,
                    "latitude": -23.582315
                },
                {
                    "longitude": -46.571918,
                    "latitude": -23.582107
                },
                {
                    "longitude": -46.571949,
                    "latitude": -23.581992
                },
                {
                    "longitude": -46.571971,
                    "latitude": -23.581858
                },
                {
                    "longitude": -46.571963,
                    "latitude": -23.581477
                },
                {
                    "longitude": -46.571994,
                    "latitude": -23.581097
                },
                {
                    "longitude": -46.572024,
                    "latitude": -23.580712
                },
                {
                    "longitude": -46.57208,
                    "latitude": -23.579761
                },
                {
                    "longitude": -46.572052,
                    "latitude": -23.579539
                },
                {
                    "longitude": -46.572032,
                    "latitude": -23.579419
                },
                {
                    "longitude": -46.5719,
                    "latitude": -23.57931
                },
                {
                    "longitude": -46.571823,
                    "latitude": -23.579206
                },
                {
                    "longitude": -46.57171,
                    "latitude": -23.579011
                },
                {
                    "longitude": -46.571615,
                    "latitude": -23.578879
                },
                {
                    "longitude": -46.571476,
                    "latitude": -23.578641
                },
                {
                    "longitude": -46.571356,
                    "latitude": -23.578379
                },
                {
                    "longitude": -46.571274,
                    "latitude": -23.578054
                },
                {
                    "longitude": -46.571112,
                    "latitude": -23.577654
                },
                {
                    "longitude": -46.570968,
                    "latitude": -23.577114
                },
                {
                    "longitude": -46.570969,
                    "latitude": -23.576823
                },
                {
                    "longitude": -46.570982,
                    "latitude": -23.576289
                },
                {
                    "longitude": -46.570752,
                    "latitude": -23.575373
                },
                {
                    "longitude": -46.57071,
                    "latitude": -23.575136
                },
                {
                    "longitude": -46.570681,
                    "latitude": -23.574465
                },
                {
                    "longitude": -46.570682,
                    "latitude": -23.574377
                },
                {
                    "longitude": -46.570685,
                    "latitude": -23.574307
                },
                {
                    "longitude": -46.570686,
                    "latitude": -23.574152
                },
                {
                    "longitude": -46.570693,
                    "latitude": -23.574069
                },
                {
                    "longitude": -46.570711,
                    "latitude": -23.573951
                },
                {
                    "longitude": -46.570743,
                    "latitude": -23.573823
                },
                {
                    "longitude": -46.570787,
                    "latitude": -23.573678
                },
                {
                    "longitude": -46.570832,
                    "latitude": -23.573565
                },
                {
                    "longitude": -46.570891,
                    "latitude": -23.573423
                },
                {
                    "longitude": -46.570964,
                    "latitude": -23.573279
                },
                {
                    "longitude": -46.571013,
                    "latitude": -23.573197
                },
                {
                    "longitude": -46.571079,
                    "latitude": -23.573117
                },
                {
                    "longitude": -46.571197,
                    "latitude": -23.572973
                },
                {
                    "longitude": -46.571327,
                    "latitude": -23.572827
                },
                {
                    "longitude": -46.571584,
                    "latitude": -23.572601
                },
                {
                    "longitude": -46.571758,
                    "latitude": -23.572444
                },
                {
                    "longitude": -46.572015,
                    "latitude": -23.572221
                },
                {
                    "longitude": -46.572422,
                    "latitude": -23.571887
                },
                {
                    "longitude": -46.572872,
                    "latitude": -23.571543
                },
                {
                    "longitude": -46.573103,
                    "latitude": -23.571331
                },
                {
                    "longitude": -46.573248,
                    "latitude": -23.571144
                },
                {
                    "longitude": -46.573359,
                    "latitude": -23.57094
                },
                {
                    "longitude": -46.573431,
                    "latitude": -23.570808
                },
                {
                    "longitude": -46.573455,
                    "latitude": -23.570673
                },
                {
                    "longitude": -46.573499,
                    "latitude": -23.570516
                },
                {
                    "longitude": -46.573519,
                    "latitude": -23.570375
                },
                {
                    "longitude": -46.573505,
                    "latitude": -23.570244
                },
                {
                    "longitude": -46.573469,
                    "latitude": -23.570023
                },
                {
                    "longitude": -46.573411,
                    "latitude": -23.569728
                },
                {
                    "longitude": -46.573364,
                    "latitude": -23.569404
                },
                {
                    "longitude": -46.573356,
                    "latitude": -23.569349
                },
                {
                    "longitude": -46.573357,
                    "latitude": -23.569159
                },
                {
                    "longitude": -46.573353,
                    "latitude": -23.568862
                },
                {
                    "longitude": -46.57337,
                    "latitude": -23.568674
                },
                {
                    "longitude": -46.573427,
                    "latitude": -23.568503
                },
                {
                    "longitude": -46.573475,
                    "latitude": -23.568333
                },
                {
                    "longitude": -46.573519,
                    "latitude": -23.568178
                },
                {
                    "longitude": -46.573626,
                    "latitude": -23.567941
                },
                {
                    "longitude": -46.573728,
                    "latitude": -23.567754
                },
                {
                    "longitude": -46.573827,
                    "latitude": -23.567575
                },
                {
                    "longitude": -46.573987,
                    "latitude": -23.567334
                },
                {
                    "longitude": -46.57415,
                    "latitude": -23.567108
                },
                {
                    "longitude": -46.574688,
                    "latitude": -23.566305
                },
                {
                    "longitude": -46.574914,
                    "latitude": -23.565937
                },
                {
                    "longitude": -46.57511,
                    "latitude": -23.565622
                },
                {
                    "longitude": -46.575218,
                    "latitude": -23.5654
                },
                {
                    "longitude": -46.5754,
                    "latitude": -23.565016
                },
                {
                    "longitude": -46.575554,
                    "latitude": -23.564514
                },
                {
                    "longitude": -46.575564,
                    "latitude": -23.564132
                },
                {
                    "longitude": -46.575623,
                    "latitude": -23.563551
                },
                {
                    "longitude": -46.575717,
                    "latitude": -23.563379
                },
                {
                    "longitude": -46.575739,
                    "latitude": -23.563247
                },
                {
                    "longitude": -46.575812,
                    "latitude": -23.562854
                },
                {
                    "longitude": -46.575867,
                    "latitude": -23.562467
                },
                {
                    "longitude": -46.575911,
                    "latitude": -23.562091
                },
                {
                    "longitude": -46.575849,
                    "latitude": -23.561909
                },
                {
                    "longitude": -46.575913,
                    "latitude": -23.561787
                },
                {
                    "longitude": -46.576001,
                    "latitude": -23.561576
                },
                {
                    "longitude": -46.576184,
                    "latitude": -23.560923
                },
                {
                    "longitude": -46.576353,
                    "latitude": -23.560501
                },
                {
                    "longitude": -46.576529,
                    "latitude": -23.560231
                },
                {
                    "longitude": -46.576656,
                    "latitude": -23.559964
                },
                {
                    "longitude": -46.576712,
                    "latitude": -23.559841
                },
                {
                    "longitude": -46.576761,
                    "latitude": -23.559616
                },
                {
                    "longitude": -46.576764,
                    "latitude": -23.559428
                },
                {
                    "longitude": -46.576747,
                    "latitude": -23.559236
                },
                {
                    "longitude": -46.576839,
                    "latitude": -23.559123
                },
                {
                    "longitude": -46.576888,
                    "latitude": -23.558967
                },
                {
                    "longitude": -46.576973,
                    "latitude": -23.558649
                },
                {
                    "longitude": -46.57712,
                    "latitude": -23.558312
                },
                {
                    "longitude": -46.577242,
                    "latitude": -23.558085
                },
                {
                    "longitude": -46.577395,
                    "latitude": -23.557658
                },
                {
                    "longitude": -46.577362,
                    "latitude": -23.557335
                },
                {
                    "longitude": -46.577187,
                    "latitude": -23.556718
                },
                {
                    "longitude": -46.576974,
                    "latitude": -23.55588
                },
                {
                    "longitude": -46.576905,
                    "latitude": -23.55558
                },
                {
                    "longitude": -46.576841,
                    "latitude": -23.555442
                },
                {
                    "longitude": -46.576536,
                    "latitude": -23.555187
                },
                {
                    "longitude": -46.576326,
                    "latitude": -23.554915
                },
                {
                    "longitude": -46.57621,
                    "latitude": -23.554643
                },
                {
                    "longitude": -46.576167,
                    "latitude": -23.554459
                },
                {
                    "longitude": -46.576185,
                    "latitude": -23.554085
                },
                {
                    "longitude": -46.576249,
                    "latitude": -23.553706
                },
                {
                    "longitude": -46.576238,
                    "latitude": -23.553494
                },
                {
                    "longitude": -46.576342,
                    "latitude": -23.553156
                },
                {
                    "longitude": -46.576458,
                    "latitude": -23.552857
                },
                {
                    "longitude": -46.576597,
                    "latitude": -23.552441
                },
                {
                    "longitude": -46.576886,
                    "latitude": -23.552004
                },
                {
                    "longitude": -46.577106,
                    "latitude": -23.551832
                },
                {
                    "longitude": -46.577301,
                    "latitude": -23.551638
                },
                {
                    "longitude": -46.577501,
                    "latitude": -23.551354
                },
                {
                    "longitude": -46.5776,
                    "latitude": -23.551153
                },
                {
                    "longitude": -46.577911,
                    "latitude": -23.550607
                },
                {
                    "longitude": -46.578181,
                    "latitude": -23.550129
                },
                {
                    "longitude": -46.57834,
                    "latitude": -23.549822
                },
                {
                    "longitude": -46.578444,
                    "latitude": -23.549584
                },
                {
                    "longitude": -46.578587,
                    "latitude": -23.549234
                },
                {
                    "longitude": -46.578668,
                    "latitude": -23.54899
                },
                {
                    "longitude": -46.578785,
                    "latitude": -23.548633
                },
                {
                    "longitude": -46.578857,
                    "latitude": -23.548296
                },
                {
                    "longitude": -46.579092,
                    "latitude": -23.547285
                },
                {
                    "longitude": -46.579224,
                    "latitude": -23.546723
                },
                {
                    "longitude": -46.579594,
                    "latitude": -23.545095
                },
                {
                    "longitude": -46.579707,
                    "latitude": -23.544543
                },
                {
                    "longitude": -46.579795,
                    "latitude": -23.544156
                },
                {
                    "longitude": -46.580141,
                    "latitude": -23.542637
                },
                {
                    "longitude": -46.580322,
                    "latitude": -23.542131
                },
                {
                    "longitude": -46.580512,
                    "latitude": -23.541375
                },
                {
                    "longitude": -46.580636,
                    "latitude": -23.540896
                },
                {
                    "longitude": -46.580835,
                    "latitude": -23.540117
                },
                {
                    "longitude": -46.580971,
                    "latitude": -23.539635
                },
                {
                    "longitude": -46.581049,
                    "latitude": -23.539448
                },
                {
                    "longitude": -46.581244,
                    "latitude": -23.539077
                },
                {
                    "longitude": -46.581376,
                    "latitude": -23.538866
                },
                {
                    "longitude": -46.581504,
                    "latitude": -23.538683
                },
                {
                    "longitude": -46.581696,
                    "latitude": -23.538428
                },
                {
                    "longitude": -46.581816,
                    "latitude": -23.538264
                },
                {
                    "longitude": -46.581916,
                    "latitude": -23.538113
                },
                {
                    "longitude": -46.581974,
                    "latitude": -23.537998
                },
                {
                    "longitude": -46.582006,
                    "latitude": -23.537897
                },
                {
                    "longitude": -46.582036,
                    "latitude": -23.537779
                },
                {
                    "longitude": -46.582186,
                    "latitude": -23.53719
                },
                {
                    "longitude": -46.582404,
                    "latitude": -23.536316
                },
                {
                    "longitude": -46.582538,
                    "latitude": -23.535777
                },
                {
                    "longitude": -46.582717,
                    "latitude": -23.535078
                },
                {
                    "longitude": -46.582781,
                    "latitude": -23.534833
                },
                {
                    "longitude": -46.582805,
                    "latitude": -23.534731
                },
                {
                    "longitude": -46.582862,
                    "latitude": -23.534502
                },
                {
                    "longitude": -46.582912,
                    "latitude": -23.534299
                },
                {
                    "longitude": -46.58297,
                    "latitude": -23.534072
                },
                {
                    "longitude": -46.582993,
                    "latitude": -23.533971
                },
                {
                    "longitude": -46.583045,
                    "latitude": -23.533773
                },
                {
                    "longitude": -46.583095,
                    "latitude": -23.533569
                },
                {
                    "longitude": -46.583127,
                    "latitude": -23.53344
                },
                {
                    "longitude": -46.583177,
                    "latitude": -23.533238
                },
                {
                    "longitude": -46.583212,
                    "latitude": -23.533095
                },
                {
                    "longitude": -46.583281,
                    "latitude": -23.532807
                },
                {
                    "longitude": -46.583398,
                    "latitude": -23.532333
                },
                {
                    "longitude": -46.583471,
                    "latitude": -23.532024
                },
                {
                    "longitude": -46.583556,
                    "latitude": -23.531687
                },
                {
                    "longitude": -46.583605,
                    "latitude": -23.531479
                },
                {
                    "longitude": -46.58357,
                    "latitude": -23.531342
                },
                {
                    "longitude": -46.583632,
                    "latitude": -23.531148
                },
                {
                    "longitude": -46.583688,
                    "latitude": -23.530908
                },
                {
                    "longitude": -46.583707,
                    "latitude": -23.530726
                },
                {
                    "longitude": -46.583717,
                    "latitude": -23.530556
                },
                {
                    "longitude": -46.583712,
                    "latitude": -23.530428
                },
                {
                    "longitude": -46.583685,
                    "latitude": -23.530297
                },
                {
                    "longitude": -46.583613,
                    "latitude": -23.530048
                },
                {
                    "longitude": -46.583443,
                    "latitude": -23.52955
                },
                {
                    "longitude": -46.583206,
                    "latitude": -23.528993
                },
                {
                    "longitude": -46.583108,
                    "latitude": -23.528824
                },
                {
                    "longitude": -46.582985,
                    "latitude": -23.528698
                },
                {
                    "longitude": -46.58262,
                    "latitude": -23.528377
                },
                {
                    "longitude": -46.584315,
                    "latitude": -23.527411
                },
                {
                    "longitude": -46.587181,
                    "latitude": -23.52809
                }
            ]
        }
    ]
}

}

const geraMiniAnelViario = ()=>{
    return {
        "type": "FeatureCollection",
        "name": "shapesMiniAnel",
        "features": [
        { "type": "Feature", "properties": { "id": 3, "sigla": "MIAN", "nome": "Mini-Anel (Rodizio)" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -46.587706, -23.52815 ], [ -46.587181, -23.52809 ], [ -46.584315, -23.527411 ], [ -46.58262, -23.528377 ], [ -46.582985, -23.528698 ], [ -46.583108, -23.528824 ], [ -46.583206, -23.528993 ], [ -46.583443, -23.52955 ], [ -46.583613, -23.530048 ], [ -46.583685, -23.530297 ], [ -46.583712, -23.530428 ], [ -46.583717, -23.530556 ], [ -46.583707, -23.530726 ], [ -46.583688, -23.530908 ], [ -46.583632, -23.531148 ], [ -46.58357, -23.531342 ], [ -46.583605, -23.531479 ], [ -46.583556, -23.531687 ], [ -46.583471, -23.532024 ], [ -46.583398, -23.532333 ], [ -46.583281, -23.532807 ], [ -46.583212, -23.533095 ], [ -46.583177, -23.533238 ], [ -46.583127, -23.53344 ], [ -46.583095, -23.533569 ], [ -46.583045, -23.533773 ], [ -46.582993, -23.533971 ], [ -46.58297, -23.534072 ], [ -46.582912, -23.534299 ], [ -46.582862, -23.534502 ], [ -46.582805, -23.534731 ], [ -46.582781, -23.534833 ], [ -46.582717, -23.535078 ], [ -46.582538, -23.535777 ], [ -46.582404, -23.536316 ], [ -46.582186, -23.53719 ], [ -46.582036, -23.537779 ], [ -46.582006, -23.537897 ], [ -46.581974, -23.537998 ], [ -46.581916, -23.538113 ], [ -46.581816, -23.538264 ], [ -46.581696, -23.538428 ], [ -46.581504, -23.538683 ], [ -46.581376, -23.538866 ], [ -46.581244, -23.539077 ], [ -46.581049, -23.539448 ], [ -46.580971, -23.539635 ], [ -46.580835, -23.540117 ], [ -46.580636, -23.540896 ], [ -46.580512, -23.541375 ], [ -46.580322, -23.542131 ], [ -46.580141, -23.542637 ], [ -46.579795, -23.544156 ], [ -46.579707, -23.544543 ], [ -46.579594, -23.545095 ], [ -46.579224, -23.546723 ], [ -46.579092, -23.547285 ], [ -46.578857, -23.548296 ], [ -46.578785, -23.548633 ], [ -46.578668, -23.54899 ], [ -46.578587, -23.549234 ], [ -46.578444, -23.549584 ], [ -46.57834, -23.549822 ], [ -46.578181, -23.550129 ], [ -46.577911, -23.550607 ], [ -46.5776, -23.551153 ], [ -46.577501, -23.551354 ], [ -46.577301, -23.551638 ], [ -46.577106, -23.551832 ], [ -46.576886, -23.552004 ], [ -46.576597, -23.552441 ], [ -46.576458, -23.552857 ], [ -46.576342, -23.553156 ], [ -46.576238, -23.553494 ], [ -46.576249, -23.553706 ], [ -46.576185, -23.554085 ], [ -46.576167, -23.554459 ], [ -46.57621, -23.554643 ], [ -46.576326, -23.554915 ], [ -46.576536, -23.555187 ], [ -46.576841, -23.555442 ], [ -46.576905, -23.55558 ], [ -46.576974, -23.55588 ], [ -46.577187, -23.556718 ], [ -46.577362, -23.557335 ], [ -46.577395, -23.557658 ], [ -46.577242, -23.558085 ], [ -46.57712, -23.558312 ], [ -46.576973, -23.558649 ], [ -46.576888, -23.558967 ], [ -46.576839, -23.559123 ], [ -46.576747, -23.559236 ], [ -46.576764, -23.559428 ], [ -46.576761, -23.559616 ], [ -46.576712, -23.559841 ], [ -46.576656, -23.559964 ], [ -46.576529, -23.560231 ], [ -46.576353, -23.560501 ], [ -46.576184, -23.560923 ], [ -46.576001, -23.561576 ], [ -46.575913, -23.561787 ], [ -46.575849, -23.561909 ], [ -46.575911, -23.562091 ], [ -46.575867, -23.562467 ], [ -46.575812, -23.562854 ], [ -46.575739, -23.563247 ], [ -46.575717, -23.563379 ], [ -46.575623, -23.563551 ], [ -46.575564, -23.564132 ], [ -46.575554, -23.564514 ], [ -46.5754, -23.565016 ], [ -46.575218, -23.5654 ], [ -46.57511, -23.565622 ], [ -46.574914, -23.565937 ], [ -46.574688, -23.566305 ], [ -46.57415, -23.567108 ], [ -46.573987, -23.567334 ], [ -46.573827, -23.567575 ], [ -46.573728, -23.567754 ], [ -46.573626, -23.567941 ], [ -46.573519, -23.568178 ], [ -46.573475, -23.568333 ], [ -46.573427, -23.568503 ], [ -46.57337, -23.568674 ], [ -46.573353, -23.568862 ], [ -46.573357, -23.569159 ], [ -46.573356, -23.569349 ], [ -46.573364, -23.569404 ], [ -46.573411, -23.569728 ], [ -46.573469, -23.570023 ], [ -46.573505, -23.570244 ], [ -46.573519, -23.570375 ], [ -46.573499, -23.570516 ], [ -46.573455, -23.570673 ], [ -46.573431, -23.570808 ], [ -46.573359, -23.57094 ], [ -46.573248, -23.571144 ], [ -46.573103, -23.571331 ], [ -46.572872, -23.571543 ], [ -46.572422, -23.571887 ], [ -46.572015, -23.572221 ], [ -46.571758, -23.572444 ], [ -46.571584, -23.572601 ], [ -46.571327, -23.572827 ], [ -46.571197, -23.572973 ], [ -46.571079, -23.573117 ], [ -46.571013, -23.573197 ], [ -46.570964, -23.573279 ], [ -46.570891, -23.573423 ], [ -46.570832, -23.573565 ], [ -46.570787, -23.573678 ], [ -46.570743, -23.573823 ], [ -46.570711, -23.573951 ], [ -46.570693, -23.574069 ], [ -46.570686, -23.574152 ], [ -46.570685, -23.574307 ], [ -46.570682, -23.574377 ], [ -46.570681, -23.574465 ], [ -46.57071, -23.575136 ], [ -46.570752, -23.575373 ], [ -46.570982, -23.576289 ], [ -46.570969, -23.576823 ], [ -46.570968, -23.577114 ], [ -46.571112, -23.577654 ], [ -46.571274, -23.578054 ], [ -46.571356, -23.578379 ], [ -46.571476, -23.578641 ], [ -46.571615, -23.578879 ], [ -46.57171, -23.579011 ], [ -46.571823, -23.579206 ], [ -46.5719, -23.57931 ], [ -46.572032, -23.579419 ], [ -46.572052, -23.579539 ], [ -46.57208, -23.579761 ], [ -46.572024, -23.580712 ], [ -46.571994, -23.581097 ], [ -46.571963, -23.581477 ], [ -46.571971, -23.581858 ], [ -46.571949, -23.581992 ], [ -46.571918, -23.582107 ], [ -46.571794, -23.582315 ], [ -46.571678, -23.58244 ], [ -46.571545, -23.582557 ], [ -46.571328, -23.582621 ], [ -46.571246, -23.582651 ], [ -46.570897, -23.582682 ], [ -46.570618, -23.582706 ], [ -46.57013, -23.582795 ], [ -46.570138, -23.582985 ], [ -46.570481, -23.582973 ], [ -46.571339, -23.582971 ], [ -46.572874, -23.582982 ], [ -46.573546, -23.583033 ], [ -46.574181, -23.583174 ], [ -46.574864, -23.583492 ], [ -46.575445, -23.583866 ], [ -46.575868, -23.584152 ], [ -46.576566, -23.584269 ], [ -46.576918, -23.584257 ], [ -46.577229, -23.584343 ], [ -46.578166, -23.584481 ], [ -46.5797, -23.584716 ], [ -46.580667, -23.584857 ], [ -46.582381, -23.585126 ], [ -46.582691, -23.585151 ], [ -46.582892, -23.585135 ], [ -46.58313, -23.585096 ], [ -46.583331, -23.585042 ], [ -46.58363, -23.584906 ], [ -46.584014, -23.584711 ], [ -46.584753, -23.584362 ], [ -46.584953, -23.584289 ], [ -46.585085, -23.584245 ], [ -46.585273, -23.584238 ], [ -46.585483, -23.584235 ], [ -46.585706, -23.58426 ], [ -46.585895, -23.584305 ], [ -46.586068, -23.584372 ], [ -46.586215, -23.584444 ], [ -46.586384, -23.584543 ], [ -46.586616, -23.584668 ], [ -46.58705, -23.584899 ], [ -46.58732, -23.585053 ], [ -46.587814, -23.585326 ], [ -46.588444, -23.585675 ], [ -46.588851, -23.585887 ], [ -46.589233, -23.586106 ], [ -46.589968, -23.586527 ], [ -46.590294, -23.586795 ], [ -46.590755, -23.587193 ], [ -46.590937, -23.58735 ], [ -46.591155, -23.587508 ], [ -46.591429, -23.587598 ], [ -46.591752, -23.587621 ], [ -46.59221, -23.58769 ], [ -46.592569, -23.587745 ], [ -46.592974, -23.587822 ], [ -46.59333, -23.587912 ], [ -46.594512, -23.58823 ], [ -46.594856, -23.588262 ], [ -46.594976, -23.588258 ], [ -46.59515, -23.588243 ], [ -46.595365, -23.5882 ], [ -46.595539, -23.588159 ], [ -46.596023, -23.587939 ], [ -46.596388, -23.587777 ], [ -46.596697, -23.587646 ], [ -46.596859, -23.587571 ], [ -46.597015, -23.587612 ], [ -46.597327, -23.587756 ], [ -46.597551, -23.587912 ], [ -46.597726, -23.588099 ], [ -46.597828, -23.588249 ], [ -46.597877, -23.588492 ], [ -46.597812, -23.588632 ], [ -46.597824, -23.588949 ], [ -46.597726, -23.589847 ], [ -46.597675, -23.590543 ], [ -46.597579, -23.591595 ], [ -46.597431, -23.592838 ], [ -46.597342, -23.593813 ], [ -46.59723, -23.595247 ], [ -46.597206, -23.59553 ], [ -46.597136, -23.596164 ], [ -46.597078, -23.596849 ], [ -46.597039, -23.59717 ], [ -46.596994, -23.597655 ], [ -46.596993, -23.597879 ], [ -46.597005, -23.598059 ], [ -46.597073, -23.598451 ], [ -46.59713, -23.598695 ], [ -46.597207, -23.598979 ], [ -46.597315, -23.599414 ], [ -46.597364, -23.599607 ], [ -46.597434, -23.599764 ], [ -46.597453, -23.599813 ], [ -46.597478, -23.59985 ], [ -46.59761, -23.600037 ], [ -46.597751, -23.600241 ], [ -46.598024, -23.600625 ], [ -46.598203, -23.600889 ], [ -46.598454, -23.601275 ], [ -46.598609, -23.601526 ], [ -46.598794, -23.601762 ], [ -46.599062, -23.60207 ], [ -46.599321, -23.602366 ], [ -46.599622, -23.6027 ], [ -46.599743, -23.602856 ], [ -46.599957, -23.603064 ], [ -46.600188, -23.603273 ], [ -46.600402, -23.603379 ], [ -46.600602, -23.603475 ], [ -46.600775, -23.603522 ], [ -46.600962, -23.603566 ], [ -46.601095, -23.603592 ], [ -46.601221, -23.60361 ], [ -46.601391, -23.603628 ], [ -46.601643, -23.603637 ], [ -46.601899, -23.603638 ], [ -46.602004, -23.603649 ], [ -46.602199, -23.603704 ], [ -46.602415, -23.60378 ], [ -46.602681, -23.603902 ], [ -46.602905, -23.604035 ], [ -46.603083, -23.60416 ], [ -46.603362, -23.604362 ], [ -46.6036, -23.604596 ], [ -46.603914, -23.604875 ], [ -46.604296, -23.605261 ], [ -46.604487, -23.605445 ], [ -46.604699, -23.605663 ], [ -46.604882, -23.605874 ], [ -46.605083, -23.606115 ], [ -46.605275, -23.606411 ], [ -46.605409, -23.606723 ], [ -46.605521, -23.606984 ], [ -46.605688, -23.607452 ], [ -46.60584, -23.607868 ], [ -46.606553, -23.60971 ], [ -46.606666, -23.610077 ], [ -46.606852, -23.610511 ], [ -46.60705, -23.611026 ], [ -46.607178, -23.611383 ], [ -46.607397, -23.611983 ], [ -46.607506, -23.612257 ], [ -46.608286, -23.614325 ], [ -46.608648, -23.615277 ], [ -46.608859, -23.61572 ], [ -46.609082, -23.61617 ], [ -46.609263, -23.616547 ], [ -46.609651, -23.617362 ], [ -46.609938, -23.617957 ], [ -46.61024, -23.618611 ], [ -46.610391, -23.618919 ], [ -46.61065, -23.619496 ], [ -46.610985, -23.620192 ], [ -46.611072, -23.620388 ], [ -46.611352, -23.620973 ], [ -46.61148, -23.621211 ], [ -46.611771, -23.621833 ], [ -46.612004, -23.622333 ], [ -46.612132, -23.622544 ], [ -46.612456, -23.622974 ], [ -46.612806, -23.623457 ], [ -46.613385, -23.624081 ], [ -46.613859, -23.624529 ], [ -46.614552, -23.62511 ], [ -46.616009, -23.626181 ], [ -46.616487, -23.626469 ], [ -46.616967, -23.626716 ], [ -46.6175, -23.626951 ], [ -46.618249, -23.627197 ], [ -46.619133, -23.627474 ], [ -46.619672, -23.6276 ], [ -46.620269, -23.627725 ], [ -46.62154, -23.627958 ], [ -46.623264, -23.628336 ], [ -46.623979, -23.628415 ], [ -46.625139, -23.628536 ], [ -46.625281, -23.62857 ], [ -46.626252, -23.628879 ], [ -46.626897, -23.629009 ], [ -46.627402, -23.629143 ], [ -46.627876, -23.629275 ], [ -46.628978, -23.629151 ], [ -46.629827, -23.629274 ], [ -46.63076, -23.629418 ], [ -46.631391, -23.629513 ], [ -46.633013, -23.629727 ], [ -46.633499, -23.629786 ], [ -46.633765, -23.629793 ], [ -46.634442, -23.629834 ], [ -46.635062, -23.629817 ], [ -46.635649, -23.629762 ], [ -46.637101, -23.629607 ], [ -46.638305, -23.629501 ], [ -46.640094, -23.629317 ], [ -46.640419, -23.629302 ], [ -46.640919, -23.629286 ], [ -46.641553, -23.629361 ], [ -46.641869, -23.629436 ], [ -46.642169, -23.629554 ], [ -46.642455, -23.629675 ], [ -46.642768, -23.629853 ], [ -46.643149, -23.630128 ], [ -46.643493, -23.630418 ], [ -46.643804, -23.630601 ], [ -46.644031, -23.630738 ], [ -46.64426, -23.630816 ], [ -46.64449, -23.630859 ], [ -46.6448, -23.630873 ], [ -46.645016, -23.630853 ], [ -46.645236, -23.630803 ], [ -46.645687, -23.630643 ], [ -46.64613, -23.630496 ], [ -46.646356, -23.630427 ], [ -46.64656, -23.630352 ], [ -46.646782, -23.630278 ], [ -46.646944, -23.630211 ], [ -46.647035, -23.63017 ], [ -46.647175, -23.630095 ], [ -46.647345, -23.629966 ], [ -46.647486, -23.629817 ], [ -46.647605, -23.629576 ], [ -46.647719, -23.629347 ], [ -46.647842, -23.629067 ], [ -46.647944, -23.628802 ], [ -46.648142, -23.628358 ], [ -46.648331, -23.627865 ], [ -46.648459, -23.627531 ], [ -46.648593, -23.627197 ], [ -46.648695, -23.626966 ], [ -46.648791, -23.626724 ], [ -46.649041, -23.626166 ], [ -46.649205, -23.625764 ], [ -46.649293, -23.625577 ], [ -46.649373, -23.625432 ], [ -46.649451, -23.625299 ], [ -46.649577, -23.625087 ], [ -46.649692, -23.624926 ], [ -46.649793, -23.624781 ], [ -46.649999, -23.624541 ], [ -46.650141, -23.62438 ], [ -46.650282, -23.624247 ], [ -46.650493, -23.624028 ], [ -46.650726, -23.623817 ], [ -46.650958, -23.623633 ], [ -46.651206, -23.623447 ], [ -46.651387, -23.623321 ], [ -46.651658, -23.62314 ], [ -46.652223, -23.622779 ], [ -46.654872, -23.621051 ], [ -46.655292, -23.620778 ], [ -46.656372, -23.620074 ], [ -46.656772, -23.619842 ], [ -46.659103, -23.618731 ], [ -46.659737, -23.618426 ], [ -46.660617, -23.618007 ], [ -46.661743, -23.61747 ], [ -46.662494, -23.617121 ], [ -46.663603, -23.616568 ], [ -46.663996, -23.616412 ], [ -46.66453, -23.616261 ], [ -46.665877, -23.615976 ], [ -46.666446, -23.615842 ], [ -46.666956, -23.615701 ], [ -46.667378, -23.615515 ], [ -46.667832, -23.615259 ], [ -46.668642, -23.614632 ], [ -46.669086, -23.614283 ], [ -46.669864, -23.613647 ], [ -46.670329, -23.613347 ], [ -46.671807, -23.612618 ], [ -46.672754, -23.61219 ], [ -46.673705, -23.611739 ], [ -46.674499, -23.611166 ], [ -46.674738, -23.61097 ], [ -46.674855, -23.61083 ], [ -46.675254, -23.610297 ], [ -46.675654, -23.60974 ], [ -46.67595, -23.609383 ], [ -46.676204, -23.609222 ], [ -46.676413, -23.609146 ], [ -46.676966, -23.608694 ], [ -46.677085, -23.608544 ], [ -46.677473, -23.608228 ], [ -46.677603, -23.608113 ], [ -46.677856, -23.607907 ], [ -46.678103, -23.607727 ], [ -46.678452, -23.607163 ], [ -46.679197, -23.605663 ], [ -46.679246, -23.605413 ], [ -46.679548, -23.604803 ], [ -46.679769, -23.604367 ], [ -46.679894, -23.604163 ], [ -46.679955, -23.604072 ], [ -46.680055, -23.603971 ], [ -46.680171, -23.603865 ], [ -46.680403, -23.603674 ], [ -46.680686, -23.603454 ], [ -46.681008, -23.603194 ], [ -46.681297, -23.602812 ], [ -46.682061, -23.602185 ], [ -46.682542, -23.601801 ], [ -46.682975, -23.601495 ], [ -46.683605, -23.600973 ], [ -46.684379, -23.600397 ], [ -46.685187, -23.599918 ], [ -46.686085, -23.599408 ], [ -46.687422, -23.598724 ], [ -46.687838, -23.598449 ], [ -46.688388, -23.598173 ], [ -46.689214, -23.597824 ], [ -46.690298, -23.597271 ], [ -46.691098, -23.596868 ], [ -46.691806, -23.596473 ], [ -46.691952, -23.596391 ], [ -46.692507, -23.595874 ], [ -46.693089, -23.595122 ], [ -46.693807, -23.594171 ], [ -46.694172, -23.593682 ], [ -46.694251, -23.593571 ], [ -46.694361, -23.593363 ], [ -46.69447, -23.593119 ], [ -46.694585, -23.592816 ], [ -46.694637, -23.592498 ], [ -46.694654, -23.592186 ], [ -46.694647, -23.591908 ], [ -46.69467, -23.591709 ], [ -46.694648, -23.59157 ], [ -46.694619, -23.591464 ], [ -46.694446, -23.591197 ], [ -46.694352, -23.591042 ], [ -46.694188, -23.59089 ], [ -46.693996, -23.590705 ], [ -46.69382, -23.590544 ], [ -46.693755, -23.590455 ], [ -46.693697, -23.59032 ], [ -46.693451, -23.589893 ], [ -46.693238, -23.589454 ], [ -46.692918, -23.588887 ], [ -46.692471, -23.58763 ], [ -46.692412, -23.587026 ], [ -46.692373, -23.586393 ], [ -46.69242, -23.586034 ], [ -46.692478, -23.585787 ], [ -46.692621, -23.585346 ], [ -46.692752, -23.584866 ], [ -46.693178, -23.584073 ], [ -46.69381, -23.582961 ], [ -46.694351, -23.582035 ], [ -46.694737, -23.581366 ], [ -46.695344, -23.580277 ], [ -46.696525, -23.578246 ], [ -46.696821, -23.577725 ], [ -46.697108, -23.577204 ], [ -46.697453, -23.576682 ], [ -46.697973, -23.576012 ], [ -46.699704, -23.574307 ], [ -46.700152, -23.573931 ], [ -46.700575, -23.573556 ], [ -46.701096, -23.573001 ], [ -46.70141, -23.57265 ], [ -46.701545, -23.572487 ], [ -46.701738, -23.572306 ], [ -46.702025, -23.572324 ], [ -46.702242, -23.572286 ], [ -46.70245, -23.572073 ], [ -46.702592, -23.571795 ], [ -46.703022, -23.570998 ], [ -46.703287, -23.57069 ], [ -46.703366, -23.570361 ], [ -46.703705, -23.569673 ], [ -46.703921, -23.569137 ], [ -46.704087, -23.568714 ], [ -46.704531, -23.567356 ], [ -46.704854, -23.566417 ], [ -46.705149, -23.565513 ], [ -46.705364, -23.564966 ], [ -46.705555, -23.564469 ], [ -46.705746, -23.564045 ], [ -46.706013, -23.563559 ], [ -46.706155, -23.563285 ], [ -46.706359, -23.563021 ], [ -46.706655, -23.562643 ], [ -46.707018, -23.562279 ], [ -46.707303, -23.561959 ], [ -46.707764, -23.561499 ], [ -46.708061, -23.561247 ], [ -46.708489, -23.560956 ], [ -46.708799, -23.560786 ], [ -46.708941, -23.560723 ], [ -46.709312, -23.560518 ], [ -46.709737, -23.560305 ], [ -46.710699, -23.559853 ], [ -46.710895, -23.559762 ], [ -46.711492, -23.559504 ], [ -46.712075, -23.559208 ], [ -46.712204, -23.55911 ], [ -46.712693, -23.558714 ], [ -46.713219, -23.55848 ], [ -46.719077, -23.555609 ], [ -46.726394, -23.55208 ], [ -46.729576, -23.550483 ], [ -46.732691, -23.548794 ], [ -46.734167, -23.547525 ], [ -46.735316, -23.546925 ], [ -46.735779, -23.546425 ], [ -46.735975, -23.546021 ], [ -46.736288, -23.545584 ], [ -46.736917, -23.544974 ], [ -46.738541, -23.543456 ], [ -46.739884, -23.542282 ], [ -46.740659, -23.541596 ], [ -46.744919, -23.537799 ], [ -46.745449, -23.537291 ], [ -46.747073, -23.53585 ], [ -46.74835, -23.53473 ], [ -46.748987, -23.534128 ], [ -46.749588, -23.533576 ], [ -46.75, -23.533007 ], [ -46.750376, -23.532322 ], [ -46.750498, -23.531996 ], [ -46.750602, -23.531616 ], [ -46.750754, -23.530486 ], [ -46.750882, -23.529387 ], [ -46.751065, -23.527993 ], [ -46.751029, -23.526973 ], [ -46.751037, -23.52647 ], [ -46.750943, -23.525714 ], [ -46.750835, -23.525143 ], [ -46.750556, -23.524357 ], [ -46.749917, -23.523356 ], [ -46.749637, -23.523135 ], [ -46.749442, -23.522936 ], [ -46.749221, -23.522722 ], [ -46.748962, -23.522439 ], [ -46.748661, -23.521925 ], [ -46.748626, -23.52177 ], [ -46.748385, -23.521286 ], [ -46.748142, -23.520717 ], [ -46.747955, -23.52022 ], [ -46.747678, -23.519688 ], [ -46.747281, -23.51912 ], [ -46.747012, -23.518775 ], [ -46.746693, -23.518416 ], [ -46.746328, -23.518079 ], [ -46.746091, -23.517881 ], [ -46.74579, -23.51768 ], [ -46.745308, -23.517376 ], [ -46.745156, -23.517285 ], [ -46.744783, -23.517121 ], [ -46.74437, -23.516955 ], [ -46.743764, -23.516765 ], [ -46.743231, -23.516678 ], [ -46.742779, -23.51662 ], [ -46.741974, -23.516617 ], [ -46.740981, -23.516659 ], [ -46.740612, -23.516673 ], [ -46.739992, -23.516665 ], [ -46.739761, -23.516849 ], [ -46.739408, -23.516898 ], [ -46.738855, -23.516898 ], [ -46.738224, -23.516874 ], [ -46.736874, -23.516847 ], [ -46.735225, -23.516881 ], [ -46.73454, -23.516902 ], [ -46.733744, -23.516936 ], [ -46.733385, -23.516924 ], [ -46.732846, -23.516878 ], [ -46.732631, -23.516834 ], [ -46.73212, -23.516708 ], [ -46.731602, -23.516519 ], [ -46.731193, -23.516323 ], [ -46.730933, -23.516167 ], [ -46.730285, -23.515801 ], [ -46.729409, -23.51532 ], [ -46.728459, -23.514772 ], [ -46.728231, -23.514641 ], [ -46.727954, -23.514486 ], [ -46.727457, -23.514296 ], [ -46.727257, -23.514217 ], [ -46.727044, -23.514103 ], [ -46.726965, -23.514029 ], [ -46.726786, -23.513971 ], [ -46.726606, -23.513851 ], [ -46.726484, -23.513783 ], [ -46.726218, -23.513635 ], [ -46.725954, -23.513503 ], [ -46.725566, -23.513283 ], [ -46.72513, -23.513013 ], [ -46.724756, -23.512728 ], [ -46.724641, -23.512595 ], [ -46.724365, -23.512316 ], [ -46.723909, -23.511946 ], [ -46.72362, -23.511758 ], [ -46.723275, -23.511465 ], [ -46.723055, -23.511237 ], [ -46.722874, -23.510984 ], [ -46.722602, -23.51056 ], [ -46.722241, -23.510022 ], [ -46.721908, -23.509543 ], [ -46.72181, -23.509403 ], [ -46.721661, -23.509209 ], [ -46.721354, -23.508855 ], [ -46.721123, -23.508666 ], [ -46.720987, -23.508473 ], [ -46.720598, -23.508224 ], [ -46.720198, -23.507977 ], [ -46.719712, -23.507768 ], [ -46.719189, -23.507557 ], [ -46.718537, -23.507387 ], [ -46.718096, -23.507301 ], [ -46.717323, -23.507197 ], [ -46.716952, -23.507172 ], [ -46.716189, -23.507179 ], [ -46.715462, -23.50724 ], [ -46.714959, -23.507306 ], [ -46.714777, -23.507321 ], [ -46.714176, -23.507343 ], [ -46.713909, -23.507342 ], [ -46.71312, -23.507376 ], [ -46.712815, -23.507444 ], [ -46.712751, -23.507447 ], [ -46.711979, -23.507503 ], [ -46.711436, -23.507579 ], [ -46.711133, -23.507596 ], [ -46.710806, -23.507626 ], [ -46.710166, -23.50769 ], [ -46.709823, -23.507723 ], [ -46.709274, -23.507775 ], [ -46.709111, -23.507789 ], [ -46.708951, -23.50772 ], [ -46.7088, -23.507697 ], [ -46.70867, -23.507658 ], [ -46.708624, -23.507644 ], [ -46.708323, -23.507651 ], [ -46.708234, -23.507648 ], [ -46.707969, -23.507659 ], [ -46.707729, -23.507676 ], [ -46.707487, -23.507678 ], [ -46.707383, -23.507727 ], [ -46.707178, -23.507778 ], [ -46.707037, -23.507833 ], [ -46.706934, -23.507904 ], [ -46.706745, -23.507908 ], [ -46.706533, -23.507884 ], [ -46.706296, -23.507862 ], [ -46.706057, -23.507844 ], [ -46.705853, -23.507828 ], [ -46.705663, -23.507798 ], [ -46.70521, -23.507746 ], [ -46.704841, -23.507715 ], [ -46.704098, -23.50763 ], [ -46.703935, -23.507612 ], [ -46.703808, -23.507634 ], [ -46.703216, -23.50756 ], [ -46.702181, -23.50744 ], [ -46.702057, -23.507385 ], [ -46.70153, -23.50734 ], [ -46.701462, -23.507262 ], [ -46.700824, -23.507214 ], [ -46.700749, -23.507239 ], [ -46.700204, -23.507218 ], [ -46.700062, -23.507239 ], [ -46.697954, -23.506975 ], [ -46.697665, -23.506975 ], [ -46.696838, -23.50691 ], [ -46.696532, -23.506894 ], [ -46.695895, -23.506906 ], [ -46.695447, -23.506918 ], [ -46.695014, -23.506957 ], [ -46.694303, -23.507061 ], [ -46.69358, -23.507216 ], [ -46.693036, -23.507342 ], [ -46.692702, -23.5074 ], [ -46.692032, -23.507585 ], [ -46.691706, -23.50767 ], [ -46.691545, -23.507658 ], [ -46.69115, -23.507748 ], [ -46.690924, -23.507795 ], [ -46.69073, -23.50783 ], [ -46.690608, -23.50785 ], [ -46.690278, -23.507881 ], [ -46.689855, -23.508038 ], [ -46.689715, -23.508058 ], [ -46.689559, -23.508078 ], [ -46.689371, -23.508133 ], [ -46.689299, -23.508143 ], [ -46.688962, -23.508213 ], [ -46.688734, -23.508259 ], [ -46.688453, -23.508303 ], [ -46.688238, -23.508348 ], [ -46.688054, -23.508382 ], [ -46.687874, -23.508415 ], [ -46.687706, -23.508441 ], [ -46.687522, -23.508446 ], [ -46.687459, -23.508476 ], [ -46.687392, -23.508508 ], [ -46.687165, -23.508543 ], [ -46.686958, -23.508573 ], [ -46.686751, -23.508603 ], [ -46.686507, -23.508637 ], [ -46.686278, -23.50867 ], [ -46.686174, -23.508687 ], [ -46.686043, -23.508712 ], [ -46.685924, -23.508731 ], [ -46.685865, -23.508743 ], [ -46.685753, -23.508761 ], [ -46.685657, -23.508778 ], [ -46.68532, -23.508838 ], [ -46.683953, -23.509088 ], [ -46.683319, -23.509284 ], [ -46.682781, -23.509514 ], [ -46.682727, -23.509573 ], [ -46.682514, -23.509648 ], [ -46.682056, -23.509889 ], [ -46.681603, -23.510149 ], [ -46.681237, -23.510393 ], [ -46.680726, -23.510785 ], [ -46.680037, -23.511299 ], [ -46.679397, -23.511766 ], [ -46.679137, -23.511966 ], [ -46.678825, -23.512167 ], [ -46.678725, -23.512214 ], [ -46.678532, -23.512339 ], [ -46.678402, -23.512414 ], [ -46.678158, -23.512519 ], [ -46.677881, -23.512629 ], [ -46.677641, -23.512713 ], [ -46.677559, -23.512733 ], [ -46.677413, -23.51274 ], [ -46.677172, -23.512841 ], [ -46.676749, -23.51294 ], [ -46.676276, -23.512997 ], [ -46.674603, -23.5132 ], [ -46.674372, -23.513246 ], [ -46.674176, -23.513285 ], [ -46.673924, -23.513303 ], [ -46.673743, -23.513318 ], [ -46.673527, -23.513342 ], [ -46.673181, -23.513383 ], [ -46.672932, -23.513409 ], [ -46.672656, -23.51345 ], [ -46.672295, -23.513501 ], [ -46.67183, -23.513545 ], [ -46.671257, -23.513613 ], [ -46.670729, -23.513686 ], [ -46.670071, -23.513778 ], [ -46.669655, -23.513835 ], [ -46.669197, -23.513908 ], [ -46.668214, -23.514063 ], [ -46.667766, -23.514144 ], [ -46.667246, -23.514224 ], [ -46.667123, -23.514243 ], [ -46.667041, -23.514237 ], [ -46.666773, -23.514282 ], [ -46.666622, -23.514297 ], [ -46.666525, -23.514311 ], [ -46.666355, -23.514328 ], [ -46.666051, -23.51436 ], [ -46.665649, -23.514402 ], [ -46.665473, -23.514423 ], [ -46.665257, -23.514435 ], [ -46.664943, -23.514461 ], [ -46.664547, -23.514494 ], [ -46.664315, -23.514514 ], [ -46.663583, -23.514592 ], [ -46.662895, -23.514684 ], [ -46.662211, -23.514777 ], [ -46.662156, -23.514785 ], [ -46.661922, -23.514773 ], [ -46.661235, -23.514864 ], [ -46.66079, -23.514916 ], [ -46.660459, -23.514966 ], [ -46.659879, -23.515039 ], [ -46.659399, -23.515103 ], [ -46.658723, -23.515194 ], [ -46.658303, -23.515254 ], [ -46.657825, -23.515326 ], [ -46.657431, -23.515395 ], [ -46.657125, -23.515452 ], [ -46.657068, -23.51548 ], [ -46.656967, -23.515459 ], [ -46.656756, -23.515489 ], [ -46.656509, -23.515516 ], [ -46.656272, -23.515554 ], [ -46.655921, -23.515608 ], [ -46.655654, -23.515652 ], [ -46.65535, -23.515697 ], [ -46.655208, -23.515722 ], [ -46.654947, -23.515754 ], [ -46.65473, -23.51578 ], [ -46.654506, -23.515793 ], [ -46.654323, -23.515809 ], [ -46.654196, -23.515827 ], [ -46.654054, -23.515843 ], [ -46.653961, -23.515859 ], [ -46.653849, -23.515877 ], [ -46.653773, -23.515884 ], [ -46.653536, -23.515898 ], [ -46.653421, -23.515946 ], [ -46.65315, -23.515962 ], [ -46.652893, -23.515966 ], [ -46.652803, -23.51596 ], [ -46.652685, -23.515952 ], [ -46.652609, -23.515948 ], [ -46.652425, -23.515889 ], [ -46.652253, -23.515852 ], [ -46.652122, -23.515823 ], [ -46.65191, -23.515729 ], [ -46.651737, -23.515729 ], [ -46.651635, -23.515731 ], [ -46.651506, -23.515774 ], [ -46.651416, -23.515796 ], [ -46.651308, -23.515836 ], [ -46.651169, -23.515967 ], [ -46.650937, -23.516153 ], [ -46.650752, -23.51631 ], [ -46.650563, -23.51642 ], [ -46.650394, -23.51649 ], [ -46.650175, -23.516534 ], [ -46.650008, -23.516573 ], [ -46.649939, -23.516591 ], [ -46.649817, -23.516656 ], [ -46.649747, -23.516697 ], [ -46.649563, -23.516644 ], [ -46.649332, -23.516657 ], [ -46.649012, -23.516694 ], [ -46.648625, -23.516749 ], [ -46.648211, -23.516801 ], [ -46.647677, -23.516873 ], [ -46.647131, -23.516936 ], [ -46.646652, -23.516996 ], [ -46.64616, -23.517053 ], [ -46.644511, -23.517256 ], [ -46.642807, -23.517463 ], [ -46.641769, -23.517563 ], [ -46.641203, -23.517616 ], [ -46.640738, -23.517655 ], [ -46.640454, -23.517686 ], [ -46.638533, -23.517793 ], [ -46.636887, -23.517907 ], [ -46.635102, -23.518026 ], [ -46.634625, -23.518066 ], [ -46.633616, -23.518154 ], [ -46.632481, -23.518262 ], [ -46.631945, -23.518307 ], [ -46.631597, -23.51831 ], [ -46.631168, -23.518203 ], [ -46.630878, -23.518121 ], [ -46.630594, -23.518017 ], [ -46.630453, -23.517986 ], [ -46.630222, -23.517988 ], [ -46.630118, -23.518016 ], [ -46.630048, -23.518078 ], [ -46.629884, -23.518088 ], [ -46.629569, -23.518112 ], [ -46.629348, -23.518137 ], [ -46.629005, -23.518179 ], [ -46.628777, -23.518204 ], [ -46.628525, -23.518228 ], [ -46.628143, -23.518261 ], [ -46.627724, -23.51829 ], [ -46.627247, -23.518323 ], [ -46.626907, -23.518344 ], [ -46.62673, -23.518365 ], [ -46.626525, -23.51839 ], [ -46.626345, -23.518434 ], [ -46.626184, -23.518446 ], [ -46.625934, -23.518466 ], [ -46.625633, -23.518491 ], [ -46.625453, -23.518509 ], [ -46.625348, -23.518524 ], [ -46.625099, -23.518552 ], [ -46.624894, -23.518581 ], [ -46.624554, -23.518588 ], [ -46.623938, -23.518633 ], [ -46.623781, -23.518641 ], [ -46.623664, -23.518566 ], [ -46.623372, -23.518534 ], [ -46.623169, -23.518542 ], [ -46.623029, -23.518526 ], [ -46.622858, -23.518501 ], [ -46.622606, -23.518457 ], [ -46.622335, -23.518384 ], [ -46.621854, -23.518281 ], [ -46.621333, -23.51818 ], [ -46.620852, -23.518104 ], [ -46.620308, -23.518054 ], [ -46.619708, -23.51799 ], [ -46.619499, -23.51801 ], [ -46.619241, -23.518009 ], [ -46.618886, -23.518028 ], [ -46.618518, -23.518053 ], [ -46.618283, -23.518069 ], [ -46.617917, -23.51812 ], [ -46.617582, -23.518168 ], [ -46.617127, -23.518308 ], [ -46.616797, -23.518411 ], [ -46.616543, -23.518526 ], [ -46.616313, -23.518625 ], [ -46.615934, -23.518792 ], [ -46.615797, -23.518874 ], [ -46.615573, -23.519103 ], [ -46.615474, -23.5192 ], [ -46.615027, -23.519436 ], [ -46.614765, -23.519591 ], [ -46.614578, -23.519704 ], [ -46.614258, -23.519916 ], [ -46.613111, -23.520782 ], [ -46.612642, -23.521145 ], [ -46.61234, -23.521266 ], [ -46.612088, -23.521433 ], [ -46.611764, -23.52166 ], [ -46.611674, -23.521709 ], [ -46.611197, -23.52195 ], [ -46.610876, -23.522064 ], [ -46.610679, -23.522124 ], [ -46.610458, -23.522157 ], [ -46.610261, -23.52223 ], [ -46.609862, -23.522318 ], [ -46.609546, -23.522371 ], [ -46.609294, -23.52249 ], [ -46.608892, -23.522492 ], [ -46.608522, -23.522453 ], [ -46.607911, -23.522315 ], [ -46.607345, -23.522197 ], [ -46.607211, -23.522177 ], [ -46.607061, -23.522047 ], [ -46.606921, -23.521971 ], [ -46.606694, -23.521935 ], [ -46.605833, -23.521805 ], [ -46.605481, -23.521777 ], [ -46.605168, -23.52179 ], [ -46.604693, -23.521816 ], [ -46.60421, -23.521872 ], [ -46.603684, -23.521935 ], [ -46.602794, -23.522164 ], [ -46.602469, -23.522299 ], [ -46.602049, -23.522621 ], [ -46.601316, -23.523018 ], [ -46.600855, -23.523329 ], [ -46.598874, -23.524952 ], [ -46.597881, -23.525751 ], [ -46.597526, -23.525992 ], [ -46.596443, -23.526458 ], [ -46.595168, -23.52682 ], [ -46.594536, -23.527037 ], [ -46.59238, -23.527615 ], [ -46.59181, -23.527728 ], [ -46.591596, -23.52782 ], [ -46.590934, -23.527966 ], [ -46.590605, -23.528195 ], [ -46.589882, -23.528423 ], [ -46.589675, -23.528452 ], [ -46.589451, -23.528483 ], [ -46.589192, -23.528475 ], [ -46.588995, -23.528454 ], [ -46.588469, -23.528343 ], [ -46.588152, -23.528258 ], [ -46.587706, -23.52815 ] ] ] } }
        ]
        }
        
}
