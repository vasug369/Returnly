fetch('http://localhost:5000/api/v1/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        jobCity: 'SF',
        hometown: 'LA',
        travelFrequency: 'Every Weekend'
    })
})
    .then(async res => {
        const text = await res.text();
        try {
            console.log({ status: res.status, data: JSON.parse(text) });
        } catch {
            console.log({ status: res.status, data: text.substring(0, 500) });
        }
    })
    .catch(console.error);
