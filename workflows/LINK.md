# Workflow LINK

> ROOT CONTRACT: read product rules from `CORE_ROOT` and all user state/artifacts from the explicitly resolved `INSTANCE_ROOT`. References to `state/`, `docs/STATE.md`, `ideas/`, `radar/`, `research/`, `lab/`, `audits/`, `outputs/`, and `postproduction/` are relative to `INSTANCE_ROOT`. If the resolver returns `NOT_CONFIGURED`, stop with `SETUP REQUIRED`; never use templates as live state.


**Estado:** procedimiento reutilizable preparado. Una ruta comprobada acredita encontrabilidad, no el contenido, ownership, vigencia o utilidad del recurso enlazado.

## A. Propósito y principio

LINK hace que una fuente, proyecto, investigación, carpeta, artifact o recurso ya existente sea encontrable desde el lugar correcto de `content-os` mediante el cambio mínimo de routing necesario.

Responde: **«¿Cómo encuentra content-os esto cuando lo necesite?»**

No interpreta el contenido, decide su uso editorial ni cambia quién lo posee. Su principio es:

**REFERENCE, DON'T DUPLICATE.**

LINK no copia o resume el target, no crea una fuente de verdad paralela, no reasigna LABs, no modifica piezas por el mero hecho de enlazarlas y no crea caches, embeddings, RAG, grafos o stores de relaciones.

## B. Activación y autorización

LINK se activa con una orden explícita de vincular, linkear, añadir al routing o hacer recuperable un recurso existente, por ejemplo:

- «Vincula este dossier a `CONTENT-NNN`».
- «Haz que esta investigación sea reutilizable desde `CONTENT-NNN`».
- «Añade este proyecto a las rutas de content-os».
- «Relaciona `CONTENT-NNN` con la investigación de `LAB-NNN` sin cambiar ownership».

Preguntar dónde guardar, cómo organizar o cómo podría enlazarse algo es consulta y no autoriza escritura.

Una orden explícita autoriza la edición local mínima cuando quedan inequívocos target, propósito, fuente canónica, owner y destino de la referencia. Si falta uno de esos datos y no puede recuperarse de los contratos existentes, detenerse y preguntar una sola cosa. No inventar la relación.

## C. Contrato de identidad y ownership

Antes de escribir, distinguir solo cuando sea necesario y esté respaldado:

- **OWNS:** la pieza o sistema mantiene la fuente canónica.
- **USES:** consume una fuente que conserva otro owner.
- **DERIVES FROM:** el artifact procede de otra fuente sin sustituirla.
- **REFERENCES:** permite localizar el target sin afirmar reutilización sustantiva.

Estas etiquetas no constituyen un schema global. Usar primero las estructuras existentes: `origins`, `artifacts`, enlaces de un expediente, índices específicos o documentación local. No añadir un campo nuevo a todas las piezas para representar una relación aislada.

La relación vigente de referencia se interpreta así:

```text
LAB-NNN      OWNS/HOSTS historical work for CONTENT-NNN
CONTENT-NNN  USES research from LAB-NNN
CONTENT-NNN  REFERENCES BUILD-NNN
BUILD-NNN    USES research from LAB-NNN
```

LINK no convierte a `CONTENT-NNN` en owner de `LAB-NNN`, no mueve la investigación y no crea otro LAB para copiarla. Si las rutas existentes ya permiten descubrir esa cadena, el resultado es `ALREADY LINKED` y no se añade información redundante.

## D. Algoritmo operativo

### STEP 1 — TARGET

Identificar el target exacto y comprobar su identidad.

- Para archivo, carpeta, LAB, research, build, artifact, CONTENT o proyecto local: debe existir y resolverse dentro de la ubicación autorizada.
- Para URL externa: conservar la URL canónica solicitada. No abrirla si identidad y propósito son inequívocos.
- Si se accedió realmente a la URL, registrar `ACCESS: VERIFIED` con la fecha o evidencia disponible.
- Si no se accedió, registrar `ACCESS: UNVERIFIED`. Registrar no equivale a verificar.

Un target local inexistente produce `STOP / NO EDIT`.

### STEP 2 — PURPOSE

Escribir una condición breve `WHEN TO USE` que permita recuperar la referencia sin copiar hechos del target. El propósito describe cuándo consultar la fuente, no lo que supuestamente demuestra.

Ejemplo:

```text
WHEN TO USE: consultar esta investigación cuando una pieza necesite evidencia sobre arquitectura de external tools.
```

### STEP 3 — AUTHORITY

Comprobar:

- target canónico;
- owner registrado, si existe;
- relación de reutilización respaldada;
- otras rutas que ya cumplan la misma función.

Si una ruta existente permite llegar al target con el propósito correcto y sin ambigüedad, devolver `ALREADY LINKED / NO CHANGE`.

### STEP 4 — DESTINATION

