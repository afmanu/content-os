# Workflow EXPERIMENT

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. Su existencia no acredita que se haya preparado o ejecutado una prueba.

## A. Propósito y relación con otras operaciones

Obtener evidencia empírica acotada para una afirmación editorial cuando la investigación documental no basta. La secuencia posible es `RESEARCH → EXPERIMENT → PRODUCTION`, pero no es una cadena automática: una investigación puede ser suficiente sin experimento, una prueba puede terminar sin producción y no toda prueba necesita un benchmark, varias condiciones o significación estadística.

La complejidad debe ser proporcional a la pregunta y a la fuerza de la afirmación. EXPERIMENT no sustituye RESEARCH, no convierte una observación en una conclusión general y no autoriza producción, ensayo, grabación, publicación ni automatizaciones.

## B. Modos y activación

### PREPARE

Lo activa una orden explícita como «Prepara la prueba de `CONTENT-NNN`». Autoriza recuperar la evidencia, diseñar el protocolo y el plan de ejecución, preparar materiales documentales seguros y actualizar el registro y el historial dentro de este contrato.

PREPARE no autoriza ejecutar modelos o código externo, llamar APIs, usar productos privados o de pago, consumir créditos, abrir sandboxes, enviar mensajes, usar datos reales no autorizados ni producir una observación experimental. Tampoco autoriza instalar dependencias, ampliar permisos o iniciar PRODUCTION.

### EXECUTE

Lo activa una orden inequívoca como «Ejecuta la prueba preparada de `CONTENT-NNN`» o «Ejecuta `EXP-NNN` según el protocolo aprobado». Requiere protocolo completo, versión exacta identificada, requisitos y coste conocidos, alcance permitido y autorización explícita para esa ejecución.

Cambiar de forma material el modelo, dataset, tarea, métrica, entorno, herramientas, número de casos o repeticiones, coste máximo o condiciones invalida la autorización recibida. Se detiene la ejecución y se solicita una nueva decisión; no se adapta el protocolo en silencio.

Preguntar por un protocolo, una prueba o sus resultados es solo consulta. No activa PREPARE ni EXECUTE. RESEARCH no inicia EXPERIMENT y PREPARE no inicia EXECUTE.

## C. Autoridad, entrada y recuperación

Leer [`channel/CONSTITUTION.md`](../channel/CONSTITUTION.md), [`channel/VIDEO-STANDARD.md`](../channel/VIDEO-STANDARD.md), [`state/pieces.json`](../state/pieces.json), este procedimiento y los antecedentes pertinentes. La entrada debe identificar un `CONTENT-NNN` existente o un `EXP-NNN` cuya asociación con una pieza pueda comprobarse.

Recuperar de la pieza:

- pregunta editorial, formato, fase, estado, bloqueos, artifacts y aprobaciones;
- investigación y síntesis para producción;
- afirmaciones que la documentación sostiene y las que todavía no puede sostener;
- prueba mínima propuesta, requisitos, riesgos y materiales;
- resultados experimentales anteriores y revisiones pertinentes;
- antecedentes del mismo LAB que ayuden a evitar duplicaciones o repetir fallos.

Si la evidencia documental ya sostiene la promesa, no forzar un experimento. Si no puede definirse una pregunta empírica concreta o una ejecución no cambiaría una decisión editorial, recomendar no preparar la prueba.

## D. Identidad, ubicación y versiones

Cada prueba tiene un ID `EXP-NNN` dentro del LAB asociado a la pieza, por ejemplo:

```text
lab/LAB-NNN-slug/experiment/EXP-NNN/
├── PROTOCOL.md
├── RUN-PLAN.md
├── RESULTS.md          # solo después de EXECUTE, si hay resultados
└── runs/
    └── RUN-NNN/        # solo cuando sea necesario para conservar una ejecución
```

Usar el entero posterior al mayor `EXP-NNN` del LAB y no reutilizar identificadores. No crear otro `CONTENT-NNN` ni otro LAB solo para alojar la prueba cuando ya existe un LAB asociado. Si varias investigaciones sostienen la pieza, resolver primero qué LAB conserva el experimento y citar las demás; no duplicar su contenido.

Una ejecución repetida de PREPARE recupera los archivos existentes y no los sobrescribe por defecto. Una revisión explícita crea una versión identificable o conserva la versión anterior de modo que toda ejecución pueda vincularse con el protocolo exacto usado. Un protocolo ya ejecutado no se modifica como si hubiera sido siempre igual. Reejecutar una prueba exige autorización explícita aunque no cambie el protocolo.

