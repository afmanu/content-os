# Workflow OUTPUT

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. Una propuesta de canales no crea outputs y un artifact no acredita publicación.

## A. Propósito y modelo

OUTPUT convierte un `CONTENT-NNN` existente en una expresión concreta para un canal registrado, preservando intención, evidencia, límites y procedencia.

```text
CONTENT = núcleo editorial independiente del canal
OUTPUT  = expresión publicable concreta de ese núcleo
```

Un CONTENT puede tener cero, uno o varios OUTPUTS. No se crea un OUTPUT para completar el registro ni se presupone distribución omnicanal.

El núcleo se reconstruye desde la entrada de `pieces` y sus artifacts canónicos, sin duplicarlos en cada output. Cuando existen, comprende source/intent, subject, tesis, audiencia/problema, evidencia e investigación, Creator Advantage, claims y límites, y BUILD/EXPERIMENT relacionados. La ausencia histórica de un campo estructurado no autoriza a inventarlo ni exige migración.

## B. Activación y routing

Lo activa una petición explícita como «Haz un LinkedIn de CONTENT-NNN» o «Haz un vídeo de YouTube con CONTENT-NNN». Una petición que solo pregunta qué canales serían posibles permite proponer opciones y se detiene sin crear ninguna. «Haz LinkedIn y X» autoriza exactamente esos dos outputs, no otros.

Si no existe un `CONTENT-NNN`, el material es primero una comisión de [`IDEA`](IDEA.md). Establecer el núcleo editorial no autoriza por sí solo a crear outputs. Una petición de transformar un `OUTPUT-NNN` existente activa [`REPURPOSE`](REPURPOSE.md), no OUTPUT directo.

Resolver `channel` mediante [`channel/INDEX.md`](../channel/INDEX.md):

- `youtube` enruta al motor audiovisual existente mediante [`PRODUCTION`](PRODUCTION.md);
- `linkedin` usa [`channel/LINKEDIN.md`](../channel/LINKEDIN.md) y producción textual ligera;
- `x` usa [`channel/X.md`](../channel/X.md) y producción textual ligera.

Un canal no registrado produce `STOP / NO OUTPUT`. No se crea un perfil durante la operación.

Antes de crear cualquier artifact, leer `INSTANCE_ROOT/channel/ACTIVE-CHANNELS.json`. Un canal registrado pero ausente de `active_channels` produce `STOP / INACTIVE CHANNEL`; no se trata como activo, no se crea el OUTPUT y no se modifica el perfil. Se puede proponer activarlo mediante ONBOARD REFRESH, pero esa activación exige una decisión explícita del usuario y una operación separada.

Desactivar un canal no borra ni invalida los OUTPUTS históricos de ese canal; impide crear otros nuevos mientras siga inactivo.

## C. Flujo mínimo

```text
CONTENT
  ↓
OUTPUT INTENT
  ↓
CHANNEL
  ↓
ANGLE
  ↓
FORMAT
  ↓
PROMISE
  ↓
EVIDENCE CHECK
  ↓
CHANNEL ROUTE
  ↓
OUTPUT ARTIFACT
  ↓
REVIEW / PUBLISH cuando corresponda
```

1. Recuperar el CONTENT, Source Intent, tesis, público/problema, Creator Advantage, evidencia, claims, límites y trabajo relacionado.
2. Confirmar el canal solicitado y que está activo, o proponer opciones sin crearlas.
3. Fijar un ángulo que no cambie silenciosamente el núcleo editorial.
4. Elegir un formato admitido por el canal.
5. Formular una promesa proporcional.
6. Identificar `EVIDENCE USED` con referencias existentes y comprobar que sostiene la promesa. OUTPUT no ejecuta RESEARCH, BUILD o EXPERIMENT para completar una carencia.
7. Asignar el siguiente `OUTPUT-NNN` posterior al mayor registrado, sin reutilizar IDs.
8. Crear el artifact y registrar el output de forma conjunta.
9. Para YouTube, continuar por PRODUCTION solo cuando la orden autorice producir ese output; nunca autoriza grabación, montaje o publicación.

## D. Contrato de estado

