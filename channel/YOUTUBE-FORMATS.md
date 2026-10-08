# Contratos de formato para vídeos principales de YouTube

> PRODUCT PATH RULE: this contract lives in `CORE_ROOT`. Any reference to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, or `postproduction/` is logical and resolves under the explicitly selected `INSTANCE_ROOT`. If no instance is configured, stop with `SETUP REQUIRED`.


**Estado:** biblioteca canónica inicial de formatos editoriales. Sus contratos orientan decisiones; no son plantillas obligatorias ni garantías de rendimiento.

## Función y jerarquía

Esta capa decide qué experiencia editorial recibe el espectador y cómo se desarrolla la pieza. Se aplica después de comprobar que la pieza merece avanzar y antes de diseñar packaging, hook y narrativa.

La separación de responsabilidades es:

1. [`CONSTITUTION.md`](CONSTITUTION.md): identidad, público, promesa y límites del canal.
2. [`EDITORIAL-QUALITY.md`](EDITORIAL-QUALITY.md): si la pieza merece avanzar.
3. `YOUTUBE-FORMATS.md`: qué tipo de experiencia de vídeo se construye.
4. [`YOUTUBE-NARRATIVE.md`](YOUTUBE-NARRATIVE.md): principios universales de appeal, engagement, satisfaction, prueba, causalidad, payoffs, CTA y voz.
5. [`VIDEO-STANDARD.md`](VIDEO-STANDARD.md): producción, materiales, duración, verificación y entrega.
6. [`PRODUCTION`](../workflows/PRODUCTION.md): aplicación de estas capas a una pieza concreta.

Cuando exista tensión entre capas, conservar este orden: evidencia y límites; intención explícita de the configured human operator; contrato de formato; principios narrativos. Ningún patrón de formato autoriza inventar o ampliar evidencia.

## Tema, formato, packaging y narrativa

- **TOPIC:** de qué trata la pieza.
- **FORMAT:** qué experiencia editorial recibe el espectador y qué clase de progresión entrega la promesa.
- **PACKAGING:** por qué el espectador decide entrar y qué expectativa concreta crea título más miniatura.
- **NARRATIVE:** cómo progresa la experiencia después de entrar mediante trabajo, evidencia, decisiones, cambios y payoffs.

El tema no determina el formato. Una misma materia puede sostener experiencias diferentes si cambian la intención, la promesa, el trabajo visible y la evidencia.

## Formato primario y mecánica secundaria

Toda pieza principal registra un único **PRIMARY FORMAT**. Puede registrar una **SECONDARY MECHANIC** solo cuando esa mecánica cumple una función visible y subordinada en la experiencia principal. No se permiten listas arbitrarias de tres o cuatro formatos. Si hacen falta muchas etiquetas para explicar la pieza, hay que resolver mejor la promesa o el formato primario.

La mecánica secundaria no reparte la autoridad del vídeo al cincuenta por ciento ni permite eludir los requisitos del formato primario. Por ejemplo, una pieza puede recorrer un sistema y desmontar una parte durante ese recorrido; la experiencia principal sigue siendo la que promete al espectador.

La biblioteca no es exhaustiva. Puede proponerse un formato nuevo si el uso real demuestra que los contratos actuales no permiten describir una experiencia necesaria. Incorporarlo como regla canónica requiere revisión humana explícita.

## Selección del formato

PRODUCTION confirma el formato antes de diseñar packaging, hook y arco. La decisión utiliza:

- intención explícita de the configured human operator;
- source type y source scope;
- Creator Advantage;
- evidencia disponible y afirmaciones excluidas;
- resultado prometido al espectador;
- trabajo realmente visible;
- reproducibilidad cuando la promesa la requiera.

La intención explícita tiene prioridad editorial. Si the configured human operator pide un tutorial, el sistema evalúa si existen prerrequisitos, pasos, configuración, inputs, acciones, outputs y validación suficientes. Si no existen, no lo convierte silenciosamente en walkthrough. Debe responder con `NEEDED`, `WHY`, `MINIMUM` y `ALTERNATIVE`; the configured human operator decide si aporta lo necesario o acepta la alternativa.

## Contrato común

Cada contrato contiene las mismas categorías para hacer comparables las decisiones. Sus spines, mecanismos, opciones y patrones describen posibilidades probables, no fórmulas de copy ni secuencias inmutables.

## 1. WALKTHROUGH / SETUP TOUR

**Versión del contrato:** v2, respaldada por [`WALKTHROUGH CORPUS v1`](../research/youtube-format-corpus/walkthrough/CORPUS-v1.md) y su revisión humana explícita en [`FINDINGS-v1.md`](../research/youtube-format-corpus/walkthrough/FINDINGS-v1.md).

