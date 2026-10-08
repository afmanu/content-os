# Workflow PRODUCTION

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. Su existencia no acredita que se haya producido una pieza con él.

## A. Propósito, autoridad y activación

Transformar un OUTPUT de YouTube y la evidencia de su CONTENT en un paquete audiovisual: brief, guion completo, materiales documentales necesarios para mostrarlo y copia de lectura generada. PRODUCTION forma parte del **YOUTUBE OUTPUT ENGINE**; no es el productor universal de cualquier CONTENT. La identidad, el público y la promesa editorial proceden de la [constitución](../channel/CONSTITUTION.md); la experiencia específica se selecciona con [`YOUTUBE-FORMATS.md`](../channel/YOUTUBE-FORMATS.md); los principios narrativos universales y el packaging previo proceden de [`YOUTUBE-NARRATIVE.md`](../channel/YOUTUBE-NARRATIVE.md); la voz, la duración y los criterios de producción y revisión proceden del [estándar de vídeo](../channel/VIDEO-STANDARD.md). No se redefinen aquí.

Lo activa una orden explícita de producir un `OUTPUT-NNN` con `channel: youtube`. Por compatibilidad, una orden histórica referida directamente a un `CONTENT-NNN` con `type: youtube_video`, como «Prepara CONTENT-NNN para producción», sigue siendo válida y no obliga a crear un OUTPUT retrospectivo. Un CONTENT nuevo con `type: content` entra mediante [`OUTPUT`](OUTPUT.md). La orden autoriza desarrollar los archivos del paquete dentro de este contrato; no autoriza ejecutar el caso estudiado, ensayar por the configured human operator, grabar, montar, publicar ni preparar otro output o paquete de publicación. La grabación posterior es una acción humana; solo una orden separada sobre material grabado activa [`POSTPRODUCTION.md`](POSTPRODUCTION.md). RESEARCH tampoco activa PRODUCTION automáticamente.

## B. Recuperación y puerta de entrada

1. Leer [`state/pieces.json`](../state/pieces.json). Si la entrada es un OUTPUT, comprobar que existe, que su canal es `youtube` y recuperar su `content_id`, ángulo, formato, promesa, origen, artifact y source output cuando exista. Recuperar después el CONTENT exacto: pregunta, orígenes, `stage`, `status`, bloqueos, aprobaciones, `artifacts` y evidencia de estado. En una entrada legacy, recuperar directamente el CONTENT. Si el ID no existe o el canal no corresponde, no elegir otro por semejanza.
2. Admitir dos entradas válidas. **Con investigación:** leer `artifacts.research`, su síntesis, fuentes y materiales. **Desde IDEA con evidencia suficiente:** leer `artifacts.idea`, la candidate card, evidencia y artifacts existentes y decisiones registradas. Incorporar también material que the configured human operator aporte explícitamente para la producción de esa pieza, preservando su procedencia y naturaleza. La ausencia de `RESEARCH.md` no bloquea por sí sola una pieza que no necesita investigación esencial.
3. En ambos casos reconstruir el **Source Intent**: `SOURCE TYPE`, `SOURCE SUBJECT`, `SOURCE SCOPE`, `CREATOR'S FIRST-PARTY ADVANTAGE`, `WHAT CREATOR ACTUALLY DID`, `WHAT CAN BE SHOWN`, `WHAT CAN BE CLAIMED`, `WHAT CANNOT BE CLAIMED` y `LIKELY FORMAT` —o el campo histórico de vehículo cuando el expediente sea anterior a esta capa—. Aplicar este orden de autoridad: intención explícita de the configured human operator; alcance dominante del material; evidencia disponible; estándares editoriales. Completar la base con respuesta o tesis sostenible, mecanismo o distinción útil, consecuencia para el espectador, material mostrable, material por preparar, promesa proporcionada y afirmaciones excluidas. Una candidate card no sustituye evidencia y una síntesis de investigación no demuestra comportamiento probado.
4. Juzgar por separado **suficiencia de evidencia para la promesa** y **vigencia**. Cuando exista investigación, valorar también su completitud documental. Si existe una prueba completada, leer su `RESULTS.md`, protocolo y artifacts originales pertinentes. Si existe un BUILD completado, recuperar `SPEC.md`, el artefacto real y `VERIFICATION.md`; distinguir lo construido de lo diseñado, usar solo comportamientos comprobados y conservar sus limitaciones. Si aparece una afirmación factual o técnica esencial sin respaldo suficiente o vigente, detenerse y recomendar RESEARCH; no ejecutarlo automáticamente ni rebajar el gate por venir de IDEA.
5. Comprobar alcance, vehículo y autorizaciones mediante el **Evidence Check**: `AVAILABLE`, `DISPLAY-MISSING`, `RESEARCH-MISSING`, `EXECUTION-MISSING`, `BUILD-MISSING`, `EXPERIMENT-MISSING` o `UNSUPPORTED`. Si falta material esencial, pedirlo a the configured human operator antes de estrechar el tema con `NEEDED`, `WHY`, `MINIMUM` y `ALTERNATIVE`. La alternativa es una opción explícita, no una decisión automática. Si la promesa depende de una prueba esencial todavía no ejecutada o de un BUILD todavía no implementado y verificado, detenerse y solicitar la decisión o autorización correspondiente; no ejecutarlos, simularlos ni sustituirlos silenciosamente por una explicación documental. No presentar un prototipo funcional como producto production-ready. No activar por cuenta propia una pieza aparcada ni interpretar una aprobación antigua como aprobación de una versión nueva. Una ambigüedad material que los expedientes no resuelven se consulta antes de escribir.
6. Ejecutar una **FORMAT DECISION** antes de packaging, hook o arco. Seleccionar un único `PRIMARY FORMAT` del catálogo de [`YOUTUBE-FORMATS.md`](../channel/YOUTUBE-FORMATS.md) y, solo si cumple una función real, una `SECONDARY MECHANIC`. La decisión usa intención explícita de the configured human operator, source type, source scope, Creator Advantage, evidencia disponible, viewer promise, trabajo visible y reproducibilidad cuando corresponda. No seleccionar por costumbre ni acumular etiquetas. En material amplio, buscar primero la historia general. Solo dividir por promesas incompatibles, superficialidad o relleno inevitables, evidencia esencial ausente o petición expresa de the configured human operator. Una evidencia estrecha puede ocupar una prueba, demo, caso, payoff, ejemplo, comparación, material de pantalla o límite sin convertirse en el tema principal.

