document.addEventListener('DOMContentLoaded', () => {
    const fanBlades = document.getElementById('fan-blades');
    const fanContainer = document.getElementById('fan-container');
    let oscActive = false;

    // Botón Iniciar
    document.getElementById('btn-start').addEventListener('click', () => {
        document.getElementById('screen-conn').classList.add('hidden');
        document.getElementById('screen-dash').classList.remove('hidden');
    });

    // Control Velocidad
    window.setSpeed = (level, btn) => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        fanBlades.className = 'fan-blades'; 
        if (level !== 'off') fanBlades.classList.add('spin-' + level);
    };

    // Oscilación
    window.toggleOscillation = () => {
        oscActive = !oscActive;
        const btn = document.getElementById('btn-osc');
        if (oscActive) {
            btn.classList.add('on');
            btn.innerText = "OSCILACIÓN: ON";
            fanContainer.classList.add('oscillating');
        } else {
            btn.classList.remove('on');
            btn.innerText = "OSCILACIÓN: OFF";
            fanContainer.classList.remove('oscillating');
        }
    };

    // Modos Hora/Temp
    window.toggleMode = (mode) => {
        document.getElementById('tab-hour').classList.toggle('active', mode === 'hour');
        document.getElementById('tab-temp').classList.toggle('active', mode === 'temp');
        document.getElementById('panel-hour').classList.toggle('hidden', mode !== 'hour');
        document.getElementById('panel-temp').classList.toggle('hidden', mode !== 'temp');
    };

    // WiFi Modals
    window.openWifiModal = () => document.getElementById('modal-wifi').classList.remove('hidden');
    window.closeWifiModal = () => document.getElementById('modal-wifi').classList.add('hidden');
    
    window.saveWifi = () => {
        alert("Enviando credenciales WiFi...");
        closeWifiModal();
    };

    window.factoryReset = () => {
        if(confirm("¿Restablecer de fábrica?")) location.reload();
    };

    window.saveData = () => {
        alert("Ajustes guardados correctamente");
    };
});
