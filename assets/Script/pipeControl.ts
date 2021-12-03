// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class pipeControl extends cc.Component {
	
	@property(cc.Node)
	canvas: cc.Node = null;
	
	@property(cc.Node)
	pipe1: cc.Node = null;
	
	@property(cc.Node)
	pipe2: cc.Node = null;
	
	@property(cc.Node)
	pipe3: cc.Node = null;
	
	@property
	speed: number = 100;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		let width = this.canvas.width;
		let p_width = this.pipe1.children[0].width;
		this.interval = (width + p_width) / 2.2;
		this.pipe1.x = this.interval;
		this.pipe2.x = this.pipe1.x + this.interval;
		this.pipe3.x = this.pipe2.x + this.interval;
	}

    start () {
		
    }

    update (dt) {
		let x = this.speed * dt;
		this.pipe1.setPosition(this.pipe1.x - x, this.pipe1.y);
		this.pipe2.setPosition(this.pipe2.x - x, this.pipe2.y);
		this.pipe3.setPosition(this.pipe3.x - x, this.pipe3.y);
		
		this.onChildMove();
		
		if(this.pipe1.x + this.pipe1.children[0].width / 2 < -this.canvas.width / 2) {
			this.pipe1.x = this.pipe3.x + this.interval;
			this.onChildMove();
		} else if(this.pipe2.x + this.pipe1.children[0].width / 2 < -this.canvas.width / 2) {
			this.pipe2.x = this.pipe1.x + this.interval;
			this.onPipe2();
		} else if(this.pipe3.x + this.pipe1.children[0].width / 2 < -this.canvas.width / 2) {
			this.pipe3.x = this.pipe2.x + this.interval;
			this.onPipe3();
		}
	}
	
	onPipe2() {
		let randomPN = Math.random().toFixed() * 2 - 1;
		let random = Math.floor(Math.random() * 300);
		this.pipe2.y = randomPN * random;
		this.onChildMove();
	}
	
	onPipe3() {
		let randomPN = Math.random().toFixed() * 2 - 1;
		let random = Math.floor(Math.random() * 300);
		this.pipe3.y = randomPN * random;
		this.onChildMove();
	}
	 
	onChildMove() {
		for(let i = 0; i < this.node.children.length; i++) {
			for(let j = 0; j < this.pipe1.children.length; j++) {
				this.node.children[i].children[j].getComponent(cc.RigidBody).syncPosition(true);
			}
		}
	}
}