Si the configured human operator pide explícitamente un formato, conservar esa intención y comprobar sus requisitos de evidencia. Si pide tutorial y faltan prerrequisitos, pasos, configuración, inputs, acciones, outputs o validación esenciales, detenerse con `NEEDED`, `WHY`, `MINIMUM` y `ALTERNATIVE`. Puede ofrecerse un walkthrough sostenible como alternativa, pero no adoptarlo sin decisión de the configured human operator.

## C. Propiedad de archivos y recuperación del paquete

Las rutas de `artifacts` son la primera referencia: reutilizar los archivos de **esa pieza** sin mover ni duplicar su expediente. Un paquete nuevo con LAB principal inequívoco se guarda en `lab/LAB-NNN-slug/editorial/`. Si esa carpeta editorial ya pertenece a otra pieza, usar `lab/LAB-NNN-slug/editorial/CONTENT-NNN/` para `BRIEF.md`, `GUION.md` y `LECTURA.txt`; no compartir ni sobrescribir un `GUION.md` entre vídeos. Los materiales documentales nuevos se sitúan en el expediente, identificados para la pieza y separados de los recursos de investigación. Si hay varios LAB, el brief cita todos y el destino se resuelve primero con las rutas del registro; preguntar solo cuando elegirlo exija una decisión nueva. No crear un LAB únicamente para alojar un guion.

Si el paquete está parcial, continuar los mismos archivos y conservar el trabajo válido. Si está completo y vigente, una petición repetida recupera el paquete y la lectura guardada sin reescritura; comprobar su correspondencia con el guion. Una revisión explícita permite cambiar solo lo pedido y conservar versiones históricas según las reglas vigentes. Una versión publicada o aprobada no se sobrescribe sin autorización de revisión: conservar la versión anterior y la procedencia de su aprobación, identificar el borrador nuevo y dejar su propia revisión pendiente. No extender una aprobación previa al texto modificado.

## D. Brief, decisión de formato, intención y packaging antes del guion

Crear o completar `editorial/BRIEF.md` en la ubicación resuelta. Registrar el Source Intent y el Creator Advantage; concretar la pregunta y el problema del espectador; promesa y capacidad que podrá aplicar o entender; evidencia con fecha y límites; resultado visible; demostración y material necesario; recurso asociado y su estado real; bloques con progresión y presupuesto temporal.

