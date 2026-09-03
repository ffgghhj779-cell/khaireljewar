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


print("=== workflow_history columns ===")
print(psql("SELECT column_name FROM information_schema.columns WHERE table_name='workflow_history' ORDER BY 1;"))

print("\n=== history entries count for chat with Factory ===")
print(psql(f'SELECT count(*) FROM workflow_history WHERE "workflowId"=\'{WID}\';'))

print("\n=== If1 presence across history (newest first) ===")
rows = psql(
    f"""
SELECT "versionId", "createdAt", left(nodes::text, 800000)
FROM workflow_history
WHERE "workflowId"='{WID}'
ORDER BY "createdAt" ASC;
"""
)
versions = []
for line in rows.splitlines():
    if not line.strip():
        continue
    parts = line.split(SEP, 2)
    if len(parts) < 3:
        continue
    vid, created, nodes_s = parts
    nodes = json.loads(nodes_s)
    if1 = next((n for n in nodes if n.get("name") == "If1"), None)
    wh = next(
        (
            n
            for n in nodes
            if n.get("type") == "n8n-nodes-base.webhook"
            and "evolution" in n.get("name", "").lower()
        ),
        None,
    )
    wa = next((n for n in nodes if n.get("type") == "n8n-nodes-base.whatsAppTrigger"), None)
    versions.append(
        {
            "created": created,
            "if1": bool(if1),
            "if1_params": if1.get("parameters") if if1 else None,
            "webhook_path": (wh or {}).get("parameters", {}).get("path"),
            "has_wa_trigger": bool(wa),
        }
    )

for i, v in enumerate(versions):
    print(
        f"{i+1}. {v['created']} | If1={v['if1']} | WA_Trigger={v['has_wa_trigger']} | path={v['webhook_path']}"
    )

if versions:
    first, last = versions[0], versions[-1]
    print("\nFIRST version If1:", first["if1"])
    print("LAST version If1:", last["if1"])

print("\n=== AI Agent1 + WhatsApp Trigger subgraph ===")
row = psql(f"SELECT nodes::text, connections::text FROM workflow_entity WHERE id='{WID}';").strip()
nodes_s, conns_s = row.split(SEP)
nodes = json.loads(nodes_s)
conns = json.loads(conns_s)
for target in ["WhatsApp Trigger", "AI Agent1", "Send message"]:
    n = next((x for x in nodes if x.get("name") == target), None)
    if n:
        print(f"\n{target}:")
        print(" type:", n.get("type"))
        print(" params:", json.dumps(n.get("parameters"), ensure_ascii=False)[:500])
        print(" out:", json.dumps(conns.get(target, {}), ensure_ascii=False))
        for src, outs in conns.items():
            for branch in outs.get("main", []):
                for link in branch:
                    if link.get("node") == target:
                        print(f"  IN from: {src}")

print("\n=== If1: trace BOTH output branches in connections ===")
if1_conns = conns.get("If1", {}).get("main", [])
print(f"If1 output branches count: {len(if1_conns)}")
for idx, branch in enumerate(if1_conns):
    print(f" branch {idx}:", [x.get("node") for x in branch])

print("\n=== Nodes with NO incoming from If1 but from webhook parallel ===")
wh_targets = []
for link in conns.get("Webhook - رسالة جاية من Evolution API", {}).get("main", [[]])[0]:
    wh_targets.append(link.get("node"))
print("Webhook parallel targets:", wh_targets)
