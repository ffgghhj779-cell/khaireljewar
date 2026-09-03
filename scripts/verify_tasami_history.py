#!/usr/bin/env python3
import json
import subprocess

SEP = "\x1e"
WID = "PCnTQ3GBju27SSO2"


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


print("=== My workflow 3 (roman-whatsapp) ===")
row = psql(
    "SELECT name, active, nodes::text, connections::text FROM workflow_entity WHERE name='My workflow 3';"
).strip()
if row:
    name, active, nodes_s, conns_s = row.split(SEP)
    nodes = json.loads(nodes_s)
    conns = json.loads(conns_s)
    print(f"active={active} nodes={len(nodes)}")
    for n in nodes:
        print(f"  - {n.get('name')} | {n.get('type')}")
    blob = json.dumps(nodes, ensure_ascii=False).lower()
    print("has g.us:", "@g.us" in blob or "g.us" in blob)
    print("has group:", "group" in blob)
else:
    print("not found")

print("\n=== WhatsApp Trigger in chat with Factory - connected? ===")
row = psql(
    f"SELECT nodes::text, connections::text FROM workflow_entity WHERE id='{WID}';"
).strip()
nodes_s, conns_s = row.split(SEP)
nodes = json.loads(nodes_s)
conns = json.loads(conns_s)
for n in nodes:
    if "WhatsApp Trigger" in n.get("name", "") or n.get("type") == "n8n-nodes-base.whatsAppTrigger":
        print("node:", n.get("name"), n.get("type"))
        print("params:", json.dumps(n.get("parameters"), ensure_ascii=False)[:800])
        print("out:", json.dumps(conns.get(n.get("name"), {}), ensure_ascii=False))
        # who connects to this trigger?
        for src, outs in conns.items():
            for branch in outs.get("main", []):
                for link in branch:
                    if link.get("node") == n.get("name"):
                        print(f"  IN from {src}")

print("\n=== workflow_history versions for chat with Factory ===")
try:
    hist = psql(
        f"""
SELECT versionId, "createdAt", authors
FROM workflow_history
WHERE "workflowId"='{WID}'
ORDER BY "createdAt" DESC
LIMIT 8;
"""
    )
    print(hist)
except Exception as e:
    print("history error", e)

print("\n=== Compare If1 in workflow_history snapshots ===")
try:
    rows = psql(
        f"""
SELECT wh."createdAt", left(wh.nodes::text, 500000)
FROM workflow_history wh
WHERE wh."workflowId"='{WID}'
ORDER BY wh."createdAt" DESC
LIMIT 5;
"""
    )
    for i, line in enumerate(rows.splitlines()):
        if not line.strip():
            continue
        created, nodes_s = line.split(SEP, 1)
        nodes = json.loads(nodes_s)
        if1 = next((n for n in nodes if n.get("name") == "If1"), None)
        wh_node = next((n for n in nodes if "Webhook" in n.get("name", "") and n.get("type") == "n8n-nodes-base.webhook"), None)
        print(f"\n--- version {i+1} created {created} ---")
        if if1:
            print("If1 EXISTS:", json.dumps(if1.get("parameters"), ensure_ascii=False)[:600])
        else:
            print("If1: NOT PRESENT")
        if wh_node:
            print("webhook path:", wh_node.get("parameters", {}).get("path"))
        print("has g.us in blob:", "g.us" in nodes_s.lower())
except Exception as e:
    print("compare error", e)

print("\n=== chat with Factory kh (old copy) If1? ===")
row = psql(
    "SELECT nodes::text FROM workflow_entity WHERE id='lLJGKY4vEhi7sPkn';"
).strip()
if row:
    nodes = json.loads(row.split(SEP)[0] if SEP in row else row)
    if1 = next((n for n in nodes if n.get("name") == "If1"), None)
    print("If1 in kh copy:", "yes" if if1 else "no")
    if if1:
        print(json.dumps(if1.get("parameters"), ensure_ascii=False)[:500])

print("\n=== Send text node - replies to same remoteJid (groups would reply in group) ===")
nodes = json.loads(nodes_s if 'nodes_s' in dir() else psql(f"SELECT nodes::text FROM workflow_entity WHERE id='{WID}';").strip())
for n in nodes:
    if n.get("name") == "Send text":
        p = n.get("parameters", {})
        print(json.dumps(p, ensure_ascii=False))
