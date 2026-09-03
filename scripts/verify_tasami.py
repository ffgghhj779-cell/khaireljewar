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


print("=== EVOLUTION INSTANCES ===")
print(
    evo(
        'SELECT name, "connectionStatus", "ownerJid", "profileName", integration, '
        '"disconnectionReasonCode" FROM "Instance" ORDER BY name;'
    )
)

print("=== EVOLUTION WEBHOOKS ===")
print(
    evo(
        """
SELECT i.name, i."ownerJid", w.url, w.enabled, w."webhookByEvents", w.events
FROM "Webhook" w
JOIN "Instance" i ON i.id = w."instanceId"
ORDER BY i.name;
"""
    )
)

print("=== N8N RELEVANT WORKFLOWS ===")
print(
    psql(
        """
SELECT id, name, active FROM workflow_entity
WHERE name ILIKE '%chat with%' OR name ILIKE '%factory%' OR name ILIKE '%buyer%'
   OR name ILIKE '%send to factories%'
ORDER BY name;
"""
    )
)

WORKFLOWS = {
    "PCnTQ3GBju27SSO2": "chat with Factory",
    "Wx5UcGQIIXZ2uETN": "chat with buyer",
    "c3EfOKT1EGjycCPx": "send to factories 10am",
}

for wid, label in WORKFLOWS.items():
    row = psql(
        f"SELECT name, active, nodes::text FROM workflow_entity WHERE id='{wid}';"
    ).strip()
    if not row:
        print(f"--- {label}: NOT FOUND ---")
        continue
    name, active, nodes_s = row.split(SEP)
    nodes = json.loads(nodes_s)
    print(f"--- {label} | active={active} | nodes={len(nodes)} ---")
    for n in nodes:
        t = n.get("type", "")
        nm = n.get("name", "")
        p = n.get("parameters") or {}
        low = (nm + t + json.dumps(p, ensure_ascii=False)).lower()
        if any(
            k in low
            for k in [
                "webhook",
                "evolution",
                "whatsapp",
                "normalize",
                "isgroup",
                "@g.us",
                "remotejid",
                "group",
            ]
        ):
            print(f"  NODE: {nm} | type={t}")
            print(f"    params={json.dumps(p, ensure_ascii=False)[:700]}")

    blob = json.dumps(nodes, ensure_ascii=False).lower()
    hits = [k for k in ["@g.us", "isgroup", "is_group", "groupid", "remotejid"] if k in blob]
    print(f"  group-related keywords in workflow: {hits or 'none explicit'}")

print("=== N8N WEBHOOK PATHS ===")
print(
    psql(
        """
SELECT w."webhookPath", wf.name, wf.active
FROM webhook_entity w
JOIN workflow_entity wf ON wf.id = w."workflowId"
WHERE wf.name ILIKE '%factory%' OR wf.name ILIKE '%buyer%'
   OR w."webhookPath" ILIKE '%tasami%' OR w."webhookPath" ILIKE '%evolution%'
ORDER BY wf.name;
"""
    )
)

print("=== RECENT EXECUTIONS ===")
print(
    psql(
        """
SELECT e.id, wf.name, e.status, to_char(e."startedAt", 'YYYY-MM-DD HH24:MI') AS started
FROM execution_entity e
JOIN workflow_entity wf ON wf.id = e."workflowId"
WHERE wf.name ILIKE '%chat with Factory%' OR wf.name ILIKE '%chat with buyer%'
   OR wf.name ILIKE '%send to factories%'
ORDER BY e."startedAt" DESC
LIMIT 10;
"""
    )
)

# Sample last Factory execution payload for group vs chat
print("=== SAMPLE chat with Factory EXECUTION DATA (group check) ===")
try:
    ex_id = psql(
        """
SELECT e.id FROM execution_entity e
JOIN workflow_entity wf ON wf.id = e."workflowId"
WHERE wf.id = 'PCnTQ3GBju27SSO2' AND e.status = 'success'
ORDER BY e."startedAt" DESC LIMIT 1;
"""
    ).strip()
    if ex_id:
        data = subprocess.check_output(
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
                f'SELECT left(data, 120000) FROM execution_data WHERE "executionId"={ex_id};',
            ],
            text=True,
        )
        low = data.lower()
        print(f"execution id: {ex_id}")
        print(f"contains @g.us: {'@g.us' in low}")
        print(f"contains @s.whatsapp.net: {'@s.whatsapp.net' in low}")
        for m in re.findall(r"[\w.-]+@g\.us", data)[:5]:
            print(f"  group jid sample: {m}")
        for m in re.findall(r"[\d]+@s\.whatsapp\.net", data)[:5]:
            print(f"  private jid sample: {m}")
    else:
        print("no successful executions found")
except Exception as e:
    print(f"execution sample error: {e}")
