# Workflow AUDIT

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. Su existencia no acredita que `content-os` haya sido auditado. La primera auditoría real requiere una orden posterior y crea su propio informe.

## A. Propósito y activación

Inspeccionar `content-os` con evidencia recuperable para distinguir qué está documentado, implementado, ejecutado, verificado, vigente, pendiente, ausente, obsoleto o en conflicto. AUDIT no juzga calidad editorial, no asigna una puntuación agregada y no sustituye el validador estructural.

Lo activan peticiones como «Audita content-os», «¿Qué tenemos realmente verificado?» o «¿Qué partes están solo documentadas?». «Muéstrame el estado actual» activa STATUS salvo que pida evidencia o verificación. «Valida la integridad estructural» ejecuta el validador global, no AUDIT, cuando la intención sea solo comprobar invariantes. «Arregla FND-003» es una reparación separada: consulta el finding, pero no ejecuta AUDIT ni concede permiso para corregirlo.

Una consulta sobre el funcionamiento de AUDIT no crea un informe. Una ejecución explícita produce un único informe nuevo bajo `audits/` y se detiene. No inicia trabajo sustantivo para fabricar evidencia.

## B. Autoridad, alcance y escrituras

Antes de ejecutar, resolver la raíz del repositorio y leer:

1. [`AGENTS.md`](../AGENTS.md), [`channel/CONSTITUTION.md`](../channel/CONSTITUTION.md) y [`workflows/INDEX.md`](INDEX.md).
2. Todos los workflows y estándares que gobiernen las capabilities incluidas.
3. [`state/pieces.json`](../state/pieces.json), [`docs/STATE.md`](../docs/STATE.md), [`docs/DECISIONS.md`](../docs/DECISIONS.md) y [`docs/LEARNING-LEDGER.md`](../docs/LEARNING-LEDGER.md).
4. El informe AUDIT anterior, si existe.
5. Solo los LABs, artifacts, registros seguros y archivos de implementación necesarios para comprobar afirmaciones concretas.

La conversación no es evidencia. La existencia de un archivo no demuestra ejecución. Un workflow o skill demuestra contrato o routing; una ejecución necesita artifacts y registros atribuibles; una verificación necesita evidencia apropiada a su alcance.

AUDIT es read-only respecto al sistema inspeccionado. Su única escritura ordinaria es el nuevo `audits/AUDIT-YYYY-MM-DD-NNN.md`. No modifica workflows, estándares, skills, registro, piezas, Decisions, Learning Ledger, herramientas, configuración, evidencia, Git ni informes anteriores. No crea `audit.json`, base de datos o store separado.

## C. Preflight estructural

Ejecutar primero desde la raíz:

```powershell
node scripts/validate-content-os.mjs --json
```

Consumir el JSON desde stdout; no guardarlo como fuente de verdad. Registrar en el informe `validator_version`, timestamp, resultado y recuentos, y referenciar solo los checks relevantes por su ID estable. No copiar el catálogo dentro de AUDIT.

- Exit `0`: registrar `validator_result: PASS`.
- Exit `1`: registrar `validator_result: FAIL`, conservar los `FAIL` estructurales como evidencia y continuar solo cuando resulte seguro. No repararlos.
- Exit `2` o JSON no interpretable: registrar `validator_result: ERROR`; el audit queda `PARTIAL` salvo que la parte no ejecutada sea demostrablemente irrelevante y esa justificación quede escrita.

Un `WARN` o `SKIPPED` se conserva con su semántica. «No verificado» no significa «roto».

## D. Inventario y granularidad de capabilities

Derivar el inventario principalmente de `workflows/INDEX.md` y de la arquitectura vigente. Como mínimo, cuando existan, incluir:

- `STATUS`;
- `RADAR`;
- `IDEA / COMMISSION`;
- `RESEARCH`;
- `EXPERIMENT`;
- `BUILD`;
- `PRODUCTION`;
- `POSTPRODUCTION`;
- `PUBLICATION-PACKAGE`;
- `REPURPOSE`;
- `REVIEW`;
- `STATE REGISTRY`;
- `DECISIONS`;
- `LEARNING LEDGER`;
- `GLOBAL VALIDATOR`;
- `PRIVATE MEDIA / AV EXECUTION SAFETY`.

