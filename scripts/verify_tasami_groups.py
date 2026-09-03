#!/usr/bin/env python3
import json
import subprocess
import re

SEP = "\x1e"


def psql(sql):
    return subprocess.check_output(
        [
            "docker",
            "exec",
            "n8n-postgres-1",
            "psql",
            "-U",
            "n8n_user",
            "-d",
            "n8n_db",
            "-t",
            "-A",
            "-F",
            SEP,
            "-c",
            sql,
        ],
        text=True,
    )


def evo(sql):
    return subprocess.check_output(
        [
            "docker",
            "exec",
            "evolution-postgres",
            "psql",
            "-U",
            "evolution-user",
            "-d",
            "evolution-db",
            "-c",
            sql,
        ],
        text=True,
        stderr=subprocess.STDOUT,
    )


print("=== ALL workflows mentioning group/g.us/evolution/whatsapp ===")
rows = psql(
    """
SELECT id, name, active FROM workflow_entity
WHERE nodes::text ILIKE '%g.us%'
   OR nodes::text ILIKE '%isGroup%'
   OR nodes::text ILIKE '%groupId%'
   OR nodes::text ILIKE '%evolution%'
   OR nodes::text ILIKE '%whatsapp%'
ORDER BY name;
"""
)
for line in rows.splitlines():
    if not line.strip():
        continue
    parts = line.split(SEP)
    if len(parts) < 3:
        print("ROW:", line)
        continue
    wid, name, active = parts[0], parts[1], parts[2]
    print(f"{active=} | {name} | {wid}")

print("\n=== webhook paths (all) ===")
print(
    psql(
        """
SELECT w."webhookPath", wf.name, wf.active
FROM webhook_entity w
JOIN workflow_entity wf ON wf.id = w."workflowId"
ORDER BY wf.name;
"""
    )
)

print("\n=== evolution-incoming workflow? ===")
print(
    psql(
        """
SELECT id, name, active FROM workflow_entity
WHERE id IN (
  SELECT "workflowId" FROM webhook_entity WHERE "webhookPath"='evolution-incoming'
);
"""
    )
)

print("\n=== chat with Factory: ALL nodes that bypass If1 from webhook ===")
row = psql(
    "SELECT nodes::text, connections::text FROM workflow_entity WHERE id='PCnTQ3GBju27SSO2';"
).strip()
nodes_s, conns_s = row.split(SEP)
nodes = json.loads(nodes_s)
conns = json.loads(conns_s)
wh = "Webhook - رسالة جاية من Evolution API"
print("Webhook direct targets:", json.dumps(conns.get(wh, {}), ensure_ascii=False))

for n in nodes:
    nm = n.get("name", "")
    t = n.get("type", "")
    p = json.dumps(n.get("parameters") or {}, ensure_ascii=False)
    if any(k in (nm + p).lower() for k in ["group", "g.us", "مجمو", "if", "whatsapp trigger"]):
        print(f"\nNODE: {nm} | {t}")
        if len(p) > 1200:
            print(p[:1200], "...")
        else:
            print(p)

print("\n=== Workflow version history table? ===")
try:
    print(psql("\\dt *version*"))
except Exception as e:
    print(e)

print("\n=== Total executions ever for chat with Factory ===")
print(
    psql(
        """
SELECT count(*) FROM execution_entity WHERE "workflowId"='PCnTQ3GBju27SSO2';
"""
    )
)

print("\n=== Search ALL execution_data blobs for @g.us (may be slow) ===")
try:
    out = subprocess.check_output(
        [
            "docker",
            "exec",
            "n8n-postgres-1",
            "psql",
            "-U",
            "n8n_user",
            "-d",
            "n8n_db",
            "-t",
            "-A",
            "-c",
            """
SELECT e.id, wf.name, e.status, to_char(e."startedAt", 'YYYY-MM-DD')
FROM execution_entity e
JOIN workflow_entity wf ON wf.id = e."workflowId"
WHERE wf.id = 'PCnTQ3GBju27SSO2'
   OR wf.name ILIKE '%tasami%'
   OR wf.name ILIKE '%factory%'
ORDER BY e."startedAt" DESC
LIMIT 30;
""",
        ],
        text=True,
    )
    print(out)
except Exception as e:
    print(e)

print("\n=== Archived/pinned workflow versions ===")
for tbl in ["workflow_history", "workflow_entity_history", "shared_workflow", "workflow_publish_history"]:
    try:
        r = psql(f"SELECT count(*) FROM {tbl};")
        print(tbl, r.strip())
    except Exception:
        pass

print("\n=== n8n schema tables with workflow ===")
print(psql("SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename ILIKE '%workflow%' ORDER BY 1;"))

print("\n=== If1 full connection graph ===")
if1 = conns.get("If1", {})
print(json.dumps(if1, ensure_ascii=False, indent=2))
# who connects TO If1 and FROM If1 false?
for src, outs in conns.items():
    for branch in outs.get("main", []):
        for link in branch:
            if link.get("node") == "If1":
                print(f"IN -> If1 from: {src}")
            if src == "If1":
                print(f"OUT If1 -> {link.get('node')} branch index in main: {outs['main'].index(branch)}")

print("\n=== Evolution: group-related settings on instances ===")
print(
    evo(
        """
SELECT name, "ownerJid", "connectionStatus", settings::text
FROM "Instance"
WHERE name ILIKE '%tasami%' OR name ILIKE '%estem%';
"""
    )
)
