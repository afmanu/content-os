# Workflow BUILD

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. Su existencia no acredita que se haya construido o verificado un objeto.

## A. Propósito, principio y posición

BUILD crea las condiciones y la evidencia necesarias cuando una pieza requiere que algo exista realmente y la investigación documental no basta. Existe al servicio de una necesidad concreta de `content-os`; no es un framework general de desarrollo.

Su principio operativo es:

```text
CONTENT-OS PREPARES
HUMAN BUILDS
CONTENT-OS VERIFIES
```

El flujo conceptual es:

```text
PREPARE
→ READY FOR HUMAN BUILD
→ HUMAN EXECUTION
→ EVIDENCE INTAKE
→ VERIFY
```

`HUMAN EXECUTION` es una acción de the configured human operator, no un modo ejecutado por Codex ni una skill. Ninguna etapa se encadena automáticamente. BUILD hace que pueda existir y comprobarse un objeto; EXPERIMENT observa qué ocurre bajo una pregunta y condiciones definidas; LEVEL-UP mejora el propio `content-os`.

## B. Modos y activación

### PREPARE

Lo activa una orden explícita como «Prepara la construcción de `CONTENT-NNN`» o «Diseña el build pendiente de `CONTENT-NNN`». Autoriza recuperar antecedentes, definir la solución mínima y preparar el paquete completo de traspaso humano descrito en la sección F.

PREPARE no autoriza construir el objeto, instalar dependencias en el entorno de ejecución de the configured human operator, abrir interfaces externas, utilizar Computer Use, crear cuentas u objetos SaaS, efectuar compras, desplegar, ejecutar servicios externos, cambiar sistemas ajenos ni iniciar HUMAN EXECUTION.

### EVIDENCE INTAKE

Lo activa the configured human operator al devolver evidencia identificable de un `BUILD-NNN` ejecutado por él. Autoriza inventariar esa entrega, conservar originales cuando corresponda, relacionarla con criterios de aceptación, separar evidencia de interpretación y señalar únicamente lo que falta.

No autoriza repetir la construcción, corregir el objeto externo, completar evidencia por inferencia ni verificar automáticamente el build.

### VERIFY

Lo activa una orden inequívoca de verificar un `BUILD-NNN` cuya evidencia esté disponible. Compara SPEC, manual, evidencia y criterios de aceptación y crea la verificación recuperable descrita en la sección J.

Preguntar por un build, leer sus archivos o consultar su estado es solo lectura. RESEARCH no inicia BUILD; PREPARE no inicia HUMAN EXECUTION; EVIDENCE INTAKE no inicia VERIFY; BUILD no inicia EXPERIMENT ni PRODUCTION.

## C. Autoridad y recuperación

Leer [`channel/CONSTITUTION.md`](../channel/CONSTITUTION.md), [`channel/VIDEO-STANDARD.md`](../channel/VIDEO-STANDARD.md), [`state/pieces.json`](../state/pieces.json), este procedimiento y los antecedentes pertinentes. La entrada debe identificar un `CONTENT-NNN` existente o un `BUILD-NNN` cuya asociación pueda comprobarse.

Recuperar de la pieza:

- pregunta editorial, formato, fase, estado, bloqueos, approvals y artifacts;
- investigación y síntesis pertinentes;
- material y recursos existentes;
- afirmación o demostración que depende del objeto;
- builds previos y evidencia relacionada.

Antes de PREPARE debe poder responderse: **«¿Qué necesita construir the configured human operator para poder enseñar o comprobar esta parte de la pieza?»** Si la investigación ya sostiene la promesa, no forzar BUILD. Si solo hace falta comprobar una capacidad existente, usar EXPERIMENT. Si una fricción afecta al propio `content-os`, evaluar LEVEL-UP, no BUILD.

## D. Identidad, ubicación y recuperación

Cada construcción tiene un ID `BUILD-NNN` dentro del LAB asociado:

```text
lab/LAB-NNN-slug/build/BUILD-NNN/
├── SPEC.md
├── IMPLEMENTATION-PLAN.md
├── MANUAL-RUNBOOK.md
├── EVIDENCE-CHECKLIST.md
├── EVIDENCE-INDEX.md        # después de recibir evidencia, cuando haga falta
└── VERIFICATION.md          # solo después de VERIFY
```

`IMPLEMENTATION-PLAN.md` describe componentes, orden y límites; `MANUAL-RUNBOOK.md` convierte ese diseño en instrucciones humanas completas. El nombre histórico del plan no convierte su ejecución en un modo de Codex.

Usar el entero posterior al mayor `BUILD-NNN` del LAB y no reutilizar identificadores. No crear otro `CONTENT-NNN` ni otro LAB solo para alojar el build. Si existe un proyecto u objeto inequívoco fuera de esa carpeta, PREPARE puede referenciarlo y documentar propiedad y límites, pero no modificarlo.

