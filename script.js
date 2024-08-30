document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const mass1 = parseFloat(document.getElementById('mass1').value);
    const velocity1 = parseFloat(document.getElementById('velocity1').value);
    const mass2 = parseFloat(document.getElementById('mass2').value);
    const velocity2 = parseFloat(document.getElementById('velocity2').value);

    // Initialize object positions
    const object1 = document.getElementById('object1');
    const object2 = document.getElementById('object2');
    object1.style.left = '100px';
    object1.style.top = '150px';
    object2.style.left = '400px';
    object2.style.top = '150px';

    // Set initial velocities
    let velocity1X = velocity1;
    let velocity2X = velocity2;

    // Collision detection and response
    function detectCollision() {
        const x1 = parseFloat(object1.style.left) + 25; // center x of object1
        const x2 = parseFloat(object2.style.left) + 25; // center x of object2
        return Math.abs(x2 - x1) < 50;
    }

    function handleCollision() {
        // Calculate new velocities after collision (elastic collision)
        const newVelocity1X = ((mass1 - mass2) * velocity1X + 2 * mass2 * velocity2X) / (mass1 + mass2);
        const newVelocity2X = ((mass2 - mass1) * velocity2X + 2 * mass1 * velocity1X) / (mass1 + mass2);

        // Calculate force (approximation using impulse)
        const timeInterval = 1; // assume time interval is 1 second
        const force1 = mass1 * (newVelocity1X - velocity1X) / timeInterval;
        const force2 = mass2 * (newVelocity2X - velocity2X) / timeInterval;

        // Update results
        document.getElementById('resultText').textContent = `공 1의 새 속도: ${newVelocity1X.toFixed(2)} m/s, 공 2의 새 속도: ${newVelocity2X.toFixed(2)} m/s\n공 1의 힘: ${force1.toFixed(2)} N, 공 2의 힘: ${force2.toFixed(2)} N`;

        // Update velocities for next frames
        velocity1X = newVelocity1X;
        velocity2X = newVelocity2X;
    }

    function animate() {
        const x1 = parseFloat(object1.style.left);
        const x2 = parseFloat(object2.style.left);

        // Update positions
        object1.style.left = `${x1 + velocity1X}px`;
        object2.style.left = `${x2 + velocity2X}px`;

        // Check for collision
        if (detectCollision()) {
            handleCollision();
            return; // Stop the animation after collision
        }

        requestAnimationFrame(animate);
    }

    animate();
});
