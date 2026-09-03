#!/usr/bin/env python3
import json
import subprocess

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


row = psql(
    "SELECT nodes::text, connections::text FROM workflow_entity WHERE id='PCnTQ3GBju27SSO2';"
).strip()
nodes_s, conns_s = row.split(SEP)
nodes = json.loads(nodes_s)
conns = json.loads(conns_s)

by_name = {n["name"]: n for n in nodes}

print("=== If1 node (group filter) ===")
print(json.dumps(by_name.get("If1", {}).get("parameters"), ensure_ascii=False, indent=2))

print("\n=== If1 connections ===")
if1 = by_name.get("If1", {})
if1_conns = conns.get("If1", {})
print(json.dumps(if1_conns, ensure_ascii=False, indent=2))

print("\n=== Webhook node connections (first hops) ===")
wh_conns = conns.get("Webhook - رسالة جاية من Evolution API", {})
print(json.dumps(wh_conns, ensure_ascii=False, indent=2)[:2000])

print("\n=== All webhook paths for tasami/evolution ===")
print(
    psql(
        """
SELECT w."webhookPath", wf.name, wf.active, wf.id
FROM webhook_entity w
JOIN workflow_entity wf ON wf.id = w."workflowId"
WHERE w."webhookPath" ILIKE '%evolution%' OR w."webhookPath" ILIKE '%tasami%'
ORDER BY wf.name;
"""
    )
)

print("\n=== chat with Factory execution counts ===")
print(
    psql(
        """
SELECT status, count(*) FROM execution_entity
WHERE "workflowId"='PCnTQ3GBju27SSO2'
GROUP BY status;
"""
    )
)

print("\n=== Last chat with Factory execution (any status) ===")
print(
    psql(
        """
SELECT e.id, e.status, to_char(e."startedAt", 'YYYY-MM-DD HH24:MI') AS started
FROM execution_entity e
WHERE e."workflowId"='PCnTQ3GBju27SSO2'
ORDER BY e."startedAt" DESC LIMIT 5;
"""
    )
)

print("\n=== Node names after If1 true branch (private chat path) ===")
# trace main path
for src, outs in conns.items():
    if "If1" in str(outs):
        print(src, "->", outs)
