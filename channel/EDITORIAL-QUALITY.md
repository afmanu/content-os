# Estándar de calidad editorial de ideas

> PRODUCT PATH RULE: this contract lives in `CORE_ROOT`. Any reference to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, or `postproduction/` is logical and resolves under the explicitly selected `INSTANCE_ROOT`. If no instance is configured, stop with `SETUP REQUIRED`.


**Estado:** criterio común para ideas manuales y candidatas de RADAR.

## Propósito

Responder una pregunta práctica: **¿tenemos simplemente un tema o tenemos una pieza de contenido que merece avanzar?**

El estándar ayuda a tomar una decisión editorial; no es una fórmula rígida, un score ni un brief de producción. Una señal o idea incompleta puede conservarse para desarrollo sin convertirse todavía en candidata lista para selección.

La prioridad es:

**calidad editorial > novedad por sí sola**

Una noticia puede detonar una pieza, pero no es necesariamente su historia. Un problema duradero o trabajo propio puede superar a una novedad si produce una pieza más útil.

## Encargo directo y Source Intent

**USER-PROVIDED MATERIAL IS A COMMISSION, NOT A DISCOVERY CORPUS.**

RADAR descubre oportunidades nuevas. Cuando the configured human operator proporciona material con intención de convertirlo en contenido, el punto de partida es un encargo editorial, no un corpus del que extraer por defecto otra idea más estrecha. Los tipos de entrada son:

- **IDEA:** tesis o concepto proporcionado por the configured human operator;
- **DOSSIER:** material amplio preparado para elaborar contenido;
- **RESEARCH:** investigación ya realizada;
- **PROJECT:** sistema, build, configuración o trabajo real realizado;
- **EXPERIMENT:** resultados de una prueba existente;
- **NOTES:** materia prima menos estructurada.

Antes de seleccionar ángulo o formato hay que identificar:

- **SOURCE TYPE:** `IDEA`, `DOSSIER`, `RESEARCH`, `PROJECT`, `EXPERIMENT` o `NOTES`;
- **SOURCE SUBJECT:** de qué trata el material;
- **SOURCE SCOPE:** qué historia o territorio cubre realmente;
- **CREATOR'S FIRST-PARTY ADVANTAGE:** por qué the configured human operator puede contarla de forma propia;
- **WHAT CREATOR ACTUALLY DID:** trabajo, decisiones o experiencia que constan;
- **WHAT CAN BE SHOWN:** artifacts, proceso o evidencia mostrable;
- **WHAT CAN BE CLAIMED:** afirmaciones sostenibles;
- **WHAT CANNOT BE CLAIMED:** límites y afirmaciones excluidas;
- **LIKELY VIDEO VEHICLE:** `walkthrough`, `tutorial`, `deconstruction`, `build`, `research`, `case study`, `experiment`, `framework` o `explanation`.

La autoridad editorial se resuelve en este orden: intención explícita de the configured human operator; alcance dominante del material; evidencia disponible; estándares editoriales de content-os. El tipo de fuente orienta cómo procesar la evidencia, no predetermina el canal o formato del output.

Un dossier amplio se interpreta primero como una historia general posible. Solo se divide cuando contiene promesas incompatibles, el formato obligaría a superficialidad o relleno, falta evidencia esencial para sostener el conjunto o the configured human operator pide varios contenidos. Una evidencia estrecha puede ser prueba, demostración, caso, payoff, ejemplo o escena de un output más amplio; no obliga por sí sola a redefinir el encargo.

## Creator Advantage

Toda comisión debe responder como criterio obligatorio: **¿Qué puede enseñar the configured human operator aquí porque lo investigó, construyó, configuró, probó, auditó o utilizó personalmente?** Favorecer acceso propio, sistemas reales, investigación propia, experiencia, artifacts, resultados, observaciones, errores encontrados y decisiones tomadas. Esa ventaja determina la perspectiva y el trabajo visible, pero no autoriza atribuirle experiencia o resultados que no consten ni convertirla en autoridad universal.

Antes de sustituir el encargo por un tema distinto hay que comprobar si la ventaja de the configured human operator permite sostener la historia original mediante un `walkthrough`, tutorial, deconstrucción, build, investigación, caso, experimento, framework o explicación.

## Evidence Check

Cada elemento necesario para cumplir la promesa se clasifica de forma observable:

- **AVAILABLE:** existe, es accesible y respalda el uso previsto;
- **DISPLAY-MISSING:** la evidencia existe, pero falta una versión mostrable o saneada;
- **RESEARCH-MISSING:** falta resolver una afirmación documental esencial;
- **EXECUTION-MISSING:** falta ejecutar una acción o flujo cuyo resultado importa;
- **BUILD-MISSING:** falta construir y verificar un artifact esencial;
- **EXPERIMENT-MISSING:** falta una prueba controlada para sostener la conclusión;
- **UNSUPPORTED:** no existe respaldo suficiente ni una vía autorizada para obtenerlo.

Si falta material esencial, se pide a the configured human operator antes de estrechar el tema. La petición debe contener exactamente: **NEEDED**, **WHY**, **MINIMUM** y **ALTERNATIVE**. `ALTERNATIVE` explica qué pieza proporcionada seguiría siendo honesta con menos evidencia; no autoriza adoptarla sin decisión de the configured human operator. Ningún workflow ejecuta búsquedas, builds, experimentos, productos, cuentas o APIs solo para completar el encargo sin la autorización correspondiente.

