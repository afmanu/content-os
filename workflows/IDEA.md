# Workflow IDEA

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. Su existencia no crea una idea ni autoriza otra operación.

## A. Propósito y activación

Convertir un encargo editorial proporcionado directamente por the configured human operator en una candidata estructurada y determinar qué necesita para avanzar. No requiere RADAR ni una señal externa previa.

Lo activan órdenes inequívocas como «Tengo esta idea para un contenido: …», «Desarrolla esta idea: …», «Quiero convertir este dossier en contenido» o «Quiero hacer contenido sobre esta tesis: …». Una petición explícita de un output para un CONTENT existente corresponde a [`OUTPUT`](OUTPUT.md). Distinguir:

- **DISCUSSION:** the configured human operator explora, pregunta o contrasta una posibilidad sin encargar todavía una pieza. No crea archivos ni registro.
- **COMMISSION:** the configured human operator aporta una idea o material con intención inequívoca de convertirlo en contenido. Preserva el núcleo del encargo y activa este workflow.

IDEA termina tras guardar y registrar la candidata o la idea que necesita desarrollo. No crea outputs ni inicia RESEARCH, EXPERIMENT, BUILD, PRODUCTION o RADAR.

## B. Autoridad y entradas

Leer [`channel/CONSTITUTION.md`](../channel/CONSTITUTION.md), [`channel/EDITORIAL-QUALITY.md`](../channel/EDITORIAL-QUALITY.md), el registro de [`channel`](../channel/INDEX.md), [`state/pieces.json`](../state/pieces.json), este procedimiento y los artifacts de piezas pertinentes para detectar solapamiento. Consultar [`docs/STATE.md`](../docs/STATE.md) solo cuando haga falta contexto histórico. IDEA puede identificar posibles canales o vehículos, pero no crea OUTPUTS ni decide su formato final.

La entrada principal es el material de the configured human operator, clasificado como `IDEA`, `DOSSIER`, `RESEARCH`, `PROJECT`, `EXPERIMENT` o `NOTES`. Conservar su formulación original, intención, alcance dominante, ejemplos, restricciones y la naturaleza de cada afirmación. Una opinión, experiencia o creencia aportada no se convierte en hecho externo comprobado. No deformar una comisión concreta para adaptarla a una tendencia ni tratarla como un corpus de descubrimiento.

Aplicar este orden de autoridad: intención explícita de the configured human operator; alcance dominante del material; evidencia disponible; estándares editoriales. El material puede reorganizarse narrativamente y recibir el vehículo adecuado, pero no cambiar de tema en silencio.

Si falta el contenido mismo de la idea, pedirlo. No elegir una por cuenta propia.

## C. Procedimiento

1. Determinar si la interacción es `DISCUSSION` o `COMMISSION`. Solo la segunda continúa.
2. Capturar la formulación original cuando sea razonable y registrar el **Source Intent** completo: `SOURCE TYPE`, `SOURCE SUBJECT`, `SOURCE SCOPE`, `CREATOR'S FIRST-PARTY ADVANTAGE`, `WHAT CREATOR ACTUALLY DID`, `WHAT CAN BE SHOWN`, `WHAT CAN BE CLAIMED`, `WHAT CANNOT BE CLAIMED` y `LIKELY OUTPUTS`.
3. Si el material es amplio, formular primero la historia general que cuenta. No extraer un tema menor como pieza principal antes de comprobar si el conjunto puede sostenerse; una evidencia estrecha puede ocupar una escena o payoff.
4. Identificar la pregunta del espectador y el problema real detrás de ella.
5. Formular una promesa editorial provisional y registrar `LIKELY OUTPUTS` solo como opciones de canal justificadas por Source Intent, Creator Advantage, audiencia/problema, evidencia y material disponible. No crear todas, no seleccionar por costumbre y no convertir una hipótesis en output registrado. Si YouTube es una opción, su formato se decide después en OUTPUT y PRODUCTION.
6. Declarar el **Creator Advantage** de the configured human operator y qué trabajo y resultado podrían verse en pantalla.
7. Revisar `state/pieces.json` y solo los artifacts pertinentes para detectar solapamiento.
8. Evaluar el encargo con las condiciones necesarias y señales de fortaleza de [`EDITORIAL-QUALITY.md`](../channel/EDITORIAL-QUALITY.md), sin score agregado.
9. Aplicar el **Evidence Check**: `AVAILABLE`, `DISPLAY-MISSING`, `RESEARCH-MISSING`, `EXECUTION-MISSING`, `BUILD-MISSING`, `EXPERIMENT-MISSING` o `UNSUPPORTED`.
10. Si falta algo esencial, pedir a the configured human operator antes de estrechar el tema con los campos `NEEDED`, `WHY`, `MINIMUM` y `ALTERNATIVE`. No ejecutar el trabajo faltante ni adoptar la alternativa sin autorización.
11. Completar la candidate card común sin convertirla en research o brief. El gate decide si es producible, necesita evidencia, requiere reformulación acordada o trabajo adicional; no inventa una comisión distinta.
12. Recomendar una única ruta siguiente o no avanzar todavía.
13. Asignar el siguiente `CONTENT-NNN` libre, guardar `ideas/CONTENT-NNN.md` y registrarlo según la sección F.
14. Releer los archivos modificados, comprobar rutas y detenerse con una decisión pendiente de the configured human operator.

