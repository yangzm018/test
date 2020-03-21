
var loader = new THREE.GLTFLoader();
var url = "models/plastic_water_bottle/scene.gltf";

class Bottles {
    constructor(seabedHeight){
        this.seabedHeight = seabedHeight;
        this.numOfBottles = 30;
        this.innerR = 8;
        this.outerR = 16;
        this.rSegments = 8;
        this.tSegments = 20;
        this.number = 25;
        this.step = .003;
        this.group = new THREE.Group();

        var that = this;
        var model;
        
        //store bottles
        this.modelList = [];

        window.loader.load(url, function (gltf) {
            model = gltf.scene.children[0].children[0].children[0].children[0].children[0];
            model.scale.set(10,10,10); 
            model.position.set(0,100,0);  

            
            for (let i = 0; i < that.numOfBottles; i++) {
                let bottle = model.clone();
        
                //store bottles
                that.group.add(bottle);
                that.modelList.push(bottle);

                bottle.angle = 2 * Pi * i / that.numOfBottles - Math.random() * .3;
                bottle.angleCopy = bottle.angle;

                bottle.distance = that.seabedHeight + 50 + Math.random() * 50;
                bottle.offset = Math.random() * 350;

                //set up x,y,z
                let x = Math.cos(bottle.angle) * bottle.distance;
                let y = bottle.offset - that.seabedHeight + Math.sin(bottle.angle) * bottle.distance;;
                let z= 110;

                bottle.rotation.y = Math.random() * Pi;
                bottle.rotation.z = Math.random() * Pi;
                bottle.position.z = 110;

                bottle.position.set(x,y,z);
                
                
            }
  
        }, undefined, function (error) {
            console.error(error);
        });

        scene.add(that.group);

        // that.rotateBottles();
    }

    // rotateBottles (){
    //     let that = this;
    //     function animateR() {
    //             that.group.rotateZ(0.01);
    //             requestAnimationFrame(animateR);
    //         }
    //     animateR();
    // }
    // rotateBottles(step,scale){
    //     let that = this;
        
    //     for(let i = 0; i <that.modelList.length; i++){
    //         const singleBottle = that.modelList[i];
    //         singleBottle.angle+=that.step;
    //         singleBottle.position.y= singleBottle.offset - that.seabedHeight*.95 + Math.sin(singleBottle.angle)*(singleBottle.distance) ;
    //         singleBottle.position.x = Math.cos(singleBottle.angle)*(singleBottle.distance);
    //         singleBottle.scale.set(scale,scale,scale);
    //         const diffPos = whale.mesh.position.clone().sub(singleBottle.position.clone());
    //         const d = diffPos.length();

    //         if(d<2* that.outerR * params.tsize + params.jsize*4){
    //             crashSpeedX = 120*diffPos.x / (d);
    //             crashSpeedY = 120*diffPos.y / (d);
    //             crash = i;
    //         }
    //         if(crash == i && crashSpeedX!=0){
    //             singleBottle.position.y= singleBottle.offset - that.seabedHeight*.95 + Math.sin(singleBottle.angle )*(singleBottle.distance) - bottleDisplacementY/10;
    //             singleBottle.position.x= Math.cos(singleBottle.angle)*(singleBottle.distance) - bottleDisplacementX/5 ;
    //         }
    //     }
    // };


}

// Bottles();