# Workflow POSTPRODUCTION

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** contrato reutilizable disponible; runtime audiovisual opcional no incluido. Los adaptadores públicos tienen pruebas sintéticas, pero este core no puede ingerir, transcribir ni renderizar medios por sí solo.

## A. Propósito, autoridad y activación

Transformar grabaciones autorizadas de un OUTPUT audiovisual en un vídeo editado, recuperable y verificable sin redefinir su CONTENT. Las piezas legacy pueden seguir identificándose solo por `CONTENT-NNN`.

La [constitución](../channel/CONSTITUTION.md), el paquete editorial vigente y [`AV-STANDARD.md`](../channel/AV-STANDARD.md) conservan la autoridad editorial y operacional. PRODUCTION decide qué debe grabarse y cómo explicarlo; RECORDING es una acción humana; este workflow gobierna cómo transformar lo realmente grabado y decide gates, versiones y escrituras. [`tools/av/`](../tools/av/README.md) aporta el soporte público local; cualquier motor de render o transcripción se instala y revisa como módulo opcional separado y no se convierte en autoridad editorial.

Lo activan órdenes inequívocas como:

- «Edita CONTENT-NNN con estas grabaciones».
- «Edita OUTPUT-NNN con estas grabaciones».
- «Prepara el montaje de CONTENT-NNN».
- «Prepara el rough cut de CONTENT-NNN».
- «Aplica el tratamiento visual al rough cut de CONTENT-NNN».
- «Haz la pasada visual de EDIT-NNN».
- «Finaliza la edición de CONTENT-NNN».
- «Aplica los cambios que te he marcado en el montaje».

Preguntar cómo editar, cómo funciona POSTPRODUCTION o qué estado tiene un montaje es consulta y no procesa medios. «Publica el vídeo» no activa este workflow. Un reel aislado sin `CONTENT-NNN` puede seguir siendo un piloto privado de `tools/av/`; no obliga a crear una pieza editorial ni a registrarla en `state/pieces.json`.

## B. Identidad de edición y version freeze

Cada ejecución de edición usa un `EDIT-NNN` único dentro de su espacio editorial; un OUTPUT puede tener varios EDIT IDs sin perder su relación con un único `CONTENT-NNN`. Para un registro legacy, la relación directa con CONTENT permanece válida. Antes de copiar o transformar medios, congelar en el registro seguro y en el manifest privado:

- `CONTENT ID` y `EDIT ID`;
- `OUTPUT ID` cuando exista;
- `EDITORIAL VERSION` y `EDITORIAL HASH` del paquete entregado;
- `SCRIPT VERSION` y hash;
- `SCREEN PLAN VERSION` y hash, cuando exista;
- referencias a `SOURCE RESEARCH / EVIDENCE`;
- `PRIMARY FORMAT` y mecánica secundaria;
- `FORMAT-SPECIFIC PROMISE`;
- claims requeridos, claims excluidos y límites esenciales;
- alcance autorizado, modos, servicios, presupuesto y condiciones de parada.

El hash técnico completo puede permanecer solo en el manifest privado cuando revele material sensible; el registro seguro conserva una versión pública o saneada suficiente para identificar el freeze. Si cambia sustancialmente guion, promesa, límite o plan de pantalla, detenerse y decidir si la grabación sigue siendo válida. No trasladar aprobaciones de una versión anterior.

## C. Arquitectura de medios privados

La ejecución real vive fuera del repositorio. Un runtime opcional compatible debe resolver `EDIT-NNN` mediante configuración local ignorada, fijar una raíz privada y permitir excepciones por edición sin introducir una base de datos ni guardar rutas absolutas en archivos versionados. Los nombres concretos de configuración y lanzador pertenecen a ese módulo y no se presuponen en el core público.

La estructura existente de `tools/av/` es válida cuando contiene equivalentes de:

```text
EDIT-NNN/
  source/
  transcripts/
  edit/
  project/
  renders/
  verification/
  MANIFEST.json
```

No reorganizar un proyecto válido solo para ajustarlo a este ejemplo. Antes de copiar medios, comprobar ubicación, acceso ordinario, política de backup y estado conocido de sincronización. `gitignore` no acredita privacidad. Si no existe una ubicación aprobada o el comportamiento de sincronización importa y sigue sin resolverse, detenerse y pedir esa decisión.

Los originales no se sobrescriben. Rutas privadas, hashes sensibles, metadata de dispositivo, transcripciones crudas y nombres de archivo privados permanecen en el manifest privado y no se imprimen ni trasladan al expediente seguro sin necesidad.