Elegir el índice o manual más cercano que realmente necesite conocer la referencia:

1. índice o expediente específico;
2. índice de la operación o dominio;
3. manual raíz solo cuando deba enrutar a múltiples contextos.

`AGENTS.md` enruta hacia operaciones o índices, no hacia cada recurso individual. `state/pieces.json` solo se modifica cuando su contrato vigente exige esa referencia para el estado u origen de una pieza concreta; LINK no lo usa como registro general.

### STEP 5 — MINIMAL EDIT

Añadir únicamente lo necesario para expresar:

```text
WHEN TO USE → TARGET → ENTRY POINT, si hace falta
```

Conservar el estilo y la estructura del destino. No copiar el cuerpo del target, crear resúmenes de conveniencia, cambiar ownership, mover archivos ni modificar el recurso enlazado salvo que una corrección de ruta estrictamente necesaria esté incluida en la orden.

### STEP 6 — VERIFY ROUTE

Comprobar realmente:

- que todo path local añadido resuelve;
- que la ruta manual o índice aplicable → target puede seguirse;
- que el target conserva su ubicación y owner;
- que no se duplicó su contenido;
- que no apareció un store de enlaces;
- que no se modificaron piezas o estado sin necesidad contractual.

Clasificar el resultado:

- `DIRECT`: el punto de entrada enlaza directamente al target.
- `INDIRECT`: el punto de entrada conduce a un índice específico y este al target.
- `UNVERIFIED EXTERNAL`: la ruta externa queda registrada sin acceso comprobado.
- `ALREADY LINKED`: la ruta suficiente ya existía y no hubo cambio.

Para una URL accedida, informar por separado `ACCESS: VERIFIED`; la clasificación de ruta sigue siendo `DIRECT` o `INDIRECT`.

## E. External sources

Una referencia externa conserva, cuando el destino lo necesite:

- URL canónica;
- `WHEN TO USE`;
- provider o source;
- `ACCESS: VERIFIED` o `ACCESS: UNVERIFIED`.

No copiar el contenido completo, descargarlo por rutina ni guardar credenciales. Si otro workflow necesita preservar evidencia, ese workflow gobierna captura, procedencia y límites; LINK solo asegura la ruta.

## F. Relación con otras operaciones

- **COMMISSION / IDEA:** decide intención, alcance y vehículo editorial. LINK solo puede hacer encontrable la fuente.
- **RESEARCH:** analiza y contrasta evidencia. LINK no investiga ni resume.
- **BUILD:** puede recuperar SPEC, manual, evidence o research; LINK no crea ni ejecuta el objeto.
- **LEVEL-UP:** modifica capacidades o comportamiento de `content-os`. Puede invocar LINK dentro de una mejora autorizada, pero LINK no inicia LEVEL-UP.
- **AUDIT:** puede comprobar rutas, ownership y vigencia. LINK no ejecuta AUDIT ni convierte una capability en `VERIFIED`.

Ninguna ejecución de LINK encadena otra operación.

## G. Escrituras permitidas y prohibidas

LINK puede modificar únicamente el índice, manual o expediente que deba contener la referencia mínima y, cuando una adopción del propio workflow lo requiera, su documentación canónica e historial.

No crea `links.json`, `LINKS.md`, base de datos, grafo, cache, embeddings, copia documental o dashboard. No modifica el target, `state/pieces.json`, ownership, LAB, pieza, research, build o artifact salvo que el contrato existente exija expresamente esa edición para la relación solicitada.

No usa web, cuentas, APIs, Computer Use ni servicios externos para una ruta local. Abrir una URL solo procede cuando su identidad o propósito necesiten verificación y la orden lo permita.

## H. Verificación proporcional

Para una edición real:

1. releer el destino y el target;
2. resolver enlaces locales;
3. comprobar que el texto del target no se copió;
4. comprobar que ownership y rutas canónicas no cambiaron;
5. validar los archivos estructurales aplicables;
6. ejecutar `node scripts/validate-content-os.mjs` cuando el cambio afecte al repositorio canónico;
7. ejecutar `git diff --check` y revisar el delta.

Los fixtures de [`scripts/link-workflow.test.mjs`](../scripts/link-workflow.test.mjs) cubren las invariantes A–H sin alterar piezas reales. Superarlos acredita el contrato controlado, no una ejecución LINK sobre una fuente real.

## I. Entrega y parada

Entregar:

- target canónico;
- propósito `WHEN TO USE`;
- owner preservado, si aplica;
- destino y entry point;
- relación utilizada solo si fue necesaria;
- resultado `DIRECT`, `INDIRECT`, `UNVERIFIED EXTERNAL` o `ALREADY LINKED`;
- archivos modificados o `NO CHANGE`;
- verificaciones y límites.

Detenerse después de verificar la ruta. No interpretar el contenido, ejecutar otro workflow, modificar la pieza enlazada ni ampliar el sistema.
