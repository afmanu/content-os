# Workflow RADAR

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado, sin ejecución nueva en esta iteración. Solo una orden explícita de ejecutar una ronda lo activa; las preguntas sobre su funcionamiento o sobre candidatas existentes son consultas de estado.

## A. Propósito

Encontrar señales relevantes para el público del canal y convertir solo las que alcanzan calidad editorial suficiente en candidatas comparables, sin iniciar automáticamente otra operación.

## B. Autoridad

Antes de ejecutar una ronda, leer y respetar:

1. [`channel/CONSTITUTION.md`](../channel/CONSTITUTION.md).
2. [`channel/EDITORIAL-QUALITY.md`](../channel/EDITORIAL-QUALITY.md).
3. [`radar/WATCHLIST.md`](../radar/WATCHLIST.md).
4. [`radar/SOURCES.md`](../radar/SOURCES.md).
5. [`state/pieces.json`](../state/pieces.json).
6. Las rondas anteriores relevantes bajo `radar/`.
7. [`docs/STATE.md`](../docs/STATE.md) solo cuando haga falta contexto histórico.

La constitución prevalece en decisiones editoriales. El registro determina el estado operativo vigente. Las rondas y el historial aportan evidencia y antecedentes, no autorizaciones nuevas.

## C. Entradas

La orden puede incluir opcionalmente:

- foco temático;
- ventana temporal;
- límite de candidatas.

Valores por defecto:

- ventana reciente inicial de 14 días;
- ampliación hasta 30 días cuando la cobertura resulte insuficiente, dejando constancia de la ventana real;
- hasta 3 candidatas finales.

Son valores operativos iniciales, no cuotas: puede haber menos de tres candidatas o ninguna. Diez señales pueden producir dos candidatas y cinco señales pueden producir cero. Una instrucción explícita puede acotar el máximo, pero no obliga a llenarlo.

## D. Fuentes

`WATCHLIST.md` determina qué entradas están seleccionadas y la función de cada una. La selección permite considerarlas en rondas futuras, pero no obliga a recorrer todas sus páginas ni certifica acceso útil. `SOURCES.md` conserva materiales efectivamente consultados y las rondas registran el uso concreto y sus resultados.

Antes de consultar, definir un alcance manejable según el foco, las fuentes disponibles y la cobertura de rondas anteriores. Cuando estén disponibles y sean pertinentes, revisar más de un tipo de entrada:

- tecnología aplicable;
- referencia editorial;
- preguntas de personas;
- trabajo propio documentado.

No es obligatorio cubrir las cuatro categorías ni fabricar señales para completar una cuota. La ronda debe registrar cuáles cubrió y cuáles no, con el motivo. Evitar por defecto que rondas sucesivas dependan únicamente del mismo proveedor.

Priorizar, según la pregunta de la ronda:

- fuentes primarias técnicas;
- documentación y anuncios oficiales;
- repositorios y changelogs públicos;
- referencias editoriales públicas cuando aporten una pregunta distinta;
- problemas internos ya documentados.

Para hechos técnicos, priorizar fuentes primarias. Las referencias de creadores pueden aportar señales editoriales, no certificar capacidades del producto. Cada observación conserva URL, fecha del anuncio o cambio —o ausencia de fecha visible—, fecha de consulta, evidencia concreta y límite de lo que sostiene. Mantener estas distinciones:

- anuncio ≠ capacidad probada;
- vídeo publicado ≠ demanda demostrada;
- documento vigente ≠ novedad reciente;
- visitas observadas hoy ≠ crecimiento histórico;
- acceso parcial a una fuente ≠ lectura completa.

Una fuente acredita únicamente lo que permite comprobar. No convertir afirmaciones comerciales, ejemplos del proveedor o señales sociales en resultados propios. No inventar transcripciones ni usar resúmenes anteriores del asistente como evidencia de una novedad. Si no hay acceso a fuentes actuales, informar de la cobertura limitada; no cambiar configuraciones ni instalar herramientas para remediarlo.

La ventana de 14 días, ampliable hasta 30, se aplica a novedades técnicas de W01–W05. W06–W08 se consultan cuando exista contenido editorial o una pregunta pública pertinente y accesible. Sus antecedentes duraderos pueden quedar fuera de la ventana si se identifican como tales, sin presentarlos como noticias recientes. Recuperar solo la cabecera de un canal o una página sin publicaciones legibles se registra como intento sin acceso útil, no como cobertura editorial sustantiva. No afirmar tendencias de un creador, rendimiento de formatos ni demanda de audiencia sin evidencia que lo sostenga.