## D. Registro seguro en content-os

Una ejecución futura asociada a una pieza crea `postproduction/EDIT-NNN.md` dentro de su directorio editorial propio. No se crea en PREPARE si todavía no existe una edición identificable.

El registro contiene únicamente:

- `CONTENT` y `EDIT ID`;
- versión editorial congelada;
- modo y estado;
- formato;
- disponibilidad de medios;
- estado de rough cut, edición visual y final;
- aprobaciones, con versión y alcance;
- estado de verificación y modalidades realizadas;
- referencias a artifacts seguros para el repositorio;
- decisión humana pendiente.

No contiene GPS, secretos, transcript privado crudo por defecto, ruta privada absoluta, nombres privados innecesarios ni metadata de dispositivo. `state/pieces.json` puede enlazar este archivo como artifact cuando exista; no enlaza el manifest privado ni crea una segunda lista de piezas.

Usar Markdown con frontmatter YAML para que personas y herramientas puedan leer el mismo archivo. Esta es la forma mínima; los valores admitidos se mantienen cerrados y no se rellenan con datos privados:

```yaml
---
schema_version: content-os.postproduction.safe-record.v1
edit_id: EDIT-NNN
content_id: CONTENT-NNN
editorial_version: "v1"
format: "WALKTHROUGH / SETUP TOUR"
mode: prepare
status: postproduction_prepared
media: available
rough_cut: not_started
visual: not_started
final: not_started
verification: not_started
approvals:
  rough: pending
  visual: pending
  final: pending
  publication: pending
public_safe_artifacts: []
pending_human_decision: "Revisar el rough cut"
---
```

`mode` usa `prepare`, `rough_cut`, `visual_edit` o `finalize`. `media` usa `available`, `missing` o `partial`; `rough_cut`, `visual` y `final` usan `not_started`, `ready_for_review` o `approved`; `verification` usa `not_started`, `partial`, `pass` o `fail`; las aprobaciones usan `pending` o `approved`. El cuerpo puede explicar versiones, alcance y límites sin repetir datos privados.

Un dashboard futuro puede proyectar en solo lectura `CONTENT`, `EDIT ID`, estado, aprobaciones, verificación y decisión pendiente combinando `state/pieces.json` con este registro. No lee la configuración privada, no resuelve rutas reales, no escribe estados y no se convierte en fuente de verdad.

## E. Health gate de `tools/av/`

Antes de procesar medios reales:

1. comprobar que el soporte público `tools/av/` existe y declarar `NOT_INSTALLED` si el runtime opcional, FFmpeg o las herramientas requeridas no están disponibles;
2. cuando exista runtime, comprobar su versión fijada, sus notices y el lanzador protegido con controles para las operaciones que realmente exponga, como `doctor`, `lint`, `validate`, `check`, `preview` y `render`;
3. comprobar los tests esenciales aplicables o reutilizar un health check reciente cuyos hashes, versiones y entorno sigan vigentes;
4. resolver la raíz privada y comprobar que está fuera del repositorio;
5. confirmar que la ubicación está aprobada para copiar medios.

No repetir Fase A en cada vídeo. Si un check válido coincide con las entradas relevantes, registrarlo y reutilizarlo. No invocar el CLI de HyperFrames directamente. Si falta el guard, el control de telemetría/updates exigido, el binario fijado o la raíz privada, detenerse antes de iniciar el comando. El health gate no afirma aislamiento absoluto: declara controles y límites observables.

## F. Modos

### F.1 PREPARE

Identificar `CONTENT-NNN`, asignar `EDIT-NNN`, congelar versión editorial, inventariar medios por identidad y hash, comprobar privacidad y permisos, resolver transcripción o ASR, ejecutar el health gate sin medios y preparar el proyecto privado. Registrar costes, servicios externos autorizados y condiciones de parada.

No transcribe, corta, compone ni renderiza. Si queda preparado, usa `status: postproduction_prepared`. Si faltan grabaciones, ubicación aprobada, permiso de copia o una herramienta esencial, termina con el dato mínimo requerido.

### F.2 ROUGH CUT

Trabajar sobre el transcript real y el material seleccionado. Conservar transcript fuente; proponer y aprobar cortes; producir EDL compuesto, linaje, transcript reajustado, rough MP4, decisiones y verificación.

Puede retirar preparativos, falsos arranques, retomas sustituidas, silencios sin función y errores claros. No elimina qualifiers, límites, ejemplos necesarios o causalidad sin revisión; no fabrica continuidad. Todo detector es ayuda y cada corte se contrasta con contexto, tiempos y palabras completas.

