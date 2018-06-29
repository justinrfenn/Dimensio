import * as THREE from 'three';
import { MeshBasicMaterial, Material } from 'three';

export default class Orb extends THREE.Mesh {  
  private _waitTime: number;
  
  public Stopped: boolean;
  public State: number;

  constructor(xPos: number, color: THREE.Color, state: number, private _radius: number, private _waitTimeAmount: number){
    super(new THREE.SphereGeometry( _radius, 10, 10 ), new MeshBasicMaterial( { color } ) );
    this.State = state;
    this.Stopped = false;

    this.position.x = xPos;
    this._waitTime = 0;
  }
  
  public Move(speedIncrement: number, leftEdge: number, rightEdge: number){        
    if(this.Stopped){
      if(this._waitTime > 0){
        this._waitTime--;
        return;
      }else{
        this.ToggleStop()
      }
    }

    if(this.position.x >= rightEdge-speedIncrement/4){
      this.position.x = leftEdge+speedIncrement/4;
    }
    this.position.x += speedIncrement;
  }

  public ToggleStop(){
    if(this.Stopped){
      this.Stopped = false;
      this.position.z -= this._radius/2;
    }
    else{
      this.Stopped = true;
      this._waitTime = this._waitTimeAmount;
      this.position.z += this._radius/2;
    }
  }

  public SetState(state: number, color: THREE.Color){
    this.State = state;
    var material = <MeshBasicMaterial>this.material;
    material.color = color;
  }

  public IntersectsWith(otherOrb: Orb){
    return otherOrb.position.x.toFixed(2) === this.position.x.toFixed(2);
  }

}
