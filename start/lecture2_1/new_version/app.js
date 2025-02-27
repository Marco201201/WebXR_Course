import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class App {
    constructor() {
        // Erstelle ein Container-Div und füge es zum Dokument hinzu
        const container = document.createElement('div');
        document.body.appendChild(container);

        // Erstellt eine perspektivische Kamera mit Sichtfeld (FOV), Seitenverhältnis und Nah/Fern-Clipping
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(0, 0, 4);

        // Erstellt eine Szene und setzt den Hintergrund auf eine graue Farbe
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xaaaaaa);

        // Erstellt einen WebGL-Renderer mit Kantenglättung (Antialiasing)
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        // Erstellt OrbitControls für die Kamerasteuerung
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // Dämpfung für weichere Bewegungen
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.maxPolarAngle = Math.PI / 2; // Begrenzung der vertikalen Bewegung

        // Setzt die Animationsschleife
        this.renderer.setAnimationLoop(this.render.bind(this));

        // Event-Listener für Fenstergrößenänderung
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        // Passt Kamera- und Renderergröße an, wenn das Fenster skaliert wird
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        // Aktualisiert die Kamera-Steuerung
        this.controls.update();
        
        // Rendert die Szene aus Sicht der Kamera
        this.renderer.render(this.scene, this.camera);
    }
}

export { App };
