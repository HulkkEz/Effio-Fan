document.addEventListener('DOMContentLoaded', () => {
    const fanBlades = document.getElementById('fan-blades');

    // Conectar App
    document.getElementById('btn-connect').addEventListener('click', () => {
        document.getElementById('screen-conn').classList.add('hidden');
        document.getElementById('screen-dash').classList.remove('hidden');
    });

    // Control de Velocidad (Basado en clases CSS para el Blur)
    window.setSpeed = (level, btn) => {
        // UI
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Animación
        fanBlades.className = 'fan-blades'; // Reset
        if (level !== 'off') {
            fanBlades.classList.add('spin-' + level);
        }
    };

    // Cambio de Modo (Azul)
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

    // Guardar Configuración
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

    // Simulación de Variación Térmica
    setInterval(() => {
        const tempSpan = document.getElementById('current-temp');
        let current = parseInt(tempSpan.innerText);
        if (Math.random() > 0.8) {
            tempSpan.innerText = current + (Math.random() > 0.5 ? 1 : -1);
        }
    }, 5000);
});