Cuando W06 o W07 sean accesibles, utilizarlos para observar qué problemas convierten en contenido, qué resultado visible construyen, cómo relacionan explicación y acción y qué artifacts o demostraciones emplean. No copiar títulos, miniaturas, hooks, frases o personalidad; no generar variantes léxicas, asumir rendimiento ni afirmar demanda. Una pregunta semejante necesita aportación y ejecución propias de the configured human operator. Si el acceso es parcial, no inferir patrones concretos de vídeos no leídos.

W09–W10 son antecedentes internos, no fuentes semanales de novedades. Contrastar señales y candidatas con `state/pieces.json` y recuperar únicamente el material interno pertinente para reconocer temas ya trabajados, evidencia propia, solapamientos, continuidad y preguntas abiertas. No releer ambos expedientes completos por rutina ni presentar su mera existencia como una señal nueva. Si aparece material propio nuevo, identificar exactamente qué aporta y su procedencia.

La lista guía la búsqueda, pero no impide seguir una fuente pública pertinente encontrada durante la ronda. Esa fuente puede añadirse a `SOURCES.md` como evidencia realmente consultada; incorporarla a `WATCHLIST.md` exige una decisión explícita posterior. No modificar `WATCHLIST.md` durante una ejecución normal para ampliar silenciosamente la cobertura.

## E. Procedimiento

Ejecutar en este orden:

1. Resolver la fecha de corte, la zona horaria, el foco y la ventana inicial o explícita.
2. Revisar `WATCHLIST.md`, elegir un conjunto manejable y justificable entre las entradas seleccionadas según el foco, y anotar la cobertura prevista por función. La selección no obliga a consultar todas las entradas en cada ronda.
3. Revisar señales, rondas, investigaciones, revisiones pertinentes y piezas ya existentes sin recorrer todo el archivo histórico por rutina.
4. Consultar las fuentes públicas seleccionadas; ampliar hasta 30 días solo si la cobertura de novedades es insuficiente y explicar el cambio. Los antecedentes duraderos quedan fuera de esa ventana y se identifican como tales.
5. Registrar observaciones con URL, fecha del anuncio o cambio —o ausencia de fecha—, fecha de consulta, evidencia concreta, procedencia, método y límite; no atribuir lectura completa a un acceso parcial. Una pregunta de comunidad demuestra que alguien la formuló, no su frecuencia ni representatividad.
6. Separar en la ronda: fuentes consultadas con información utilizable; fuentes intentadas sin acceso útil; fuentes seleccionadas no consultadas y el motivo relevante; y antecedentes internos utilizados. No confundir la diversidad de la lista con la diversidad realmente observada. Añadir a `SOURCES.md` únicamente los materiales realmente utilizados.
7. Eliminar repeticiones y relacionar cada señal con piezas existentes cuando la continuidad sea clara.
8. Tratar cada hallazgo como **señal**: algo que puede originar contenido, pero todavía no una candidata. Para cada señal prometedora preguntar cuál es la pregunta humana detrás de la noticia, qué problema profesional existe, qué podría hacer o mostrar the configured human operator, qué aportaría respecto a la fuente, qué resultado podría producirse, qué ruta obtendría evidencia y por qué merece un CONTENT; el canal se decide después mediante OUTPUT.
9. Evaluar las señales con [`EDITORIAL-QUALITY.md`](../channel/EDITORIAL-QUALITY.md). La calidad editorial prevalece sobre la novedad por sí sola. Una señal reciente puede no avanzar y un problema evergreen o trabajo propio puede hacerlo; la edad no es un score universal.
10. Convertir en **candidata** únicamente una señal desarrollada que responda suficientemente las seis condiciones necesarias. Completar para cada una la candidate card común. Conservar, cuando evite repetir trabajo, señales relevantes que no superaron el gate y el motivo breve; no asignarles automáticamente `CONTENT-NNN`.
11. Comparar cualitativamente las candidate cards por utilidad, promesa, aportación, trabajo y resultado visibles, evidencia, dependencias, riesgo y oportunidad; recomendar una o explicar que ninguna merece avanzar. No recomendar por la importancia de la noticia.
12. Asignar los IDs de ronda y solo de las candidatas que superaron el gate; guardar primero la ronda con sus referencias, sin sobrescribir rondas terminadas.
13. Actualizar `state/pieces.json` con la ronda ya existente como evidencia y después registrar en `docs/STATE.md` la ejecución y sus límites.
14. Releer la ronda y el registro, comprobar su correspondencia y detenerse antes de otra operación.

No ejecutar el workflow `research`, iniciar un laboratorio, preparar un guion ni producir una publicación.

## F. Deduplicación

Antes de crear una pieza, comprobar como mínimo:

- URL y evento, para no contar dos páginas del mismo cambio como novedades independientes;
- pregunta editorial y alcance, no solo herramienta o empresa;
- `origins` de `state/pieces.json`;
- rondas, investigaciones y expedientes previos.

