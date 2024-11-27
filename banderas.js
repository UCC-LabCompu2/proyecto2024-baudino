const JuegoBanderas = (() => {
    const banderas = ["an.jpg", "ba.jpg", "cn.jpg", "nz.jpg", "ir.jpg"];
    const correcta = [1, 2, 0, 2, 0];
    const opciones = [
        ["RUMANIA", "ANDORRA", "MOLDAVIA"],
        ["PALAOS", "JAPON", "BANGLADESH"],
        ["COREA DEL NORTE", "COREA DEL SUR", "COSTA RICA"],
        ["AUSTRALIA", "FIJI", "NUEVA ZELANDA"],
        ["IRLANDA", "COSTA DE MARFIL", "INDIA"]
    ];

    let posActual = 0;
    let cantidadAcertadas = 0;

    const canvas = document.getElementById('mi-canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const stripeHeight = canvasHeight / 3;
    const sunRadius = 20;
    const rayLength = 30;
    const rayCount = 12;
    let scale = 1;
    let scaleDirection = 1;

    const comenzarJuego = () => {
        posActual = 0;
        cantidadAcertadas = 0;
        document.getElementById("pantalla-inicial").style.display = "none";
        document.getElementById("pantalla-juego").style.display = "block";
        document.getElementById("mi-canvas").style.display = "none";
        cargarBandera();
    };

    const cargarBandera = () => {
        if (banderas.length <= posActual) {
            terminarJuego();
        } else {
            limpiarOpciones();
            document.getElementById("imgBandera").src = "bns/" + banderas[posActual];
            document.getElementById("n0").innerHTML = opciones[posActual][0];
            document.getElementById("n1").innerHTML = opciones[posActual][1];
            document.getElementById("n2").innerHTML = opciones[posActual][2];
        }
    };

    const limpiarOpciones = () => {
        document.getElementById("n0").className = "nombre";
        document.getElementById("n1").className = "nombre";
        document.getElementById("n2").className = "nombre";
        document.getElementById("l0").className = "letra";
        document.getElementById("l1").className = "letra";
        document.getElementById("l2").className = "letra";
    };

    const comprobarRespuesta = (opElegida) => {
        if (opElegida == correcta[posActual]) {
            document.getElementById("n" + opElegida).className = "nombre nombreAcertado";
            document.getElementById("l" + opElegida).className = "letra letraAcertada";
            cantidadAcertadas++;
        } else {
            document.getElementById("n" + opElegida).className = "nombre nombreErroneo";
            document.getElementById("l" + opElegida).className = "letra letraErronea";
            document.getElementById("n" + correcta[posActual]).className = "nombre nombreAcertado";
            document.getElementById("l" + correcta[posActual]).className = "letra letraAcertada";
        }
        posActual++;
        setTimeout(cargarBandera, 1000);
    };

    const terminarJuego = () => {
        document.getElementById("pantalla-juego").style.display = "none";
        document.getElementById("pantalla-final").style.display = "block";
        document.getElementById("numCorrectas").innerHTML = cantidadAcertadas;
        document.getElementById("numIncorrectas").innerHTML = banderas.length - cantidadAcertadas;
    };

    const volverAlInicio = () => {
        document.getElementById("pantalla-final").style.display = "none";
        document.getElementById("pantalla-inicial").style.display = "block";
        document.getElementById("pantalla-juego").style.display = "none";
        document.getElementById("mi-canvas").style.display = "block";
    };

    const drawFlag = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#75AADB';
        ctx.fillRect(0, 0, canvasWidth, stripeHeight);
        ctx.fillRect(0, stripeHeight * 2, canvasWidth, stripeHeight);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, stripeHeight, canvasWidth, stripeHeight);
    };

    const drawSun = (scale) => {
        ctx.save();
        ctx.translate(canvasWidth / 2, stripeHeight + stripeHeight / 2);
        ctx.scale(scale, scale);
        ctx.translate(-canvasWidth / 2, -stripeHeight - stripeHeight / 2); //se pasa ctx actual

        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * 2 * Math.PI;
            const xStart = canvasWidth / 2 + Math.cos(angle) * sunRadius;
            const yStart = stripeHeight + stripeHeight / 2 + Math.sin(angle) * sunRadius;
            const xEnd = canvasWidth / 2 + Math.cos(angle) * (sunRadius + rayLength);
            const yEnd = stripeHeight + stripeHeight / 2 + Math.sin(angle) * (sunRadius + rayLength);
            ctx.moveTo(xStart, yStart);
            ctx.lineTo(xEnd, yEnd);

        }
        ctx.stroke();

        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(canvasWidth / 2, stripeHeight + stripeHeight / 2, sunRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    };

    const animate = () => {
        drawFlag();
        if (scale > 1.2 || scale < 0.8) {
            scaleDirection *= -1;
        }
        scale += 0.009 * scaleDirection;
        drawSun(scale);
        requestAnimationFrame(animate);
    };

    return {
        comenzarJuego,
        comprobarRespuesta,
        volverAlInicio,
        animate,
    };
})();

// Inicializar animación del canvas
JuegoBanderas.animate();
