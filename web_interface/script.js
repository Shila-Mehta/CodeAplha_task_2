const Test_N8N_WEBHOOK_URL = 'https://agentkhosa.app.n8n.cloud/webhook-test/calculator';
const Production_N8N_WEBHOOK_URL = 'https://agentkhosa.app.n8n.cloud/webhook/calculator';

// Auto-wakeup function to start workflow
async function wakeUpWorkflow() {
    try {
        await fetch( Production_N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                operation: "add",
                num1: 1,
                num2: 1,
                user: "System Wakeup"
            })
        });
        console.log("Workflow activated!");
    } catch (error) {
        console.log( error,"Workflow starting...");
    }
}

// Call wakeup when page loads
window.addEventListener('load', function() {
    wakeUpWorkflow();
});

async function calculateWithAI() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value;
    const user = document.getElementById('user').value;

    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').classList.remove('show');

    try {
        const response = await fetch( Production_N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                num1: parseFloat(num1),
                num2: parseFloat(num2),
                operation: operation,
                user: user
            })
        });

        const data = await response.json();
        console.log(data);
        
        document.getElementById('loading').style.display = 'none';
        document.getElementById('calculation').innerHTML = 
            `<strong>Calculation:</strong> ${data.Expression} = ${data.Result}`;
        document.getElementById('explanation').innerHTML = 
            `<strong>AI Explanation:</strong> ${data.Explanation}`;
        document.getElementById('agentInfo').innerHTML = 
            `<strong>Agent Info:</strong> Processed for ${data.User}`;
        document.getElementById('result').classList.add('show');

    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('calculation').innerHTML = 
            '<strong>Error:</strong> Failed to connect to AI Agent - ' + error.message;
        document.getElementById('result').classList.add('show');
    }
}