Una señal repetida puede aportar nueva evidencia o una oportunidad temporal. En ese caso, añadir o actualizar la procedencia de la pieza existente cuando la relación sea clara y modificar únicamente los campos cuyo estado real haya cambiado.

No crear un nuevo `CONTENT-NNN` solo porque reaparezca la misma tecnología, empresa o noticia. Si la relación entre dos piezas no es clara, registrar la duda y la acción de aclaración: no fusionar, eliminar, descartar ni retroceder estados silenciosamente. Una similitud temática tampoco demuestra identidad.

## G. Salida de ronda

Guardar la ronda como `radar/ROUND-NNN.md`, donde `NNN` es el siguiente número posterior al mayor existente. No sobrescribir una ronda terminada.

La ronda debe conservar:

- fecha de corte y zona horaria;
- ventana real utilizada;
- entradas de seguimiento seleccionadas para esa ronda y cobertura real: información utilizable, intentos sin acceso útil, entradas no consultadas con motivo y antecedentes internos utilizados;
- fuentes consultadas;
- señales y su evidencia;
- señales relevantes que no avanzaron y el motivo, cuando ayude a evitar una reevaluación repetida;
- límites y aspectos sin verificar;
- candidate cards completas de las candidatas;
- comparación cualitativa;
- recomendación pendiente de the configured human operator.

Cada candidata local debe indicar explícitamente su `CONTENT-NNN` en `state/pieces.json`. Una candidata que continúe una pieza existente utiliza el ID existente. Una señal que no supera el gate no se registra como pieza nueva. Si ninguna señal sostiene otra pieza, documentar la recomendación de no abrirla.

Si la ejecución se interrumpe después de crear la ronda y antes de actualizar el registro, conservarla como **parcial** y reanudar esa misma ronda; no crear una ronda duplicada. Esta versión tiene un único operador escritor: no requiere colas, bloqueos ni ejecución paralela.

## H. Actualización del registro

Para una candidata nueva:

- asignar el siguiente entero posterior al mayor `CONTENT-NNN` existente;
- establecer `type` como `content`; los registros legacy `youtube_video` no se migran;
- establecer `stage` como `candidate`;
- establecer `status` como `awaiting_selection`;
- expresar en `next_action` una única decisión concreta pendiente de the configured human operator;
- iniciar `approvals.recording` y `approvals.publication` en `false`;
- registrar la ronda y la candidata dentro de `origins`;
- consignar `editorial_question` y `working_title` cuando consten; usar `format: null` porque el formato se decide por OUTPUT;
- incluir únicamente artifacts que ya existan y la ruta de la ronda en `state_evidence`;
- registrar bloqueos y una sola acción siguiente verificables.

Estos campos operativos se apoyan en una candidate card completa guardada en la ronda. No crear la entrada si el material sigue siendo solo tema o señal que necesita desarrollo.

Para una pieza existente:

- no reemplazar automáticamente su `stage` por `candidate`;
- añadir la nueva procedencia solo si aporta continuidad real;
- actualizar únicamente los campos que hayan cambiado y estén respaldados por la ronda;
- conservar sus artifacts, aprobaciones y estado salvo un cambio documentado y autorizado.

La recomendación del radar no autoriza avanzar de `candidate` a `research`. Tampoco modifica aprobaciones de grabación o publicación.

## I. Archivos modificables

Por defecto, una ejecución de RADAR puede modificar únicamente:

- `radar/SOURCES.md`, solo si cambia realmente el inventario de fuentes;
- la nueva `radar/ROUND-NNN.md`;
- `state/pieces.json`;
- `docs/STATE.md`.

`radar/WATCHLIST.md` no es modificable durante una ejecución normal de RADAR. Su selección o ampliación requiere un encargo explícito de configuración separado.

No modificar la constitución, el estándar, los labs, los briefs, los guiones, las lecturas ni los recursos. Si la ronda requiere cambiar el sistema para poder continuar, detenerse y explicar el bloqueo. No modificar este workflow durante su propia ejecución ni alterar configuraciones para ampliar el acceso a fuentes.

## J. Condición de parada

El workflow termina cuando:

- la ronda está guardada;
- el registro está actualizado;
- ambos se han releído y sus referencias corresponden;
- existe una recomendación o consta que no hay evidencia suficiente;
- la siguiente investigación queda pendiente de decisión de the configured human operator.

No iniciar `research`, producción ni publicación.

## K. Respuesta a the configured human operator

La respuesta final debe ser breve y operativa e incluir:

- cobertura real;
- candidatas con su candidate card;
- señales relevantes no promovidas, cuando proceda;
- recomendación basada en calidad editorial;
- IDs de piezas nuevas o actualizadas;
- decisión que necesita de the configured human operator.

Las fuentes deben acompañar las afirmaciones que dependan de ellas.