`state/pieces.json` conserva un array raíz opcional `outputs`. Su ausencia equivale a `[]` para registros legacy. Cada output nuevo contiene:

```json
{
  "output_id": "OUTPUT-NNN",
  "content_id": "CONTENT-NNN",
  "channel": "linkedin",
  "origin": "DIRECT",
  "angle": "Ángulo concreto",
  "format": "post",
  "promise": "Promesa proporcionada",
  "status": "draft",
  "artifact": "outputs/OUTPUT-NNN/OUTPUT.md",
  "review_status": "not_reviewed"
}
```

- `output_id`: `OUTPUT-NNN` globalmente único; el siguiente entero posterior al mayor existente.
- `content_id`: CONTENT existente que conserva el núcleo editorial.
- `channel`: slug registrado.
- `origin`: `DIRECT` para `CONTENT → OUTPUT`; `REPURPOSED` para `OUTPUT → OUTPUT`.
- `source_output_id`: obligatorio solo con `REPURPOSED`; referencia un OUTPUT existente del mismo CONTENT.
- `angle`, `promise`: texto no vacío y fiel al CONTENT.
- `format`: valor admitido para el canal en el registro.
- `status`: `in_progress`, `draft`, `ready_for_review`, `approved`, `published`, `reviewed` o `blocked`.
- `artifact`: ruta relativa existente al artifact canónico del output.
- `review_status`: opcional; si aparece usa `not_reviewed`, `pending` o `reviewed`.

`published` exige evidencia real de publicación; `reviewed` exige una revisión identificable. Ningún status concede autorización para publicar.

## E. Artifact

El mecanismo común es `outputs/OUTPUT-NNN/OUTPUT.md`. No es un segundo registro: contiene la entrega y `state/pieces.json` conserva su estado operacional.

El artifact contiene al menos:

```text
OUTPUT ID
CONTENT ID
CHANNEL
ORIGIN
SOURCE OUTPUT ID, cuando corresponda
ANGLE
FORMAT
PROMISE
EVIDENCE USED
FINAL COPY / DRAFT
STATUS
```

Para LinkedIn y X, `FINAL COPY / DRAFT` contiene el copy completo o un bloqueo explícito, separado de notas internas. Para YouTube, el artifact declara el output, el routing y las referencias al paquete creado por PRODUCTION; no duplica brief, guion o lectura.

## F. YouTube output engine y compatibilidad

El motor actual de YouTube está compuesto por `YOUTUBE-FORMATS`, `YOUTUBE-NARRATIVE`, PRODUCTION, grabación humana, `VIDEO-STANDARD`, POSTPRODUCTION, `AV-STANDARD` y PUBLICATION-PACKAGE. OUTPUT no replica esas funciones.

Los `CONTENT` legacy con `type: youtube_video` pueden seguir entrando directamente en PRODUCTION y operaciones posteriores sin backfill. Cuando una pieza histórica vuelva a trabajarse puede adquirir un OUTPUT mediante una orden explícita; no se inventa uno retrospectivo.

## G. Evidencia, publicación y revisión

El artifact enumera solo evidencia realmente usada. La falta de una evidencia esencial termina con `blocked` o sin creación, según exista ya una entrega recuperable; no estrecha ni cambia el CONTENT por defecto.

OUTPUT no publica. Una publicación requiere autorización separada. [`REVIEW`](REVIEW.md) puede revisar un OUTPUT concreto; una observación específica de canal permanece en esa revisión. Solo un problema generalizable, evidencia suficiente y LEVEL-UP aprobado pueden promoverla al Learning Ledger o al canon.

## H. Escrituras y parada

OUTPUT puede crear únicamente los artifacts expresamente solicitados, actualizar el array `outputs` de `state/pieces.json` y registrar la ejecución real en `docs/STATE.md`. Para YouTube, las escrituras adicionales pertenecen al scope explícito de PRODUCTION. No modifica silenciosamente el CONTENT, no crea canales, no ejecuta otras operaciones para fabricar evidencia y no publica.

La respuesta entrega OUTPUT ID, CONTENT ID, canal, origen, ángulo, formato, promesa, evidencia, artifact, status, bloqueos y una única decisión siguiente. Se detiene en el gate aplicable.
