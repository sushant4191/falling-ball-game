var character = document.getElementById("ball");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
        character.style.left = left - 2 + "px";
    }
}
function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<480){
        character.style.left = left + 2 + "px";
    }
}
document.addEventListener("keydown", event => {
    if(both==0){
        both++;
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});
function myrestart(){
    document.body.style.backgroundColor="lightblue";
    window.location.reload();
}

var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));
    var gapLast = document.getElementById("gap"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var gapLastTop = parseInt(window.getComputedStyle(gapLast).getPropertyValue("top"));
    }
    if(blockLastTop<500||counter==0){
        var block = document.createElement("div");
        var gap = document.createElement("div");
        block.setAttribute("class", "block");
        gap.setAttribute("class", "gap");
        block.setAttribute("id", "block"+counter);
        gap.setAttribute("id", "gap"+counter);
        block.style.top = blockLastTop + 100 + "px";
        gap.style.top = gapLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360);
        gap.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(gap);
        currentBlocks.push(counter);
        counter++;
    }
    
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(counter<0) {
        var count=0; }
    else {
        var count=counter-6;}
    document.getElementById("score").innerHTML=count;
    if(count>20)
    {
        document.body.style.backgroundColor="#03C04A";
        document.getElementById("sctexts").innerHTML="Keep Going!!!";
        document.getElementById("sctexts").style.fontWeight="bolder";
        document.getElementById("sctexts").style.fontSize="25px";
    }
    var audio=document.getElementById("myaud");
    if(characterTop <= 0){
        // alert("Game over. Score: "+(counter-9));
        clearInterval(blocks);
       // location.reload();
       document.body.style.backgroundColor="#FA5C5C";
       document.getElementById("scoreh").style.borderColor="white";
       document.getElementById("scoreh").style.color="white";
       document.getElementById("scoreh").style.fontSize="x-large";
       audio.pause();
       document.getElementById("sctexts").innerHTML="Better Luck Next Time";
       document.getElementById("sctexts").style.color="blue";
       document.getElementById("sctexts").style.fontSize="22px";
       document.getElementById("sctexts").style.fontWeight="bolder";
       document.getElementById("audicon").innerHTML="Off";  
        setTimeout(function(){
        alert("Game over. Thankyou for playing! Final Score: "+(count));
    },3000);
    }
    
    document.getElementById("btn2").addEventListener("click",function(){
        if(document.getElementById("audicon").innerHTML=="On")
        {
            document.getElementById("audicon").innerHTML="Off";  
            audio.pause();
        }
        else{
            document.getElementById("audicon").innerHTML="On";
            audio.play();
        }
    });


    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let igap = document.getElementById("gap"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let igapLeft = parseFloat(window.getComputedStyle(igap).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        igap.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            igap.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
            if(igapLeft<=characterLeft && igapLeft+20>=characterLeft){
                drop = 0;
            }
        }
    }
    if(drop==0){
        if(characterTop < 580){
            character.style.top = characterTop + 2 + "px";
        }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }
},1);