- **FORMAT:** recorrido por un sistema, setup, proyecto, proceso u objeto real para entender cómo funciona, cómo está organizado, qué permite hacer o cómo lo utiliza the configured human operator. El recorrido puede seguir una tarea, capas, una demo que después se desmonta o una topología de componentes.
- **USE WHEN:** el valor está en inspeccionar un sistema existente, su utilidad, decisiones, componentes, relaciones, usos y límites mediante una progresión visible.
- **DON'T USE WHEN:** el espectador necesita reproducir exactamente el resultado, el sistema no existe, falta material para mostrarlo o solo hay una lista de componentes sin una lógica de recorrido.
- **VIEWER PROMISE:** «Voy a entender cómo funciona este sistema, qué valor ofrece y por qué está diseñado así».
- **BEST SOURCE MATERIAL:** setup propio, sistema configurado, interacción, demo, mapa o arquitectura, artifacts, outputs, use cases, observaciones de uso y auditorías.
- **CREATOR ADVANTAGE:** acceso de primera mano al sistema, decisiones de diseño, construcción, configuración, uso real, investigación, auditorías, límites observados y artifacts que un resumen externo no puede aportar. En setups personales, decidir explícitamente si esta ventaja aparece en la apertura o en los primeros compases, sin convertir experiencia en autoridad universal.
- **COMMON PACKAGING MECHANISMS:** ownership —`my setup`, `my system`, `my stack`—; transformación; uso; replicabilidad solo cuando la evidencia la sostiene; completitud o alcance; y acceso a un asset, workflow o sistema. Son mecanismos observados, no fórmulas de título ni evidencia de views. `THUMBNAIL CORPUS: insufficient evidence`; no crear reglas nuevas de miniatura por intuición.
- **INTRO JOB:** hacer visible o situar rápidamente el sistema real y demostrar por qué merece recorrerse mediante el entry mechanism elegido.
- **INTRO OPTIONS:** `SYSTEM / RESULT FIRST`, `DEMO FIRST`, `PROBLEM FIRST`, `CREATOR-USE / EXPERIENCE FIRST` o `DIRECT TOUR`. Elegir una; no rotarlas mecánicamente ni fabricar tensión cuando el objeto ya sostiene el tour.
- **FIRST 30s JOB:** confirmar que el sistema prometido existe, mostrar proof of usefulness o el interés intrínseco del objeto y empezar la experiencia elegida. Cuando exista proof visual fuerte, considerar `PROOF → PROMISE → BREAKDOWN` antes de arquitectura y definiciones.
- **NARRATIVE SPINE:** elegir y justificar un único spine principal: `TASK-FLOW WALKTHROUGH`, `LAYER WALKTHROUGH`, `DEMO → BREAKDOWN` o `SPATIAL / COMPONENT TOUR`. No tratar task-flow como universal ni combinar los cuatro; una mecánica secundaria solo entra con función clara.
- **PROOF EXPECTATION:** identificar `PROOF OF USEFULNESS`: output, comportamiento, resultado, capability, artifact, transformación, caso real, interacción, mapa que revela algo o workflow funcionando. Puede apoyarse en configuración, ejecución, evidencia de auditoría o reconstrucción rotulada; distinguir observado, configurado, inferido y desconocido.
- **FIRST PAYOFF PATTERN:** declarar `FIRST PAYOFF TYPE: CAPABILITY` cuando aparece por primera vez algo útil que el sistema hace, o `FIRST PAYOFF TYPE: UNDERSTANDING` cuando se comprende una decisión, relación o mecanismo antes oculto; registrar después el payoff concreto.
- **VOICE / SCREEN BALANCE:** la pantalla carga con sistema, output, mapa, configuración, artifact, transición, estado y proof; la voz explica por qué importa, decisión, relación, consecuencia, límite, sorpresa e interpretación. No describir verbalmente lo que la pantalla ya demuestra.
- **CTA PATTERN:** elegir solo cuando sea natural un `PRIMARY CTA TYPE`: `APPLY`, aplicar el criterio al propio sistema; `RESOURCE`, utilizar un template, repo, prompts, asset o recurso existente; o `NEXT DEPTH`, continuar hacia un tutorial, build, explicación o vídeo más profundo que ya exista. No inventar destinos.
- **COMMON FAILURE MODES:** lista de componentes; task-flow impuesto como spine universal; `ARCHITECTURE BEFORE USEFULNESS` cuando existe proof disponible; metodología o caveats antes de que el sistema y su valor sean comprensibles; Creator Advantage oculto o universalizado; presentar el recorrido como tutorial sin reproducibilidad; confundir reconstrucción con demo; beat sheet convertido en lista narrada; o copy escrito antes de diseñar la experiencia audiovisual.

### Entry mechanisms

- **SYSTEM / RESULT FIRST:** el sistema o su resultado es el primer objeto de interés.
- **DEMO FIRST:** se ve el sistema funcionando antes de explicar su arquitectura.
- **PROBLEM FIRST:** un problema reconocible introduce el sistema que lo resuelve.
- **CREATOR-USE / EXPERIENCE FIRST:** el uso y aprendizaje de the configured human operator forman parte del proof inicial.
- **DIRECT TOUR:** el propio setup es suficientemente interesante para empezar a recorrerlo.

### Walkthrough spines

- **TASK-FLOW WALKTHROUGH:** sigue trabajo, dato, responsabilidad o input a través del sistema; sirve cuando las relaciones entre componentes son la historia.
- **LAYER WALKTHROUGH:** recorre capas desde fundamentos hasta capacidades o resultados; sirve cuando cada capa cambia la comprensión.
- **DEMO → BREAKDOWN:** muestra comportamiento o utilidad y después desmonta qué lo produce; sirve cuando existe proof fuerte.
- **SPATIAL / COMPONENT TOUR:** recorre componentes según topología física, visual o estructural; sirve cuando el objeto es la experiencia principal.

