// //LOAD MODEL
// function Bottles() {

    
//     var loader = new THREE.GLTFLoader();

//     let bottle = "models/plastic_water_bottle/scene.gltf";
//     loader.load(bottle, function (gltf) {


//         var model = gltf.scene.children[0].children[0].children[0].children[0].children[0];
//         model.scale.set(10,10,10); 
//         model.position.set(0,100,0);  
//         window.model = model;
//         scene.add(model);

//         // var R = 700;  //river radius
//         // var waterCenterY = -600;
//         // for(var theta=Math.PI*(1/2-1/6); theta<Math.PI*(1/2+1/6); theta += Math.PI/60){
//         //     var x = Math.cos(theta)*R;
//         //     var y = Math.sin(theta)*R + waterCenterY + Math.random()*100;

//         //     var newModel = model.clone();
//         //     newModel.position.set(x,y,Math.random()*100);
//         //     newModel.rotateX(Math.random()*Math.PI);
//         //     newModel.rotateY(Math.random()*Math.PI);
//         //     newModel.rotateZ(Math.random()*Math.PI);
//         //     scene.add(newModel);
//         // }
//     }, undefined, function (error) {
//         console.error(error);
//     });

// }

// Bottles();

var loader = new THREE.GLTFLoader();
var url = "models/plastic_water_bottle/scene.gltf";
      


class Bottles {
    
    constructor(seabedHeight){

        this.seabedHeight = seabedHeight;
        this.numOfBottles = 25;
        this.innerR = 8;
        this.outerR = 16;
        this.rSegments = 8;
        this.tSegments = 20;
        this.number = 25;
        this.step = .003;
        this.group = new THREE.Group()


        let startAngle = 40;
        let endAngle = 140;



        var that = this;
        var model;

        this.modelList = [];

        window.loader.load(url, function (gltf) {
            model = gltf.scene.children[0].children[0].children[0].children[0].children[0];
            model.scale.set(10,10,10); 
            model.position.set(0,100,0);  

            for (let i = 0; i < that.numOfBottles; i++) {
                let bottle = model.clone();


                that.group.add(bottle);

                that.modelList.push(bottle);
                
                bottle.distance = that.seabedHeight + 50 + Math.random() * 50;
                bottle.offset = Math.random() * 350;

                //设置模型位置
                // let angle = (80 + i)/180*Math.PI;

                
                let angle = (startAngle + (endAngle - startAngle)*i/that.numOfBottles)/180*Math.PI;
                let x = Math.cos(angle) * bottle.distance;
                let y = bottle.offset - that.seabedHeight + Math.sin(angle) * bottle.distance;;
                let z= 110;
                
                bottle.rotation.y = Math.random() * Pi;
                bottle.rotation.z = Math.random() * Pi;

                bottle.position.set(x,y,z);

                
                scene.add(bottle);
                

                    
                // bottle.angle = 2 * Pi * i / that.numOfBottles - Math.random() * .3;
                // bottle.angleCopy = bottle.angle;
                // bottle.distance = that.seabedHeight + 50 + Math.random() * 50;  

                // bottle.mesh.rotation.y = Math.random() * Pi;
                // bottle.mesh.rotation.z = Math.random() * Pi;
                
                // bottle.mesh.position.z = 110;
                // bottle.mesh.position.y = bottle.offset - this.seabedHeight + Math.sin(bottle.angle) * bottle.distance;
                // bottle.mesh.position.x = Math.cos(angle) * bottle.distance;
                // this.mesh.add(bt.mesh);
                // this.elements.push(bt);
                
            }

            
            
        }, undefined, function (error) {
            console.error(error);
        });

        scene.add(that.group);
        // that.rotateAll();
        
        
    }

    // rotateAll (){
    //     let that = this;
    //     function animateR() {
    //             that.group.rotateZ(0.01);
    //             requestAnimationFrame(animateR);
    //         }
    //     animateR();
    // }

    rotateBottles(step, scale) {
        for(let i = 0; i <this.elements.length; i++){
            const singleBottle = this.elements[i];
            singleBottle.angle+=this.step;
            singleBottle.mesh.position.y= singleBottle.offset - this.seabedHeight*.95 + Math.sin(singleBottle.angle)*(singleBottle.distance) ;
            singleBottle.mesh.position.x = Math.cos(singleBottle.angle)*(singleBottle.distance);
            singleBottle.mesh.scale.set(scale,scale,scale);
            const diffPos = whale.mesh.position.clone().sub(singleBottle.mesh.position.clone());
            const d = diffPos.length();
            if(d<2* this.outerR * params.tsize + params.jsize*4){
                crashSpeedX = 120*diffPos.x / (d);
                crashSpeedY = 120*diffPos.y / (d);
                crash = i;
            }
            if(crash == i && crashSpeedX!=0){
                singleBottle.mesh.position.y= singleBottle.offset - this.seabedHeight*.95 + Math.sin(singleBottle.angle )*(singleBottle.distance) - jellyDisplacementY/10;
                singleBottle.mesh.position.x= Math.cos(singleBottle.angle)*(singleBottle.distance) - jellyDisplacementX/5 ;
            }
        }
    };


}

// Bottles();