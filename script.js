document.addEventListener('DOMContentLoaded', () => {
    const fanBlades = document.getElementById('fan-blades');

    // 1. Lógica de Conexión con Pantalla de Carga
    window.connectDevice = (method) => {
        const connScreen = document.getElementById('screen-conn');
        
        // Crear overlay de carga
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="spinner"></div>
            <p style="margin-top:15px; color:var(--dark-teal); font-weight:bold;">Conectando vía ${method}...</p>
        `;
        connScreen.appendChild(loader);

        // Simular tiempo de respuesta del ESP32 (1.5 segundos)
        setTimeout(() => {
            loader.remove();
            document.getElementById('screen-conn').classList.add('hidden');
            document.getElementById('screen-dash').classList.remove('hidden');
        }, 1500);
    };

    // 2. Control del Modal de WiFi
    window.openWifiModal = () => document.getElementById('modal-wifi').classList.remove('hidden');
    window.closeWifiModal = () => document.getElementById('modal-wifi').classList.add('hidden');

    window.saveWifi = () => {
        const ssid = document.getElementById('wifi-ssid').value;
        const pass = document.getElementById('wifi-pass').value;

        if (!ssid || !pass) {
            alert("Por favor, completa ambos campos.");
            return;
        }

        // Aquí se enviaría el comando al ESP32
        alert(`Configuración enviada:\nSSID: ${ssid}\nEl ventilador se reiniciará para conectar.`);
        closeWifiModal();
    };

    // 3. Reset de Fábrica
    window.factoryReset = () => {
        const confirmacion = confirm("¿Estás seguro? Se borrarán las redes guardadas y el dispositivo volverá a modo AP.");
        if (confirmacion) {
            alert("Enviando comando de RESET... Desconectando.");
            location.reload(); // Recarga la app al inicio
        }
    };

    // 4. Control de Velocidad (Original)
    window.setSpeed = (level, btn) => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        fanBlades.className = 'fan-blades'; 
        if (level !== 'off') {
            fanBlades.classList.add('spin-' + level);
        }
    };

    // 5. Cambio de Modo (Original)
    window.toggleMode = (mode) => {
        const tabHour = document.getElementById('tab-hour');
        const tabTemp = document.getElementById('tab-temp');
        const panelHour = document.getElementById('panel-hour');
        const panelTemp = document.getElementById('panel-temp');

        if (mode === 'hour') {
            tabHour.classList.add('active');
            tabTemp.classList.remove('active');
            panelHour.classList.remove('hidden');
            panelTemp.classList.add('hidden');
        } else {
            tabTemp.classList.add('active');
            tabHour.classList.remove('active');
            panelTemp.classList.remove('hidden');
            panelHour.classList.add('hidden');
        }
    };

    // 6. Guardar Configuración (Original)
    window.saveData = () => {
        const isHour = document.getElementById('tab-hour').classList.contains('active');
        if (isHour) {
            const start = document.getElementById('time-start').value;
            const end = document.getElementById('time-end').value;
            alert(`Effio Fan: Programación horaria guardada (${start} - ${end})`);
        } else {
            const temp = document.getElementById('temp-val').value;
            alert(`Effio Fan: Activación por temperatura configurada a ${temp}°C`);
        }
    };

    // Simulación de temperatura
    setInterval(() => {
        const tempSpan = document.getElementById('current-temp');
        if (tempSpan) {
            let current = parseInt(tempSpan.innerText);
            if (Math.random() > 0.8) {
                tempSpan.innerText = current + (Math.random() > 0.5 ? 1 : -1);
            }
        }
    }, 5000);
});