Se detiene en **ROUGH CUT REVIEW** cuando la selección, el orden o un corte ambiguo pueden alterar significado, voz o alcance. Sin esa ambigüedad, una orden multietapa explícita puede continuar a VISUAL EDIT.

### F.3 VISUAL EDIT

Requiere rough cut aprobado o autorización explícita equivalente que incluya esta fase y no encuentre decisiones sustantivas pendientes. Consume transcript del rough aprobado, beat sheet, plan de pantalla, contrato de formato, evidencia y footage real. Añade captions, apoyo visual, gráficos, material de pantalla y composición; renderiza y verifica el draft codificado.

Los tiempos visuales se reajustan a la línea temporal real. No se reutilizan estimaciones del guion como timestamps. Cada visual se clasifica como captura auténtica, reconstrucción documental o explicación gráfica. Aplicar [`AV-STANDARD.md`](../channel/AV-STANDARD.md); la estética del piloto no es plantilla canónica.

Se detiene en **VISUAL REVIEW** con MP4, transcript, proyecto, EDL/linaje, decisiones y `VERIFY` identificados.

### F.4 FINALIZE

Requiere feedback o aprobación que identifique el draft afectado. Aplica solo revisiones autorizadas, invalida los pasos dependientes y produce render candidato final, transcript final, EDL/linaje final, manifest final y verificación final. Conserva versiones anteriores y la procedencia de las decisiones.

Termina en **FINAL EDIT REVIEW**, con `status: final_edit_ready_for_review`. El archivo no se marca `FINAL` ni `final_edit_approved` hasta aprobación expresa de the configured human operator. No prepara publicación, sube ni publica.

## G. Autorización multietapa

Por defecto cada decisión humana detiene la operación. Una orden explícita como «Edita esta pieza completa localmente hasta dejar un borrador visual para revisar» puede autorizar `PREPARE → ROUGH CUT → VISUAL EDIT` sin prompts mecánicos intermedios solo si:

- material, raíz privada y permisos están resueltos;
- el scope identifica procesamiento, servicios y gasto permitidos;
- no aparece un corte ambiguo sustantivo;
- no se necesitan uploads, descargas, pagos, cuentas o decisiones nuevas de alcance;
- la grabación sostiene la promesa y los límites congelados.

Una autorización amplia de edición no autoriza publicación ni resuelve una contradicción editorial. Si aparece una decisión que puede cambiar significado, detenerse en ROUGH CUT REVIEW.

## H. Transcripción y reconciliación editorial

El workflow no fija ni incluye un proveedor universal. Una instancia puede reutilizar un transcriptor local ya disponible solo cuando el health gate confirme herramienta, versión, modelo, compatibilidad y autorización. En cualquier otro caso se resuelven herramienta, modelo, permiso y coste antes de procesar. Nunca se suben medios silenciosamente, se descargan modelos fuera de alcance ni se presenta ASR como transcript humano perfecto.

Conservar por separado:

- salida original del ASR con método, versión y tiempos;
- normalización sin cambiar palabras o tiempos;
- correcciones manuales con texto anterior, texto corregido, motivo y autor;
- transcript reajustado de cada montaje, enlazado al vídeo exacto.

Comparar grabación con guion, promesa, evidencia y claims excluidos sin forzar el transcript hacia el guion. Clasificar cada divergencia relevante:

| Clase | Significado | Acción |
| --- | --- | --- |
| `NATURAL DELIVERY` | Misma idea expresada de otra forma. | Conservar si es fiel y clara. |
| `OMISSION` | Parte del guion no fue grabada. | Valorar si es esencial; no fabricar palabras. |
| `NEW CLAIM` | Afirmación nueva en la grabación. | Comprobar respaldo; conservar pendiente, cortar o regrabar. |
| `CONTRADICTION` | Lo grabado contradice evidencia o canon. | Detener y pedir decisión. |
| `RETAKE CANDIDATE` | La promesa o claridad exige nueva grabación. | Proponer retoma; no usar voz sintética ni montaje engañoso. |

La grabación manda sobre palabras y tiempos; content-os manda sobre lo que puede prometerse.

## I. Entradas y salidas

### Entrada mínima

- pieza registrada y versión editorial congelable;
- promesa, formato, claims y límites;
- guion y plan visual vigentes, si existen;
- grabaciones y demás materiales originales autorizados;
- procedencia y permisos de recursos;
- reglas o muestras aprobadas de voz y estilo;
- permisos de copia, procesamiento, servicios y presupuesto;
- condiciones de parada y modos autorizados.