Antes de la hipótesis de packaging, registrar la **FORMAT DECISION** con estos campos:

- `PRIMARY FORMAT:`
- `SECONDARY MECHANIC:` o `none`;
- `WHY THIS FORMAT:`
- `WHY NOT THE MAIN ALTERNATIVES:`
- `FORMAT-SPECIFIC PROMISE:`
- `FORMAT-SPECIFIC PROOF:`
- `FORMAT-SPECIFIC FAILURE RISK:`

El brief enlaza o nombra el contrato seleccionado y aplica sus decisiones; no copia la biblioteca completa. `PRIMARY FORMAT` decide la experiencia. `SECONDARY MECHANIC` describe una función subordinada y no una segunda promesa competitiva.

Cuando `PRIMARY FORMAT` sea `WALKTHROUGH / SETUP TOUR`, completar antes de la hipótesis definitiva de packaging una sección **WALKTHROUGH DESIGN** con:

- `PRIMARY FORMAT:`
- `ENTRY MECHANISM:` `SYSTEM / RESULT FIRST`, `DEMO FIRST`, `PROBLEM FIRST`, `CREATOR-USE / EXPERIENCE FIRST` o `DIRECT TOUR`;
- `CREATOR ADVANTAGE PLACEMENT:` apertura, primeros compases o posterior, con motivo;
- `PROOF OF USEFULNESS:` elemento existente que demuestra pronto por qué merece recorrerse el sistema, o `intrinsic object interest` cuando el objeto sostiene por sí mismo el tour;
- `WALKTHROUGH SPINE:` `TASK-FLOW WALKTHROUGH`, `LAYER WALKTHROUGH`, `DEMO → BREAKDOWN` o `SPATIAL / COMPONENT TOUR`;
- `FIRST PAYOFF TYPE:` `CAPABILITY` o `UNDERSTANDING`;
- `FIRST PAYOFF:` entrega concreta y respaldada;
- `PRIMARY CTA TYPE:` `APPLY`, `RESOURCE` o `NEXT DEPTH`, solo con destino real o acción natural.

Justificar la elección y no combinar spines por acumulación. Este diseño decide la experiencia antes del copy; todavía no redacta `TEXTO HABLADO`.

Identificar intención de búsqueda o navegación y conservar un **language map** pequeño: `primary viewer phrase`, `core topic`, nombres de producto o entidades imprescindibles, entre tres y seis términos relacionados, términos técnicos que requieren explicación y lenguaje interno que no debería dominar el copy. Estos términos son lenguaje editorial inferido, no volumen de búsqueda, keyword research, análisis competitivo ni demanda validada. Si no existe investigación externa específica, registrar `MARKET VALIDATION: not performed`. No diseñar densidad de keywords, repeticiones, tags o una apertura para buscadores.

Añadir una **hipótesis de packaging** que distinga explícitamente `THESIS`, `VIEWER PROMISE`, `TITLE DIRECTION`, `THUMBNAIL TENSION`, `SEARCH / BROWSE LANGUAGE` y `MARKET VALIDATION`, además de `viewer`, problema, stakes, escena o resultado que prueba la promesa, mecanismo de hook y prueba prevista para los primeros 30 segundos. Es previa y revisable, no packaging final. La tesis no se utiliza automáticamente como título: la dirección de título puede concretar una consecuencia o resultado sin contradecir la evidencia. Debe dejar claro qué tiene que ocurrir inmediatamente para que el clic se sienta correspondido.

Plantear trabajo y decisiones concretas que permitan explicar el sistema. La comprobación acompaña la explicación y la construcción, sin convertir la pieza entera en advertencias. Mostrar pronto el resultado o la capacidad, dar a cada bloque una aportación distinta y dejar una transición que responda a una pregunta real del trabajo. Aplicar el rango y las excepciones justificadas del estándar, sin añadir relleno para alcanzar una cifra.

## E. Diseño audiovisual y narrativo antes del copy

Leer primero el **FORMAT CONTRACT** seleccionado en [`YOUTUBE-FORMATS.md`](../channel/YOUTUBE-FORMATS.md) y después aplicar [`YOUTUBE-NARRATIVE.md`](../channel/YOUTUBE-NARRATIVE.md). No pasar directamente de principios o research a `TEXTO HABLADO`.

### Secuencia obligatoria para WALKTHROUGH

Cuando `PRIMARY FORMAT` sea `WALKTHROUGH / SETUP TOUR`, seguir sin pedir autorización humana entre estos pasos internos:

`FORMAT DECISION → WALKTHROUGH DESIGN → 0–30 SECOND BEAT SHEET → 30–90 SECOND BEAT SHEET → FULL VIDEO BEAT SHEET → NARRATIVE CHECK → TEXTO HABLADO → LECTURA`

#### 0–30 SECOND BEAT SHEET

Diseñar beats audiovisuales, no un párrafo anticipado. Cada beat registra:

- `TIME RANGE APPROX:`
- `SCREEN:` qué ve el espectador;
- `VOICE PURPOSE:` función de la voz, sin exigir todavía redacción literal;
- `NEW INFORMATION:` qué aprende;
- `TENSION / QUESTION:` qué queda abierto;
- `PROOF / PAYOFF:` qué se demuestra o entrega.

Los primeros 30 segundos deben ejecutar el `ENTRY MECHANISM`, mostrar el sistema o su proof of usefulness y comenzar la experiencia prometida. Si un límite hace engañosa la promesa inicial, aparece aquí; los demás caveats se introducen cuando cambian una afirmación concreta.

#### 30–90 SECOND BEAT SHEET

Usar los mismos campos para entrar realmente en el walkthrough, evitar una segunda introducción, entregar el `FIRST PAYOFF` y abrir el spine elegido. Si aproximadamente al segundo 60 la pieza sigue contextualizando el vídeo en vez de recorriendo el sistema, revisar la apertura. Es una heurística editorial, no un benchmark algorítmico.

#### FULL VIDEO BEAT SHEET

Antes del copy, diseñar todos los beats con:

- `GOAL:`
- `SCREEN:`
- `ACTION / CHANGE:`
- `VOICE PURPOSE:`
- `PROOF:`
- `PAYOFF:`
- `NEXT QUESTION:`

Cada beat debe demostrar, cambiar, decidir, descubrir, comparar, conectar, descartar o entregar algo. Si solo explica, revisar si puede integrarse, reducirse, pasar a pantalla o desaparecer. El segundo beat nace de algo visto, cambiado, probado o preguntado por el primero; la secuencia completa mantiene esa causalidad.

#### NARRATIVE CHECK

Antes de redactar `TEXTO HABLADO`, comprobar:

- qué ve el espectador primero;
- cuál es el `ENTRY MECHANISM`;
- cuál es el `PROOF OF USEFULNESS`;
- qué `WALKTHROUGH SPINE` se utiliza;
- cuál es el `FIRST PAYOFF TYPE` y el `FIRST PAYOFF`;
- por qué el segundo beat nace del primero;
- que packaging, opening beats y proof prometen la misma experiencia;
- que `SCREEN` lleva sistema, output, mapa, configuración, artifact, transición, estado o proof, y `VOICE` se reserva para importancia, decisión, relación, consecuencia, límite, sorpresa o interpretación;
- que la CTA corresponde a `APPLY`, `RESOURCE` o `NEXT DEPTH` y no inventa un destino.

Si no puede responderse cualquiera de las seis primeras preguntas, detener la escritura y corregir el diseño. No pedir autorización humana para esa corrección interna.

Solo después del check escribir el copy desde los beats. La voz responde a lo que se ve, cambia, se prueba o se pregunta; no convierte el beat sheet en una lista narrada. Para walkthrough, los candidatos de hook comparan entry mechanisms y opening beats antes de redactar primeras frases literales.

### Aplicación general a todos los formatos

Diseñar un arco causal que use el `NARRATIVE SPINE` como patrón de decisión, no como plantilla, y registrar para cada bloque objetivo actual, acción visible, descubrimiento o cambio, payoff y motivo que conduce al siguiente. Cada bloque nace del resultado anterior según `queremos → hacemos → ocurre o descubrimos → payoff → nueva necesidad`; no basta con avanzar por el índice de un framework.

Generar internamente **hasta tres candidatos de hook** antes del copy. Cada candidato cumple el `INTRO JOB` del formato y una opción adecuada a la evidencia. Registrar mecanismo, opening beat o primeras frases según el procedimiento del formato, problema, stakes, promise, proof visible, open question y correspondencia con el packaging. Elegir uno cualitativamente por claridad, especificidad, interés, correspondencia con la promesa, velocidad hacia la experiencia prometida y ausencia de exageración; no usar puntuación agregada ni conservar varias aperturas en `TEXTO HABLADO`.

