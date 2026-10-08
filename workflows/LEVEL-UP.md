# Workflow LEVEL-UP

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. Una propuesta no acredita que la mejora haya sido implementada.

## A. Propósito y fronteras

LEVEL-UP identifica, prepara, propone, implementa tras aprobación y valida una mejora pequeña del propio `content-os`.

No produce una pieza, no sustituye BUILD y no repara automáticamente un audit:

```text
BUILD    → prepara una construcción para una pieza; the configured human operator construye; content-os verifica.
LEVEL-UP → mejora content-os; the configured human operator decide; Codex implementa solo tras aprobación explícita.
AUDIT    → inspecciona capacidades y evidencia; no repara.
```

LEVEL-UP no es self-modification autónoma. No crea una arquitectura nueva por defecto ni convierte toda fricción en infraestructura.

## B. Activación

Puede activarse por:

- un `FND-NNN` de AUDIT;
- un problema observado durante el uso;
- un `LRN-NNN`;
- fricción repetida;
- una capability ausente;
- una petición explícita de the configured human operator;
- una decisión explícita de producto.

Un finding, learning o comentario no autoriza por sí solo una modificación. Consultar cómo mejorar el sistema es lectura y análisis; una ejecución requiere las fases y gates siguientes.

## C. Una mejora cada vez

Una ejecución de LEVEL-UP selecciona una sola mejora del sistema. Puede enumerar candidatos para decidir, pero solo uno pasa a propuesta e implementación. No genera un programa automático de mejoras ni encadena la siguiente.

## D. Primer gate: ¿hay que cambiar el core?

Antes de proponer infraestructura, comprobar si el problema se resuelve usando correctamente lo que ya existe. Clasificar la intervención mínima como una de estas opciones:

1. `NO CHANGE`;
2. `OPERATIONAL CHANGE`;
3. `DOCUMENTATION/RULE CHANGE`;
4. `SMALL IMPLEMENTATION`;
5. `NEW CAPABILITY`.

Preferir la opción mínima que satisface la necesidad. Una fricción de usuario no demuestra automáticamente que falte arquitectura.

## E. Fases y gates humanos

### 1. ANALYZE / PREPARE

Leer Constitución, estado, Decisions, Learning Ledger, workflow afectado, evidencia y código pertinente. Esta fase es read-only. No crea un plan persistente salvo que the configured human operator haya autorizado expresamente una ubicación y esa persistencia sea necesaria para recuperar el trabajo.

### 2. PROPOSE

Presentar una única mejora seleccionada con el contrato de la sección F y detenerse. «Buena idea», interés o una pregunta no cuentan como autorización si el contexto no identifica inequívocamente la mejora y su implementación.

### 3. IMPLEMENT

Solo una autorización explícita que identifique la mejora seleccionada permite modificar el repositorio local. La ejecución queda limitada a los archivos, superficies, riesgos y aceptación aprobados. No amplía scope silenciosamente.

## F. Contrato de propuesta

La propuesta debe definir:

1. `PROBLEM`.
2. `EVIDENCE`.
3. `WHY NOW`.
4. `CURRENT BEHAVIOR`.
5. `DESIRED BEHAVIOR`.
6. `SMALLEST CHANGE`.
7. `FILES / SURFACES AFFECTED`.
8. `RISKS`.
9. `HUMAN DECISIONS`.
10. `ACCEPTANCE CRITERIA`.
11. `VALIDATION METHOD`.
12. `ROLLBACK`.
13. `EFFECT ON EXISTING DECISIONS`.
14. `EFFECT ON LEARNING LEDGER`.

La evidencia debe ser recuperable. No inventar causa, generalidad, impacto o urgencia.

## G. Implementación autorizada

Cuando formen parte de la mejora aprobada, Codex puede editar:

- workflows y documentación;
- scripts y validators;
- estándares y skills;
- dashboard read-only;
- tests y fixtures.

No puede publicar, hacer push, usar datos privados, ejecutar acciones externas ni ampliar la mejora a otros subsistemas sin autorización separada. El dashboard sigue siendo una proyección; LEVEL-UP no crea otro state store.

## H. Validación y completion check

Toda implementación tiene una comprobación proporcionada al cambio. Usar, cuando corresponda:

- validator;
- tests o fixture;
- smoke local;
- revisión humana;
- un AUDIT posterior autorizado.

No exigir test determinista para claridad, naturalidad u otras propiedades subjetivas. No ejecutar AUDIT automáticamente salvo autorización expresa o inclusión inequívoca en el scope aprobado.

La entrega separa lo modificado, lo comprobado, los límites y la decisión siguiente. No declara resuelto un problema que la evidencia no haya revalidado.

## I. Decisions

Leer las decisiones pertinentes antes de proponer cambios de autoridad, estado, contratos o capas.

- Si la mejora cambia una decisión canónica, conservar la anterior como `SUPERSEDED` y crear una nueva DEC enlazada.
- Si solo implementa mejor una decisión vigente, no crear otra DEC.
- Una decisión explícita de producto puede justificar una nueva DEC cuando el contrato de [`docs/DECISIONS.md`](../docs/DECISIONS.md) se cumple.

## J. Learning Ledger

Leer un `LRN-NNN` cuando motive la mejora. No crear un learning por rutina. Solo registrarlo cuando existe la cadena:

```text
observed problem → generalizable learning → system rule
```

El estado del learning refleja la evidencia real: adoptar una regla no acredita revalidación posterior.

## K. AUDIT

Un finding puede alimentar LEVEL-UP:

```text
AUDIT → FND-NNN → LEVEL-UP analiza → the configured human operator aprueba → IMPLEMENT → VALIDATE
```

LEVEL-UP no modifica audits pasados. Solo un audit futuro y explícitamente autorizado puede actualizar la evaluación histórica mediante un informe nuevo.

## L. Routing y exclusiones

- «Mejoremos content-os» o «Arreglemos `FND-003`» → LEVEL-UP.
- «Esto me pasa cada vez que uso Production» → analizar y, si corresponde, proponer LEVEL-UP.
- «Construye esto para `CONTENT-NNN`» → BUILD.
- «Investiga X» → RESEARCH.
- «Haz un vídeo» → operación editorial o audiovisual correspondiente.

No importar Four Cs, 3Ms, scores, Bike phases, KPI comercial obligatorio, branding o trademarks ajenos. LEVEL-UP adopta una función de gobierno mínima, no un framework comercial.

## M. Estado, escritura y parada

LEVEL-UP no añade otro store, otra lista de piezas ni una UI específica. `state/pieces.json` sigue reservado a piezas; `docs/STATE.md` conserva cambios realmente implementados y comprobados.

ANALYZE / PREPARE se detiene en PROPOSE sin modificar el sistema. IMPLEMENT se detiene tras el completion check y la entrega; no inicia otra mejora, AUDIT, publicación, acción externa, commit, tag o push.