No realizar búsquedas documentales para suplir evidencia, diseñar protocolos, preparar builds ni producir la pieza dentro de IDEA.

## D. Rutas recomendables

### OUTPUT directo

Solo cuando el núcleo se apoya en razonamiento, experiencia o artifacts ya documentados; las afirmaciones externas esenciales ya tienen respaldo suficiente; no necesita investigación esencial; y no depende de una prueba o build inexistentes. the configured human operator selecciona el canal antes de crear el OUTPUT. Saltar RESEARCH no significa saltar evidencia.

### RESEARCH

Cuando quedan preguntas factuales o técnicas esenciales por resolver.

### EXPERIMENT

Cuando la pieza depende de observar comportamiento real y la base documental ya permite diseñar la prueba. RESEARCH puede ser necesario, pero no se impone como ritual si la necesidad y evidencia ya están definidas.

### BUILD

Cuando la promesa o demostración necesita que exista un artefacto real.

### No avanzar todavía

Cuando la idea es demasiado amplia, no tiene problema claro, carece de aportación propia o trabajo visible, o se solapa sustancialmente con otra pieza. Se conserva sin fingir que está lista.

La recomendación no ejecuta ninguna ruta.

## E. Archivo de idea

En una ejecución real, crear `ideas/CONTENT-NNN.md` con:

- `CONTENT-NNN` y fecha;
- **IDEA ORIGINAL**;
- **SOURCE INTENT** completo;
- **LIKELY OUTPUTS** provisionales y por qué podrían ser adecuados;
- **CREATOR ADVANTAGE**;
- candidate card común;
- evaluación cualitativa de las seis condiciones y fortalezas pertinentes;
- solapamientos comprobados;
- evidencia disponible;
- evidencia o trabajo faltante;
- Evidence Check y, cuando corresponda, petición `NEEDED / WHY / MINIMUM / ALTERNATIVE`;
- ruta recomendada;
- decisión pendiente de the configured human operator.

No crear la carpeta o archivos de ideas fuera de una ejecución real. El archivo no es una investigación, protocolo, especificación ni brief.

## F. Registro

Crear el siguiente ID posterior al mayor `CONTENT-NNN`, sin reutilizar IDs. Añadir una única entrada a `state/pieces.json`:

- `type`: `content`; los valores legacy `youtube_video` permanecen válidos sin migración;
- `format`: `null`; el formato pertenece al OUTPUT y no al nuevo núcleo editorial;
- `stage`: `candidate`;
- `status`: reflejar si está preparada para selección, necesita desarrollo o espera decisión de ruta;
- `origins`: incluir `{ "kind": "idea", "path": "ideas/CONTENT-NNN.md" }`;
- `artifacts.idea`: `ideas/CONTENT-NNN.md`;
- `approvals.recording` y `approvals.publication`: `false`;
- `next_action`: una sola decisión de the configured human operator;
- `blockers` y `state_evidence`: solo hechos y rutas reales.

No añadir research, build, experimento, guion o aprobación inexistentes. Preservar todas las demás piezas. Registrar la ejecución en `docs/STATE.md`.

## G. Escrituras y parada

IDEA puede escribir únicamente `ideas/CONTENT-NNN.md`, la nueva entrada de `state/pieces.json` y `docs/STATE.md`. No modifica rondas, fuentes, reglas, workflows, labs ni piezas anteriores.

La respuesta incluye el ID, la idea original, candidate card, resultado del quality gate, solapamientos, evidencia disponible y faltante, ruta recomendada, decisión pendiente y archivos escritos. Se detiene sin ejecutar la recomendación.