### First payoff types

- **CAPABILITY PAYOFF:** el espectador ve por primera vez algo útil que el sistema hace.
- **UNDERSTANDING PAYOFF:** el espectador entiende una decisión, relación o mecanismo antes oculto.

### Walkthrough Design

Antes de packaging definitivo, beat sheet o copy, PRODUCTION registra: `PRIMARY FORMAT`, `ENTRY MECHANISM`, `CREATOR ADVANTAGE PLACEMENT`, `PROOF OF USEFULNESS`, `WALKTHROUGH SPINE`, `FIRST PAYOFF TYPE`, `FIRST PAYOFF` y `PRIMARY CTA TYPE`. Después diseña beats audiovisuales de 0–30 segundos, 30–90 segundos y vídeo completo. El copy nace de esos beats; no de los encabezados del research.

## 2. TUTORIAL / HOW-TO

- **FORMAT:** instrucción reproducible para construir, configurar o realizar un resultado definido.
- **USE WHEN:** existen prerrequisitos, pasos, decisiones, inputs, acciones, outputs y una validación suficientes para que el espectador pueda repetir el resultado.
- **DON'T USE WHEN:** faltan pasos esenciales, la configuración no puede mostrarse, el resultado solo se observó una vez sin condiciones claras o la promesa real es comprender un setup ajeno.
- **VIEWER PROMISE:** «Al terminar sabrás construir o realizar X».
- **BEST SOURCE MATERIAL:** procedimiento ejecutado, configuración real, materiales de partida, acciones completas, outputs, errores frecuentes y comprobación final.
- **CREATOR ADVANTAGE:** the configured human operator realizó el procedimiento, conoce decisiones y fallos y puede distinguir el paso necesario del detalle accidental.
- **COMMON PACKAGING MECHANISMS:** resultado reproducible, transformación concreta, problema práctico resuelto o restricción relevante; no prometer facilidad o velocidad no medidas.
- **INTRO JOB:** mostrar o anticipar el resultado final y establecer con precisión qué podrá reproducir el espectador.
- **INTRO OPTIONS:** resultado final primero; antes y después; error reconocible seguido del resultado correcto; validación final anticipada.
- **FIRST 30s JOB:** confirmar el resultado, alcance y precondición principal y comenzar el procedimiento.
- **NARRATIVE SPINE:** resultado → requisitos → paso o decisión → cambio visible → siguiente paso → validación → resultado final reproducible.
- **PROOF EXPECTATION:** acciones completas, configuración e inputs localizables, output real y validación que permita distinguir éxito de apariencia.
- **FIRST PAYOFF PATTERN:** primer paso que funciona y produce un cambio visible o una comprobación intermedia.
- **VOICE / SCREEN BALANCE:** la pantalla demuestra acciones reproducibles; la voz explica decisiones, condiciones, errores y criterios de validación.
- **CTA PATTERN:** realizar el procedimiento, comprobar el resultado y adaptar únicamente los parámetros identificados.
- **COMMON FAILURE MODES:** omitir prerrequisitos, saltar pasos, enseñar un setup personal como receta universal, validar por apariencia, ocultar trabajo manual o degradar silenciosamente a walkthrough.

## 3. BUILD FROM SCRATCH

- **FORMAT:** acompañamiento de una construcción real desde un punto de partida explícito hasta un artifact comprobado.
- **USE WHEN:** el proceso de construir, encontrar problemas, decidir e iterar aporta tanto valor como el resultado.
- **DON'T USE WHEN:** el artifact ya existe y solo se recorrerá, no se autoriza construirlo o se pretende limpiar retrospectivamente toda la incertidumbre como tutorial perfecto.
- **VIEWER PROMISE:** «Voy a ver cómo se construye X, qué decisiones cambian el resultado y qué termina funcionando».
- **BEST SOURCE MATERIAL:** objetivo, requisitos, estado inicial, versiones del artifact, decisiones, fallos, iteraciones, verificación y resultado.
- **CREATOR ADVANTAGE:** trabajo real de the configured human operator, criterio de construcción, decisiones tomadas bajo restricciones y acceso a versiones o evidencia del proceso.
- **COMMON PACKAGING MECHANISMS:** objetivo visible, restricción difícil, transformación desde cero, problema descubierto o resultado construido; no fingir incertidumbre si el proceso ya está cerrado.
- **INTRO JOB:** mostrar el objetivo o resultado esperado y la restricción principal que define la construcción.
- **INTRO OPTIONS:** target primero; restricción primero; primer prototipo frente al objetivo; fallo que obliga a construir de otra manera.
- **FIRST 30s JOB:** hacer visible qué se construirá, desde dónde se parte y qué condición definirá un resultado válido.
- **NARRATIVE SPINE:** target → primer build → problema → decisión → iteración → prueba → resultado.
- **PROOF EXPECTATION:** cambios de estado reales, versiones, decisiones trazables, pruebas proporcionadas y resultado existente; diseño propuesto no equivale a implementación.
- **FIRST PAYOFF PATTERN:** primer componente funcionando o primera decisión que elimina un riesgo importante.
- **VOICE / SCREEN BALANCE:** la pantalla enseña cambios de estado y verificaciones; la voz explica por qué se elige, descarta o corrige cada camino.
- **CTA PATTERN:** probar o adaptar el artifact, reutilizar una decisión o continuar desde el resultado comprobado.
- **COMMON FAILURE MODES:** convertirlo en tutorial retrospectivo, esconder fallos relevantes, mostrar actividad sin progreso, confundir especificación con build o declarar production-ready un prototipo.