No considerar fuerte un hook solo por contraste, curiosidad, pregunta o resultado visual. Cuando exista proof concreto, considerar mostrarlo antes de la explicación abstracta. Intentar mostrar pronto una consecuencia reconocible mediante `situación → problema observable → consecuencia → promesa → trabajo`, sin inventarla.

Identificar preguntas abiertas honestas y re-hooks solo donde aparece otro problema, una solución crea una pregunta, cambia el riesgo, se descubre una limitación, aparece un resultado parcial o cambia la expectativa. No imponer cliffhangers ni una frecuencia artificial. Si la hipótesis de título o miniatura promete X, los primeros 30 segundos deben confirmar X y comenzar la experiencia correspondiente.

No seguir automáticamente los encabezados de `RESEARCH.md`, convertir las partes de un framework o las filas de una tabla en bloques, empezar acumulando todos los límites metodológicos ni leer fuentes como sustituto de narrativa. Reagrupar la evidencia según decisiones y consecuencias sin perder trazabilidad.

Antes del copy, identificar `FIRST PAYOFF`: qué cambio cuenta como progreso, por qué importa y en qué punto aproximado ocurre. Aplicar su patrón e intentar situarlo aproximadamente en los primeros 60–90 segundos cuando el material lo permita, sin tratarlo como benchmark. Registrar `HOOK → FIRST PAYOFF → PAYOFF 2 → PAYOFF 3 → FINAL PAYOFF`.

Separar `VOICE`, `SCREEN` y `NOTES` aplicando el balance del formato. La pantalla muestra trabajo o evidencia; la voz explica decisión, tensión o consecuencia; las notas conservan trazabilidad. Definir la **primary CTA** como la acción más lógica después del payoff, con motivo y destino real si existe. No inventar enlaces, descargas, recursos o vídeos.

## F. Demostración y materiales de pantalla

Inventariar antes de redactar escenas y registrar su Evidence Check. Para la planificación de pantalla: **A**, material `AVAILABLE`, existente y comprobable; **B**, material `DISPLAY-MISSING` que esta operación puede preparar como tabla, mapa, ficha, ejemplo o composición editorial; **C**, material `RESEARCH-MISSING`, `EXECUTION-MISSING`, `BUILD-MISSING`, `EXPERIMENT-MISSING` o `UNSUPPORTED` que exige otra autorización o no puede sostenerse. Preparar B cuando sea necesario para el recorrido, con herramientas disponibles y sin añadir aplicaciones o dependencias. Conservar los recursos de investigación; si necesitan adaptación visual, crear una copia o composición editorial identificada, no sobrescribir el original.

Para cada acción en `EN PANTALLA` o sus notas, indicar **qué se muestra, archivo y sección, qué hace the configured human operator, qué decisión o explicación aporta y si es evidencia, diseño propuesto o reconstrucción didáctica**. La pantalla debe corresponder al texto hablado y al estado real de cada documento: qué está vacío, qué se rellena y qué se revisa. Si se dice que se abre una tabla, debe existir y poder localizarse antes de declarar el paquete listo para ensayo. Si falta material esencial de clase C, detenerse o conservar un paquete parcial con el bloqueo; no escribir una escena como si ya existiera. No inventar capturas, interfaces, datos, llamadas ni resultados de modelos.

## G. Guion completo y copia de lectura

Crear o completar `editorial/GUION.md` con `CONTENT-NNN`, estado, título de trabajo y referencias al brief y al estándar. Usar bloques narrativos numerados `## 1. ...`, cada uno con exactamente un `### TEXTO HABLADO` completo y un `### EN PANTALLA`, más notas de fuentes y producción y un resumen de recuento y duración. La narración debe leerse seguida: apertura, explicaciones, ejemplos, comentarios pronunciados durante las acciones, transiciones y cierre. No sustituirla por «explicar aquí» ni por un esquema para que the configured human operator reconstruya el copy.

Explicar los términos técnicos mediante el trabajo mostrado. Mantener IDs y rutas internos en notas, no en la voz. Separar hecho documentado u observado, interpretación, propuesta y pendiente de prueba; expresar en voz natural los límites que cambian la conclusión, sin repetirlos mecánicamente. No atribuir a the configured human operator experiencia, clientes, pruebas o resultados que no consten. Aprobaciones, alojamiento futuro del recurso y tareas de producción permanecen en notas.