No convertir cada Markdown o helper en una capability. Separar subcapacidades solo cuando compartir una fila ocultaría diferencias materiales de implementación, ejecución, verificación o vigencia. Los modos PREPARE/EXECUTE o las rutas sintética/real pueden convivir en una fila si `VERIFICATION SCOPE` conserva la distinción.

## E. Modelo de capability evidence

Cada capability usa cinco dimensiones. Los únicos valores permitidos son `YES`, `PARTIAL`, `NO`, `UNKNOWN` y `N/A`.

| Dimensión | Pregunta |
| --- | --- |
| `DOCUMENTED` | ¿Existe contrato canónico suficiente para saber qué debería ocurrir? |
| `IMPLEMENTED` | ¿Existe un mecanismo operable y accesible, no solo una descripción? |
| `EXECUTED` | ¿Hay evidencia de una ejecución real en el alcance declarado? |
| `VERIFIED` | ¿El resultado de esa ejecución fue comprobado con evidencia apropiada? |
| `CURRENT` | ¿Esa evidencia sigue siendo aplicable a la versión relevante actual? |

`CURRENT` no se deduce de la fecha del archivo. Es `YES` cuando la evidencia corresponde a la versión vigente o los cambios posteriores son demostrablemente irrelevantes; `NO` solo cuando un cambio material dejó de representarla; `UNKNOWN` cuando no puede establecerse; `N/A` cuando no existe evidencia a la que aplicar vigencia.

Toda fila declara `VERIFICATION SCOPE`: qué superficie, versión, datos y modalidad quedaron cubiertos y qué quedó fuera. Por ejemplo, un piloto audiovisual autónomo puede verificar parte de `tools/av/` sin demostrar todavía una ejecución canónica `CONTENT → POSTPRODUCTION`.

## F. Evidencia y labels

Cada afirmación material cita una referencia localizable y usa una clase:

- `CANONICAL CONTRACT`;
- `IMPLEMENTATION`;
- `REAL EXECUTION`;
- `SYNTHETIC EXECUTION`;
- `HUMAN REVIEW`;
- `DETERMINISTIC VERIFICATION`;
- `PUBLICATION DATA`;
- `HISTORICAL RECORD`.

Cada evidencia declara: `CLASS`, `REFERENCE`, `DEMONSTRATES`, `DOES NOT DEMONSTRATE` y uno de estos `LABEL`: `VERIFIED`, `DOCUMENTED_BUT_UNVERIFIED`, `MISSING`, `STALE`, `CONFLICTING`, `INTENTIONALLY_PENDING` o `NOT_APPLICABLE`.

Una ejecución sintética puede verificar mecanismo, parsing, routing, render técnico o error handling; no demuestra por sí sola trabajo real, utilidad editorial, calidad humana ni comportamiento con media real. La evidencia real tampoco se generaliza más allá de su muestra. Una aprobación humana identifica versión y alcance. Un registro histórico prueba que algo fue documentado entonces; no acredita vigencia actual sin correspondencia adicional.

## G. Overall evidence state

Cada capability recibe exactamente uno de estos estados:

- `VERIFIED_CURRENT`: verificación adecuada y vigente para todo el scope declarado.
- `VERIFIED_PARTIAL`: solo una parte relevante está verificada o existen modalidades/límites sin cubrir.
- `EXECUTED_UNVERIFIED`: existe ejecución, pero no verificación suficiente de su resultado.
- `IMPLEMENTED_UNEXECUTED`: existe mecanismo operable sin ejecución demostrada en el scope.
- `DOCUMENTED_ONLY`: existe contrato, pero no implementación operable demostrada.
- `MISSING`: falta una capability necesaria y no existe gate intencional que explique su ausencia.
- `STALE`: existe evidencia suficiente de que una verificación dejó de representar la versión vigente.
- `CONFLICTING`: fuentes aplicables se contradicen o la implementación contradice el contrato/decisión vigente.
- `INTENTIONALLY_PENDING`: la ausencia de ejecución o verificación corresponde a un gate, autorización o decisión pendiente explícitos.
- `NOT_APPLICABLE`: la capability no corresponde al scope auditado.