## 4. CASE STUDY

- **FORMAT:** explicación de un caso real para entender una decisión, su resultado y una lección transferible proporcionada.
- **USE WHEN:** existe un caso identificable con contexto, decisión, ejecución y resultado respaldados.
- **DON'T USE WHEN:** no hay resultado real, solo existe una propuesta o se necesita afirmar una regla universal desde una observación individual.
- **VIEWER PROMISE:** «Voy a entender qué ocurrió en este caso, por qué y qué criterio puedo trasladar al mío».
- **BEST SOURCE MATERIAL:** artifacts del caso, datos, outputs, decisiones, cronología, notas de ejecución, resultados y límites.
- **CREATOR ADVANTAGE:** participación directa, acceso al caso, conocimiento de decisiones y contexto que no aparece en el resultado final.
- **COMMON PACKAGING MECHANISMS:** resultado o consecuencia, decisión contraintuitiva, cambio entre antes y después o lección respaldada; no convertir correlación en causalidad.
- **INTRO JOB:** presentar resultado o consecuencia, explicar por qué importa y abrir qué ocurrió.
- **INTRO OPTIONS:** resultado primero; consecuencia inesperada; decisión que cambió el caso; contraste entre objetivo y resultado.
- **FIRST 30s JOB:** identificar el caso real, el resultado relevante y la pregunta causal que se investigará sin prometer más de lo observado.
- **NARRATIVE SPINE:** contexto → decisión → ejecución → resultado → interpretación → lección transferible.
- **PROOF EXPECTATION:** datos, artifacts, outputs o evidencia del caso, con condiciones, periodo y límites de atribución.
- **FIRST PAYOFF PATTERN:** primera relación clara y respaldada entre una decisión y una consecuencia observada.
- **VOICE / SCREEN BALANCE:** la pantalla muestra caso, cronología, artifacts y datos; la voz separa hecho, interpretación y transferencia.
- **CTA PATTERN:** aplicar el criterio al propio caso, comprobar si se cumplen sus condiciones o evitar la decisión que produjo el problema.
- **COMMON FAILURE MODES:** universalizar, omitir contexto, seleccionar solo resultados favorables, atribuir causalidad sin base o contar una historia sin evidencia del caso.

## 5. DECONSTRUCTION / AUDIT

- **FORMAT:** desmontaje de un sistema, resultado o ejecución para comprender qué capas, decisiones y evidencias lo explican.
- **USE WHEN:** existe un objeto concreto que puede inspeccionarse por capas y la comprensión surge de relacionar evidencia e interpretación.
- **DON'T USE WHEN:** solo hay teoría, el objeto no está disponible o la pregunta principal es descubrir una respuesta todavía incierta mediante investigación abierta.
- **VIEWER PROMISE:** «Voy a entender qué explica este sistema o resultado y qué no puede concluirse de él».
- **BEST SOURCE MATERIAL:** sistema, output, ejecución, configuración, logs, artifacts, auditorías, mapas y evidencia contrastable.
- **CREATOR ADVANTAGE:** acceso a la pieza desmontada, criterio técnico o editorial para interpretar capas y capacidad de corregir lecturas superficiales.
- **COMMON PACKAGING MECHANISMS:** anomalía, capa oculta, afirmación que la evidencia corrige, mapa reconstruido o diferencia entre señal y prueba.
- **INTRO JOB:** situar el objeto y la anomalía o pregunta concreta que justifica desmontarlo.
- **INTRO OPTIONS:** objeto primero; resultado aparentemente claro; evidencia que contradice la lectura inicial; mapa final que se reconstruirá.
- **FIRST 30s JOB:** hacer visible el objeto, formular qué no se entiende todavía y empezar por la primera capa de evidencia.
- **NARRATIVE SPINE:** objeto → capa → evidencia → interpretación → siguiente capa → modelo reconstruido.
- **PROOF EXPECTATION:** evidencia localizable por capa, distinción entre observación e inferencia y límites sobre lo que el objeto no demuestra.
- **FIRST PAYOFF PATTERN:** primera interpretación importante confirmada, corregida o descartada al abrir una capa.
- **VOICE / SCREEN BALANCE:** la pantalla presenta objeto y evidencia; la voz conecta capas, explica criterios y retira conclusiones no sostenidas.
- **CTA PATTERN:** auditar otro objeto con las mismas capas, comprobar la evidencia más fuerte o utilizar el mapa reconstruido.
- **COMMON FAILURE MODES:** teoría antes del objeto, acumulación de caveats, confundir ausencia de registro con ausencia de acción, repetir el expediente o terminar sin modelo útil.

## 6. INVESTIGATION / REVERSE ENGINEERING

