// CONFIGURATION - REPLACE WITH YOUR n8n WEBHOOK URL
const N8N_WEBHOOK_URL = `https://agentkhosa.app.n8n.cloud/webhook-test/calculator`;

async function calculateWithAI() {
    // Get input values
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value;
    const user = document.getElementById('user').value;

    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').classList.remove('show');

    try {
        // Send to n8n AI Agent
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                num1: parseFloat(num1),
                num2: parseFloat(num2),
                operation: operation,
                user: user
            })
        });

        const data = await response.json();

        console.log(data);
        
        // Hide loading
        document.getElementById('loading').style.display = 'none';

        // Display results
        document.getElementById('calculation').innerHTML = 
            `<strong>Calculation:</strong> ${data.Expression} = ${data.Result}`;
        
        document.getElementById('explanation').innerHTML = 
            `<strong>AI Explanation:</strong> ${data.Explanation}`;
        
        document.getElementById('agentInfo').innerHTML = 
            `<strong>Agent Info:</strong> Processed for ${data.User}`;

        // Show result section
        document.getElementById('result').classList.add('show');

    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('calculation').innerHTML = 
            '<strong>Error:</strong> Failed to connect to AI Agent';
        document.getElementById('result').classList.add('show');
    }
}