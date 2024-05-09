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

// Função para gerar nomes de motorista aleatórios
function gerarNomeMotorista() {
    const nomes = ['João', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Laura', 'José', 'Camila', 'Fernando', 'Gabriela'];
    const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Rodrigues', 'Almeida', 'Costa', 'Martins', 'Lima'];

    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenomeAleatorio = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

    return `${nomeAleatorio} ${sobrenomeAleatorio}`;
}

// Função para gerar placas no formato AAA-9A99
function gerarPlacaVeiculo() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';

    const placa = `${letras.charAt(Math.floor(Math.random() * letras.length))}${letras.charAt(Math.floor(Math.random() * letras.length))}${letras.charAt(Math.floor(Math.random() * letras.length))}-` +
                 `${numeros.charAt(Math.floor(Math.random() * numeros.length))}${letras.charAt(Math.floor(Math.random() * letras.length))}${numeros.charAt(Math.floor(Math.random() * numeros.length))}${numeros.charAt(Math.floor(Math.random() * numeros.length))}`;

    return placa;
}

// Função para gerar uma quantidade aleatória de documentos
function gerarQuantidadeDocumentos() {
    return Math.floor(Math.random() * (10 - 1 + 1)) + 1; // Números entre 1 e 10
}

function gerarHashTable() {
    var registros = [];
    const numRegistros = Math.floor(Math.random() * (15 - 5 + 1)) + 5; // Entre 5 e 15 registros

    for (let i = 0; i < numRegistros; i++) {
        const id = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000; // Números entre 100000 e 999999
        const quantidade = Math.floor(Math.random() * (100 - 1 + 1)) + 1; // Números entre 1 e 100
        const peso = Math.random() * (100 - 1) + 1; // Números entre 1 e 100 (peso em kg)
        const valor = Math.random() * (1000 - 10) + 10; // Números entre 10 e 1000 (valor em reais)

        registros.push({idDtc:id, quantidade:quantidade, peso:peso, valor:valor });
    }

    return registros; // Retorna os dados como uma string JSON
}


// Função principal para gerar dados completos
function gerarDadosCompletosNaGrandeSP() {
    const minLat = -24.0;
    const maxLat = -23.3;
    const minLng = -46.8;
    const maxLng = -46.3;
  
    const dadosCompletos = [];
  
    for (let i = 0; i <= 15; i++) {
        const latitude = Math.random() * (maxLat - minLat) + minLat;
        const longitude = Math.random() * (maxLng - minLng) + minLng;
  
        const roundedLatitude = parseFloat(latitude.toFixed(6));
        const roundedLongitude = parseFloat(longitude.toFixed(6));

        const motorista = gerarNomeMotorista();
        const placa = gerarPlacaVeiculo();
        const quantidadeDocumentos = gerarQuantidadeDocumentos();
        const hashtable = gerarHashTable();
  
        dadosCompletos.push([roundedLatitude, roundedLongitude,
            motorista,
            placa,
            quantidadeDocumentos,
            hashtable
        ]);
    }
  
    return dadosCompletos;
}
