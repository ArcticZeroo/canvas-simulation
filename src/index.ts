import MouseFollowingCircle from './MouseFollowingCircle';
import Simulation from './Simulation';

document.addEventListener('DOMContentLoaded', () => {
    const simulation = new Simulation(document.body);

    simulation.items.add(new MouseFollowingCircle({simulation}));

    simulation.start();
});