// Write your JavaScript code hereconst picturesCont = document.getElementById("pictures-cont");

const pictureOne = document.getElementById("picture-one");
const likeOne = document.getElementById("like-one");
const pictureTwo = document.getElementById("picture-two");
const likeTwo = document.getElementById("like-two");
const pictureThree = document.getElementById("picture-three");
const likeThree = document.getElementById("like-three");
const pictureFour = document.getElementById("picture-four");
const likeFour = document.getElementById("like-four");
const pictureFive = document.getElementById("picture-five");
const likeFive = document.getElementById("like-five");
const pictureSix = document.getElementById("picture-six");
const likeSix = document.getElementById("like-six");
const pictureSeven = document.getElementById("picture-seven");
const likeSeven = document.getElementById("like-seven");
const pictureEight = document.getElementById("picture-eight");
const likeEight = document.getElementById("like-eight");

picturesCont.addEventListener('mouseover', (e) => {
    if (e.target.parentNode.classList.contains("picture-one")) {
        likeOne.style.transition = 'transform 0.2s ease-in-out';
        likeOne.style.transform = 'translateY(0%)';
    }
    else if (e.target.parentNode.classList.contains("picture-two")) {
        likeTwo.style.transition = 'transform 0.2s ease-in-out';
        likeTwo.style.transform = 'translateY(0%)';
    }
    else if (e.target.parentNode.classList.contains("picture-three")) {
        likeThree.style.transition = 'transform 0.2s ease-in-out';
        likeThree.style.transform = 'translateY(0%)';
    }
    else if (e.target.parentNode.classList.contains("picture-four")) {
        likeFour.style.transition = 'transform 0.2s ease-in-out';
        likeFour.style.transform = 'translateY(0%)';
    }
    else if (e.target.parentNode.classList.contains("picture-five")) {
        likeFive.style.transition = 'transform 0.2s ease-in-out';
        likeFive.style.transform = 'translateY(0%)';
    }
    else if (e.target.parentNode.classList.contains("picture-six")) {
        likeSix.style.transition = 'transform 0.2s ease-in-out';
        likeSix.style.transform = 'translateY(0%)';
    }
    else if (e.target.parentNode.classList.contains("picture-seven")) {
        likeSeven.style.transition = 'transform 0.2s ease-in-out';
        likeSeven.style.transform = 'translateY(0%)';
    }
    else if (e.target.parentNode.classList.contains("picture-eight")) {
        likeEight.style.transition = 'transform 0.2s ease-in-out';
        likeEight.style.transform = 'translateY(0%)';
    }
});

picturesCont.addEventListener('mouseout', (e) => {
    if (e.target.parentNode.classList.contains("picture-one")) {
        likeOne.style.transition = 'transform 0.2s ease-in-out';
        likeOne.style.transform = 'translateY(100%)'
    }
    else if (e.target.parentNode.classList.contains("picture-two")) {
        likeTwo.style.transition = 'transform 0.2s ease-in-out';
        likeTwo.style.transform = 'translateY(100%)'
    }
    else if (e.target.parentNode.classList.contains("picture-three")) {
        likeThree.style.transition = 'transform 0.2s ease-in-out';
        likeThree.style.transform = 'translateY(100%)'
    }
    else if (e.target.parentNode.classList.contains("picture-four")) {
        likeFour.style.transition = 'transform 0.2s ease-in-out';
        likeFour.style.transform = 'translateY(100%)'
    }
    else if (e.target.parentNode.classList.contains("picture-five")) {
        likeFive.style.transition = 'transform 0.2s ease-in-out';
        likeFive.style.transform = 'translateY(100%)'
    }
    else if (e.target.parentNode.classList.contains("picture-six")) {
        likeSix.style.transition = 'transform 0.2s ease-in-out';
        likeSix.style.transform = 'translateY(100%)'
    }
    else if (e.target.parentNode.classList.contains("picture-seven")) {
        likeSeven.style.transition = 'transform 0.2s ease-in-out';
        likeSeven.style.transform = 'translateY(100%)'
    }
    else if (e.target.parentNode.classList.contains("picture-eight")) {
        likeEight.style.transition = 'transform 0.2s ease-in-out';
        likeEight.style.transform = 'translateY(100%)'
    }
});