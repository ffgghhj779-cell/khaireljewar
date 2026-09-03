#!/usr/bin/env python3
import json
import subprocess

WID = "PCnTQ3GBju27SSO2"


def psql_raw(sql):
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
            "-c",
            sql,
        ],
        text=True,
    )


print("=== workflow_history: If1 / g.us in each version ===")
out = psql_raw(
    f"""
SELECT "createdAt",
       (nodes::text LIKE '%\"name\": \"If1\"%') AS has_if1,
       (nodes::text LIKE '%g.us%') AS mentions_gus,
       (nodes::text LIKE '%whatsAppTrigger%') AS has_wa_trigger
FROM workflow_history
WHERE "workflowId"='{WID}'
ORDER BY "createdAt" ASC;
"""
)
print(out)

print("=== current workflow same flags ===")
print(
    psql_raw(
        f"""
SELECT (nodes::text LIKE '%\"name\": \"If1\"%') AS has_if1,
       (nodes::text LIKE '%g.us%') AS mentions_gus,
       (nodes::text LIKE '%whatsAppTrigger%') AS has_wa_trigger
FROM workflow_entity WHERE id='{WID}';
"""
    )
)

row = psql_raw(f"SELECT nodes::text FROM workflow_entity WHERE id='{WID}';")
nodes = json.loads(row.strip())

print("\n=== AI Agent1 (WhatsApp Cloud path) ===")
for n in nodes:
    if n.get("name") == "AI Agent1":
        p = n.get("parameters") or {}
        print("systemMessage length:", len((p.get("options") or {}).get("systemMessage", "")))
        print((p.get("options") or {}).get("systemMessage", "")[:1200] or "(empty)")
    if n.get("name") == "Send message":
        print("\nSend message:", json.dumps(n.get("parameters"), ensure_ascii=False))

print("\n=== WhatsApp credentials ===")
print(psql_raw("SELECT id, name, type FROM credentials_entity WHERE type ILIKE '%whatsapp%';"))

print("\n=== If1 conditions (current) ===")
if1 = next(n for n in nodes if n.get("name") == "If1")
print(json.dumps(if1.get("parameters"), ensure_ascii=False, indent=2))

print("\n=== Send text uses same remoteJid (group reply if passed filter) ===")
st = next(n for n in nodes if n.get("name") == "Send text")
print(json.dumps(st.get("parameters"), ensure_ascii=False))