### Salida mínima por draft

- MP4 codificado y SHA-256;
- transcript fuente y transcript correspondiente al draft;
- EDL y linaje hasta el original;
- composición/proyecto editable y recuperable;
- ledger de recursos y decisiones;
- manifest privado con entradas, versiones, parámetros, caché y salidas;
- `VERIFY` con modalidades, resultados y límites;
- estado de revisión humana y registro seguro actualizado.

Lint, decode o presencia de frames no convierten un draft en final. Los outputs destinados a publicación usan tiempos y contenido del montaje aprobado, no del guion estimado.

## J. Verificación

Aplicar las modalidades separadas de [`AV-STANDARD.md`](../channel/AV-STANDARD.md): automated check; frame/transition inspection; continuous playback; human listening; human editorial review. Revisar el archivo codificado, no solo la composición.

Según el alcance, verificar como mínimo identidad del original, decodificación, streams, duración, sincronía, correspondencia transcript/vídeo, palabras y sílabas en cortes, linaje, captions, legibilidad, transiciones, claims, visuales y conservación del significado. Registrar qué no pudo revisarse. No modificar tolerancias para obtener un PASS.

## K. Estado y aprobaciones

Cuando una pieza entra realmente en este workflow, `stage` puede pasar a `postproduction`. Estados mínimos:

- `awaiting_media`;
- `postproduction_prepared`;
- `rough_cut_ready_for_review`;
- `rough_cut_approved`;
- `visual_draft_ready_for_review`;
- `visual_draft_approved`;
- `final_edit_ready_for_review`;
- `final_edit_approved`.

Usar solo el estado que describa evidencia real. `recording` y `publication` permanecen aprobaciones separadas en el registro actual. Rough cut, visual draft y final edit se registran por versión en `postproduction/EDIT-NNN.md`; no se añaden booleanos ambiguos a todas las piezas. Aprobación de rough no aprueba visuales; aprobación visual no aprueba final; aprobación final no autoriza publicación.

## L. Recuperación, caché e invalidación

El manifest privado es el estado técnico del montaje; `state/pieces.json` sigue siendo la fuente del estado editorial y del OUTPUT. Un paso puede reutilizarse solo si coinciden herramienta y versión, parámetros canónicos, hashes ordenados de entrada, outputs y verificación, y no existe invalidación editorial o técnica.

- Cambio de grabación invalida transcript, cortes, composición temporal, renders y QA dependientes.
- Cambio de cortes conserva transcript fuente e invalida transcript final, captions, composición, render y QA afectados.
- Cambio visual conserva transcript/EDL y vuelve a ejecutar composición, render y QA visual dependientes.
- Cambio sustancial de guion o límite conserva originales, pero exige nueva reconciliación y puede invalidar la grabación.
- Cambio solo de packaging no repite postproducción.

Reanudar ejecuta únicamente lo pendiente o invalidado. No repetir ASR, cortes o renders válidos con entradas idénticas; conservar intentos fallidos e incidentes en lugar de reescribir la historia.

## M. Condiciones de parada

Detenerse ante material esencial ausente o distinto; raíz privada no aprobada; transcript insuficiente; contradicción de promesa o evidencia; corte sustantivo ambiguo; claim nuevo no respaldado; demo inexistente; recurso sin procedencia; necesidad de descarga, upload, cuenta, gasto o servicio no autorizado; fallo del lanzador protegido; cambio sustancial de alcance o estilo; verificación que impida saber qué se produjo; o cualquier acción de publicación.

La respuesta de parada identifica `NEEDED`, `WHY`, `MINIMUM` y una alternativa honesta cuando exista. No cambia de herramienta o proveedor silenciosamente.

## N. Escrituras y cierre

Una ejecución asociada a pieza puede escribir solo el proyecto privado autorizado, `postproduction/EDIT-NNN.md`, los enlaces de artifact y evidencia necesarios en `state/pieces.json`, y el historial real en `docs/STATE.md`. No modifica brief, guion, investigación, estándares o recursos editoriales para hacerlos coincidir artificialmente con la grabación. Un cambio editorial se propone y se enruta a la operación correspondiente.

La respuesta entrega modo y versión; MP4 y hash cuando exista; duraciones; transcriptor y carácter local/externo; cortes y ambigüedades; visuales y procedencia; verificaciones por modalidad; claims o límites pendientes; ubicaciones privadas comunicadas solo cuando sea necesario y seguro; registro seguro; y una única decisión siguiente. Se detiene tras el gate autorizado y nunca publica.
