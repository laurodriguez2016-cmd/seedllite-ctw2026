#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
La incertidumbre de cada cifra del dictamen.

POR QUE EXISTE
--------------
Hasta ahora el dictamen decia "amplitud historica 0,341" y "area detectada 0,50
ha" como si fueran hechos exactos. No lo son. Son ESTIMACIONES sobre muestras
incompletas: entre 48 y 96 meses medidos de 108, y una rejilla de 16 celdas.

Un evaluador de riesgo pregunta de inmediato cuanta incertidumbre hay detras, y
hasta ahora no habia respuesta. Peor: la regla de "12 meses medidos en la ventana
de 24" que decide si el sistema opina o se abstiene estaba puesta a ojo.

Este modulo calcula la incertidumbre y, de paso, sustenta ese umbral con un
numero en vez de con una intuicion.

QUE NO HACE, Y ES IMPORTANTE DECIRLO
------------------------------------
No calcula probabilidad de incumplimiento. No hay un solo credito desembolsado
con este sistema, asi que no existe con que calibrar una PD. Cualquier cifra de
PD aqui seria inventada, y una cifra inventada en este proyecto no es un desliz
de estilo: destruye el argumento, porque el argumento ES la trazabilidad.

Solo biblioteca estandar (Python 3.9).
"""

import math
import random


# ===========================================================================
# 1 · Intervalo de confianza de la amplitud
# ===========================================================================

def intervalo_bootstrap(valores, estadistico, replicas=2000, confianza=0.95, semilla=7):
    """
    Intervalo percentil por bootstrap sobre los meses MEDIDOS.

    Por que bootstrap y no una formula cerrada: la amplitud es p90 menos p10
    sobre una serie suavizada, y no tiene distribucion muestral conocida. El
    bootstrap la estima remuestreando lo que si tenemos.

    SUPUESTO QUE HAY QUE DECLARAR: el remuestreo simple trata los meses como
    independientes, y en una serie temporal no lo son — un mes se parece al
    siguiente. Eso hace que el intervalo salga algo MAS ESTRECHO de lo real, es
    decir, peca de optimista. Para no esconderlo, `intervalo_bloques` de mas
    abajo hace la version por bloques moviles, que respeta la dependencia, y es
    la que se reporta cuando hay suficientes meses.

    La semilla es fija: dos corridas dan el mismo intervalo y el git diff no se
    ensucia solo.
    """
    v = [x for x in valores if x is not None]
    if len(v) < 8:
        return None

    rnd = random.Random(semilla)
    muestras = []
    for _ in range(replicas):
        re = [v[rnd.randrange(len(v))] for _ in range(len(v))]
        s = estadistico(re)
        if s is not None:
            muestras.append(s)

    if not muestras:
        return None
    muestras.sort()
    alfa = (1.0 - confianza) / 2.0
    bajo = muestras[int(alfa * len(muestras))]
    alto = muestras[min(len(muestras) - 1, int((1 - alfa) * len(muestras)))]
    return round(bajo, 3), round(alto, 3)


def intervalo_bloques(valores, estadistico, largo=4, replicas=2000,
                      confianza=0.95, semilla=7):
    """
    Bootstrap por bloques moviles: remuestrea TRAMOS de `largo` meses seguidos en
    vez de meses sueltos, de modo que la dependencia temporal sobrevive al
    remuestreo. Es el intervalo honesto para una serie fenologica.

    `largo` = 4 meses porque es el orden de duracion de medio ciclo de un
    transitorio: bloques mas cortos rompen justo la estructura que se quiere
    conservar.
    """
    v = [x for x in valores if x is not None]
    if len(v) < largo * 3:
        return None

    rnd = random.Random(semilla)
    n_bloques = int(math.ceil(len(v) / float(largo)))
    muestras = []
    for _ in range(replicas):
        re = []
        for _ in range(n_bloques):
            i = rnd.randrange(max(1, len(v) - largo + 1))
            re.extend(v[i:i + largo])
        s = estadistico(re[:len(v)])
        if s is not None:
            muestras.append(s)

    if not muestras:
        return None
    muestras.sort()
    alfa = (1.0 - confianza) / 2.0
    return (round(muestras[int(alfa * len(muestras))], 3),
            round(muestras[min(len(muestras) - 1, int((1 - alfa) * len(muestras)))], 3))


# ===========================================================================
# 2 · Incertidumbre del area medida
# ===========================================================================

def wilson(exitos, total, confianza=0.95):
    """
    Intervalo de Wilson para una proporcion.

    El area detectada es "cuantas de las 16 celdas mostraron actividad": una
    proporcion binomial sobre una muestra CHICA. Con n=16 el intervalo normal
    (Wald) se comporta mal y puede salirse de [0,1]; Wilson no.

    Esto decide un rechazo. Con 2 de 16 celdas la estimacion puntual es 12,5%,
    pero la pregunta que importa es otra: ¿el limite SUPERIOR del intervalo sigue
    por debajo del 50% que dispara la causal? Si no lo estuviera, el rechazo
    seria mas fragil de lo que aparenta y habria que decirlo en el dictamen.
    """
    if total == 0:
        return None
    z = 1.959964 if abs(confianza - 0.95) < 1e-6 else 2.575829
    p = exitos / float(total)
    d = 1 + z * z / total
    centro = (p + z * z / (2 * total)) / d
    margen = z * math.sqrt(p * (1 - p) / total + z * z / (4 * total * total)) / d
    return round(max(0.0, centro - margen), 3), round(min(1.0, centro + margen), 3)


# ===========================================================================
# 3 · Probabilidad de perder un ciclo por falta de cobertura
# ===========================================================================

def prob_ciclo_invisible(meses_medidos, ventana=24, duracion_ciclo=5,
                         ciclos_reales=2, ensayos=20000, semilla=11):
    """
    ⭐ El calculo que sustenta la regla de los 12 meses.

    LA PREGUNTA: si un predio SI produjo, pero la nube solo dejo ver `m` de los
    24 meses, ¿que probabilidad hay de que el detector no vea ninguno de sus
    ciclos y lo declare inactivo?

    Es la pregunta que importa porque un falso negativo aqui no es un error de
    medicion: es un credito negado a alguien que si produce, por una razon que el
    productor no puede apelar ni entender.

    EL MODELO. Un ciclo de transitorio dura `duracion_ciclo` meses y el detector
    necesita ver el cruce de subida y el de bajada, es decir al menos dos meses
    medidos DENTRO del ciclo, uno en su primera mitad y otro en la segunda. Se
    simulan `ensayos` escenarios: se colocan `ciclos_reales` ciclos en posiciones
    aleatorias de la ventana, se sortea que meses fueron visibles, y se cuenta
    cuantas veces NINGUN ciclo quedo detectable.

    Es un modelo simplificado y hay que decirlo: supone que la nubosidad es
    independiente del calendario agricola, y en el tropico andino la temporada de
    lluvias se correlaciona con la siembra. Esa correlacion haria el problema
    PEOR, no mejor, asi que el numero que sale es una cota optimista.
    """
    rnd = random.Random(semilla)
    if meses_medidos >= ventana:
        return 0.0

    invisibles = 0
    for _ in range(ensayos):
        visibles = set(rnd.sample(range(ventana), meses_medidos))
        algun_ciclo_visible = False
        for _ in range(ciclos_reales):
            ini = rnd.randrange(max(1, ventana - duracion_ciclo))
            mitad = ini + duracion_ciclo // 2
            sube = any(m in visibles for m in range(ini, mitad))
            baja = any(m in visibles for m in range(mitad, ini + duracion_ciclo))
            if sube and baja:
                algun_ciclo_visible = True
                break
        if not algun_ciclo_visible:
            invisibles += 1

    return round(invisibles / float(ensayos), 4)


def curva_cobertura(ventana=24, **kw):
    """Probabilidad de falso negativo para cada nivel de cobertura. Es la tabla
    que justifica donde poner el umbral."""
    return [(m, prob_ciclo_invisible(m, ventana=ventana, **kw))
            for m in range(4, ventana + 1, 2)]


# ===========================================================================
# 4 · Sensibilidad de la decision
# ===========================================================================

def margen_al_umbral(valor, umbral, mayor_es_peor=False):
    """
    Cuanto le falta a una cifra para cruzar el umbral que cambia la decision.

    Un dictamen robusto es el que no se da vuelta con un empujon pequeno. Poner
    el margen en el documento es lo que separa "el area es 12%" de "el area es
    12% y tendria que triplicarse para que la decision cambiara".
    """
    if umbral == 0:
        return None
    dif = (umbral - valor) if not mayor_es_peor else (valor - umbral)
    return {
        "valor": round(valor, 4),
        "umbral": round(umbral, 4),
        "distancia": round(abs(dif), 4),
        "distancia_relativa_pct": round(abs(dif) / float(umbral) * 100.0, 1),
        "cruza": dif <= 0,
    }


# ===========================================================================
# Demostracion: corre el modulo solo para ver los numeros
# ===========================================================================

if __name__ == "__main__":
    print("PROBABILIDAD DE NO VER NINGUN CICLO, con 2 ciclos reales de 5 meses")
    print("en una ventana de 24. Es el sustento del umbral de cobertura.\n")
    print("  meses medidos   prob. de falso negativo")
    for m, p in curva_cobertura():
        barra = "█" * int(p * 40)
        marca = "  ← umbral vigente" if m == 12 else ""
        print("       %2d/24            %5.1f%%  %s%s" % (m, p * 100, barra, marca))

    print("\n\nINTERVALO DE WILSON PARA EL AREA (16 celdas)\n")
    print("  celdas    estimacion   intervalo 95%     ¿el techo cruza el 50%?")
    for e in (2, 7, 11, 15, 16):
        lo, hi = wilson(e, 16)
        cruza = "SI — el rechazo seria fragil" if hi >= 0.50 else "no"
        print("   %2d/16      %5.1f%%      [%4.1f%% , %4.1f%%]    %s"
              % (e, e / 16.0 * 100, lo * 100, hi * 100, cruza))
