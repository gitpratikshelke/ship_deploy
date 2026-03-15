async function test() {
  try {
    // 1. Register
    const email = `test${Date.now()}@example.com`;
    console.log('Registering...', email);
    let res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email, password: 'password123' })
    });
    let data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    const token = data.token;
    console.log('Got token:', token);
    
    // 2. Create Shipment
    console.log('Creating shipment...');
    res = await fetch('http://localhost:5000/api/shipments', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        companyName: 'Test Corp',
        originPort: 'Port A',
        destinationPort: 'Port B',
        status: 'Pending'
      })
    });
    data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    console.log('Shipment created:', data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();