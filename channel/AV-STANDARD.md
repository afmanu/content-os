# Estándar audiovisual de content-os

> PRODUCT PATH RULE: this contract lives in `CORE_ROOT`. Any reference to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, or `postproduction/` is logical and resolves under the explicitly selected `INSTANCE_ROOT`. If no instance is configured, stop with `SETUP REQUIRED`.


Este documento fija los principios estables de postproducción. La [constitución](CONSTITUTION.md) conserva la autoridad editorial; [`YOUTUBE-FORMATS.md`](YOUTUBE-FORMATS.md), [`YOUTUBE-NARRATIVE.md`](YOUTUBE-NARRATIVE.md) y [`VIDEO-STANDARD.md`](VIDEO-STANDARD.md) definen la experiencia que se diseña antes de grabar. Este estándar gobierna cómo se transforma una grabación autorizada en un montaje verificable. No convierte la estética de un piloto en identidad del canal.

## Arquitectura y autoridad

- **content-os** es la autoridad editorial y operacional: decide encargo, promesa, formato, evidencia, claims, límites, voz, estado y aprobaciones.
- **POSTPRODUCTION** congela esas entradas, las reconcilia con lo grabado y mantiene los gates humanos.
- **`tools/av/` público** aporta contratos, adaptadores locales de transcript/tiempos/EDL y fixtures sintéticos.
- **El runtime audiovisual** de ingestión, transcripción, composición y render es un módulo opcional no incluido. HyperFrames y cualquier componente upstream, si se incorporan más adelante, requieren una revisión separada y nunca sustituyen la autoridad editorial.

La edición no reescribe silenciosamente el encargo ni sustituye evidencia ausente. Una decisión que cambie promesa, claim, límite o formato vuelve a decisión editorial.

## SOURCE PRESERVATION

- El original es inmutable. No se recodifica, recorta ni sobrescribe en su ubicación de origen.
- Antes de procesarlo se registra su identidad mediante un `asset_id`, tamaño, propiedades técnicas y SHA-256.
- Proxies, audio de análisis, rough cuts, composiciones y renders son derivados separados.
- Cada EDL conserva rangos y linaje desde la línea temporal derivada hasta el original.
- Los tiempos intermedios y finales se etiquetan por timeline; nunca se presentan como tiempos de la fuente original.
- Un cambio de hash en una entrada invalida lo derivado de ella. No se resuelve sustituyendo el archivo en el mismo nombre.
- La recuperación no exige hash binario idéntico de dos codificaciones salvo que esa reproducibilidad se haya definido y demostrado; sí exige equivalencia de contenido, duración, estructura y tiempos dentro de tolerancias fijadas.

## PRIVATE MEDIA

- Los medios privados, transcripciones crudas, manifests técnicos y proyectos editables viven fuera del repositorio.
- `gitignore` evita inclusión accidental en Git; no demuestra que una carpeta no se sincronice, replique o respalde mediante otro servicio.
- Antes de copiar medios se identifica la raíz privada, se comprueba que sea resolvible y se registra qué se sabe y qué no sobre a cloud-sync provider u otra sincronización y sobre backup.
- El repositorio solo conserva un registro seguro de postproducción y referencias públicas o saneadas.
- Los derivados eliminan metadata innecesaria cuando el formato y la trazabilidad lo permiten. GPS, identificadores de dispositivo, secretos, rutas privadas y nombres de archivo innecesarios no se trasladan.
- Logs, errores y respuestas no imprimen transcript privado, credenciales, rutas absolutas o metadata sensible salvo que sean imprescindibles para una operación local autorizada; nunca se copian al registro seguro.
- No se guardan medios privados en fixtures, vendor, ejemplos o directorios destinados a distribución.

## LOCAL-FIRST

- Se utiliza procesamiento local cuando existe una ruta configurada, compatible y autorizada.
- Toda subida, cuenta, API o servicio externo requiere autorización específica que identifique proveedor, finalidad, datos, coste y alcance.
- Una instalación, modelo o descarga nueva se expone antes de ejecutarse cuando no esté incluida en el alcance ya autorizado. La existencia de un proveedor alternativo no amplía el permiso.
- La ausencia de una herramienta local no autoriza cambiar silenciosamente de proveedor.
- Si una instalación privada incorpora HyperFrames u otro runtime, se invoca únicamente mediante un lanzador protegido validado para esa instalación. El core público no incluye ese lanzador; si falta la protección requerida, la operación se detiene antes del proceso.
- Desactivar telemetría no equivale por sí solo a impedir toda conexión. Las comprobaciones declaran sus controles y límites reales.

## RECORDING IS THE TEMPORAL AUTHORITY

Después de grabar, la temporalidad real procede de la grabación y de la transcripción correspondiente a esa grabación. El guion, beat sheet y plan de pantalla ayudan a verificar:

- intención y promesa;
- evidencia y proof;
- claims permitidos y excluidos;
- límites que deben permanecer;
- función de voz y pantalla.