Una interrupción continúa el mismo `BUILD-NNN`. No sobrescribir versiones que ya originaron una ejecución o evidencia. Conservar cada entrega original y registrar correcciones por separado.

## E. Mínimo objeto útil

Resolver en este orden:

`problema → comportamiento necesario → objeto mínimo → traspaso humano verificable`

El objeto puede ser una aplicación, workflow, automatización, agente, skill, CLI, integración, sistema documental ejecutable o prototipo técnico, solo cuando la pieza lo requiera. Si una simulación documental basta, BUILD no es necesario. Si hace falta funcionamiento real, la futura ejecución humana debe producir evidencia del caso, no solo archivos de configuración.

No añadir por anticipado autenticación, base de datos, multiusuario, cloud, despliegue, observabilidad avanzada o permisos complejos salvo que sean esenciales para la pregunta editorial.

## F. PREPARE: paquete completo para the configured human operator

PREPARE crea o completa `SPEC.md`, `IMPLEMENTATION-PLAN.md`, `MANUAL-RUNBOOK.md` y `EVIDENCE-CHECKLIST.md`. El conjunto debe cubrir, sin pasos implícitos:

1. `OBJECTIVE`.
2. `WHAT TO BUILD`.
3. `WHY THE CONTENT NEEDS IT`.
4. `PREREQUISITES`.
5. `EXACT COMPONENTS`.
6. `STEP-BY-STEP MANUAL RUNBOOK`.
7. `COPY/PASTE MATERIAL`, cuando corresponda.
8. `FIXTURES / INPUTS`.
9. `EXPECTED OBSERVATIONS`.
10. `ACCEPTANCE CRITERIA`.
11. `EVIDENCE TO CAPTURE`.
12. `WHAT NOT TO CAPTURE`.
13. `STOP CONDITIONS`.
14. `ROLLBACK / CLEANUP`, cuando aplique.
15. `WHAT TO RETURN TO CONTENT-OS`.

La SPEC conserva problema, resultado, actor, entradas, salidas, alcance, requisitos, datos, dependencias, permisos, coste, evidencia, riesgos y límites de lo que podrá demostrarse. El plan relaciona cada componente y paso con requisitos y criterios. El manual debe decir exactamente qué hará the configured human operator hasta el nivel respaldado por evidencia disponible.

Si una interfaz no se conoce con seguridad, escribir `UI VERIFICATION REQUIRED`, indicar qué debe observar the configured human operator y definir una condición de parada. No inventar nombres de botones, campos o estados.

Cuando el paquete está completo, registrar `ready_for_human_build` y detenerse con una entrega equivalente a: «Todo está preparado. Haz estos pasos. Después trae estas evidencias».

## G. HUMAN EXECUTION: fuera del workflow automático

the configured human operator ejecuta el manual y decide cualquier acción sobre el objeto o entorno externo. Puede devolver:

- outputs o exports;
- configuraciones exportadas;
- logs;
- screenshots cuando aporten evidencia que el texto no conserva;
- observaciones, errores, resultados y notas.

No exigir screenshots si texto, export o log son evidencia suficiente. No pedir credenciales, identificadores privados, conversaciones ajenas ni otra información que los criterios no necesiten.

## H. Prohibición de ejecución externa por defecto

Por defecto, BUILD no:

- usa Computer Use;
- abre websites o interfaces externas;
- crea objetos en SaaS;
- modifica cuentas;
- activa connectors;
- crea Bots o agentes externos;
- realiza compras;
- ejecuta despliegues externos;
- activa schedules;
- llama servicios externos para construir el objeto o fabricar evidencia.

Si the configured human operator quiere delegar en el futuro una acción externa concreta, requiere una autorización separada que identifique acción, superficie, alcance, datos, coste y parada. Esa excepción no cambia el default de BUILD ni autoriza el resto de HUMAN EXECUTION.

## I. EVIDENCE INTAKE

Para cada entrega:

1. identificar build, run o intento y procedencia;
2. conservar el original o su locator autorizado sin editarlo;
3. inventariar formato, fecha aportada y relación con el manual;
4. asignar cada evidencia a los criterios que puede cubrir;
5. separar `EVIDENCE` de `INTERPRETATION`;
6. señalar evidencia ausente, ambigua o no observable;
7. pedir únicamente la pieza mínima que falta.

No ordenar repetir todo el run por una ausencia menor. Si falta evidencia, usar `evidence_partial`; cuando el conjunto permita una revisión criterio por criterio, usar `ready_for_verification`. Ninguno de esos estados significa que el objeto funcione.