`Walkthrough` permite que the configured human operator enseñe cómo está montado y funciona un sistema, qué decisiones tomó, qué observó y qué límites existen; puede apoyarse en documentación y reconstrucciones correctamente rotuladas y no promete que el espectador reproducirá cada paso. `Tutorial` promete que el espectador podrá repetir el sistema o resultado y exige evidencia suficiente de pasos, configuración, inputs, herramientas, acciones y outputs. Si el tutorial no es sostenible pero sí el walkthrough, recomendar el walkthrough sin cambiar automáticamente de tema.

## Mecanismo editorial adaptado

- El tema no es la pieza.
- El espectador debe reconocer pronto qué problema, capacidad o resultado se trabajará.
- Debe existir trabajo visible: probar, desmontar, construir, comparar, aplicar, transformar, inspeccionar, investigar o revisar algo concreto.
- La explicación acompaña al trabajo; no lo sustituye con una clase abstracta.
- La pieza progresa hacia un resultado, una decisión o una comprensión utilizable.
- Siempre que aporte valor, deja un artifact: mapa, sistema, tabla, proceso, herramienta, checklist, experimento, build o recurso.
- La aportación debe ser de the configured human operator: investigación, criterio, aplicación, arquitectura, construcción, evidencia, experiencia documentada o interpretación.
- Cambiar de herramienta no cambia la promesa del canal.

Estas lecciones proceden de una referencia de mecanismo editorial observada en an external editorial reference y se adaptan a la identidad de the configured human operator. No autorizan copiar títulos, miniaturas, frases, cifras, experiencias, claims, personalidad, hooks o estilo de hype; tampoco permiten inferir demanda o rendimiento.

## Quality gate

### Condiciones necesarias

Una candidata preparada para decisión editorial debe responder con suficiente concreción:

1. **Problema o pregunta:** ¿qué problema, tensión o pregunta reconocible tiene el espectador?
2. **Resultado:** ¿qué entenderá, podrá hacer o decidir después?
3. **Trabajo visible:** ¿qué veremos ocurrir en pantalla? «Explicar X» no basta; debe investigarse, probarse, construirse, compararse, transformarse, aplicarse, inspeccionarse, desmontarse o revisarse algo concreto, real o documental.
4. **Aportación propia:** ¿qué aporta the configured human operator además de repetir la fuente?
5. **Evidencia posible:** ¿qué sostendrá la pieza —documentación, trabajo propio, experimento, build o razonamiento identificado como tal—?
6. **Promesa proporcionada:** ¿puede cumplirse con la evidencia y el trabajo realmente disponibles o alcanzables?

Si alguna condición todavía no puede responderse, conservar la señal o idea como **necesita desarrollo**. No descartarla automáticamente ni crear un `CONTENT-NNN` listo para selección fingiendo que superó el gate.

En una comisión, el gate decide si el encargo es producible, qué evidencia falta, si requiere reformulación acordada o qué trabajo adicional debe autorizarse. No autoriza sustituir silenciosamente el tema central por una idea distinta que resulte más fácil de demostrar.

### Señales de fortaleza

Se valoran cualitativamente, sin suma ni umbral numérico obligatorio:

- resultado visible pronto;
- demostración concreta;
- utilidad para trabajo profesional;
- mecanismo que merece explicación;
- tensión entre expectativa y realidad;
- posibilidad de producir un recurso;
- oportunidad temporal real;
- continuidad con trabajo de the configured human operator;
- aprendizaje incluso si el resultado contradice la hipótesis;
- profundidad suficiente para el formato sin relleno.

No es necesario que todas estén presentes.

## Anti-patrones

Rechazar como candidata o devolver para desarrollo:

- «Empresa X lanza feature Y»;
- «Todo lo nuevo de X»;
- «Qué es X»;
- listas de funciones sin trabajo visible;
- repetición del comunicado del proveedor;
- temas cuyo único atractivo es ser recientes;
- ideas sin aportación propia;
- afirmaciones espectaculares sin forma de comprobación;
- resultados visibles que solo existen en el título;
- piezas de 10–15 minutos sostenidas con relleno.

Una noticia puede avanzar si origina una pregunta de trabajo concreta y supera las condiciones necesarias.

## Candidate card común

IDEA y RADAR deben producir esta estructura antes de recomendar una pieza:

- **Source Intent:** tipo, sujeto, alcance y vehículo probable; en RADAR, indicar que el origen es descubrimiento y no comisión.
- **Creator Advantage.**

- **Pregunta del espectador.**
- **Problema concreto.**
- **Promesa provisional.**
- **Por qué importa.**
- **Aportación propia de the configured human operator.**
- **Trabajo visible.**
- **Resultado visible.**
- **Evidencia disponible.**
- **Evidencia o trabajo faltante.**
- **Recurso potencial.**
- **Vehículo probable:** `walkthrough`, `tutorial`, `deconstruction`, `build`, `research`, `case study`, `experiment`, `framework`, `explanation` o `null`.
- **Evidence Check:** clasificación de cada carencia esencial y, si procede, petición `NEEDED / WHY / MINIMUM / ALTERNATIVE`.
- **Por qué ahora**, cuando exista un motivo temporal real.
- **Principal riesgo editorial.**
- **Ruta recomendada siguiente:** `PRODUCTION`, `RESEARCH`, `EXPERIMENT`, `BUILD` o no avanzar todavía.

La candidate card permite comparar y decidir si merece inversión. No sustituye la investigación, el protocolo, la especificación de build ni el brief.

## Decisión

- **Preparada para selección:** responde las seis condiciones necesarias con una promesa proporcionada y trabajo visible.
- **Necesita desarrollo:** conserva valor potencial, pero falta concretar alguna condición.
- **No avanzar todavía:** es demasiado amplia, carece de problema o aportación, no ofrece trabajo visible suficiente o se solapa sustancialmente con otra pieza.

Superar el gate no autoriza ejecutar la ruta recomendada. the configured human operator decide el siguiente paso por separado.