- **FORMAT:** investigación guiada por evidencia para resolver una pregunta cuya respuesta no estaba clara al comenzar.
- **USE WHEN:** existen anomalías, contradicciones, pistas o hipótesis que pueden seguirse y corregirse de forma honesta.
- **DON'T USE WHEN:** la respuesta ya está cerrada y solo se explicará, no hay evidencia que permita avanzar o se pretende dramatizar incertidumbre artificial.
- **VIEWER PROMISE:** «Voy a seguir la evidencia hasta una conclusión proporcionada y ver cómo cambian las hipótesis».
- **BEST SOURCE MATERIAL:** evidencia primaria, logs, documentos, versiones, observaciones, contradicciones, intentos y correcciones metodológicas.
- **CREATOR ADVANTAGE:** acceso a evidencia propia, capacidad investigadora, hipótesis explícitas y disposición a mostrar correcciones o resultados negativos.
- **COMMON PACKAGING MECHANISMS:** evidencia anómala, contradicción, pregunta sin respuesta, conclusión corregida o mecanismo descubierto; no prometer misterio o certeza inexistentes.
- **INTRO JOB:** presentar evidencia o anomalía, hacer visible la contradicción y formular la pregunta que empezará a seguirse.
- **INTRO OPTIONS:** evidencia primero; contradicción entre dos superficies; conclusión inicial que falla; resultado parcial que abre la pregunta real.
- **FIRST 30s JOB:** mostrar la pista, delimitar la pregunta y comenzar el seguimiento de evidencia.
- **NARRATIVE SPINE:** pregunta → pista → hipótesis → contraste con evidencia → corrección → siguiente pista → conclusión proporcionada.
- **PROOF EXPECTATION:** fuentes y evidencia localizables, hipótesis distinguibles de hallazgos, correcciones conservadas y desconocidos explícitos.
- **FIRST PAYOFF PATTERN:** primera hipótesis confirmada, debilitada o descartada de forma que cambie el camino de investigación.
- **VOICE / SCREEN BALANCE:** la pantalla enseña evidencia y comparaciones; la voz formula hipótesis, explica correcciones y limita la conclusión.
- **CTA PATTERN:** seguir la misma pregunta con evidencia propia, comprobar una pista pendiente o aplicar el método de verificación.
- **COMMON FAILURE MODES:** fingir suspense, ocultar que la respuesta ya era conocida, convertir método en burocracia, confundir inferencia con prueba o cerrar con certeza excesiva.

## 7. EXPERIMENT / TEST

- **FORMAT:** observación de qué ocurre bajo condiciones definidas y con criterios decididos antes de conocer el resultado.
- **USE WHEN:** existe una pregunta o hipótesis comprobable, condiciones ejecutadas, observaciones conservadas y límites que permiten interpretar el caso.
- **DON'T USE WHEN:** solo hay un protocolo, faltan resultados, las condiciones cambiaron sin registro o una demostración informal se presenta como experimento.
- **VIEWER PROMISE:** «Voy a ver qué ocurrió en esta prueba, qué resultado importa y qué permite concluir».
- **BEST SOURCE MATERIAL:** protocolo, inputs, outputs originales, logs, métricas observables, incidencias, resultados y limitaciones.
- **CREATOR ADVANTAGE:** prueba propia, diseño transparente, acceso a originales y capacidad de explicar intervención humana, coste y errores.
- **COMMON PACKAGING MECHANISMS:** pregunta, hipótesis, contraste, resultado observado o límite sorprendente; no adelantar resultados inexistentes ni prometer generalidad.
- **INTRO JOB:** establecer pregunta o hipótesis, prueba y qué resultado tendría significado.
- **INTRO OPTIONS:** pregunta primero; dos condiciones visibles; resultado final cuando ya existe; fallo técnico que cambia lo evaluable.
- **FIRST 30s JOB:** enseñar la prueba real, sus condiciones esenciales y el criterio que separa un resultado útil de actividad.
- **NARRATIVE SPINE:** setup → ejecución → observación → resultado → interpretación → límite.
- **PROOF EXPECTATION:** condiciones predefinidas, originales preservados, mediciones observables, fallos separados de calidad y ausencia de reintentos silenciosos.
- **FIRST PAYOFF PATTERN:** primera observación válida que confirma que la prueba produce información, aunque no favorezca una condición.
- **VOICE / SCREEN BALANCE:** la pantalla muestra setup, ejecución y resultados; la voz explica criterios, incidencias, interpretación y límites.
- **CTA PATTERN:** replicar con condiciones propias, revisar el protocolo o decidir si la evidencia justifica otra prueba.
- **COMMON FAILURE MODES:** resultado sin baseline, cambiar criterios después, ocultar intervención, convertir fallo técnico en peor calidad, confundir un piloto con generalización o narrar un protocolo no ejecutado como resultado.

## 8. COMPARISON / REVIEW

