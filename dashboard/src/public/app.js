const status = document.querySelector("#status");
const setup = document.querySelector("#setup");
const summary = document.querySelector("#summary");
const identity = document.querySelector("#identity");
const metrics = document.querySelector("#metrics");
const system = document.querySelector("#system");

function metric(label, value) {
  const item = document.createElement("article");
  const title = document.createElement("span");
  const count = document.createElement("strong");
  title.textContent = label;
  count.textContent = String(value);
  item.append(title, count);
  return item;
}

function systemRow(label, value) {
  const term = document.createElement("dt");
  const detail = document.createElement("dd");
  term.textContent = label;
  detail.textContent = value;
  system.append(term, detail);
}

try {
  const response = await fetch("/api/view", { cache: "no-store" });
  if (!response.ok) throw new Error("Dashboard source unavailable");
  const view = await response.json();
  status.textContent = view.setupRequired ? "Core ready · workspace not configured" : "Core and workspace connected";
  setup.hidden = !view.setupRequired;
  summary.hidden = view.setupRequired;
  identity.textContent = view.identity ? view.identity.displayName : "";
  for (const [label, value] of Object.entries(view.counts)) metrics.append(metric(label.toUpperCase(), value));
  systemRow("CORE", view.system.core);
  systemRow("INSTANCE", view.system.instance);
  systemRow("OPERATIONAL", view.system.operational);
  systemRow("AV", view.system.av);
} catch (error) {
  status.textContent = error.message;
}