## E. PREPARE: protocolo

Crear `PROTOCOL.md` antes de cualquier ejecución. Debe contener, sin inventar decisiones ausentes:

1. ID `EXP-NNN`, `CONTENT-NNN`, LAB asociado, estado, versión y fecha.
2. Pregunta empírica concreta.
3. Por qué la evidencia documental no basta.
4. Afirmación que el resultado podría apoyar.
5. Afirmaciones que la prueba no puede apoyar.
6. Carácter exploratorio o confirmatorio y consecuencia de esa elección.
7. Unidad observada.
8. Caso, tarea o flujo exacto.
9. Baseline o comparación exacta, si la pregunta la necesita.
10. Intervención.
11. Condiciones que deben mantenerse constantes.
12. Métricas, cada una con definición operacional.
13. Criterios de interpretación fijados antes de ejecutar.
14. Materiales y datos, con procedencia y sensibilidad.
15. Modelos, herramientas y servicios, con versiones o identificadores comprobables cuando existan.
16. Configuración necesaria para reproducir la prueba y límites de verificabilidad.
17. Número de casos o repeticiones y su justificación.
18. Coste o consumo máximo autorizado que deberá decidir the configured human operator.
19. Riesgos técnicos, editoriales, de privacidad y de datos.
20. Artifacts que se conservarán y ubicación prevista.
21. Qué hace inválida una muestra y qué se considera fallo técnico.
22. Reglas de parada.
23. Limitaciones y alcance de generalización.
24. Autorizaciones humanas necesarias antes de EXECUTE.

No añadir lenguaje estadístico que el diseño no permita ni multiplicar condiciones por apariencia de rigor. Una demostración de mecanismo puede requerir un caso; una afirmación de fiabilidad o comparación estable exige más observaciones y una justificación acorde. Si no hay baseline significativo, explicarlo en vez de inventarlo.

### Métricas y cadena de valor

Para cada métrica definir **qué mide, unidad, método, momento de captura, dirección considerada favorable y qué conclusión no permite**. Separar:

`input → actividad → output → resultado → valor`

Tokens, mensajes, pasos, tiempo de cómputo, coste y volumen de salidas describen recursos o actividad; no acreditan por sí solos calidad, resultado útil ni valor. La comparación debe usar la misma unidad aceptada y el mismo estándar para baseline e intervención.

No crear una puntuación agregada arbitraria para ocultar compensaciones. Si hay evaluación humana, especificar qué se juzga, quién juzga, escala o rúbrica, orden, posible cegamiento, conflictos y límites. Una evaluación asistida por IA no se presenta como independiente cuando el evaluador conoce la condición, el protocolo o el resultado esperado.

## F. PREPARE: plan de ejecución

Crear `RUN-PLAN.md` vinculado a la versión exacta de `PROTOCOL.md`. Debe especificar:

- preflight y condiciones que deben cumplirse antes de consumir recursos;
- inventario e integridad de materiales;
- orden de casos y condiciones;
- configuración, entradas y controles constantes;
- momento y método de captura de cada métrica;
- artifacts originales y derivados que se guardarán;
- convención de nombres y rutas;
- tratamiento de errores, interrupciones y datos incompletos;
- reglas de parada y escalado;
- distinción operativa entre intento, ejecución válida, fallo técnico y muestra evaluable.

La existencia de un proceso, solicitud, evento o archivo vacío no acredita una respuesta ni una muestra. No afirmar el modelo servido, aislamiento, permisos efectivos, consumo o ausencia de herramientas si no puede verificarse. Capturar la evidencia durante la ejecución, no reconstruirla después cuando podía conservarse. No crear infraestructura que la pregunta no necesite.

PREPARE termina con protocolo y plan completos o con un bloqueo explícito. En ambos casos deja una única decisión pendiente de the configured human operator. Nunca continúa a EXECUTE.

## G. Precondiciones de EXECUTE

Antes de actuar, releer:

- `PROTOCOL.md` y `RUN-PLAN.md` vigentes;
- investigación y recursos citados;
- entrada actual de la pieza en `state/pieces.json`;
- autorización que identifica alcance y versión;
- requisitos, disponibilidad y coste máximo.

Comprobar datos protegidos, credenciales, privacidad, permisos, productos de pago y acciones externas. La autorización de una prueba no permite extraer secretos, ampliar permisos, contratar servicios, enviar mensajes ni usar datos fuera del alcance aprobado.

