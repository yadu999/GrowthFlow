from datetime import datetime

audit_log = []

def log_action(action, status, amount=None, details=None):
    audit_log.insert(0, {
        "time": datetime.now().strftime("%H:%M:%S"),
        "action": action,
        "status": status,
        "amount": amount,
        "details": details
    })

    audit_log[:] = audit_log[:20]

def get_logs():
    return audit_log