- **FORMAT:** evaluación de opciones comparables para ayudar a elegir según criterios y casos de uso.
- **USE WHEN:** las opciones pueden afrontar la misma tarea o decisión y existe evidencia suficiente para aplicar criterios comunes.
- **DON'T USE WHEN:** cada opción se evalúa con una tarea distinta, faltan criterios comunes, no hay experiencia o evidencia, o la conclusión estaba fijada de antemano.
- **VIEWER PROMISE:** «Voy a entender las diferencias que importan y qué opción encaja con cada caso de uso».
- **BEST SOURCE MATERIAL:** misma tarea, inputs comparables, criterios declarados, outputs, experiencia de uso, costes y límites.
- **CREATOR ADVANTAGE:** uso directo, diseño de una comparación justa, conocimiento de trade-offs y capacidad de recomendar por contexto.
- **COMMON PACKAGING MECHANISMS:** decisión difícil, diferencia no obvia, trade-off principal o ganador condicionado por uso; no declarar ganador universal sin base.
- **INTRO JOB:** plantear la decisión, mostrar por qué las opciones no son equivalentes y presentar los criterios que importan.
- **INTRO OPTIONS:** decisión primero; mismo input con outputs distintos; trade-off que cambia la elección; caso de uso que invierte la recomendación.
- **FIRST 30s JOB:** confirmar opciones, tarea común y criterio principal y comenzar la comparación real.
- **NARRATIVE SPINE:** misma tarea y criterios → opción A → opción B → trade-off → decisión por caso de uso.
- **PROOF EXPECTATION:** condiciones comparables, criterios iguales, evidencia por opción, diferencias de versión y límites de experiencia o medición.
- **FIRST PAYOFF PATTERN:** primera diferencia demostrada que cambia qué opción conviene a un caso concreto.
- **VOICE / SCREEN BALANCE:** la pantalla alinea inputs, acciones y outputs; la voz interpreta trade-offs y evita rankings sin contexto.
- **CTA PATTERN:** elegir según el propio caso, aplicar la matriz o repetir la tarea común con restricciones propias.
- **COMMON FAILURE MODES:** criterios distintos, cherry-picking, comparar marketing, ignorar precio o intervención, convertir preferencia en medición o usar formatos/versiones no equivalentes.

## 9. EXPLAINER / MENTAL MODEL

- **FORMAT:** explicación que vuelve comprensible un mecanismo complejo mediante un modelo mental aplicable.
- **USE WHEN:** el valor principal es comprender cómo funciona algo para razonar o decidir mejor, aunque no exista un artifact que construir.
- **DON'T USE WHEN:** puede mostrarse un procedimiento reproducible, un caso real domina la promesa o solo se pretende encadenar definiciones.
- **VIEWER PROMISE:** «Voy a entender este mecanismo de una forma que me permita aplicarlo o tomar mejores decisiones».
- **BEST SOURCE MATERIAL:** documentación, modelos, diagramas, ejemplos, contraejemplos, edge cases y aplicaciones.
- **CREATOR ADVANTAGE:** síntesis propia, claridad de modelo, experiencia para seleccionar los límites importantes y aplicación al trabajo real.
- **COMMON PACKAGING MECHANISMS:** confusión frecuente, consecuencia contraintuitiva, modelo sencillo o distinción que cambia decisiones; no reducir en exceso lo que el modelo no cubre.
- **INTRO JOB:** hacer reconocible una confusión o consecuencia que importa y abrir el modelo que la resolverá.
- **INTRO OPTIONS:** problema primero; resultado que parece contradictorio; dos conceptos confundidos; ejemplo que el modelo debe explicar.
- **FIRST 30s JOB:** mostrar la confusión y ofrecer la primera pieza del modelo mediante un ejemplo concreto.
- **NARRATIVE SPINE:** problema → modelo simple → mecanismo → ejemplo → edge case → aplicación.
- **PROOF EXPECTATION:** fuentes para hechos, ejemplos que el modelo explique, límites explícitos y separación entre analogía y mecanismo real.
- **FIRST PAYOFF PATTERN:** primera predicción o decisión que el espectador puede explicar con el nuevo modelo.
- **VOICE / SCREEN BALANCE:** la pantalla sostiene diagramas y ejemplos; la voz guía relaciones, causalidad, límites y aplicación.
- **CTA PATTERN:** usar el modelo para diagnosticar una situación, tomar una decisión o reconocer un edge case.
- **COMMON FAILURE MODES:** definición tras definición, analogía presentada como realidad, abstracción sin ejemplo, diagrama ornamental o modelo tan amplio que no cambia ninguna decisión.

## 10. FRAMEWORK / METHOD

- **FORMAT:** enseñanza y aplicación de una forma propia o seleccionada de decidir o ejecutar trabajo.
- **USE WHEN:** existen criterios que pueden aplicarse durante el vídeo y producen una decisión, transformación o resultado completo.
- **DON'T USE WHEN:** solo hay una lista de nombres, los criterios no cambian decisiones o el valor real está en explicar un mecanismo, no en aplicar un método.
- **VIEWER PROMISE:** «Voy a aprender un método y verlo aplicado hasta producir una decisión o resultado».
- **BEST SOURCE MATERIAL:** método, criterios, caso de aplicación, decisiones, artifact resultante, límites y ejemplos.
- **CREATOR ADVANTAGE:** método desarrollado o adaptado por the configured human operator, criterio derivado de trabajo real y capacidad de mostrar dónde funciona o no.
- **COMMON PACKAGING MECHANISMS:** problema recurrente, fallo de enfoques habituales, decisión difícil o resultado del método aplicado; no vender nomenclatura como novedad.
- **INTRO JOB:** mostrar el problema recurrente, por qué el enfoque habitual falla y qué resultado producirá el método.
- **INTRO OPTIONS:** problema primero; resultado completado; criterio que cambia una decisión; caso que fracasa sin el método.
- **FIRST 30s JOB:** identificar el trabajo que se resolverá y comenzar a aplicar el primer criterio, no enumerar todo el framework.
- **NARRATIVE SPINE:** problema → criterio → aplicación → decisión → siguiente criterio → resultado completo.
- **PROOF EXPECTATION:** aplicación visible, decisiones producidas, resultado revisable y procedencia del método; distinguir propuesta propia de práctica validada.
- **FIRST PAYOFF PATTERN:** primer criterio aplicado que cambia una decisión o elimina una opción.
- **VOICE / SCREEN BALANCE:** la pantalla muestra caso, criterios y artifact en evolución; la voz explica por qué cada criterio cambia el trabajo.
- **CTA PATTERN:** aplicar el método a un caso propio, completar el artifact o revisar una decisión con los criterios.
- **COMMON FAILURE MODES:** enumerar campos, dar igual peso a todas las partes, no aplicar el método, ocultar excepciones o confundir una síntesis propia con estándar oficial.

