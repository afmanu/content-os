# Workflow REVIEW

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. No acredita que se haya publicado o revisado ningún OUTPUT o CONTENT.

## A. Propósito y activación

REVIEW convierte evidencia de recepción y notas de producción en aprendizaje editorial y operativo. Puede aplicarse a:

- un `OUTPUT-NNN` concreto: observa esa expresión, versión y canal;
- un `CONTENT-NNN`: agrega outputs identificados sin borrar sus diferencias.

Lo activa una orden explícita de revisar resultados con datos o notas aportados o señalados por the configured human operator. Una consulta recupera revisiones existentes y no importa datos. La orden no autoriza conectar cuentas, usar APIs, leer datos privados no señalados, cambiar una publicación, reescribir artifacts, publicar, generar outputs o modificar reglas.

## B. Identidad y publicación real

Para un OUTPUT, recuperar `output_id`, `content_id`, canal, origen, source output, ángulo, formato, promesa, artifact, estado y review status. Identificar la versión publicada mediante plataforma, URL o identificador, copy o archivo servido, fecha conocida y cambios posteriores solo cuando estén documentados. `published` no se infiere de un draft o aprobación.

Para una revisión agregada de CONTENT, enumerar exactamente qué OUTPUTS y periodos entran. No comparar canales, ángulos, formatos o ventanas incompatibles como si fueran equivalentes. Un CONTENT sin outputs puede tener revisión de proceso, pero no resultados de canal inventados.

Las piezas legacy `youtube_video` siguen pudiendo revisarse por CONTENT con el contrato audiovisual histórico, sin crear un OUTPUT retrospectivo.

## C. Entradas, procedencia y privacidad

Trabajar solo con exportaciones, capturas legibles, comentarios, publicaciones, archivos, transcripts, notas y revisiones autorizadas. Registrar procedencia, output o publicación a la que corresponden, fecha de captura, periodo, qué pudo leerse y qué falta.

No adivinar cifras, interpretar ausencia como cero, mezclar ventanas o atribuir causalidad sin evidencia. Una declaración de the configured human operator se registra como feedback del operador, no como medición instrumental. No copiar datos privados innecesarios ni consultar servicios externos sin autorización.

## D. Análisis por output

Contrastar la promesa y el artifact con la expresión realmente publicada. Según el canal y los datos disponibles, observar:

- fidelidad al CONTENT y a la evidencia;
- claridad del ángulo, formato y promesa;
- límites conservados o perdidos;
- respuesta observable y preguntas recibidas;
- packaging o presentación efectivos;
- fricciones de producción registradas.

Para YouTube, usar además `YOUTUBE-FORMATS`, `YOUTUBE-NARRATIVE`, `VIDEO-STANDARD` y la versión temporal real para analizar intro, first payoff, retención, CTA, packaging, montaje y transcript cuando existan datos adecuados. Timestamps del guion no sustituyen los del montaje publicado.

Para LinkedIn y X, usar solo el perfil de canal vigente. No inventar benchmarks, algoritmos, longitudes óptimas o causalidad. `EMPIRICAL CHANNEL CALIBRATION: not yet performed` permanece verdadero hasta una evolución respaldada y aprobada.

## E. Disciplina y niveles de aprendizaje

Separar en cada hallazgo:

1. **OBSERVATION:** dato o feedback mostrado.
2. **INTERPRETATION:** explicación posible y alternativas.
3. **RECOMMENDATION:** cambio que conviene considerar.
4. **DECISION:** solo lo aceptado expresamente por the configured human operator.

Una **CHANNEL OBSERVATION**, como una apertura confusa en LinkedIn, permanece asociada al OUTPUT/REVIEW. No entra por rutina en `docs/LEARNING-LEDGER.md` ni cambia un perfil.

Un **SYSTEM LEARNING** requiere un problema repetible o estructural, evidencia suficiente, regla generalizable y un LEVEL-UP autorizado. REVIEW no promociona observaciones automáticamente.

Una revisión agregada puede comparar qué ángulos y formatos se produjeron y qué observaciones se repitieron, pero esta iteración no crea analytics, scores o integración de métricas.

## F. Archivo y recuperación

Guardar `REVIEW-NNN.md` en el expediente propio ya resoluble del CONTENT cuando exista. Para un OUTPUT sin expediente editorial propio, usar `outputs/OUTPUT-NNN/review/REVIEW-NNN.md`. El archivo identifica siempre `CONTENT-NNN`; identifica `OUTPUT-NNN`, channel, artifact y publicación cuando el scope es un output concreto, o enumera los OUTPUTS incluidos cuando es agregado.

Una revisión contiene fecha, periodo, fuentes, promesa, versión, alcance, observaciones, interpretaciones y alternativas, recomendaciones, decisiones de the configured human operator, límites, información pendiente y siguiente acción. No crear un informe vacío.

- Misma publicación, datos y petición: recuperar sin reescribir.
- Evidencia adicional del mismo periodo: continuar el informe parcial.
- Nuevo periodo o versión: crear la siguiente revisión y enlazar la anterior.
- Dato corregido: conservar corrección, procedencia y efecto sin borrar la historia.

## G. Estado y escrituras

REVIEW puede escribir únicamente la revisión aplicable, actualizar `state/pieces.json` y registrar el historial en `docs/STATE.md`. Para OUTPUT, actualiza `review_status` y `status` solo con evidencia real. Para CONTENT agregado, preserva los estados individuales y registra la referencia donde corresponda sin inventar una conclusión global.

No altera artifacts publicados, evidencia original, investigación, profiles, estándares o workflows. Publicación realizada no significa aprobación retrospectiva.

## H. Parada y respuesta

Detenerse con una revisión completa para su alcance o un avance parcial útil. Si no hay publicación identificable o evidencia útil, pedir el mínimo necesario sin crear archivo.

La respuesta indica OUTPUT o CONTENT revisado, publicación y periodo, qué se concluye y qué no, observaciones separadas de interpretaciones, recomendación respaldada si existe, decisión pendiente, estado de revisión y archivos modificados. No inicia OUTPUT, REPURPOSE, RADAR, producción ni publicación.
