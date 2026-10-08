# Workflow ONBOARD

> ROOT CONTRACT: read product rules from `CORE_ROOT` and create or refresh user context only in an explicitly selected external `INSTANCE_ROOT`. Before confirmation, only the ignored local checkpoint may be written. `NOT_CONFIGURED` is the valid starting state for FIRST SETUP; all other instance-dependent workflows still stop with `SETUP REQUIRED`.

**Estado:** disponible para configuración local. ONBOARD no crea CONTENT, no ejecuta otro workflow y no autoriza acciones externas ni publicación.

## A. Activación y modos

ONBOARD se activa solo con una orden inequívoca como «configura Content OS», «set up Content OS», «onboard me», «crea mi workspace» o «inicializa mi Content OS». Preguntar cómo funciona no lo ejecuta.

- `FIRST SETUP`: prepara una instancia todavía inexistente.
- `RESUME`: recupera el checkpoint local `in_progress` y pregunta solo lo ausente.
- `REFRESH`: propone cambios en una instancia `configured` reconocida y conserva su trabajo.

El comando de soporte es `node scripts/content-onboard.mjs`. Las respuestas de cada bloque se pasan mediante un archivo JSON temporal con `answer --block <block> --answers-file <path>`, evitando exponerlas en la línea de comandos. El archivo temporal debe quedar fuera del core y eliminarse cuando ya no sea necesario.

## B. Entrevista mínima

Se presenta un solo bloque cada vez. Se reutiliza lo ya contestado y solo se pregunta por campos ausentes. `SKIP` es válido en instrucciones opcionales; una muestra de voz puede diferirse de forma explícita. Cada bloque completado se guarda en el checkpoint ignorado.

### 1. Identity

1. «¿Qué nombre quieres que muestre Content OS?» → `display_name`.
2. «¿Cuál es tu rol o área de experiencia?» → `role_expertise`.
3. «¿Qué trabajo o conocimiento conviertes en contenido?» → `content_basis`.

No se solicita una biografía extensa.

### 2. Content purpose

1. «¿Qué quieres conseguir con tu contenido?» → `goal`.
2. «¿A quién quieres ayudar o llegar?» → `audience`.
3. «¿Cuáles son tus temas o territorios principales?» → `territories`.
4. «¿En qué idioma principal trabajará la instancia?» → `language`.

No se exige una estrategia editorial completa.

### 3. Channels

«De los canales disponibles —`youtube`, `linkedin`, `x`—, ¿cuáles utilizas realmente y quieres activar?» → `active_channels`.

La elección es explícita, admite un único canal y nunca activa los tres por defecto. Un canal no elegido permanece disponible pero inactivo.

### 4. Voice

1. «Comparte una o dos muestras reales ya existentes: post, transcript, email, guion o artículo. También puedes diferirlo.» → `sources` o `deferred`.
2. «¿Hay alguna instrucción de voz que quieras dar expresamente? Puedes responder `SKIP`.» → `user_instruction`.

Las fuentes completas se copian a `profile/voice-sources/` solo al crear la instancia. `profile/VOICE.md` separa `OBSERVED FROM SAMPLES` de `USER INSTRUCTION`. Las observaciones deben estar sostenidas por las muestras, ser provisionales y no describir psicología.

### 5. Privacy + control

1. «¿Dónde debe vivir la INSTANCE ROOT?» → ubicación externa al core.
2. «¿Puede estar sincronizada, debe ser solo local o aún no lo sabes?» → `SYNCED`, `LOCAL_ONLY` o `UNKNOWN`.
3. «¿Confirmas que los medios privados permanecerán fuera del core?» → `OUTSIDE_CORE`.
4. «¿Qué política quieres para procesamiento externo?» → por defecto `NOT_AUTHORIZED`.
5. «¿Qué aprobación requieren las acciones externas?» → por defecto `HUMAN_APPROVAL_REQUIRED`.
6. «¿Qué aprobación requiere publicar?» → `HUMAN_APPROVAL_REQUIRED`.

No se solicitan ni guardan contraseñas, tokens, claves o credenciales.

### 6. Tools / optional capabilities

1. «¿Qué runtime estás usando y está disponible?»
2. «¿Te interesa edición audiovisual y ya está configurada?»
3. «¿Sabes si dispones de transcripción local?»
4. «¿Hay otra herramienta importante ya disponible?»

Cada capability usa `AVAILABLE`, `NOT_CONFIGURED` o `UNKNOWN`. ONBOARD no instala ni conecta herramientas. AV puede permanecer `NOT_CONFIGURED` o `UNKNOWN` sin bloquear la instancia.

## C. Preview y confirmación

Tras completar los seis bloques se muestra únicamente:

- `INSTANCE LOCATION`;
- `IDENTITY`;
- `CONTENT PURPOSE`, `AUDIENCE` y territorios;
- `ACTIVE CHANNELS` y `LANGUAGE`;
- nombres y tipos de `VOICE SOURCES`, nunca su contenido completo;
- `PRIVACY DEFAULTS` y `APPROVAL MODEL`;
- `OPTIONAL CAPABILITIES`;
- en REFRESH, bloques que cambiarán.

FIRST SETUP exige una única confirmación literal `CREATE INSTANCE`. REFRESH exige `APPLY REFRESH`. Antes de esa confirmación no existe workspace final.

## D. Creación y estado

La creación es transaccional en un directorio temporal hermano. Se detiene antes de escribir si:

- CORE e INSTANCE coinciden, se contienen o no son raíces separadas;
- la raíz destino ya existe;
- su directorio padre no es escribible o es un enlace;
- la configuración local selecciona otra instancia;
- una instancia de REFRESH no es reconocible o tiene schema incompatible.

La instancia configurada incluye perfil, Constitution, voz, canales activos, `state/pieces.json`, historial, Decisions, Learning Ledger, bootstrap de RADAR e índices vacíos de ideas, labs, research, audits, outputs y postproduction. `pieces` y `outputs` comienzan vacíos. `state/pieces.json` sigue siendo el único estado operacional.

El enlace CORE → INSTANCE se guarda en `.content-os.local.json`, ignorado, con ruta relativa cuando es posible. La instancia no guarda una ruta al core.

## E. Refresh e idempotencia

REFRESH puede cambiar identity, purpose/audience, channels, voice, privacy y tools. Antes de confirmar muestra los bloques afectados. No toca CONTENT, OUTPUT, state, Decisions, Learnings, histories, labs, research, audits ni postproduction.

Si las respuestas son equivalentes, devuelve `NO_CHANGE`, no modifica la instancia ni genera timestamps nuevos. Nunca borra muestras históricas ni contenido para reconciliar cambios.

## F. Verificación y cierre

Después de FIRST SETUP o REFRESH:

1. ejecutar `node scripts/validate-content-os.mjs`;
2. comprobar `CORE: PASS`, `INSTANCE: PASS` y `OPERATIONAL: READY_FOR_OPERATIONS`;
3. iniciar el dashboard local y comprobar que no muestra `SETUP REQUIRED`, que los recuentos reales empiezan en cero y que la identidad mínima es la configurada;
4. mantener AV como `REVIEW_REQUIRED` hasta una decisión separada.

ONBOARD termina con tres entradas informativas, sin ejecutar ninguna:

1. «Quiero crear contenido sobre…» → IDEA / COMMISSION.
2. «Tengo este dossier/investigación…» → LINK / COMMISSION según intención.
3. «Busca oportunidades nuevas…» → RADAR.

No crea demos, no publica y no encadena P3 ni otro workflow.