## 11. LIST / TIPS

- **FORMAT:** conjunto de unidades relativamente independientes que cumplen una promesa común y comparten un criterio de selección.
- **USE WHEN:** cada unidad aporta valor completo por sí misma y la selección tiene una razón clara más fuerte que una progresión causal única.
- **DON'T USE WHEN:** la lista oculta una pieza sin narrativa, los puntos dependen unos de otros o solo se han dividido definiciones para aumentar cantidad.
- **VIEWER PROMISE:** «Voy a obtener varias acciones, errores o criterios útiles seleccionados para este problema».
- **BEST SOURCE MATERIAL:** experiencia, ejemplos, errores observados, evidencia por unidad, casos y criterio de selección.
- **CREATOR ADVANTAGE:** selección basada en trabajo real, ejemplos propios y criterio para excluir consejos obvios o no respaldados.
- **COMMON PACKAGING MECHANISMS:** beneficio común, errores evitables, selección por experiencia o conjunto acotado de decisiones; el número no sustituye la promesa.
- **INTRO JOB:** formular el beneficio y explicar el criterio que justifica que estas unidades estén juntas.
- **INTRO OPTIONS:** mejor payoff primero; error frecuente; criterio de selección; contraste entre consejo obvio y útil.
- **FIRST 30s JOB:** entregar o empezar la primera unidad valiosa y demostrar el nivel de especificidad del conjunto.
- **NARRATIVE SPINE:** beneficio y criterio → tip → por qué → ejemplo o prueba → payoff → siguiente unidad con progresión de interés o utilidad.
- **PROOF EXPECTATION:** razón, ejemplo o evidencia para cada unidad y coherencia con el criterio común.
- **FIRST PAYOFF PATTERN:** primer consejo completo que el espectador puede aplicar o usar para evitar un error.
- **VOICE / SCREEN BALANCE:** la pantalla diferencia unidades y ejemplos; la voz explica consecuencia, evidencia y aplicación sin leer bullets.
- **CTA PATTERN:** aplicar la unidad más relevante, elegir una prioridad o revisar el propio trabajo con la lista.
- **COMMON FAILURE MODES:** puntos obvios, cantidad arbitraria, ausencia de criterio, repetición, consejos sin ejemplo o lista utilizada para evitar una tesis.

## 12. NEWS / UPDATE

- **FORMAT:** explicación de un cambio reciente, su evidencia y su consecuencia práctica para el público.
- **USE WHEN:** existe un cambio verificable y reciente que altera una decisión, capacidad, riesgo o forma de trabajar.
- **DON'T USE WHEN:** solo se resume un anuncio, la fecha no importa, no hay consecuencia propia o el contenido sigue siendo útil sin la novedad.
- **VIEWER PROMISE:** «Voy a entender qué cambió, por qué importa y qué debería comprender o hacer ahora».
- **BEST SOURCE MATERIAL:** anuncio y documentación primaria, fecha, versión, comparación con estado anterior, ejemplos y límites conocidos.
- **CREATOR ADVANTAGE:** interpretación aplicada al trabajo de the configured human operator, pruebas o contexto propio y capacidad de separar anuncio de consecuencia.
- **COMMON PACKAGING MECHANISMS:** cambio concreto, consecuencia, ruptura con estado anterior o decisión urgente proporcionada; no fabricar urgencia.
- **INTRO JOB:** decir qué cambió, por qué importa y qué debe entender o decidir el espectador.
- **INTRO OPTIONS:** cambio primero; consecuencia primero; antes y después; limitación que el anuncio omite.
- **FIRST 30s JOB:** identificar cambio, fecha o versión y consecuencia principal y mostrar la evidencia inicial.
- **NARRATIVE SPINE:** cambio → evidencia → consecuencia → impacto práctico → límite o desconocido.
- **PROOF EXPECTATION:** fuente primaria, fecha y versión, estado anterior cuando se compare y separación entre claim del proveedor y comportamiento probado.
- **FIRST PAYOFF PATTERN:** primera consecuencia práctica respaldada que cambia una decisión del espectador.
- **VOICE / SCREEN BALANCE:** la pantalla muestra anuncio, documentación y cambio; la voz interpreta consecuencias, límites y acción.
- **CTA PATTERN:** revisar una configuración, decidir si adoptar, esperar o comprobar el cambio en el propio contexto.
- **COMMON FAILURE MODES:** leer el comunicado, repetir marketing, ignorar fecha o versión, fabricar urgencia, no aportar interpretación o presentar disponibilidad anunciada como resultado probado.

