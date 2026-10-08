# Workflow REPURPOSE

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. Un output derivado no acredita publicación ni montaje.

## A. Propósito y activación

REPURPOSE crea un OUTPUT nuevo a partir de un OUTPUT existente:

```text
OUTPUT-A → OUTPUT-B
```

El nuevo output conserva el mismo `content_id`, registra `origin: REPURPOSED` y referencia `source_output_id`. No se llama REPURPOSE a un output directo de LinkedIn o X creado desde CONTENT.

Lo activa una petición explícita como «Convierte OUTPUT-NNN en un post de LinkedIn» o «Convierte OUTPUT-NNN en una pieza vertical». Una consulta recupera lo existente sin reescribir. Una petición basada solo en `CONTENT-NNN` y sin output fuente corresponde a [`OUTPUT`](OUTPUT.md) con `origin: DIRECT`.

REPURPOSE no publica, programa, conecta cuentas, compra servicios, genera media, reescribe el CONTENT, investiga, ejecuta builds o experimentos ni crea canales. Una petición para un canal no registrado se detiene antes de crear el output.

## B. Recuperación y lineage

Recuperar del registro:

- OUTPUT fuente, artifact y versión efectiva;
- CONTENT común, Source Intent, tesis, evidencia, claims y límites;
- canal, ángulo, formato, promesa y estado del source;
- revisiones pertinentes y decisiones expresas de the configured human operator.

La existencia del source no demuestra que esté publicado, aprobado o vigente. Identificar la base real: draft textual, publicación, guion, montaje o vídeo final. Un guion no es vídeo; una propuesta de corte no es un archivo exportado.

La derivación preserva evidence lineage: toda afirmación del destino debe enlazar evidencia del CONTENT o material comprobable del source. La compresión no autoriza perder condiciones esenciales ni ampliar conclusiones.

## C. Selección y creación

1. Confirmar el OUTPUT fuente y el destino solicitado.
2. Resolver el channel y formatos mediante [`channel/INDEX.md`](../channel/INDEX.md).
3. Fijar el valor específico que aporta el nuevo output; no basta anunciar, resumir o recortar por rutina.
4. Comprobar que ángulo, promesa y formato sostienen el significado con la evidencia disponible.
5. Si un recorte audiovisual depende de tiempos, exigir material final identificable, versión y referencias temporales fiables.
6. Asignar el siguiente `OUTPUT-NNN` global y crear su artifact según [`OUTPUT`](OUTPUT.md).
7. Registrar `origin: REPURPOSED`, `source_output_id` y el mismo `content_id`.

Una petición puede crear solo los destinos nombrados expresamente. No existe paquete predeterminado X + LinkedIn ni distribución omnicanal.

## D. Copy y media

Para LinkedIn y X, seguir el perfil de canal y separar copy completo de notas internas. El copy no contiene IDs internos, rutas locales, enlaces ficticios, instrucciones de producción o disponibilidad no verificada.

Para un output audiovisual corto, distinguir:

- nueva grabación: guion hablado completo y notas de pantalla;
- recorte: source, versión, inicio y fin reales, significado conservado e instrucciones de edición;
- vídeo exportado: solo existe si una operación audiovisual autorizada lo ha creado y verificado.

El registro actual no incluye Instagram/Reels. «Reel» no identifica un channel registrado y no se representa mediante `youtube` ni mediante otro channel sustituto. La operación se detiene hasta que the configured human operator seleccione un canal y un formato registrados que describan realmente el output o autorice añadir el destino.

## E. Artifact, estado y compatibilidad

Cada output nuevo usa `outputs/OUTPUT-NNN/OUTPUT.md` y el contrato de estado de OUTPUT. Una revisión con las mismas entradas actualiza la versión del mismo artifact; un destino nuevo recibe otro OUTPUT ID. Una publicación no se sobrescribe silenciosamente.

Los `repurpose/DERIVATIVES.md` históricos y sus IDs locales permanecen válidos como evidencia legacy. No se migran ni se convierten en OUTPUTS ficticios. Nuevas derivaciones usan el modelo first-class.

La creación del derivado no cambia por defecto `stage`, `status`, `next_action`, bloqueos o aprobaciones del CONTENT. Su estado pertenece al OUTPUT. Ninguna aprobación del source se hereda.

## F. Escrituras y parada

REPURPOSE puede escribir únicamente los artifacts de los outputs solicitados, el array `outputs` de [`state/pieces.json`](../state/pieces.json) y el historial real en [`docs/STATE.md`](../docs/STATE.md). No modifica el source, el CONTENT, sus evidencias o sus aprobaciones.

La respuesta incluye source OUTPUT, nuevos OUTPUT IDs, CONTENT común, canal, formato, promesa, evidencia, copy o instrucciones completas, artifacts, estado, límites y una única decisión siguiente. Se detiene sin publicar ni ejecutar otra operación.
