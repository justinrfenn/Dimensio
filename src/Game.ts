import * as THREE from 'three';
import Orb from "./Orb";

export default class Game {
  
  /** Game Constants **/
  static readonly ORB_RADIUS : number = 2;
  static readonly NUM_ORBS : number = 10;
  static readonly ORB_ROW_SIZE : number = Game.NUM_ORBS*2*Game.ORB_RADIUS;
  static readonly SPEED_INCREMENT : number = 0.15;    
  static readonly WAIT_TIME_AMOUNT : number = Game.ORB_ROW_SIZE/Game.SPEED_INCREMENT;
  static readonly LEFT_EDGE : number = -(Game.ORB_ROW_SIZE/2);  
  static readonly RIGHT_EDGE : number = Game.ORB_ROW_SIZE/2;
  static readonly COLORS : THREE.Color[] = [new THREE.Color(0x5ec3f6), new THREE.Color(0x00ff00)]

  private _scene : THREE.Scene;
  private _camera : THREE.Camera;
  private _renderer : THREE.Renderer;
  private _rayCaster : THREE.Raycaster;
  private _mouse : THREE.Vector2;

  private _orbs : Orb[];


  constructor(anchorElement: HTMLElement){
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this._renderer = new THREE.WebGLRenderer();
    this._rayCaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();
    this._orbs = this.getOrbsRow();

    this._orbs.forEach(o => this._scene.add(o));
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    anchorElement.appendChild(this._renderer.domElement);
    
    this._camera.position.z = 10;
  }

  public Animate(){
    requestAnimationFrame(this.Animate.bind(this));
    
    this._orbs.forEach(o => o.Move(Game.SPEED_INCREMENT, Game.LEFT_EDGE, Game.RIGHT_EDGE));
    this.updateIntersectingOrbs();

    this._renderer.render(this._scene, this._camera);
  }

  public Start(){  
    //TODO: have ability to do either depending on browser/touch functionality
    // window.addEventListener("click", this.onClick.bind(this));
    window.addEventListener("touchstart", this.onClick.bind(this));
    this.Animate();
  }

  private getIntersectingOrbs() : Orb[]{
    var stoppedOrbs = this._orbs.filter(o => o.Stopped);
    // stoppedOrbs.forEach(o => o.geometry.computeBoundingSphere());
    return this._orbs.filter(o => stoppedOrbs.filter(so => so.uuid != o.uuid && so.IntersectsWith(o)).length);
  }

  private updateIntersectingOrbs(){
    var intersectingOrbs = this.getIntersectingOrbs();
    intersectingOrbs.forEach(o => {
      var newState = (o.State + 1)%Game.COLORS.length;
      o.SetState(newState, Game.COLORS[newState]);
    });
  }

  private onClick(event: MouseEvent|TouchEvent){
    // calculate mouse position in normalized device coordinates
    if(event instanceof MouseEvent){
      console.log("clicked");
      this.clickOrb(event.clientX, event.clientY)
    }else{
      console.log("touched");
      Array.from(event.touches).forEach(t => this.clickOrb(t.clientX, t.clientY));
    }

  }

  private clickOrb(x: number,y: number){
    this._mouse.x = ( x / window.innerWidth ) * 2 - 1;
    this._mouse.y = - ( y / window.innerHeight ) * 2 + 1;
    // (-1 to +1) for both components
    // update the picking ray with the camera and mouse position
    this._rayCaster.setFromCamera( this._mouse, this._camera );
    
    // calculate objects intersecting the picking ray
    var intersects = this._rayCaster.intersectObjects( this._scene.children );
    
    for ( var i = 0; i < intersects.length; i++ ) {
      var clickedOrb = intersects[i].object as Orb;
      
      console.log(clickedOrb);

      if(!clickedOrb.Stopped){
        clickedOrb.ToggleStop();
      }

    }
  }

  private getOrbsRow(){
    var orbArray : Orb[] = [];
    for (let i = 0; i < Game.NUM_ORBS; i++) {
      var newXPos = i*Game.ORB_RADIUS*2-Game.ORB_ROW_SIZE/2-Game.ORB_RADIUS;
      var state = i%Game.COLORS.length;
      var color = Game.COLORS[state];
      orbArray.push(new Orb(newXPos, color, state, Game.ORB_RADIUS, Game.WAIT_TIME_AMOUNT));   
    }
    return orbArray;    
  }

}