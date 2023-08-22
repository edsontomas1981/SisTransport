from math import ceil
from Classes.utils import dprint, dpprint,toFloat
import decimal

def pesoACalcular(pesoReal, pesoCubado):
    pesoReal=toFloat(pesoReal)
    pesoCubado=toFloat(pesoCubado)
    if pesoReal and pesoCubado:
        if pesoReal >= pesoCubado:
            if pesoReal > 0:
                return pesoReal
            else:
                return pesoReal
        else:
            if pesoCubado > 0:
                return pesoCubado
            else:
                return pesoCubado
    elif pesoReal:
        return pesoReal
    elif pesoCubado:
        return pesoCubado
    else:
        return 0

def calculaAdvalor(percentualAdvalor, vlrNf):
    vlrNf=toFloat(vlrNf)
    if vlrNf > 0:
        if percentualAdvalor > 0:
            advalor = float(percentualAdvalor/100)
            return round(advalor*vlrNf, 2)
        else:
            return 0
    else:
        return 0


def calculaGris(percentualGris, vlrNf):
    vlrNf=float(toFloat(vlrNf))
    if vlrNf > 0:
        if percentualGris > 0:
            gris = float(percentualGris/100)
            return round(gris*vlrNf, 2)
        else:
            return 0
    else:
        return 0


def geraPercentualAliquota(aliquotaIcms):
    if aliquotaIcms <= 0:
        aliquotaIcms = 0
    else:
        icms = 1-(aliquotaIcms/100)
        return round(icms, 2)


def calculaCubagem(m3, fatorCubagem):
    if toFloat(m3) > 0:
        if fatorCubagem > 0:
            return fatorCubagem*m3
        else:
            return None
    else:
        return None


def calculaPedagio(tipoPedagio, pedagio, pesoFaturado):
    if tipoPedagio == 1:
        pedagioKg = ceil(pesoFaturado/100)
        return pedagio*pedagioKg
    elif tipoPedagio == 2:
        return pedagio
    else:
        return None


def somaSubtotais(*args):
    total=[float(subtotal) for subtotal in args if subtotal != None]
    return sum(total)

def calculaFretePeso(fretePorKg, peso):
    fretePorKg=toFloat(fretePorKg)
    peso=toFloat(peso)
    if fretePorKg > 0:
        if peso > 0:
            return fretePorKg*peso
        else:
            return None
    else:
        return None


def aplicaIcms(subtotal, aliquotaIcms):

    if subtotal > 0:
        if aliquotaIcms > 0:
            return round(float(subtotal)/float(aliquotaIcms), 2)
        else:
            return 411
    else:
        return 410  # subtotal invalido


def calculaFreteValor(vlrNf, percentual):
    return toFloat(vlrNf)*float((percentual/100))


def calculaFreteVolume(volumes, vlrFreteVolume):
    return volumes*vlrFreteVolume


def freteFaixa(faixas, peso):
    for i in faixas:
        if round(peso) in range(i.faixaInicial, (i.faixaFinal+1)):
            return i.vlrFaixa
    else:
        return None