No derivar el estado mediante una puntuación. Resolverlo desde las cinco dimensiones, el scope y la evidencia. `media_storage_approved: false`, `sync_status: unverified`, `@content-os/av-phase-a` o la ausencia de `workflows/STATUS.md` no son defects automáticos: evaluar su contrato y función real.

## H. Procedimiento

1. Ejecutar el preflight de la sección C y conservar su resultado en memoria.
2. Localizar `audits/AUDIT-*.md`; seleccionar como baseline el informe con mayor `audit_id` válido, si existe. No tratar otros documentos como audit previo.
3. Construir el inventario de capabilities desde INDEX y la arquitectura core, sin inspeccionar todos los artifacts por rutina.
4. Para cada capability, leer contrato, implementación, ejecuciones y verificaciones únicamente hasta poder justificar las cinco dimensiones, `OVERALL STATE` y `VERIFICATION SCOPE`.
5. Contrastar las decisiones vigentes que gobiernan esa capability. Comprobar coherencia; no reabrir filosóficamente la decisión.
6. Consultar aprendizajes relacionados, deterministic checks, revalidación y límites. Una entrada `REVALIDATED` solo respalda su scope declarado.
7. Clasificar evidencia sintética y real por separado. No ejecutar workflows, media, productos, APIs, builds, experimentos o pruebas sustantivas para completar huecos.
8. Comparar con el baseline solo en campos comparables. Reutilizar IDs de findings para el mismo problema subyacente.
9. Redactar conclusión, matriz, evidencias, findings y hasta tres acciones. No reparar nada.
10. Comprobar schema, enlaces, ausencia de datos privados y correspondencia de IDs; guardar el informe nuevo y detenerse.

## I. Findings

Crear findings solo cuando exista un hallazgo accionable. Usar `FND-NNN`, único dentro de la serie de audits. Si un audit anterior contiene el mismo problema subyacente, reutilizar su ID aunque cambie la redacción. El siguiente ID nuevo es posterior al mayor ya utilizado; no hay un store separado.

Clases permitidas:

- `CONFIRMED_DEFECT`;
- `VERIFICATION_GAP`;
- `INTENTIONAL_PENDING`;
- `IMPROVEMENT_OPPORTUNITY`;
- `CONFLICT`.

Severidad: `BLOCKER`, `HIGH`, `MEDIUM` o `LOW`. Estado: `OPEN`, `RESOLVED`, `ACCEPTED` o `SUPERSEDED`. Confianza: `HIGH`, `MEDIUM` o `LOW`.

Cada finding usa exactamente este bloque:

```text
### FND-NNN — título
CLASS: CONFIRMED_DEFECT | VERIFICATION_GAP | INTENTIONAL_PENDING | IMPROVEMENT_OPPORTUNITY | CONFLICT
SEVERITY: BLOCKER | HIGH | MEDIUM | LOW
STATUS: OPEN | RESOLVED | ACCEPTED | SUPERSEDED
CONFIDENCE: HIGH | MEDIUM | LOW
SCOPE: texto
EVIDENCE: referencias y alcance
IMPACT: texto
RECOMMENDED ACTION: texto
COMPLETION CHECK: texto comprobable
```

No crear findings para llenar una lista. `UNKNOWN`, ausencia de publicación o un gate intencional no son defects por defecto. Un audit posterior conserva la transición, por ejemplo `FND-003 OPEN → RESOLVED`, y cita la evidencia que la justifica.

## J. Identidad, baseline y nombre del informe

Cada ejecución usa el siguiente `AUDIT-NNN` posterior al mayor audit válido. El mismo `NNN` aparece en `audits/AUDIT-YYYY-MM-DD-NNN.md`. No sobrescribir informes.

Frontmatter obligatorio:

```yaml
---
audit_id: AUDIT-NNN
date: YYYY-MM-DD
status: COMPLETE
validator_result: PASS
baseline: AUDIT-NNN | NONE
---
```

`status` solo admite `COMPLETE` o `PARTIAL`; `validator_result`, `PASS`, `FAIL` o `ERROR`. `baseline` contiene el audit anterior comparable o `NONE`. Sin audit previo, la sección 11 contiene exactamente `FIRST BASELINE`; no se inventa progreso retrospectivo desde `docs/STATE.md`.

El informe es seguro para versionado: no incluye rutas privadas absolutas, GPS, secretos, transcript privado crudo, metadata sensible ni nombres privados innecesarios.

## K. Schema regular del informe

El informe mantiene estos encabezados, en este orden:

```text
# CONTENT-OS AUDIT

## 1. Conclusion
## 2. Scope and limits
## 3. Structural validation
## 4. Capability matrix
## 5. What is verified
## 6. Documented / implemented but unverified
## 7. Intentional pending
## 8. Findings
## 9. Decisions consistency
## 10. Learning ledger status
## 11. Progress since previous audit
## 12. Top actions
## 13. Next audit conditions
```

La matriz usa exactamente estas columnas:

```text
| CAPABILITY | DOCUMENTED | IMPLEMENTED | EXECUTED | VERIFIED | CURRENT | OVERALL STATE | VERIFICATION SCOPE |
```

Después de la matriz, cada capability conserva sus evidencias con el nombre exacto como encabezado de cuarto nivel y entradas regulares `CLASS`, `REFERENCE`, `DEMONSTRATES`, `DOES NOT DEMONSTRATE` y `LABEL`. El nombre en la tabla es la clave de capability para una futura proyección.

El dashboard futuro podrá extraer del Markdown canónico: frontmatter; las siete primeras columnas de la matriz más `VERIFICATION SCOPE`; y de cada bloque de finding `ID`, `CLASS`, `SEVERITY` y `STATUS`. No necesita interpretar logs libres, resolver paths privados ni escribir estado. No se crea JSON persistente.

## L. Decisions y Learning Ledger

En `Decisions consistency`, incluir solo decisiones relevantes para una capability o finding. Para cada una comprobar `STATUS`, qué gobierna, evidencia compatible, contradicción o límite. Una decisión `ACCEPTED` coherente no demuestra por sí sola ejecución.

En `Learning ledger status`, registrar para cada aprendizaje pertinente su `STATUS`, scope, deterministic check, revalidación y límites todavía abiertos. No promover una revalidación acotada a verificación de todo el subsistema. Si la implementación contradice una decisión vigente o un aprendizaje aplicable, usar evidencia y clasificar `CONFLICTING` o crear un finding `CONFLICT` cuando sea accionable.

## M. Top actions

Puede recomendar hasta tres acciones, priorizadas así: defect operativo confirmado; bloqueo core; gap de verificación de alto impacto; mejora opcional. No priorizar estética, features nuevas, más corpus o automatización futura salvo que bloqueen una capability core.

Cada acción usa:

```text
TYPE: REPAIR | VERIFY | OPTIONAL
WHY NOW: texto
EXACT SCOPE: texto
DONE WHEN: condición comprobable
```

La recomendación no autoriza la acción.

## N. Parada y respuesta

Antes de guardar, verificar que valores, IDs, baseline y enlaces cumplen este contrato y que no se filtró información privada. Un informe puede ser `COMPLETE` aunque documente `UNKNOWN`, gaps o pendientes, si examinó honestamente todo su scope; es `PARTIAL` cuando la ejecución del audit no pudo cubrir el scope declarado.

Detenerse después de crear el informe. No arreglar findings, cambiar estados, ejecutar trabajo para demostrar capacidades, preparar dashboard ni encadenar otro workflow.

La respuesta entrega `AUDIT-NNN`, resultado estructural, conclusión, capabilities verificadas y pendientes, findings abiertos o resueltos, hasta tres acciones, límites y ruta del informe. No presenta una puntuación ni afirma una auditoría más amplia que la evidencia inspeccionada.
