#!/usr/bin/env python3
import json
import subprocess

WID = "PCnTQ3GBju27SSO2"


def q(sql):
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


def analyze(label, nodes, conns=None):
    if1 = [n for n in nodes if n.get("name") == "If1"]
    wa = [n for n in nodes if n.get("type") == "n8n-nodes-base.whatsAppTrigger"]
    print(f"=== {label} | nodes={len(nodes)} | If1={len(if1)} | WA_Trigger={len(wa)} ===")
    if if1:
        print(" If1:", json.dumps(if1[0]["parameters"], ensure_ascii=False)[:450])
    if conns and if1:
        main = conns.get("If1", {}).get("main", [])
        print(" If1 branches:", len(main), [[x["node"] for x in b] for b in main])


nodes1 = json.loads(
    q(
        f'SELECT nodes::text FROM workflow_history WHERE "workflowId"=\'{WID}\' ORDER BY "createdAt" ASC LIMIT 1;'
    ).strip()
)
nodes2 = json.loads(
    q(
        f'SELECT nodes::text FROM workflow_history WHERE "workflowId"=\'{WID}\' ORDER BY "createdAt" DESC LIMIT 1;'
    ).strip()
)
current_nodes = json.loads(q(f"SELECT nodes::text FROM workflow_entity WHERE id='{WID}';").strip())
current_conns = json.loads(
    q(f"SELECT connections::text FROM workflow_entity WHERE id='{WID}';").strip()
)

analyze("OLDEST history (2026-08-08 area)", nodes1)
analyze("NEWEST history snapshot", nodes2)
analyze("CURRENT live", current_nodes, current_conns)

print("\n=== KEY: If1 existed in oldest version? ===")
print("oldest has If1 node:", any(n.get("name") == "If1" for n in nodes1))
