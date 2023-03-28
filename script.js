async function sendMail(mail) {
    const res = await fetch("/submit", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: mail }),
    });
    return res;
}