Escribir para ser dicho: variar longitud, usar preguntas reales y transiciones causales, y explicar consecuencias antes que etiquetas. Reducir definiciones consecutivas, enumeraciones largas, voz institucional y documentación trasladada directamente a narración. Introducir densidad técnica en el orden problema → mecanismo → nombre técnico. Comprobar que `TEXTO HABLADO` no recita información que `EN PANTALLA` ya comunica y que el peso de voz se concentra en las decisiones que cambian el trabajo. Revisar que la conclusión entregue la promesa del packaging, que la CTA nazca de ese payoff y que ninguna escena de miniatura quede ausente del recorrido.

`GUION.md` es la fuente canónica. Con las rutas reales ya resueltas, generar `editorial/LECTURA.txt` **solo** mediante la interfaz vigente de [`scripts/Export-Lectura.ps1`](../scripts/Export-Lectura.ps1), desde la raíz y sin modificar la política de ejecución:

```powershell
$guion = '<ruta-real-del-GUION.md>'
$lectura = '<ruta-real-del-LECTURA.txt>'
powershell -NoProfile -File .\scripts\Export-Lectura.ps1 -GuionPath $guion -LecturaPath $lectura
powershell -NoProfile -File .\scripts\Export-Lectura.ps1 -GuionPath $guion -LecturaPath $lectura -Check
```

Si falla la generación o `-Check`, conservar el guion, registrar el error y dejar el paquete parcial; no reparar infraestructura ni escribir una lectura alternativa. Comprobar en el archivo generado narración completa, orden, coincidencia literal y ausencia de pantalla o notas. Contar palabras sobre la lectura real. Estimar con el supuesto vigente del estándar —140 palabras por minuto mientras no haya medición de the configured human operator— más solo las pausas o acciones necesarias **sin** narración; no sumar otra vez la pantalla simultánea. Distinguir objetivo del brief, estimación calculada, ensayo y duración final.

## H. Escrituras, estado y verificación

Una ejecución ordinaria de PRODUCTION puede escribir solo archivos editoriales de la pieza, materiales documentales necesarios para su demostración, el OUTPUT de YouTube cuando exista, `state/pieces.json` y `docs/STATE.md`. No modifica este contrato, reglas, exportador ni investigación. Releer lo escrito y comprobar enlaces, procedencia, continuidad de pantalla, materiales y lectura antes de actualizar el registro. Conservar datos, orígenes, investigaciones, recursos y bloqueos ajenos; añadir referencias solo a archivos existentes y retirar bloqueos únicamente con evidencia de resolución. Cuando exista OUTPUT, mantener `content_id`, origen y promesa, actualizar su status con evidencia real y enlazar sus artifacts desde `outputs/OUTPUT-NNN/OUTPUT.md` sin duplicarlos.

Para `research` o `ready_to_produce`, la orden explícita permite pasar a `production` **si se cumplen las precondiciones**. Conservar los `stage` de `published` o `reviewed` durante una revisión editorial; no retrocederlos automáticamente. `status` registra lo ocurrido —trabajo en curso, paquete parcial, bloqueo o borrador preparado— y `next_action` una sola acción concreta. Solo usar `draft_ready_for_rehearsal` cuando brief y guion estén completos, lectura generada y vigente, materiales necesarios existentes, promesa respaldada y ningún bloqueo esencial pendiente. Si falta algo, entregar el avance y el bloqueo, sin declarar finalización. Una revisión documental no es ensayo ni aprobación.

`approvals.recording` y `approvals.publication` no pasan a `true` por crear o revisar el paquete. Ante una versión modificada con aprobación anterior, registrar a qué versión correspondía esta y que la nueva necesita revisión; no atribuirle la aprobación por arrastre.

## I. Parada y entrega

Detenerse al guardar el paquete y estado verificados, o un avance parcial con su bloqueo. No continuar a ensayo, grabación, publicación, montaje o derivados; el siguiente paso lo realiza o autoriza the configured human operator.

Por defecto, entregar `CONTENT-NNN` y estado, **el contenido completo de `LECTURA.txt` leído del archivo guardado**, ubicación y uso de los materiales de pantalla, palabras y duración estimada, bloqueos y una única siguiente acción. No sustituir la lectura por diff o resumen. Si el paquete ya estaba completo, recuperar la lectura sin editarla. Si falta por error o bloqueo, explicar que no existe una lectura vigente y no inventarla. Una consulta de estado devuelve solo estado; respetar una petición explícita de otro formato de respuesta sin alterar archivos innecesariamente.
