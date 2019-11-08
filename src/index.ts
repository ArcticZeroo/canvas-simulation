import MouseFollowingCircle from './MouseFollowingCircle';
import Simulation from './Simulation';
import Limb from './tree/Limb';

document.addEventListener('DOMContentLoaded', () => {
    const simulation = new Simulation(document.body);

    // simulation.items.add(new MouseFollowingCircle({simulation}));

    const limb = new Limb({
        simulation,
        width: ((Math.random() * 40) + 50),
        height: ((Math.random() * (Simulation.canvasSize.y - 200)) + 200),
        taper: ((Math.random() * 0.65) + 0.35),
        darkness: 0,
        colorVariance: 20,
        knotFrequency: 0.05,
        baseBulge: 0.05,
        wobbleDeltaLength: 0.05,
        wobbleMagnitude: 25
    });

    simulation.items.add(limb);

    simulation.start();
});