## J. VERIFY

VERIFY compara:

```text
SPEC
+ MANUAL RUNBOOK
+ EVIDENCE
+ ACCEPTANCE CRITERIA
```

`VERIFICATION.md` registra versiones, entorno declarado, evidencia utilizada, procedimiento, limitaciones y cada criterio con uno de estos resultados:

- `PASS`: la evidencia suficiente respalda el criterio;
- `FAIL`: la evidencia contradice el criterio;
- `NOT OBSERVABLE`: la propiedad no puede observarse con la superficie o método disponibles;
- `NOT PROVIDED`: la evidencia necesaria no fue entregada.

`NOT PROVIDED` no se convierte automáticamente en `FAIL`. La verificación distingue:

`EXISTE ≠ EJECUTA ≠ FUNCIONA PARA EL CASO ≠ ESTÁ LISTO PARA PRODUCCIÓN`

BUILD queda `build_verified` solo con evidencia suficiente y revisión humana cuando el criterio la requiera. Un prototipo puede pasar para la pieza sin ser production-ready. Comparaciones o mediciones más allá de la SPEC pertenecen a una futura ejecución separada de EXPERIMENT.

## K. BUILD ARTIFACT frente a BUILT OBJECT

Un **BUILD ARTIFACT** es material local preparado o conservado por `content-os`: runbook, fixture, configuración para copiar, prompt, schema, checklist, input sintético, capture plan, script de validación que no construye el objeto, evidencia aportada o documentación.

Un **BUILT OBJECT** es el sistema, Bot, cuenta configurada, despliegue, automatización, integración u otro objeto que the configured human operator crea durante HUMAN EXECUTION.

La existencia de BUILD ARTIFACTS no acredita que el BUILT OBJECT exista, ejecute o cumpla los criterios.

## L. Preparación local permitida

PREPARE puede crear localmente, dentro del expediente autorizado:

- runbooks y checklists;
- fixtures e inputs sintéticos;
- configuraciones y prompts para copiar;
- schemas y capture plans;
- scripts de validación que no creen el objeto;
- documentación.

No instalar dependencias o ejecutar el objeto por rutina. Cualquier comando local debe servir únicamente para preparar o validar BUILD ARTIFACTS y debe estar dentro del alcance autorizado.

## M. Estado operativo

BUILD no añade una fase nueva. La pieza puede permanecer en `research`. Estados actuales recomendados:

- `build_spec_ready` o `build_awaiting_authorization`, para expedientes históricos todavía no adaptados;
- `ready_for_human_build`, cuando el paquete manual está completo;
- `evidence_partial`, cuando the configured human operator ha aportado evidencia insuficiente;
- `ready_for_verification`, cuando puede revisarse criterio por criterio;
- `build_verified`, solo tras VERIFY suficiente;
- `build_verification_failed`, cuando existe evidencia de incumplimiento.

PREPARE, EVIDENCE INTAKE y VERIFY no pasan automáticamente a `production`. the configured human operator decide después si usar el objeto como evidencia, probarlo mediante EXPERIMENT, modificarlo, acotar la pieza, pasar a PRODUCTION o abandonar.

Conservar approvals, orígenes y artifacts ajenos. Añadir solo rutas existentes mediante claves descriptivas como `build_spec`, `build_plan`, `build_manual_runbook`, `build_evidence_checklist`, `build_evidence_index` y `build_verification`.

## N. Compatibilidad histórica

No reescribir SPEC, planes, artifacts, runs o verificaciones anteriores para simular que siempre siguieron este flujo. Las menciones históricas a `IMPLEMENT`, `build_in_progress`, `build_partial`, `build_complete_pending_decision` o `build_artifact` conservan su significado documental.

Una petición futura sobre un build histórico recupera lo que existe y prepara el traspaso humano que falte. No reejecuta ni renombra evidencia válida.

## O. Escrituras, parada y entrega

PREPARE puede escribir únicamente el expediente `BUILD-NNN`, `state/pieces.json` y `docs/STATE.md`. EVIDENCE INTAKE puede añadir originales aportados, un índice de evidencia, registro e historial. VERIFY puede añadir `VERIFICATION.md`, registro e historial. Ningún modo modifica investigación, constitución, estándares, otros expedientes, servicios externos o el BUILT OBJECT.

Releer y comprobar los archivos antes de actualizar el registro. Registrar únicamente artifacts existentes y hechos observados. Detener PREPARE en `ready_for_human_build`; detener EVIDENCE INTAKE en `evidence_partial` o `ready_for_verification`; detener VERIFY con la decisión pendiente de the configured human operator. No iniciar EXPERIMENT, PRODUCTION, grabación, publicación, despliegue, limpieza o automatización.
