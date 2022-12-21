// Générer un chiffre aléatoire
// L'utilisateur fera des propositions
// Continuer tant qu'il n'a pas la bonne proposition

let numberToFind = 0 // le chiffre à deviner
const resultDiv = document.getElementById('resultDiv')
const reboursDiv = document.getElementById("compteArebours")
const gamePropalDiv = document.getElementById('gamePropalDiv')
let tempsRestant = 0
let compteurInterval = null

document.getElementById('beginGame').addEventListener('click',() =>{
   launchGame();
})

document.getElementById('checkPropalButton').addEventListener('click',()=>{
    checkPropal()
})

document.getElementById("userPropalInput").addEventListener("keyup", function(event){
        if(event.key == 'Enter'){
            checkPropal();
        }
    });



function checkPropal(){
    let numberPropal = document.getElementById('userPropalInput').value
    if(numberToFind > numberPropal){
        resultDiv.innerHTML="C'est plus";
        let audio = new Audio("audio/perdu.mp3")
        audio.play();
    }
    else if(numberToFind < numberPropal){
        resultDiv.innerHTML="C'est moins"
        let audio = new Audio("audio/moins.mp3")
        audio.play();
    }
    else if (numberToFind == numberPropal){
        resultDiv.innerHTML="C'est gagné !"
        endGame(true)
    }
}

function launchGame() {
      //Lancer la partie
    //Récupérer un chiffre aléatoire
    // j'ai 30sec pour trouver le nombre à trouver
   stopAnimationConfetti();
    numberToFind = Utils.getRandomInt(1000);
    tempsRestant = 30;
    gamePropalDiv.style.display='block'
   if(compteurInterval != null){
    clearInterval(compteurInterval)
   } 
   compteurInterval = setInterval(() => {
        reboursDiv.innerText = tempsRestant
        tempsRestant--;

        if(tempsRestant >= 20){
            reboursDiv.classList.remove('warning')
            reboursDiv.classList.remove('danger')
            reboursDiv.classList.add('cool')
        }
        else if(tempsRestant > 10){
            reboursDiv.classList.remove('cool')
            reboursDiv.classList.remove('danger')
            reboursDiv.classList.add('warning')
        }
        if(tempsRestant >= 0){
            reboursDiv.classList.add('cool')
            reboursDiv.classList.remove('warning')
            reboursDiv.classList.add("danger");
        }
        else if(tempsRestant < 0){
            clearInterval(compteurInterval)
            endGame(false)
            //Partie terminée
        }
    },1000)
}

function endGame(gagne){
    if(gagne){
       launchAnimationConfetti()
       let audio = new Audio("audio/bipbip.mp3")
        audio.play();
        setTimeout(()=>{
        stopAnimationConfetti();
        },5000)

    }
    else{
        let audio = new Audio('audio/perdu.mp3')
        audio.play()
    }
        gamePropalDiv.style.display='none';
        clearInterval(compteurInterval)
       
    
    }
    

function launchAnimationConfetti(){
    let animateDiv = document.getElementById("allconfettis");
    animateDiv.innerHTML = "";

    for(let i =0; i < 100; i++){
        let confeti = document.createElement("div");
        confeti.classList.add("confetti");
        confeti.style.left = getRandomArbitrary(0,100)+'%';
        confeti.style.animationDelay = 50*i+"ms";
        confeti.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        animateDiv.appendChild(confeti);
    }
    document.body.appendChild(animateDiv)
}

function stopAnimationConfetti(){
    let animateDiv = document.getElementById("allconfettis");
    if(animateDiv != undefined){
        animateDiv.innerHTML = "";
        animateDiv.remove()
    }
   
}
function getRandomArbitrary(min,max){
    return Math.floor(Math.random()* (max - min)+ min)
}