Si falta una capacidad, material, acceso, versión, coste aceptado o autorización, registrar el bloqueo y detenerse. No sustituir la herramienta, dataset, métrica o entorno por otra opción «equivalente» sin una nueva decisión.

## H. EXECUTE

1. Ejecutar el preflight y conservar su resultado.
2. Crear un `RUN-NNN` único para cada ejecución autorizada cuando haya artifacts que conservar.
3. Registrar configuración efectiva, versiones comprobables, hora, entradas, orden, intervenciones humanas y desviaciones.
4. Conservar primero las salidas originales y los errores; analizar después sobre copias o referencias estables.
5. Respetar el número de intentos. No reintentar silenciosamente, seleccionar solo la mejor salida ni cambiar el protocolo durante la ejecución.
6. Registrar herramientas usadas, cambios de configuración, fallos y cualquier intervención humana que pueda afectar la comparación.
7. Aplicar las reglas de validez y parada fijadas antes de observar el resultado.

Una interrupción queda como parcial o fallida. Si no existe respuesta conservada o no se cumplen los criterios de muestra evaluable, no fabricar una muestra ni inferir el resultado. Un fallo técnico es evidencia sobre esa ejecución, no sobre la calidad de la intervención estudiada.

## I. Resultados y artifacts

Cuando EXECUTE produzca evidencia, crear `RESULTS.md` y los artifacts reales pertinentes bajo `runs/RUN-NNN/`. No crear archivos vacíos para aparentar cobertura. `RESULTS.md` debe separar:

- **OBSERVADO:** hechos conservados directamente, incluidos fallos y desviaciones;
- **MEDIDO:** valores calculados según las definiciones previas, con unidad y muestra;
- **INTERPRETADO:** lectura razonada limitada al diseño;
- **NO DEMOSTRADO:** afirmaciones que los datos no permiten;
- **LIMITACIONES:** alcance, sesgos, incertidumbre y condiciones no verificadas.

Incluir todos los intentos autorizados y justificar exclusiones conforme al protocolo. No ocultar fallos, elegir casos favorables, cambiar el resultado principal ni construir una conclusión retrospectiva sin identificarla como exploratoria. Conservar originales, configuraciones y cálculos suficientes para auditar la relación entre evidencia y conclusión.

## J. Estado operativo

EXPERIMENT no añade una fase nueva al esquema. La pieza puede permanecer en `research` mientras se prepara o ejecuta una prueba. Usar estados concretos, cuando describan lo ocurrido, como:

- `experiment_protocol_ready`;
- `experiment_awaiting_authorization`;
- `experiment_in_progress`;
- `experiment_partial`;
- `experiment_complete_pending_decision`;
- `experiment_blocked`.

Conservar fases, orígenes, aprobaciones y artifacts ajenos. Añadir a `artifacts` solo rutas existentes, con claves `experiment_protocol`, `experiment_run_plan` y `experiment_results` cuando correspondan. No migrar el esquema. `state_evidence` debe apuntar a evidencia real del estado.

PREPARE y EXECUTE no cambian automáticamente la pieza a `ready_to_produce` o `production`. Tras la prueba, the configured human operator decide si usar el resultado, repetir, cambiar alcance, reformular la pieza o abandonar la vía. Una aprobación para grabar o publicar nunca se infiere.

## K. Escrituras, verificación y parada

PREPARE puede escribir únicamente el expediente `experiment/EXP-NNN/`, `state/pieces.json` y `docs/STATE.md`. EXECUTE puede escribir esos archivos y los artifacts reales de `runs/RUN-NNN/`. No modifica la investigación original, los workflows, la constitución, el estándar, otras piezas ni automatizaciones.

Antes de guardar estado, releer los documentos, comprobar IDs, rutas, versión, correspondencia entre protocolo y plan, y que cada afirmación de ejecución tenga evidencia. Validar `state/pieces.json` sin perder cambios ajenos. Registrar en `docs/STATE.md` qué se preparó o ejecutó realmente, qué no ocurrió y la decisión pendiente.

Detenerse después de PREPARE con la autorización o decisión necesaria. Detenerse después de EXECUTE con el estado real, resultados o bloqueo y una única decisión pendiente. No continuar a RESEARCH, PRODUCTION, ensayo, grabación, publicación, derivados ni automatizaciones.
