/* Lecture 4
 *  CS 4388/ CS 5388, Fall 2024, Texas State University
 * Instructor: Isayas Berhe Adhanom <isayas@txstate.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    //member variables
    private ship: gfx.Mesh2;
    private starField: gfx.Particles2; //Particle systems
    private star: gfx.Mesh2;
    private laserSound: HTMLAudioElement;
    private mousePosition: gfx.Vector2; //stores position of mouse

    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.ship = gfx.Geometry2Factory.createBox();
        this.star = gfx.Geometry2Factory.createBox();

        this.starField = new gfx.Particles2(this.star, 200); //creating particles for several hundred star paticles

        this.laserSound = new Audio('./laser.mp3');

        this.mousePosition = new gfx.Vector2;
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        //creating new objects
        this.ship.material.texture = new gfx.Texture('./ship.png');
        this.star.material.texture = new gfx.Texture('./star.png');

        //defining size of objects
        for(let i = 0; i < this.starField.numParticles; i++){
            //creating all stars of random sizes
            this.starField.particleSizes[i] = Math.random() * 0.009 + 0.002;
             //puts stars in random postions on the normalized coordinate scale
            this.starField.particlePositions[i].set(Math.random() * 2 - 1, Math.random() * 2 - 1);
        }

        this.ship.scale.set(0.1, 0.1);
        
        this.starField.update(true, true);

        //drawing objects to the scene
        this.scene.add(this.starField);
        this.scene.add(this.ship);
    }

    //On mouse click event handler
    onMouseDown(event: MouseEvent): void {
        console.log("Mouse Clicked");
        this.laserSound.play();
        //resets mp3 file so it plays every click without mp3 finishing
        this.laserSound.currentTime = 0;

    }

    //On mouse movement event handler
    onMouseMove(event: MouseEvent): void {
        console.log(event.x, event.y); //displays console coordinates (pixel coordinates specific to device)
        console.log(this.getNormalizedDeviceCoordinates(event.x, event.y)); //changes to normailzed coordinates

        this.mousePosition.copy(this.getNormalizedDeviceCoordinates(event.x, event.y));
    }
    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        //input/event handler to make the ship face the direction of the mouse
        this.ship.lookAt(this.mousePosition); //makes ship follow Mouse
    }
}