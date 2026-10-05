def classify_complaint(title: str, description: str) -> dict:
    text = f"{title} {description}".lower()

    if any(word in text for word in [
        "payment",
        "refund",
        "billing",
        "charged",
        "transaction"
    ]):
        category = "Payment"

    elif any(word in text for word in [
        "login",
        "password",
        "account",
        "profile",
        "registration"
    ]):
        category = "Account"

    elif any(word in text for word in [
        "network",
        "internet",
        "wifi",
        "connection"
    ]):
        category = "Network"

    elif any(word in text for word in [
        "delivery",
        "shipping",
        "order"
    ]):
        category = "Delivery"

    else:
        category = "Technical Support"

    if any(word in text for word in [
        "urgent",
        "critical",
        "security",
        "hacked",
        "multiple"
    ]):
        priority = "CRITICAL"

    elif any(word in text for word in [
        "failed",
        "error",
        "crash",
        "cannot",
        "unable"
    ]):
        priority = "HIGH"

    elif any(word in text for word in [
        "slow",
        "issue",
        "problem"
    ]):
        priority = "MEDIUM"

    else:
        priority = "LOW"

    return {
        "category": category,
        "priority": priority
    }