No autorizan fabricar palabras que the configured human operator no dijo, alinear el transcript al texto esperado ni usar tiempos estimados del guion como tiempos del montaje. Captions, gráficos, capítulos y publicación se reajustan sobre la versión codificada a la que pertenecen.

## MEANING PRESERVATION

No se eliminan solo para mejorar ritmo:

- qualifiers o condiciones esenciales;
- límites que cambian la interpretación;
- ejemplos necesarios para sostener una conclusión;
- conexiones causales o contradicciones relevantes;
- evidencia requerida por la promesa.

Retomas, errores, pausas y repeticiones se juzgan en contexto. Un detector propone candidatos; no decide significado. No se corta una palabra o sílaba, no se combina material para fingir continuidad inexistente y no se transforma una reconstrucción en demostración real. Todo corte ambiguo con efecto sustantivo se conserva o se detiene para revisión humana.

## VOICE

No se acelera a the configured human operator ni se le convierte en el estilo de otro creador por defecto. Se conservan respiración, énfasis, ritmo natural y expresividad cuando cumplen una función. La limpieza puede retirar preparativos, falsos arranques, errores claros, retomas sustituidas y pausas sin función, pero no aplica una densidad o velocidad universal.

Cualquier compresión agresiva, cambio de tempo o alteración de voz requiere una decisión editorial explícita y verificación auditiva humana.

## CAPTIONS

- Se derivan del transcript real de la versión montada.
- Conservan las palabras pronunciadas; una corrección ortográfica no inventa conceptos ni cambia el sentido.
- Las correcciones manuales se separan del ASR original y registran motivo.
- Se agrupan por unidades de sentido y ritmo de lectura, no solo por longitud uniforme.
- Evitan truncar palabras, tapar información o competir con rostro, evidencia y apoyo visual.
- Cada exportación identifica el hash o versión exacta del vídeo al que corresponde.

## VISUAL SUPPORT

El apoyo visual debe aclarar, demostrar, relacionar, comparar o transformar información. Si no cumple una de esas funciones, no se añade. La decoración no sustituye explicación ni prueba.

Cada material relevante se clasifica como:

- **AUTHENTIC CAPTURE:** captura auténtica de una interfaz, ejecución o resultado identificado.
- **DOCUMENTARY RECONSTRUCTION:** reconstrucción explícitamente rotulada a partir de evidencia disponible.
- **EXPLANATORY GRAPHIC:** explicación visual que organiza o relaciona conceptos sin presentarse como captura real.

No se inventan interfaces, outputs, conversaciones, capturas, métricas o resultados. Un gráfico de un handoff no demuestra que el handoff se haya ejecutado. La pantalla puede aportar información nueva, pero su claim debe estar respaldado y su procedencia registrada.

## VISUAL IDENTITY

`STATUS: PROVISIONAL`

Ninguna estética de piloto se convierte por sí sola en canon. Número de tarjetas, animaciones, tipografía, layout, paleta y densidad gráfica permanecen provisionales hasta una decisión canónica expresa.

## VERIFICATION

Toda entrega declara por separado las modalidades realmente realizadas:

- **AUTOMATED CHECK:** hashes, probe, streams, decodificación, duración, A/V sync, linaje, validadores y otras mediciones reproducibles.
- **FRAME / TRANSITION INSPECTION:** fotogramas codificados, transiciones o tiras inspeccionadas visualmente.
- **CONTINUOUS PLAYBACK:** reproducción continua del archivo codificado a velocidad normal.
- **HUMAN LISTENING:** escucha humana real de audio, cortes, respiración y naturalidad.
- **HUMAN EDITORIAL REVIEW:** revisión de significado, promesa, evidencia, claridad y adecuación a la voz.

Una modalidad no sustituye a otra. Waveforms y métricas no son escucha; un lint correcto no es reproducción; una captura no es revisión completa. `VERIFY` registra PASS, FAIL o pendiente por modalidad y conserva tolerancias sin cambiarlas para obtener un PASS.

## APPROVALS

Se registran por versión y alcance:

- **rough cut approval:** acepta selección, orden y cortes base;
- **visual draft approval:** acepta funcionalmente captions, apoyo visual y composición de ese borrador;
- **final edit approval:** acepta una versión final identificada para pasar al paquete de publicación;
- **publication approval:** autoriza publicar una versión y sigue siendo una decisión separada.

Una aprobación no implica la siguiente ni se hereda a una nueva versión por inferencia. Feedback parcial se registra como tal. La existencia de un MP4 o una verificación técnica nunca concede aprobación humana.

## Salida mínima verificable

Cada draft que se entregue para revisión mantiene, en el proyecto privado:

- MP4 codificado e identificado por hash;
- transcript correspondiente y transcript fuente conservado;
- EDL y linaje hasta el original;
- composición o proyecto editable;
- decisiones de edición y materiales utilizados;
- manifest de entradas, versiones, parámetros y salidas;
- `VERIFY` con modalidades y límites;
- estado de revisión humana.

El registro seguro del repositorio enlaza la identidad `EDIT-NNN`, no las rutas privadas. Los tiempos finales, captions, capítulos y handoffs posteriores se derivan de la versión montada y de su transcript.