## 13. STORY / LESSON LEARNED

- **FORMAT:** experiencia real narrada para convertir decisiones y consecuencias en un aprendizaje transferible.
- **USE WHEN:** existe una experiencia con estado inicial, decisión, consecuencia, giro y resultado que the configured human operator puede contar con honestidad.
- **DON'T USE WHEN:** habría que fabricar conflicto, el aprendizaje no depende de la experiencia o faltan hechos básicos para sostenerla.
- **VIEWER PROMISE:** «Voy a entender qué ocurrió, qué cambió la interpretación y qué lección puedo usar».
- **BEST SOURCE MATERIAL:** notas, cronología, artifacts, decisiones, errores, resultados, recuerdos atribuidos y límites de la experiencia.
- **CREATOR ADVANTAGE:** vivencia directa, acceso a decisiones y contexto, errores propios y perspectiva que solo aparece después del resultado.
- **COMMON PACKAGING MECHANISMS:** resultado, fallo, sorpresa, cambio de opinión o lección contraintuitiva; no dramatizar ni convertir memoria en dato independiente.
- **INTRO JOB:** presentar resultado, fallo o sorpresa que hace que la experiencia merezca ser contada.
- **INTRO OPTIONS:** resultado primero; momento de fallo; decisión que parecía correcta; sorpresa que cambia la lección.
- **FIRST 30s JOB:** situar la experiencia real, su consecuencia y la pregunta sobre cómo se llegó hasta ahí.
- **NARRATIVE SPINE:** estado inicial → decisión → consecuencia → punto de inflexión → resultado → lección.
- **PROOF EXPECTATION:** experiencia atribuida, artifacts o señales cuando existan, cronología coherente y límites entre recuerdo, interpretación y hecho externo.
- **FIRST PAYOFF PATTERN:** primera consecuencia que revela por qué la decisión inicial no podía interpretarse como parecía.
- **VOICE / SCREEN BALANCE:** la voz lleva experiencia, decisiones y reflexión; la pantalla aporta artifacts, lugares, tiempos y cambios sin recrear evidencia inexistente.
- **CTA PATTERN:** aplicar la lección, revisar una decisión semejante o reconocer antes el punto de inflexión.
- **COMMON FAILURE MODES:** dramatismo fabricado, moraleja genérica, cronología sin decisiones, atribuir causalidad retrospectiva o usar la historia como autoridad universal.

## Base empírica y revisión futura

Estos contratos no representan «lo que garantiza éxito en YouTube». Deben refinarse mediante vídeos realmente inspeccionados, creadores relevantes, resultados propios publicados, REVIEW y cambios observados en la plataforma. Las referencias de creadores son evidencia editorial, no templates para copiar.

El proceso de gobierno es `CORPUS → FINDINGS → human review → explicit canonical update`. El corpus conserva evidencia y límites; este documento conserva el canon. [`WALKTHROUGH CORPUS v1`](../research/youtube-format-corpus/walkthrough/CORPUS-v1.md) y [`FINDINGS-v1.md`](../research/youtube-format-corpus/walkthrough/FINDINGS-v1.md) respaldan la revisión explícitamente autorizada de `WALKTHROUGH / SETUP TOUR` v2. Futuros corpus no modifican automáticamente este documento ni otros contratos.

## Simulación del selector

| Caso | Elección favorecida | Diferencia decisiva |
| --- | --- | --- |
| A. the configured human operator entrega su setup de agentes | `WALKTHROUGH / SETUP TOUR` | El valor principal es recorrer un sistema real, sus decisiones y su funcionamiento; no enseñar todavía una reproducción exacta. |
| B. the configured human operator pide enseñar exactamente cómo configurarlo | `TUTORIAL / HOW-TO`, si hay evidencia reproducible | La promesa exige prerrequisitos, pasos, configuración, acciones, outputs y validación. Si falta algo esencial, se hace `REQUEST TO CREATOR`; un walkthrough solo se ofrece como alternativa. |
| C. the configured human operator entrega logs de comportamiento inesperado | `INVESTIGATION / REVERSE ENGINEERING` o `DECONSTRUCTION / AUDIT` | Investigación si la respuesta sigue abierta y las hipótesis cambian; deconstrucción si el objeto y la pregunta ya están acotados y se desmontará por capas. |
| D. the configured human operator quiere probar si dos enfoques funcionan mejor | `EXPERIMENT / TEST` o `COMPARISON / REVIEW` | Experimento cuando se observarán condiciones definidas con criterios predeclarados; comparación cuando la promesa es ayudar a elegir aplicando la misma tarea y criterios a opciones ya evaluables. |
| E. the configured human operator construye una herramienta nueva desde cero | `BUILD FROM SCRATCH` | El proceso real de construcción, sus problemas, decisiones, iteraciones y prueba forman la experiencia. |
| F. the configured human operator explica un modelo conceptual sin artifact | `EXPLAINER / MENTAL MODEL` o `FRAMEWORK / METHOD` | Explainer si el resultado es comprender un mecanismo; framework si el espectador aplicará criterios para producir una decisión o método de trabajo. |

Estas simulaciones prueban diferencias de promesa y evidencia. No seleccionan formato por tema, no crean piezas y no sustituyen la decisión específica de PRODUCTION.
